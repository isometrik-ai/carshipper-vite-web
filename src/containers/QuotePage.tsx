import { QuoteHeader } from "@/components/quote/QuoteHeader";
import { HeroSection } from "@/components/quote/HeroSection";
import { TrustSection } from "@/components/quote/TrustSection";
import { PricingSection } from "@/components/quote/PricingSection";
import { FeaturesSection } from "@/components/quote/FeaturesSection";
import { TimelineSection } from "@/components/quote/TimelineSection";
import { FAQSection } from "@/components/quote/FAQSection";
import { ContactSection } from "@/components/quote/ContactSection";
import { QuoteFooter } from "@/components/quote/QuoteFooter";
import { useEffect, useState } from "react";
import { QuoteGetDetailsAPI } from "@/services/quote-services";
import { formatDisplayDate, getFirstNumberFromString } from "@/lib/helpers";
import { getSafeQuoteId } from "@/shared/routes";
import { UNSAFE_QUOTE_ID_CHARS_REGEX } from "@/lib/regx.constant";
// Sample quote data - in production this would come from API/props

type Route = {
  from_zip: string;
  to_zip: string;
  from_city: string;
  to_city: string;
  from_state: string;
  to_state: string;
  from_addLine1: string;
  from_addLine2: string;
  from_country: string;
  to_addLine1: string;
  to_addLine2: string;
  to_country: string;
  distance_miles: number;
};

type PricingTier = {
  name: string;
  description: string;
  price: number;
  estimated_cost: number;
  gross_profit: number;
  margin_pct: number;
  markup_pct: number;
  estimated_pickup_days: string;
  recommended: boolean;
};

type PricingTiers = {
  saver: PricingTier;
  priority: PricingTier;
  rush: PricingTier;
};

export type Quote = {
  _id: string;
  quote_number: string;
  status: string;
  customer_email: string;
  route: Route;
  pricing_tiers: PricingTiers;
  expires_at: string;
  expired: boolean;
  created_at: string;
};

export type QuoteResponse = {
  quote: Quote;
  data: any;
};


export default function QuotePage({ quoteId }: { quoteId: string }) {

  const [quoteDetails, setQuoteDetails] = useState<QuoteResponse | null>(null);

  useEffect(() => {
    const safeQuoteId = getSafeQuoteId(quoteId);

    if (!safeQuoteId) {
      console.error("Invalid quoteId");
      return;
    }

    const controller = new AbortController();

    const fetchQuoteDetails = async () => {
      try {
        const response = await QuoteGetDetailsAPI(safeQuoteId, controller.signal);
        if (!controller.signal.aborted) {
          setQuoteDetails((response as any)?.data ?? response);
        }
      } catch (error) {
        console.error("Failed to fetch quote details", error);
      }
    };

    fetchQuoteDetails();

    return () => {
      controller?.abort();
    };

  }, [quoteId]);

  // Map API data to component props with fallbacks
  const origin = quoteDetails?.data?.quote?.route
    ? {
        city: quoteDetails?.data?.quote?.route?.pickup?.city || "",
        state: quoteDetails?.data?.quote?.route?.pickup?.state || "",
        zip: quoteDetails?.data?.quote?.route?.pickup?.zip || "",
      }
    : { city: "", state: "", zip: "" };

  const destination = quoteDetails?.data?.quote?.route
    ? {
        city: quoteDetails?.data?.quote?.route?.drop?.city || "",
        state: quoteDetails?.data?.quote?.route?.drop?.state || "",
        zip: quoteDetails?.data?.quote?.route?.drop?.zip || "",
      }
    : { city: "", state: "", zip: "" };

  const distance = quoteDetails?.data?.quote?.route?.distance_miles
    ? `${quoteDetails?.data?.quote?.route?.distance_miles?.toLocaleString()} miles`
    : "";

  // Derive transit time from priority tier (most popular) or use default
  const transitTime = quoteDetails?.data?.quote?.pricing_tiers?.priority?.estimated_pickup_days
    ? quoteDetails?.data?.quote?.pricing_tiers?.priority?.estimated_pickup_days
    : "";

  // Format earliest pickup date (use created_at + minimum pickup days from rush tier)
  const earliestPickup =
    quoteDetails?.data?.quote && quoteDetails?.data?.quote?.created_at
      ? (() => {
          const createdDate = new Date(quoteDetails?.data?.quote?.created_at);

          const rushDays = getFirstNumberFromString(
            quoteDetails?.data?.quote?.pricing_tiers?.rush?.estimated_pickup_days || "1",
          );

          const pickupDate = new Date(createdDate);
          pickupDate.setDate(pickupDate.getDate() + rushDays);

          return formatDisplayDate(pickupDate);
        })()
      : "";


  // Map pricing tiers from API or use fallback
  const prices = quoteDetails?.data?.quote?.pricing_tiers
    ? {
        saver: quoteDetails?.data?.quote?.pricing_tiers?.saver?.price,
        priority: quoteDetails?.data?.quote?.pricing_tiers?.priority?.price,
        rush: quoteDetails?.data?.quote?.pricing_tiers?.rush?.price,
      }
    : { saver: 0, priority: 0, rush: 0 };

  // Format expiration date
  const expirationDate = quoteDetails?.data?.quote?.expires_at
    ? formatDisplayDate(quoteDetails?.data?.quote?.expires_at)
    : "";

  const rawQuoteId = quoteDetails?.data?.quote?.quote_number || "";
  // Remove any characters that are not allowed in our safe ID pattern
  const safeDisplayQuoteId = rawQuoteId.replace(UNSAFE_QUOTE_ID_CHARS_REGEX, "");
  const vehicle = quoteDetails?.data?.quote?.vehicle[0] || {};
  return (
    <div className="min-h-screen bg-background">
      <QuoteHeader quoteId={safeDisplayQuoteId} />
      
      <main>
        <HeroSection
          origin={origin}
          destination={destination}
          vehicle={vehicle}
          distance={distance}
          transitTime={transitTime}
          earliestPickup={earliestPickup}
        />
        
        <TrustSection />
        
        <PricingSection quoteId={safeDisplayQuoteId} prices={prices} />
        
        <FeaturesSection />
        
        <TimelineSection />
        
        <FAQSection />
        
        <ContactSection />
      </main>
      
      <QuoteFooter
        quoteId={safeDisplayQuoteId}
        expirationDate={expirationDate}
      />
    </div>
  );
}
