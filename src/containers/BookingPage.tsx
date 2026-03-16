"use client";

import { useCallback, useEffect, useState } from "react";
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
import { formatFullAddress } from "@/lib/address";
import { getClientIPAddress } from "@/lib/global";

export interface BookingFormData {
  // Contact Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // Payment (Stripe)
  stripePaymentMethodId: string;
  cardholderName: string;
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
  stripePaymentMethodId: "",
  cardholderName: "",
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

// Quote data mapped from API response
type BookingQuoteData = {
  quoteId: string;
  quote_id: string;
  vehicle: { year: number; make: string; model: string };
  origin: { addLine1: string; addLine2: string; city: string; state: string; zip: string; latitude: number; longitude: number | undefined };
  destination: { addLine1: string; addLine2: string; city: string; state: string; zip: string; latitude: number; longitude: number | undefined };
  distance: string;
  transitTime: string;
  earliestPickup: string;
  condition: string;
  personalItems: string;
  transportType: string;
  serviceType: string;
  prices: { saver: number; priority: number; rush: number };
  customer?: {
    name: string;
    email: string;
    phone: string;
  };
};

const mapQuoteDetailsToBookingQuoteData = (
  quoteDetails: any | null
): BookingQuoteData | null => {
  const quote = (quoteDetails as any)?.data?.quote ?? (quoteDetails as any)?.quote;
  if (!quote) return null;

  const route = quote.route ?? {};
  const pickup = route.pickup ?? {};
  const drop = route.drop ?? {};
  const customerDetails = (quote as any)?.customerDetails ?? {};

  const distanceMiles = route.distance_miles;
  const distance =
    typeof distanceMiles === "number"
      ? `${distanceMiles.toLocaleString()} miles`
      : "";

  const priorityTier = quote.pricing?.tiers?.priority;
  const rushTier = quote.pricing?.tiers?.rush;

  const transitTime = priorityTier?.estimated_pickup_days || "";

  let earliestPickup = "";
  if (quote.created_at) {
    const createdDate = new Date(quote.created_at);
    const rushDaysStr = rushTier?.estimated_pickup_days || "1";
    const rushDaysMatch = rushDaysStr.match(/\d+/);
    const rushDays = rushDaysMatch ? parseInt(rushDaysMatch[0], 10) : 1;
    const pickupDate = new Date(createdDate);
    pickupDate.setDate(pickupDate.getDate() + rushDays);
    earliestPickup = `${(pickupDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${pickupDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${pickupDate.getFullYear()}`;
  }

  const vehicle = Array.isArray(quote.vehicle) ? quote.vehicle[0] ?? {} : {};

  const customerName =
    customerDetails.full_name ||
    [customerDetails.first_name || customerDetails.firstName, customerDetails.last_name || customerDetails.lastName]
      .filter(Boolean)
      .join(" ") ||
    customerDetails.name ||
    "";

  const customerEmail = quote.customer_email || customerDetails.email || "";
  const customerPhone =
    customerDetails.phone || customerDetails.phone_number || customerDetails.mobile || "";

  return {
    quoteId: quote?.quote_number || "",
    quote_id: quote?._id || quote?.quote_number || "",
    vehicle: {
      year: vehicle.year ?? 0,
      make: vehicle.make ?? "",
      model: vehicle.model ?? "",
    },
    origin: {
      addLine1: pickup.addLine1 ?? "",
      addLine2: pickup.addLine2 ?? "",
      city: pickup.city ?? "",
      state: pickup.state ?? "",
      zip: pickup.zip ?? "",
      latitude: pickup.lat ?? undefined,
      longitude: pickup.lng ?? undefined,
    },
    destination: {
      addLine1: drop.addLine1 ?? "",
      addLine2: drop.addLine2 ?? "",
      city: drop.city ?? "",
      state: drop.state ?? "",
      zip: drop.zip ?? "",
      latitude: drop.lat ?? undefined,
      longitude: drop.lng ?? undefined,
    },
    distance,
    transitTime,
    earliestPickup,
    condition: vehicle.condition || "Runs and Drives",
    personalItems: vehicle.personal_items_weight || "0 to 100 lbs",
    transportType:
      quote.transport_type ||
      (quote.pricing_tiers?.priority?.transport_type || "Open"),
    serviceType: "Door to door",
    prices: {
      saver: quote.pricing?.tiers?.saver?.price ?? 0,
      priority: quote.pricing?.tiers?.priority?.price ?? 0,
      rush: quote.pricing?.tiers?.rush?.price ?? 0,
    },
    customer: {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    },
  };
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
  const mappedQuoteData = mapQuoteDetailsToBookingQuoteData(quoteDetails);

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

  const refreshQuoteDetails = useCallback(async () => {
    try {
      const effectiveQuoteId = props.quoteId || quoteId;
      const response = await QuoteGetDetailsAPI(effectiveQuoteId, undefined);
      const responseData: any =
        (response as any)?.data ?? null;

      if (!responseData) return;

      setQuoteDetails(responseData);

      toast.success("Quote updated", {
        description: "Prices and route details have been refreshed.",
      });
    } catch (error) {
      console.error("Failed to refresh quote details", error);
      toast.error("Unable to refresh quote details. Please try again.");
    }
  }, [props.quoteId, quoteId]);

  const price = mappedQuoteData?.prices[selectedTier] ?? 0;

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
                year: quoteDetails.vehicle.year,
                make: quoteDetails.vehicle.make,
                model: quoteDetails.vehicle.model,
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
        full: formatFullAddress({
          addLine1: formData.pickupAddress || routePickup.addLine1 || "",
          addLine2: "",
          city: formData.pickupCity || routePickup.city || "",
          state: formData.pickupState || routePickup.state || "",
          zip: formData.pickupZip || routePickup.zip || "",
        }),
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
        full: formatFullAddress({
          addLine1: formData.deliveryAddress || routeDrop.addLine1 || "",
          addLine2: "",
          city: formData.deliveryCity || routeDrop.city || "",
          state: formData.deliveryState || routeDrop.state || "",
          zip: formData.deliveryZip || routeDrop.zip || "",
        }),
      };

      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const hasCompany =
        !!formData.pickupBusinessName || !!formData.deliveryBusinessName;

