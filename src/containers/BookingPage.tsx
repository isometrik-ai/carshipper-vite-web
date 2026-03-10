"use client";

import { useState } from "react";
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

export default function BookingPage(props: { quoteId: string, initialTier?: "saver" | "priority" | "rush" }) {
  const quoteId: string | undefined = useParams().quoteId as string;
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  
  const initialTier = (searchParams.get("tier") as "saver" | "priority" | "rush") || "priority";
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState<"saver" | "priority" | "rush">(initialTier);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = () => {
    // In production, this would submit to an API
    console.log("Booking submitted:", { formData, tier: selectedTier, quoteId });
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
