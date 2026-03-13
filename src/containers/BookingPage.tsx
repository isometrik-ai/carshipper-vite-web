"use client";

import { useEffect, useState } from "react";
import { ReadonlyURLSearchParams, useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BookingHeader } from "@/components/booking/BookingHeader";
import { BookingProgress } from "@/components/booking/BookingProgress";
import { ShippingMethodStep } from "@/components/booking/ShippingMethodStep";
// import { ContactStep } from "@/components/booking/ContactStep";
import { PickupStep } from "@/components/booking/PickupStep";
import { DeliveryStep } from "@/components/booking/DeliveryStep";
import { BookShipmentStep } from "@/components/booking/BookShipmentStep";
// import { BookingSummary } from "@/components/booking/BookingSummary";
import { SuccessStep } from "@/components/booking/SuccessStep";
import { QuoteGetDetailsAPI } from "@/services/quote-services";
import { createNewShipmentBooking } from "@/services/booking-services";
import { toast } from "sonner";

export interface BookingFormData {
  // Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Pickup Details
  pickupAddress: string;
  pickupCity: string;
  pickupState: string;
  pickupZip: string;
  pickupDate: string;
  pickupTimeWindow: string;
  pickupNotes: string;
  pickupLocationType: string;
  pickupBusinessName: string;
  pickupContactName: string;
  pickupContactPhone: string;
  pickupBackupPhone: string;
  // Delivery Details
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZip: string;
  deliveryNotes: string;
  deliveryLocationType: string;
  deliveryBusinessName: string;
  deliveryContactName: string;
  deliveryContactPhone: string;
  deliveryBackupPhone: string;
  // Confirmation
  agreedToTerms: boolean;
  smsUpdates: boolean;
}

const initialFormData: BookingFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  pickupAddress: "",
  pickupCity: "Beverly Hills",
  pickupState: "CA",
  pickupZip: "90210",
  pickupDate: "",
  pickupTimeWindow: "morning",
  pickupNotes: "",
  pickupLocationType: "residence",
  pickupBusinessName: "",
  pickupContactName: "",
  pickupContactPhone: "",
  pickupBackupPhone: "",
  deliveryAddress: "",
  deliveryCity: "Duluth",
  deliveryState: "GA",
  deliveryZip: "30097",
  deliveryNotes: "",
  deliveryLocationType: "residence",
  deliveryBusinessName: "",
  deliveryContactName: "",
  deliveryContactPhone: "",
  deliveryBackupPhone: "",
  agreedToTerms: false,
  smsUpdates: true,
};

// Quote data (would come from API in production)
const quoteData = {
  quoteId: "23117135",
  vehicle: {
    year: 2026,
    make: "Buick",
    model: "Encore GX",
  },
  origin: { city: "Beverly Hills", state: "CA", zip: "90210" },
  destination: { city: "Duluth", state: "GA", zip: "30097" },
  distance: "2,100 miles",
  transitTime: "6-9 days",
  earliestPickup: "01/09/2026",
  condition: "Runs and Drives",
  personalItems: "0 to 100 lbs",
  transportType: "Open",
  serviceType: "Door to door",
  prices: {
    saver: 931,
    priority: 1275,
    rush: 1900,
  },
};

const steps = [
  { id: 1, name: "Shipping Method", shortName: "Method" },
  { id: 2, name: "Pickup", shortName: "Pickup" },
  { id: 3, name: "Delivery", shortName: "Delivery" },
  { id: 4, name: "Book Shipment", shortName: "Book" },
  { id: 5, name: "Thank You", shortName: "Done" },
];