      // Prefer customer details from quote API, fall back to form
      const customerDetails: any = (quote as any)?.customerDetails ?? {};
      const customerFirstName =
        customerDetails.first_name ||
        customerDetails.firstName ||
        formData.firstName;
      const customerLastName =
        customerDetails.last_name ||
        customerDetails.lastName ||
        formData.lastName;
      const customerEmail =
        quote.customer_email || customerDetails.email || formData.email;
      const customerPhone =
        customerDetails.phone ||
        customerDetails.phone_number ||
        customerDetails.mobile ||
        formData.phone;

      // Determine earliest pickup date for shipment:
      // 1. Use explicitly selected pickup date from the booking flow (if set)
      // 2. Fallback to the value that exists on the original quote (if present)
      // 3. Otherwise let it be null so the API can validate
      const earliestPickupDateFromForm = formData.pickupDate || "";
      const earliestPickupDateFromQuote =
        (quote as any)?.shipment?.updated_at ||
        (quote as any)?.updated_at ||
        "";

      const resolvedEarliestPickupDate =
        earliestPickupDateFromForm || earliestPickupDateFromQuote || null;

      // Normalize transport type to simple backend-friendly values: "open" or "enclosed"
      const rawTransportType =
        quote.transport_type ||
        quote.pricing?.tiers?.priority?.transport_type ||
        quote.pricing_tiers?.priority?.transport_type ||
        (quoteDetails as any)?.transportType ||
        "";

      const normalizedTransportType = /enclosed/i.test(rawTransportType)
        ? "enclosed"
        : "open";

      const payload = {
        quote_id: quote._id || effectiveQuoteId,
        quote_number: quote.quote_number || "",
        selected_tier: selectedTier,
        vehicle: vehiclePayload,
        shipment: {
          earliest_pickup_date: resolvedEarliestPickupDate,
          transport_type: normalizedTransportType,
          service_type: "door_to_door",
          insurance_included: true,
        },
        pickup: {
          location_type: formData.pickupLocationType || "private_residence",
          address: pickupAddress,
          business_info: { name: formData.pickupBusinessName || fullName || "N/A" },
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
          stripe_payment_method_id: formData.stripePaymentMethodId || "",
          cardholder_name: formData.cardholderName || fullName,
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
          electronic_signature: formData.cardholderName,
          ip_address: getClientIPAddress(),
          accepted_at: new Date().toISOString(),
        },
        customer: {
          first_name: customerFirstName,
          last_name: customerLastName,
          email: customerEmail,
          phone: customerPhone,
          company_name:
            formData.pickupBusinessName || formData.deliveryBusinessName || "",
          account_type: hasCompany ? "business" : "personal",
        },
      };

