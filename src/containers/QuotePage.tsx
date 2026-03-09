import { QuoteHeader } from "@/components/quote/QuoteHeader";
import { HeroSection } from "@/components/quote/HeroSection";
import { TrustSection } from "@/components/quote/TrustSection";
import { PricingSection } from "@/components/quote/PricingSection";
import { FeaturesSection } from "@/components/quote/FeaturesSection";
import { TimelineSection } from "@/components/quote/TimelineSection";
import { FAQSection } from "@/components/quote/FAQSection";
import { ContactSection } from "@/components/quote/ContactSection";
import { QuoteFooter } from "@/components/quote/QuoteFooter";

// Sample quote data - in production this would come from API/props
const quoteData = {
  quoteId: "23117135",
  origin: {
    city: "Beverly Hills",
    state: "CA",
    zip: "90210",
  },
  destination: {
    city: "Duluth",
    state: "GA",
    zip: "30097",
  },
  vehicle: {
    year: 2026,
    make: "Buick",
    model: "Encore GX",
  },
  distance: "2,100 miles",
  transitTime: "6-9 days",
  earliestPickup: "Jan 9, 2026",
  prices: {
    saver: 956,
    priority: 1309,
    rush: 1950,
  },
  expirationDate: "Feb 2, 2026",
};

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-background">
      <QuoteHeader quoteId={quoteData.quoteId} />
      
      <main>
        <HeroSection
          origin={quoteData.origin}
          destination={quoteData.destination}
          vehicle={quoteData.vehicle}
          distance={quoteData.distance}
          transitTime={quoteData.transitTime}
          earliestPickup={quoteData.earliestPickup}
        />
        
        <TrustSection />
        
        <PricingSection
          quoteId={quoteData.quoteId}
          prices={quoteData.prices}
        />
        
        <FeaturesSection />
        
        <TimelineSection />
        
        <FAQSection />
        
        <ContactSection />
      </main>
      
      <QuoteFooter
        quoteId={quoteData.quoteId}
        expirationDate={quoteData.expirationDate}
      />
    </div>
  );
}