export default function BookingPage(props: { quoteId: string; initialTier?: "saver" | "priority" | "rush" }) {
  const quoteId: string | undefined = useParams().quoteId as string;
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const initialTier = (searchParams.get("tier") as "saver" | "priority" | "rush") || "priority";

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState<"saver" | "priority" | "rush">(initialTier);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<any | null>(null);

  useEffect(() => {
    const effectiveQuoteId = props.quoteId || quoteId;

    if (!effectiveQuoteId) return;

    const controller = new AbortController();

    QuoteGetDetailsAPI(effectiveQuoteId, controller.signal)
      .then((response) => {
        setQuoteDetails((response as any)?.data ?? response);
      })
      .catch((error) => {
        console.error("Failed to fetch quote details", error);
      });

    return () => {
      controller.abort();
    };
  }, [props.quoteId, quoteId]);

  const price = quoteData.prices[selectedTier];

  const updateFormData = (data: Partial<BookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    try {
      const effectiveQuoteId = props.quoteId || quoteId;
      const quote: any =
        (quoteDetails as any)?.data?.quote ?? (quoteDetails as any)?.quote ?? null;

      if (!quote || !effectiveQuoteId) {
        toast.error("Unable to submit booking", {
          description: "Quote details are missing. Please refresh and try again.",
        });
        return;
      }

      const routePickup: any = quote.route?.pickup ?? {};
      const routeDrop: any = quote.route?.drop ?? {};

      const vehicleFromQuote: any[] = Array.isArray(quote.vehicle)
        ? quote.vehicle
        : [];

      const vehiclePayload =
        vehicleFromQuote.length > 0
          ? vehicleFromQuote.map((v: any) => ({
              year: v.year,
              make: v.make,
              model: v.model,
              type: v.type || "SUV",
              condition: v.condition || "runs_and_drives",
              personal_items_weight: v.personal_items_weight || "0-100",
            }))
          : [
              {
                year: quoteData.vehicle.year,
                make: quoteData.vehicle.make,
                model: quoteData.vehicle.model,
                type: "SUV",
                condition: "runs_and_drives",
                personal_items_weight: "0-100",
              },
            ];

      const pickupAddress = {
        street: formData.pickupAddress || routePickup.addLine1 || "",
        city: formData.pickupCity || routePickup.city || "",
        state: formData.pickupState || routePickup.state || "",
        zip: formData.pickupZip || routePickup.zip || "",
        addLine1: formData.pickupAddress || routePickup.addLine1 || "",
        addLine2: "",
        latitude: routePickup.lat ?? routePickup.latitude ?? null,
        longitude: routePickup.lng ?? routePickup.longitude ?? null,
      };

      const deliveryAddress = {
        street: formData.deliveryAddress || routeDrop.addLine1 || "",
        city: formData.deliveryCity || routeDrop.city || "",
        state: formData.deliveryState || routeDrop.state || "",
        zip: formData.deliveryZip || routeDrop.zip || "",
        addLine1: formData.deliveryAddress || routeDrop.addLine1 || "",
        addLine2: "",
        latitude: routeDrop.lat ?? routeDrop.latitude ?? null,
        longitude: routeDrop.lng ?? routeDrop.longitude ?? null,
      };

      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const hasCompany =
        !!formData.pickupBusinessName || !!formData.deliveryBusinessName;

      const payload = {
        quote_id: quote._id || effectiveQuoteId,
        quote_number: quote.quote_number || "",
        selected_tier: selectedTier,
        vehicle: vehiclePayload,
        shipment: {
          earliest_pickup_date: formData.pickupDate || null,
          transport_type:
            quote.transport_type ||
            (quoteData.transportType || "").toLowerCase() ||
            "open",
          service_type: "door_to_door",
          insurance_included: true,
        },
        pickup: {
          location_type: formData.pickupLocationType || "private_residence",
          address: pickupAddress,
          business_info: { name: formData.pickupBusinessName || "" },
          contact: {
            name: formData.pickupContactName || fullName,
            phone: formData.pickupContactPhone || formData.phone,
            email: formData.email,
            present_at_pickup: true,
          },
        },
        delivery: {
          location_type: formData.deliveryLocationType || "private_residence",
          address: deliveryAddress,
          contact: {
            name: formData.deliveryContactName || fullName,
            phone: formData.deliveryContactPhone || formData.phone,
            email: formData.email,
            present_at_delivery: true,
          },
        },
        payment: {
          stripe_payment_method_id: "",
          cardholder_name: fullName,
          billing_address: {
            street: pickupAddress.street,
            city: pickupAddress.city,
            state: pickupAddress.state,
            zip: pickupAddress.zip,
          },
          charge_now: false,
        },
        terms: {
          accepted: formData.agreedToTerms,
          electronic_signature: fullName,
          ip_address: "",
          accepted_at: new Date().toISOString(),
        },
        customer: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company_name:
            formData.pickupBusinessName || formData.deliveryBusinessName || "",
          account_type: hasCompany ? "business" : "personal",
        },
      };

      const response = await createNewShipmentBooking(payload);

      if ((response as any)?.error) {
        throw response;
      }

      toast.success("Booking submitted!", {
        description: "Your shipment has been booked successfully.",
      });

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Booking submission failed", error);
      toast.error("Unable to complete booking", {
        description: "Please try again in a moment.",
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-muted">
        <BookingHeader quoteId={quoteId || quoteData.quoteId} />
        <SuccessStep 
          formData={formData} 
          quoteId={quoteId || quoteData.quoteId}
          tier={selectedTier}
          price={price}
          vehicle={quoteData.vehicle}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <BookingHeader quoteId={quoteId || quoteData.quoteId} />
      <main className="pt-20 pb-12">
        <div className="container">
          {/* Progress Bar */}
          <BookingProgress steps={steps} currentStep={currentStep} />

          <div className="mt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <ShippingMethodStep
                    quoteData={quoteData}
                    selectedTier={selectedTier}
                    onTierChange={setSelectedTier}
                    onNext={nextStep}
                  />
                )}
                {currentStep === 2 && (
                  <PickupStep
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={nextStep}
                    onBack={prevStep}
                    quoteData={quoteData}
                    tier={selectedTier}
                    price={price}
                  />
                )}
                {currentStep === 3 && (
                  <DeliveryStep
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={nextStep}
                    onBack={prevStep}
                    quoteData={quoteData}
                    tier={selectedTier}
                    price={price}
                  />
                )}
                {currentStep === 4 && (
                  <BookShipmentStep
                    formData={formData}
                    updateFormData={updateFormData}
                    onBack={prevStep}
                    onSubmit={handleSubmit}
                    tier={selectedTier}
                    price={price}
                    onTierChange={(newTier, newPrice) => setSelectedTier(newTier)}
                    quoteData={quoteData}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