      const response = await createNewShipmentBooking(payload);

      // Guard against completely missing response
      if (!response) {
        throw new Error("No response received from booking service");
      }

      const status = (response as any)?.status;
      const hasError = (response as any)?.error;

      if (status !== 200 || hasError) {
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
        <BookingHeader quoteId={quoteId || mappedQuoteData?.quoteId || ""} />
        <SuccessStep 
          formData={formData} 
          quoteId={quoteId || mappedQuoteData?.quoteId || ""}
          tier={selectedTier}
          price={price}
          vehicle={
            mappedQuoteData?.vehicle ?? {
              year: 0,
              make: "",
              model: "",
            }
          }
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <BookingHeader quoteId={quoteId || mappedQuoteData?.quoteId || ""} />
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
                    quoteData={
                      mappedQuoteData ?? {
                        quoteId: quoteId || "",
                        vehicle: { year: 0, make: "", model: "" },
                        origin: { addLine1: "", addLine2: "", city: "", state: "", zip: "" },
                        destination: { addLine1: "", addLine2: "", city: "", state: "", zip: "" },
                        distance: "",
                        transitTime: "",
                        earliestPickup: "",
                        condition: "",
                        personalItems: "",
                        transportType: "Open",
                        serviceType: "Door to door",
                        prices: { saver: 0, priority: 0, rush: 0 },
                      }
                    }
                    selectedTier={selectedTier}
                    onTierChange={setSelectedTier}
                    onNext={nextStep}
                    getQuoteDetails={refreshQuoteDetails}
                  />
                )}
                {currentStep === 2 && (
                  <PickupStep
                    formData={formData}
                    updateFormData={updateFormData}
                    onNext={nextStep}
                    onBack={prevStep}
                    quoteData={
                      mappedQuoteData ?? {
                        quoteId: quoteId || "",
                        quote_id: quoteId || "",
                        vehicle: { year: 0, make: "", model: "" },
                        origin: { addLine1:"", addLine2:"", city: "",
                          state: "", zip: "",
                        latitude: undefined,
                        longitude: undefined },
                        destination: { addLine1:"", addLine2:"", city: "",
                          state: "", zip: "",
                        latitude: undefined,
                        longitude: undefined },
                        distance: "",
                        transitTime: "",
                        earliestPickup: "",
                        condition: "",
                        personalItems: "",
                        transportType: "Open",
                        serviceType: "Door to door",
                        prices: { saver: 0, priority: 0, rush: 0 },
                      }
                    }
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
                    quoteData={
                      mappedQuoteData ?? {
                        quoteId: quoteId || "",
                        quote_id: quoteId || "",
                        vehicle: { year: 0, make: "", model: "" },
                        origin: { addLine1:"", addLine2:"", city: "", state: "", zip: "",
                          latitude: undefined,
                          longitude: undefined
                         },
                        destination: { addLine1:"", addLine2:"", city: "",
                          state: "", zip: "",
                        latitude: undefined,
                        longitude: undefined },
                        distance: "",
                        transitTime: "",
                        earliestPickup: "",
                        condition: "",
                        personalItems: "",
                        transportType: "Open",
                        serviceType: "Door to door",
                        prices: { saver: 0, priority: 0, rush: 0 },
                      }
                    }
                    tier={selectedTier}
                    price={price}
                  />
                )}
                {currentStep === 1 && (
                  <BookShipmentStep
                    formData={formData}
                    updateFormData={updateFormData}
                    onBack={prevStep}
                    onSubmit={handleSubmit}
                    tier={selectedTier}
                    price={price}
                    onTierChange={(newTier, newPrice) => setSelectedTier(newTier)}
                    quoteData={
                      mappedQuoteData ?? {
                        quoteId: quoteId || "",
                        quote_id: quoteId || "",
                        vehicle: { year: 0, make: "", model: "" },
                        origin: { addLine1:"", addLine2:"",
                          city: "", state: "", zip: "",
                          latitude: undefined,
                          longitude: undefined },
                        destination: { addLine1:"", addLine2:"",
                          city: "", state: "", zip: "",
                          latitude: undefined,
                          longitude: undefined },
                        distance: "",
                        transitTime: "",
                        earliestPickup: "",
                        condition: "",
                        personalItems: "",
                        transportType: "Open",
                        serviceType: "Door to door",
                        prices: { saver: 0, priority: 0, rush: 0 },
                        customer: { name: "", email: "", phone: "" },
                      }
                    }
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
