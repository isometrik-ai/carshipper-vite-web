"use client";

import { useCallback, useEffect, useState } from "react";
import { ReadonlyURLSearchParams, useParams, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import type { Vehicle as ShippingVehicle } from "@/components/ui/dialogs/EditVehicleDialog";
// import { ContactStep } from "@/components/booking/ContactStep";
const BookingHeader = dynamic(() =>
  import("@/components/booking/BookingHeader").then((mod) => mod.BookingHeader)
);
const BookingProgress = dynamic(() =>
  import("@/components/booking/BookingProgress").then((mod) => mod.BookingProgress)
);
const ShippingMethodStep = dynamic(() =>
  import("@/components/booking/ShippingMethodStep").then((mod) => mod.ShippingMethodStep)
);
const PickupStep = dynamic(() =>
  import("@/components/booking/PickupStep").then((mod) => mod.PickupStep)
);
const DeliveryStep = dynamic(() =>
  import("@/components/booking/DeliveryStep").then((mod) => mod.DeliveryStep)
);
const BookShipmentStep = dynamic(() =>
  import("@/components/booking/BookShipmentStep").then((mod) => mod.BookShipmentStep)
);
// import { BookingSummary } from "@/components/booking/BookingSummary";
const SuccessStep = dynamic(() =>
  import("@/components/booking/SuccessStep").then((mod) => mod.SuccessStep)
);
import { QuoteGetDetailsAPI } from "@/services/quote-services";
import { createNewShipmentBooking } from "@/services/booking-services";
import { toast } from "sonner";
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
  pickupLatitude?: number;
  pickupLongitude?: number;
  pickupCity: string;
  pickupState: string;
  pickupZip: string;
  pickupDate: string;
  pickupTimeWindow: string;
  pickupNotes: string;
  pickupLocationType: string;
  pickupBusinessName: string;
  pickupBuyerNumber: string;
  pickupLotNumber: string;
  pickupVinNumber: string;
  pickupVehicleColor: string;
  pickupContactName: string;
  pickupContactPhone: string;
  pickupBackupPhone: string;
  pickupWillBePresent: boolean;
  // Delivery Details
  deliveryBuyerNumber: string;
  deliveryLotNumber: string;
  deliveryVinNumber: string;
  deliveryVehicleColor: string;
  deliveryAddress: string;
  deliveryLatitude?: number;
  deliveryLongitude?: number;
  deliveryCity: string;
  deliveryState: string;
  deliveryZip: string;
  deliveryNotes: string;
  deliveryLocationType: string;
  deliveryBusinessName: string;
  deliveryContactName: string;
  deliveryContactPhone: string;
  deliveryBackupPhone: string;
  deliveryWillBePresent: boolean;
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
  pickupLatitude: undefined,
  pickupLongitude: undefined,
  pickupCity: "Beverly Hills",
  pickupState: "CA",
  pickupZip: "90210",
  pickupDate: "",
  pickupTimeWindow: "morning",
  pickupNotes: "",
  pickupLocationType: "residence",
  pickupBusinessName: "",
  pickupBuyerNumber: "",
  pickupLotNumber: "",
  pickupVinNumber: "",
  pickupVehicleColor: "",
  pickupContactName: "",
  pickupContactPhone: "",
  pickupBackupPhone: "",
  pickupWillBePresent: true,
  deliveryAddress: "",
  deliveryBuyerNumber: "",
  deliveryLotNumber: "",
  deliveryVinNumber: "",
  deliveryVehicleColor: "",
  deliveryLatitude: undefined,
  deliveryLongitude: undefined,
  deliveryCity: "Duluth",
  deliveryState: "GA",
  deliveryZip: "30097",
  deliveryNotes: "",
  deliveryLocationType: "residence",
  deliveryBusinessName: "",
  deliveryContactName: "",
  deliveryContactPhone: "",
  deliveryBackupPhone: "",
  deliveryWillBePresent: true,
  agreedToTerms: false,
  smsUpdates: true,
};

// Quote data mapped from API response
type BookingQuoteData = {
  quoteId: string;
  quote_id: string;
  vehicle: { year: number; make: string; model: string };
  vehicles: Array<{
    year: number;
    make: string;
    model: string;
    is_running?: boolean;
    type?: string;
    color?: string;
    personal_items_weight?: string;
    condition?: string;
  }>;
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
  const drop = route.deliveries?.[0] ?? {};
  const customerDetails = (quote as any)?.customerDetails ?? {};
  const toCoordinate = (value: unknown): number | undefined => {
    if (value === null || value === undefined || value === "") return undefined;
    const parsed = typeof value === "number" ? value : Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  };
  const pickupLatitude =
    toCoordinate(pickup.lat) ?? toCoordinate(pickup.latitude);
  const pickupLongitude =
    toCoordinate(pickup.lng) ?? toCoordinate(pickup.longitude);
  const dropLatitude =
    toCoordinate(drop.lat) ?? toCoordinate(drop.latitude);
  const dropLongitude =
    toCoordinate(drop.lng) ?? toCoordinate(drop.longitude);

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

  const vehiclesFromQuote = Array.isArray(quote.vehicle) ? quote.vehicle : [];
  const vehicle = vehiclesFromQuote[0] ?? {};

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
    vehicles: vehiclesFromQuote.map((v: any) => ({
      year: v?.year ?? 0,
      make: v?.make ?? "",
      model: v?.model ?? "",
      is_running: v?.is_running,
      type: v?.type,
      color: v?.color ?? "",
      personal_items_weight: v?.personal_items_weight,
      condition: v?.condition,
    })),
    origin: {
      addLine1: pickup.addLine1 ?? "",
      addLine2: pickup.addLine2 ?? "",
      city: pickup.city ?? "",
      state: pickup.state ?? "",
      zip: pickup.zip ?? "",
      latitude: pickupLatitude,
      longitude: pickupLongitude,
    },
    destination: {
      addLine1: drop.addLine1 ?? "",
      addLine2: drop.addLine2 ?? "",
      city: drop.city ?? "",
      state: drop.state ?? "",
      zip: drop.zip ?? "",
      latitude: dropLatitude,
      longitude: dropLongitude,
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
  // { id: 5, name: "Thank You", shortName: "Done" },
];

const normalizeLocationType = (locationType?: string): string => {
  const type = (locationType || "").toLowerCase().trim();
  const locationTypeMap: Record<string, string> = {
    residence: "private_residence",
    private_residence: "private_residence",
    auction: "auction",
    dealership: "dealership",
    commercial: "commercial_or_industrial",
    commercial_or_industrial: "commercial_or_industrial",
    seaport: "seaport",
    storage: "tow_yard_or_storage",
    tow_yard_or_storage: "tow_yard_or_storage",
    mechanic: "mechanic_or_body_shop",
    mechanic_or_body_shop: "mechanic_or_body_shop",
    other: "other",
  };

  return locationTypeMap[type] || "private_residence";
};

const mapPersonalItemsForBooking = (personalItems: string): string => {
  const normalized = (personalItems || "").toLowerCase().trim();
  if (normalized.includes("none") || normalized.includes("less than 100")) return "0-100";
  if (normalized.includes("100-150")) return "100-150";
  if (normalized.includes("150-200")) return "150-200";
  if (normalized.includes("more than 200")) return "200+";
  return "0-100";
};

const toCoordinate = (value: unknown): number | null => {
  if (value === null || value === undefined || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const mapQuoteVehiclesToShippingVehicles = (
  vehicles: BookingQuoteData["vehicles"]
): ShippingVehicle[] => {
  return (vehicles || []).map((v, index) => ({
    id: String(index + 1),
    year: Number(v?.year) || 0,
    make: v?.make || "",
    model: v?.model || "",
    type: v?.type || "SUV",
    operational: v?.is_running ?? !/inoperable/i.test(v?.condition || ""),
    color: (v?.color || "").trim(),
    personalItems: (() => {
      const weight = (v?.personal_items_weight || "").toLowerCase().trim();
      if (weight === "100-150") return "100-200";
      if (weight === "150-200") return "150-200";
      if (weight === "200+" || weight.includes("more")) return "200+";
      return "0-100";
    })(),
  }));
};

export default function BookingPage(props: { quoteId: string; initialTier?: "saver" | "priority" | "rush" }) {
  const quoteId: string | undefined = useParams().quoteId as string;
  const searchParams: ReadonlyURLSearchParams = useSearchParams();

  const initialTier = (searchParams.get("tier") as "saver" | "priority" | "rush") || "priority";

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState<"saver" | "priority" | "rush">(initialTier);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState<any | null>(null);
  const [selectedVehicles, setSelectedVehicles] = useState<ShippingVehicle[]>([]);
  const mappedQuoteData = mapQuoteDetailsToBookingQuoteData(quoteDetails);

  useEffect(() => {
    if (!mappedQuoteData?.vehicles?.length) return;
    setSelectedVehicles((prev) => {
      if (prev.length > 0) return prev;
      return mapQuoteVehiclesToShippingVehicles(mappedQuoteData.vehicles);
    });
  }, [mappedQuoteData?.quoteId, JSON.stringify(mappedQuoteData?.vehicles || [])]);

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
      const routeDrop: any = quote.route?.deliveries?.[0] ?? {};

      const vehicleFromQuote: any[] = Array.isArray(quote.vehicle)
        ? quote.vehicle
        : [];

      const vehiclePayload =
        selectedVehicles.length > 0
          ? selectedVehicles.map((v) => ({
              year: Number(v.year),
              make: v.make,
              model: v.model,
              type: v.type || "SUV",
              condition: "runs_and_drives", //v.operational === false ? "inoperable" : "runs_and_drives",
              personal_items_weight: mapPersonalItemsForBooking(v.personalItems || ""),
              ...((v.color || "").trim() ? { color: (v.color || "").trim() } : {}),
            }))
          : vehicleFromQuote.length > 0
          ? vehicleFromQuote.map((v: any) => ({
              year: v.year,
              make: v.make,
              model: v.model,
              type: v.type || "SUV",
              condition: "runs_and_drives", //|| v.condition || "runs_and_drives",
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
              }
            ];

      const pickupAddress = {
        street: formData.pickupAddress || routePickup.addLine1 || "",
        city: formData.pickupCity || routePickup.city || "",
        state: formData.pickupState || routePickup.state || "",
        zip: formData.pickupZip || routePickup.zip || "",
        addLine1: formData.pickupAddress || routePickup.addLine1 || "",
        addLine2: "",
        latitude:
          toCoordinate(formData.pickupLatitude) ??
          toCoordinate(routePickup.lat) ??
          toCoordinate(routePickup.latitude),
        longitude:
          toCoordinate(formData.pickupLongitude) ??
          toCoordinate(routePickup.lng) ??
          toCoordinate(routePickup.longitude),
        // full: formatFullAddress({
        //   addLine1: formData.pickupAddress || routePickup.addLine1 || "",
        //   addLine2: "",
        //   city: formData.pickupCity || routePickup.city || "",
        //   state: formData.pickupState || routePickup.state || "",
        //   zip: formData.pickupZip || routePickup.zip || "",
        // }),
      };

      const deliveryAddress = {
        street: formData.deliveryAddress || routeDrop.addLine1 || "",
        city: formData.deliveryCity || routeDrop.city || "",
        state: formData.deliveryState || routeDrop.state || "",
        zip: formData.deliveryZip || routeDrop.zip || "",
        addLine1: formData.deliveryAddress || routeDrop.addLine1 || "",
        addLine2: "",
        latitude:
          toCoordinate(formData.deliveryLatitude) ??
          toCoordinate(routeDrop.lat) ??
          toCoordinate(routeDrop.latitude),
        longitude:
          toCoordinate(formData.deliveryLongitude) ??
          toCoordinate(routeDrop.lng) ??
          toCoordinate(routeDrop.longitude),
        // full: formatFullAddress({
        //   addLine1: formData.deliveryAddress || routeDrop.addLine1 || "",
        //   addLine2: "",
        //   city: formData.deliveryCity || routeDrop.city || "",
        //   state: formData.deliveryState || routeDrop.state || "",
        //   zip: formData.deliveryZip || routeDrop.zip || "",
        // }),
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

      const stripPhoneHyphens = (value?: string) =>
        (value || "").replace(/-/g, "").trim();

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
          location_type: normalizeLocationType(formData.pickupLocationType),
          address: pickupAddress,
          business_info: {
            name: formData.pickupBusinessName || fullName || "N/A",
            ...(formData.pickupBuyerNumber?.trim()
              ? { buyer_number: formData.pickupBuyerNumber.trim() }
              : {}),
            ...(formData.pickupLotNumber?.trim()
              ? { lot_number: formData.pickupLotNumber.trim() }
              : {}),
            ...(formData.pickupVinNumber?.trim()
              ? { vn_number: formData.pickupVinNumber.trim() }
              : {}),
            ...(formData.pickupVehicleColor?.trim()
              ? { color: formData.pickupVehicleColor.trim() }
              : {}),
          },
          contact: {
            name: formData.pickupContactName || fullName,
            phone: stripPhoneHyphens(
              formData.pickupContactPhone || formData.phone
            ),
            ...(formData.pickupBackupPhone?.trim()
              ? { backup_phone: stripPhoneHyphens(formData.pickupBackupPhone) }
              : {}),
            ...(formData.email?.trim() ? { email: formData.email.trim() } : {}),
            ...(formData.pickupNotes?.trim()
              ? { special_notes: formData.pickupNotes.trim() }
              : {}),
            present_at_pickup: formData.pickupWillBePresent,
          },
        },
        delivery: {
          location_type: normalizeLocationType(formData.deliveryLocationType),
          address: deliveryAddress,
          business_info: {
            name: formData.deliveryBusinessName || fullName || "N/A",
            ...(formData.deliveryBuyerNumber?.trim()
            ? { buyer_number: formData.deliveryBuyerNumber.trim() }
            : {}),
          ...(formData.deliveryLotNumber?.trim()
            ? { lot_number: formData.deliveryLotNumber.trim() }
            : {}),
          ...(formData.deliveryVinNumber?.trim()
            ? { vn_number: formData.deliveryVinNumber.trim() }
            : {}),
          ...(formData.deliveryVehicleColor?.trim()
            ? { color: formData.deliveryVehicleColor.trim() }
            : {}),
          },
          contact: {
            name: formData.deliveryContactName || fullName,
            phone: stripPhoneHyphens(
              formData.deliveryContactPhone || formData.phone
            ),
            ...(formData.deliveryBackupPhone?.trim()
              ? {
                  backup_phone: stripPhoneHyphens(formData.deliveryBackupPhone),
                }
              : {}),
            ...(formData.email?.trim() ? { email: formData.email.trim() } : {}),
            ...(formData.deliveryNotes?.trim()
              ? { special_notes: formData.deliveryNotes.trim() }
              : {}),
            present_at_delivery: formData.deliveryWillBePresent,
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
          charge_now: true,
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
          phone: stripPhoneHyphens(customerPhone),
          company_name:
            formData.pickupBusinessName || formData.deliveryBusinessName || "",
          account_type: "business"//hasCompany ? "business" : "personal",
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
      nextStep();
    } catch (error) {
      console.error("Booking submission failed", error);
      toast.error("Unable to complete booking", {
        description: "Please try again in a moment.",
      });
    }
  };
  
  // if (isSubmitted) {
  //   return (
  //     <div className="min-h-screen bg-muted">
  //       <BookingHeader quoteId={quoteId || mappedQuoteData?.quoteId || ""} />
  //       <SuccessStep 
  //         formData={formData} 
  //         quoteId={quoteId || mappedQuoteData?.quoteId || ""}
  //         tier={selectedTier}
  //         price={price}
  //         vehicle={
  //           mappedQuoteData?.vehicle ?? {
  //             year: 0,
  //             make: "",
  //             model: "",
  //           }
  //         }
  //         vehicles={mappedQuoteData?.vehicles ?? []}
  //       />
  //     </div>
  //   );
  // }

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
                        vehicles: [],
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
                    onVehiclesChange={setSelectedVehicles}
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
                        vehicles: [],
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
                        vehicles: [],
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
                {currentStep === 4 && (
                  <BookShipmentStep
                    formData={formData}
                    updateFormData={updateFormData}
                    onBack={prevStep}
                    onSubmit={handleSubmit}
                    tier={selectedTier}
                    price={price}
                    onTierChange={(newTier, newPrice) => setSelectedTier(newTier)}
                    selectedVehicles={selectedVehicles}
                    quoteData={
                      mappedQuoteData ?? {
                        quoteId: quoteId || "",
                        quote_id: quoteId || "",
                        vehicle: { year: 0, make: "", model: "" },
                        vehicles: [],
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
