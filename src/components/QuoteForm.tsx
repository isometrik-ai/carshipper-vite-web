'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, ArrowRight, ArrowLeft, Plus, MapPin, Check, X, Truck, Shield, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { VehicleSelector, getVehicleDisplayName, isVehicleComplete } from "./VehicleSelector";
import type { Vehicle } from "@/types/Vehicle";
import { VEHICLE_TYPE_OPTIONS } from "@/constants/vehicleForm";
import { getAllVehicleColorsList, getAllVehiclesTypesList } from "@/services/booking-services";
import { useQuoteForm } from "@/api/quoteForm";
import { getIcon } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";
import AddressAutocomplete from "./custom-google-searchbar";
import { DEFAULT_COUNTRY_CODE } from "@/lib/config";
import { getFormattedAddressFromGooglePlace } from "@/lib/global";
import { CreateNewQuotePostAPI } from "@/services/quote-services";
import { CreateNewContactPostAPI, CreateNewLeadPostAPI, LeadsGetDetailsAPI } from "@/services/leads-service";
import CustomPhoneNumberInputField from "@/components/ui/customPhoneNumber/phoneInput";
import { emailValidator } from "@/lib/helpers";
import { getSafeQuoteInfoRoute } from "@/shared/routes";

interface QuoteFormProps {
  defaultOrigin?: string;
  defaultDestination?: string;
}

interface DropLocation {
  id: string;
  location: string;
  displayLocation?: string;
  vehicleIds: string[];
  city?: string;
  state?: string;
  zip?: string;
  lat?: number;
  lng?: number;
}

type Step = "vehicles" | "running" | "pickup" | "drops" | "transport" | "timeframe" | "contact";

const mapPersonalItemsForQuotePayload = (personalItems: string): string => {
  const normalized = (personalItems || "").toLowerCase().trim();
  if (normalized.includes("none") || normalized.includes("less than 100")) return "0-100";
  if (normalized.includes("100-150")) return "100-150";
  if (normalized.includes("150-200")) return "150-200";
  if (normalized.includes("more than 200")) return "200+";
  return "0-100";
};

/** API often returns i18n objects like `{ en: "Flatbed" }`; plain strings are also supported. */
function pickLocalizedOrPlainString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.en === "string") return o.en.trim();
    const first = Object.values(o).find((v) => typeof v === "string");
    if (typeof first === "string") return first.trim();
  }
  return "";
}

function normalizeVehicleColorApiResponse(apiResponse: unknown): string[] {
  const body = (apiResponse as { data?: unknown })?.data ?? apiResponse;
  let list: unknown[] = [];
  if (Array.isArray(body)) list = body;
  else if (body && typeof body === "object") {
    const o = body as Record<string, unknown>;
    if (Array.isArray(o.data)) list = o.data as unknown[];
    else if (Array.isArray(o.colors)) list = o.colors as unknown[];
    else if (Array.isArray(o.items)) list = o.items as unknown[];
  }
  return list
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") {
        const r = item as Record<string, unknown>;
        const s = (r.name ?? r.colorName ?? r.color ?? r.label ?? r.title ?? "") as string;
        return String(s).trim();
      }
      return "";
    })
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

function normalizeVehicleTypesApiResponse(apiResponse: unknown): string[] {
  if (apiResponse == null) return [];
  const body = (apiResponse as { data?: unknown })?.data ?? apiResponse;
  let list: unknown[] = [];
  if (Array.isArray(body)) list = body;
  else if (body && typeof body === "object") {
    const o = body as Record<string, unknown>;
    if (Array.isArray(o.data)) list = o.data as unknown[];
    else if (Array.isArray(o.vehicleTypes)) list = o.vehicleTypes as unknown[];
    else if (Array.isArray(o.types)) list = o.types as unknown[];
    else if (Array.isArray(o.items)) list = o.items as unknown[];
  }
  return list
    .map((item) => {
      if (typeof item === "string") return item.trim();
      if (item && typeof item === "object") {
        const r = item as Record<string, unknown>;
        const fromTypeName = pickLocalizedOrPlainString(r.typeName);
        const fallback = String(
          r.name ?? r.type ?? r.vehicleType ?? r.label ?? r.title ?? r.equipmentsShortCode ?? ""
        ).trim();
        return (fromTypeName || fallback).trim();
      }
      return "";
    })
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
}

const emptyVehicle = (): Vehicle => ({
  id: Date.now().toString(),
  year: 0,
  make: "",
  model: "",
  operational: null,
  vin: "",
  vinLookupLoading: false,
  color: "",
  personalItems: "None or less than 100 lbs.",
  type: "SUV",
});

const QuoteFormLoadingSkeleton = () => {
  return (
    <div
      className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden min-h-[36rem]"
      role="status"
      aria-label="Loading quote form"
    >
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-36 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
};

const QuoteForm = ({ defaultOrigin = "", defaultDestination = "" }: QuoteFormProps) => {
  const { data, isLoading: isConfigLoading } = useQuoteForm();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("vehicles");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const requestAbortRef = useRef<AbortController | null>(null);

  // Extract form config with fallbacks
  const formConfig = useMemo(() => {
    const config = data?.data?.form_config;
    return {
      progressBadgeText: config?.progress_badge_text || "⚡ Quote in 30 minutes",
      footerMessage: config?.footer_message || "No credit card required. Expert-verified quote in 30 minutes.",
      successTitle: config?.success_title || "Quote request submitted!",
      successDescription: config?.success_description || "We'll get back to you within 30 minutes with your personalized quote.",
      successToastTitle: config?.success_toast_title || "Quote request submitted!",
      successToastDescription: config?.success_toast_description || "We'll get back to you within 30 minutes with your personalized quote.",
      stepCounterFormat: config?.step_counter_format || "Step {current} of {total}",
      deliveryLocationLabelSingle: config?.delivery_location_label_single || "Delivery Location",
      deliveryLocationLabelMultiple: config?.delivery_location_label_multiple || "Delivery #{index}",
      steps: config?.steps || [],
      timeframeOptions: config?.timeframe_options || [],
      transportTypeOptions: config?.transport_type_options || [],
      buttonTexts: config?.button_texts || {
        back_button: "Back",
        next_button: "Next",
        submit_button: "Get My Quote",
        submitting_text: "Submitting...",
        add_vehicle_button: "Add Another Vehicle",
        add_drop_location_button: "Add Another Delivery Location",
        vin_lookup_button: "Lookup",
      },
      runningStatusOptions: config?.running_status_options || [],
      vehicleFieldConfig: config?.vehicle_field_config,
    };
  }, [data]);

  // Transform vehicle_data from Strapi format to Record<string, string[]>
  const vehicleData = useMemo(() => {
    if (!data?.data?.form_config?.vehicle_data || data.data.form_config.vehicle_data.length === 0) {
      return undefined; // Will use fallback in VehicleSelector
    }

    const vehicleDataMap: Record<string, string[]> = {};
    data.data.form_config.vehicle_data.forEach((make) => {
      if (make.make_name && make.models && make.models.length > 0) {
        vehicleDataMap[make.make_name] = make.models.map((model) => model.model_name);
      }
    });

    return vehicleDataMap;
  }, [data]);

  // Get step order from API or use default
  const STEPS = useMemo(() => {
    if (formConfig.steps.length > 0) {
      return formConfig.steps.map((step) => step.step_key as Step);
    }
    return ["vehicles", "running", "pickup", "drops", "transport", "timeframe", "contact"] as Step[];
  }, [formConfig.steps]);

  // Get current step config
  const currentStepConfig = useMemo(() => {
    return formConfig.steps.find((step) => step.step_key === currentStep);
  }, [formConfig.steps, currentStep]);

  // Vehicles
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "1",
      year: 0,
      make: "",
      model: "",
      operational: null,
      vin: "",
      vinLookupLoading: false,
      color: "",
      personalItems: "None or less than 100 lbs.",
      type: "SUV",
    },
  ]);

  const [vehicleColorOptions, setVehicleColorOptions] = useState<string[]>([]);
  const [vehicleColorsLoading, setVehicleColorsLoading] = useState(false);
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState<string[]>([...VEHICLE_TYPE_OPTIONS]);
  const [vehicleTypesLoading, setVehicleTypesLoading] = useState(false);

  // useEffect(() => {
  //   let cancelled = false;
  //   (async () => {
  //     try {
  //       const [colorRes, typesRes] = await Promise.all([
  //         getAllVehicleColorsList(),
  //         getAllVehiclesTypesList(),
  //       ]);
  //       const colorRaw = (colorRes as { data?: unknown })?.data ?? colorRes;
  //       const typesRaw = (typesRes as { data?: unknown })?.data ?? typesRes;
  //       if (!cancelled) {
  //         setVehicleColorOptions(normalizeVehicleColorApiResponse(colorRaw));
  //         setVehicleTypeOptions(normalizeVehicleTypesApiResponse(typesRaw));
  //       }
  //     } catch {
  //       if (!cancelled) {
  //         setVehicleColorOptions([]);
  //         setVehicleTypeOptions([]);
  //       }
  //     } finally {
  //       if (!cancelled) {
  //         setVehicleColorsLoading(false);
  //         setVehicleTypesLoading(false);
  //       }
  //     }
  //   })();
  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);

  // Locations
  const [pickupLocation, setPickupLocation] = useState(defaultOrigin);
  const [pickupDisplayLocation, setPickupDisplayLocation] = useState(defaultOrigin);
  const [pickupCity, setPickupCity] = useState("");
  const [pickupState, setPickupState] = useState("");
  const [pickupZip, setPickupZip] = useState("");
  const [pickupLat, setPickupLat] = useState<number | null>(null);
  const [pickupLng, setPickupLng] = useState<number | null>(null);
  const [dropLocations, setDropLocations] = useState<DropLocation[]>([
    { id: "1", location: defaultDestination, vehicleIds: [] }
  ]);

  // Transport options
  const [transportType, setTransportType] = useState<"open" | "enclosed" | null>(null);
  const [timeframe, setTimeframe] = useState("");

  // Contact info
  const [contactInfo, setContactInfo] = useState<{
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    phone_country_code?: string;
  }>({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    phone_country_code: undefined,
  });
  const [contactErrors, setContactErrors] = useState<{
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  }>({});

  const currentStepIndex = STEPS.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  // Format step counter text
  const stepCounterText = useMemo(() => {
    return formConfig.stepCounterFormat
      .replace("{current}", (currentStepIndex + 1).toString())
      .replace("{total}", STEPS.length.toString());
  }, [formConfig.stepCounterFormat, currentStepIndex, STEPS.length]);

  const addVehicle = useCallback(() => {
    setVehicles([...vehicles, emptyVehicle()]);
  }, [vehicles]);


  const removeVehicle = useCallback((id: string) => {
    if (vehicles.length > 1) {
      setVehicles(vehicles.filter(v => v.id !== id));
      // Also remove from drop locations
      setDropLocations(drops => drops.map(d => ({
        ...d,
        vehicleIds: d.vehicleIds.filter(vid => vid !== id)
      })));
    }
  }, [vehicles]);

  const updateVehicle = useCallback((id: string, updates: Partial<Vehicle>) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updates } : v));
  }, [vehicles]);

  const addDropLocation = useCallback(() => {
    setDropLocations([...dropLocations, { id: Date.now().toString(), location: "", vehicleIds: [] }]);
  }, [dropLocations]);

  const removeDropLocation = useCallback((id: string) => {
    if (dropLocations.length > 1) {
      setDropLocations(dropLocations.filter(d => d.id !== id));
    }
  }, [dropLocations]);

  const updateDropLocation = useCallback((id: string, updates: Partial<DropLocation>) => {
    setDropLocations(dropLocations.map(d => d.id === id ? { ...d, ...updates } : d));
  }, [dropLocations]);

  const canProceed = useCallback((): boolean => {
    switch (currentStep) {
      case "vehicles":
        return vehicles.every(v => isVehicleComplete(v));
      case "running":
        return vehicles.every((v) => v.operational !== null);
      case "pickup":
        return (
          pickupLocation.trim().length > 0 &&
          pickupCity.trim().length > 0 &&
          pickupState.trim().length > 0 &&
          pickupZip.trim().length > 0
        );
      case "drops":
        return dropLocations.every(
          (d) =>
            d.location.trim().length > 0 &&
            (d.city || "").trim().length > 0 &&
            (d.state || "").trim().length > 0 &&
            (d.zip || "").trim().length > 0
        );
      case "transport":
        return transportType !== null;
      case "timeframe":
        return timeframe !== "";
      case "contact":
        return (
          contactInfo?.first_name?.trim()?.length > 0 &&
          contactInfo?.last_name?.trim()?.length > 0 &&
          contactInfo?.email?.trim()?.length > 0 &&
          // contactInfo?.phone?.trim()?.length > 0 &&
          !contactErrors?.email &&
          !contactErrors?.phone
        );
      default:
        return true;
    }
  }, [
    currentStep,
    vehicles,
    pickupLocation,
    pickupCity,
    pickupState,
    pickupZip,
    dropLocations,
    transportType,
    timeframe,
    contactInfo,
    contactErrors.email,
    contactErrors.phone,
  ]);

  const nextStep = useCallback(() => {
    const idx = STEPS.indexOf(currentStep);
    if (idx < STEPS.length - 1) {
      setCurrentStep(STEPS[idx + 1]);
    }
  }, [currentStep, STEPS]);

  const prevStep = useCallback(() => {
    const idx = STEPS.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(STEPS[idx - 1]);
    }
  }, [currentStep, STEPS]);

  const handleBackClick = () => {
    if (requestAbortRef?.current) {
      requestAbortRef?.current?.abort();
    }
    setIsSubmitting(false);
    prevStep();
  };

  const toRadians = (value: number): number => (value * Math.PI) / 180;

  const calculateDistanceMiles = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number => {
    const R = 3958.8; // Earth radius in miles
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
          Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleSubmit = async () => {
    // Guard: ensure required contact fields are present + valid before starting loader
    if (currentStep === "contact") {
      const nextErrors: typeof contactErrors = {};

      if (!contactInfo?.first_name?.trim()) nextErrors.first_name = "First name is required";
      if (!contactInfo?.last_name?.trim()) nextErrors.last_name = "Last name is required";

      if (!contactInfo?.email?.trim()) {
        nextErrors.email = "Email is required";
      } else if (!emailValidator(contactInfo?.email?.trim())) {
        nextErrors.email = "Please enter a valid email address";
      }

      // If phone is marked required by config, enforce it
      const phoneFieldRequired =
        currentStepConfig?.fields?.some(
          (f) => f.field_key === "phone" && f.is_required
        ) ?? false;
      if (phoneFieldRequired) {
        if (!contactInfo?.phone?.trim()) nextErrors.phone = "Phone number is required";
        else if (contactErrors?.phone) nextErrors.phone = contactErrors?.phone;
      }

      if (Object.keys(nextErrors)?.length > 0) {
        setContactErrors((prev) => ({ ...prev, ...nextErrors }));
        return;
      }
    }

    if (!canProceed()) return;
    const controller = new AbortController();
    requestAbortRef.current = controller;
    setIsSubmitting(true);

    try {
      const defaultCountryName: string =
        DEFAULT_COUNTRY_CODE ?
          DEFAULT_COUNTRY_CODE?.toLowerCase() === "us" ?
            "USA" : (DEFAULT_COUNTRY_CODE || "")
          : "";

      const deliveries = dropLocations.map((drop) => {
        const vehicle_indices =
          drop.vehicleIds.length > 0
            ? drop.vehicleIds
                .map((vid) => vehicles.findIndex((v) => v.id === vid))
                .filter((idx) => idx >= 0)
            : vehicles.map((_, idx) => idx); // if no explicit assignment, assume all vehicles

        const distanceForDelivery =
          pickupLat != null &&
          pickupLng != null &&
          drop.lat != null &&
          drop.lng != null
            ? Math.round(calculateDistanceMiles(pickupLat, pickupLng, drop.lat, drop.lng))
            : 0;

        return {
          zip: drop.zip || "",
          city: drop.city || "",
          state: drop.state || "",
          addLine1: drop.location || "",
          addLine2: "",
          country: defaultCountryName,
          latitude: drop.lat ?? null,
          longitude: drop.lng ?? null,
          distance_miles: distanceForDelivery,
          vehicle_indices,
        };
      });

      // For multi-drop quotes, send total miles across all delivery legs.
      const distanceMiles = deliveries.reduce((totalDistance, delivery) => {
        const currentDistance = Number(delivery.distance_miles) || 0;
        return totalDistance + currentDistance;
      }, 0);

      const normalizeLeadPickupTimeframe = (value: string) => {
        const raw = (value || "").trim().toLowerCase();
        if (!raw) return "";
        if (raw.includes("asap") || raw.includes("today") || raw.includes("tomorrow")) {
          return "ASAP, today or tomorrow";
        }
        if (raw.includes("1-2") || raw.includes("1 to 2")) {
          return "Within the next 1-2 weeks";
        }
        if (raw.includes("3-4") || raw.includes("3 to 4")) {
          return "Within the next 3-4 weeks";
        }
        if (raw.includes("month")) {
          return "More than 1 month out";
        }
        return value;
      };
      
      const payload = {
        pickup_zip: pickupZip,
        // delivery_zip: primaryDrop?.zip || "",
        distance_miles: distanceMiles,
        transport_type: transportType === "enclosed" ? "Enclosed Transport" : "Open Transport",
        customer_email: contactInfo.email,
        customer_first_name: contactInfo.first_name || "",
        customer_last_name: contactInfo.last_name || "",
        customer_phone: contactInfo.phone || "",
        customer_country_code: contactInfo.phone_country_code || "",
        vehicles: vehicles.map((v) => ({
          year: Number(v.year),
          make: v.make,
          model: v.model,
          is_running: v.operational ?? true,
          vin: (v.vin || "").trim(),
          type: (v.type || "").trim() || "SUV",
          color: (v.color || "").trim(),
          personal_items_weight: mapPersonalItemsForQuotePayload(v.personalItems || ""),
        })),
        pickup_timeframe: (normalizeLeadPickupTimeframe(timeframe)|| "").trim(),
        pickup_city: pickupCity,
        pickup_state: pickupState,
        pickup_addLine1: pickupLocation || "",
        pickup_addLine2: "",
        pickup_country: defaultCountryName,
        // delivery_city: primaryDrop?.city || "",
        // delivery_state: primaryDrop?.state || "",
        // delivery_addLine1: primaryDrop?.location || "",
        // delivery_addLine2: "",
        // delivery_country: defaultCountryName,
        pickup_latitude: pickupLat ?? null,
        pickup_longitude: pickupLng ?? null,
        // delivery_latitude: primaryDrop?.lat ?? null,
        // delivery_longitude: primaryDrop?.lng ?? null,
        delivery: deliveries,
      };

      const contactPayload = {
        email: (contactInfo.email || "").trim(),
        first_name: (contactInfo.first_name || "").trim(),
        last_name: (contactInfo.last_name || "").trim(),
        phones: contactInfo.phone
          ? [
              {
                phone_number: (contactInfo.phone || "").replace(/\D/g, ""),
                phone_isd_code: contactInfo.phone_country_code || "",
                label: "mobile",
                is_primary: true,
              },
            ]
          : [],
      };

      // const createdContact = await CreateNewContactPostAPI(contactPayload, controller.signal);
      // const contactId =
      //   createdContact?.id ||
      //   createdContact?.contact_id ||
      //   createdContact?.contactId ||
      //   createdContact?.data?.id ||
      //   createdContact?.data?.contact_id ||
      //   createdContact?.data?.contactId ||
      //   createdContact?.data?.data?.id ||
      //   createdContact?.data?.data?.contact_id ||
      //   createdContact?.data?.data?.contactId;

      // if (!contactId) {
      //   throw new Error("Contact ID not returned from contact API");
      // }

      // // const contactId = "7d5c9438-de4d-484a-a1ef-373f564b1a9e";
      // const countryCode = (DEFAULT_COUNTRY_CODE || "US").toUpperCase();
      // const selectedTransportType = transportType === "enclosed" ? "Enclosed Transport" : "Open Transport";

      // const selectedPickupTimeframe = normalizeLeadPickupTimeframe(timeframe || "");
      // const normalizeLeadMakeModel = (make: string, model: string) => {
      //   const combined = `${make || ""} ${model || ""}`.replace(/\s+/g, " ").trim();
      //   if (!combined) return "";
      //   // Leads custom-field options currently use "Alfa Rome ..." spellings.
      //   if (/^alfa romeo\s+/i.test(combined)) {
      //     return combined.replace(/^alfa romeo\s+/i, "Alfa Rome ");
      //   }
      //   return combined;
      // };
      // const vehicleNameById = new Map(
      //   vehicles.map((v) => [v.id, normalizeLeadMakeModel(v.make, v.model)])
      // );

      // const dropAddressItems = dropLocations.map((drop) => {
      //   const mappedVehicleIds = drop.vehicleIds.length > 0 ? drop.vehicleIds : vehicles.map((v) => v.id);
      //   return {
      //     field_id: "da017d88-b328-401b-a30b-3f2f26d1dcfc",
      //     sub_fields: [
      //       {
      //         field_id: "f6f9a199-db6d-4251-8745-9709eb9c063a",
      //         value: {
      //           address_line1: drop.location || "",
      //           city: drop.city || "",
      //           state: drop.state || "",
      //           country: countryCode,
      //           zip: drop.zip || "",
      //           lat: drop.lat ?? null,
      //           long: drop.lng ?? null,
      //         },
      //       },
      //       {
      //         field_id: "5ed03685-ce80-4960-b78a-14e9de3d044e",
      //         items: mappedVehicleIds.map((vehicleId) => ({
      //           field_id: "45541cab-7239-4790-b003-542e8daa37cf",
      //           value: vehicleNameById.get(vehicleId) || "",
      //         })),
      //       },
      //     ],
      //   };
      // });

      // const leadCarsItems = vehicles.map((v) => ({
      //   field_id: "17e17a75-e6c3-45ea-92fa-e0a5c8846f4b",
      //   sub_fields: [
      //     { field_id: "5dd48ef7-fc7b-45d5-8023-dc4858d650a5", value: Number(v.year) || null },
      //     {
      //       field_id: "0e4c4ebd-d635-4f17-824d-d94cba90a951",
      //       value: normalizeLeadMakeModel(v.make, v.model),
      //     },
      //     { field_id: "8cad15bc-cd12-4dbd-8c92-9ed5221b5504", value: v.vin || "" },
      //     { field_id: "cc3da005-85fb-4641-89e5-8bfdcaad5b20", value: v.operational ?? true },
      //   ],
      // }));

      // const leadPayload = {
      //   stage_id: "ff7c54aa-cb47-403d-afd9-cd39bb42b514",
      //   client_id: String(contactId),
      //   name: "carshippers",
      //   custom_fields: [
      //     {
      //       field_id: "756cf9d8-6d95-488b-9193-20ae9249f2f0",
      //       value: selectedTransportType,
      //     },
      //     {
      //       field_id: "b3b462ee-216c-43bd-a0e7-5bcced0f76e3",
      //       value: selectedPickupTimeframe,
      //     },
      //     {
      //       field_id: "3aae6937-cdc2-405b-9904-02ef315cccbf",
      //       items: dropAddressItems,
      //     },
      //     {
      //       field_id: "743c6d5e-a995-4b1b-92e5-f290fcc11172",
      //       value: {
      //         address_line1: pickupLocation || "",
      //         city: pickupCity || "",
      //         state: pickupState || "",
      //         country: countryCode,
      //         zip: pickupZip || "",
      //         lat: pickupLat ?? null,
      //         long: pickupLng ?? null,
      //       },
      //     },
      //     {
      //       field_id: "25c1ed96-8956-49e6-863a-c78aef910c73",
      //       items: leadCarsItems,
      //     },
      //   ],
      // };

      // const createdLead = await CreateNewLeadPostAPI(leadPayload, controller.signal);
      // const leadId =
      //   createdLead?.lead_id ||
      //   createdLead?.leadId ||
      //   createdLead?.id ||
      //   createdLead?.data?.data?.lead_id ||
      //   createdLead?.data?.data?.leadId ||
      //   createdLead?.data?.data?.id ||
      //   createdLead?.data?.lead_id ||
      //   createdLead?.data?.leadId ||
      //   createdLead?.data?.id;

      // if (!leadId) {
      //   throw new Error("Lead ID not returned from lead API");
      // }
      // // const leadId = "e58ca908-9f79-43e9-b90e-496bdfc2f838";
      // const leadDetails = await LeadsGetDetailsAPI(String(leadId), controller.signal);
      // const verifiedLeadId =
      //   leadDetails?.lead_id ||
      //   leadDetails?.leadId ||
      //   leadDetails?.id ||
      //   leadDetails?.data?.data?.lead_id ||
      //   leadDetails?.data?.data?.leadId ||
      //   leadDetails?.data?.data?.id;

      // if (!verifiedLeadId || String(verifiedLeadId) !== String(leadId)) {
      //   throw new Error("Lead details API failed or lead ID mismatch");
      // }

      const response = await CreateNewQuotePostAPI(
        {
          ...payload,
          // lead_id: String(leadId),
        },
        controller.signal
      );

      const quoteId =
        response?.quote_id ||
        response?.quoteId ||
        response?.data?.quote_id ||
        response?.data?.quoteId;

      if (!quoteId) {
        throw new Error("Quote ID not returned from API");
      }

      toast.success(formConfig.successToastTitle, {
        description: formConfig.successToastDescription,
      });

      const quoteRoute = getSafeQuoteInfoRoute(String(quoteId));

      if (quoteRoute) {
        toast.success("Quote is created successfully", {
          description: "Please check you email for further quotation details",
        });
        router.push(quoteRoute);
      } else {
        toast.error("Invalid quote ID");
      }
    } catch (error: any) {
      console.error("Failed to create quote", error);
      toast.error("Unable to create quote", {
        description: "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
      requestAbortRef.current = null;
    }
  };

  // Get field value helper
  const getFieldValue = useCallback((fieldKey: string, stepKey: string): string | null => {
    const step = formConfig.steps.find(s => s.step_key === stepKey);
    const field = step?.fields.find(f => f.field_key === fieldKey);
    return field?.label || field?.placeholder || null;
  }, [formConfig.steps]);

  // Show loading state if config is loading
  if (isConfigLoading && !data) {
    return (
      <QuoteFormLoadingSkeleton />
    );
  }

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const handleContactChange = (key: string, value: string) => {
    setContactInfo((prev) => ({ ...prev, [key]: value }));

    // Minimal email validation: don't block typing, just set an error string.
    if (key === "email") {
      const ok = !value || emailValidator(value);
      setContactErrors((prev) => ({
        ...prev,
        email: ok ? "" : "Please enter a valid email address",
      }));
    }

    // Clear required-field errors as user types
    if (key === "first_name" || key === "last_name") {
      if (value.trim().length > 0) {
        setContactErrors((prev) => ({ ...prev, [key]: "" }));
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden"
    >
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-success/10 text-success text-xs font-semibold px-2 py-1 rounded-full">
            {formConfig.progressBadgeText}
          </span>
          <span className="text-sm text-muted-foreground">
            {stepCounterText}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Vehicles */}
        {currentStep === "vehicles" && (
          <motion.div
            key="vehicles"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-2 text-center">
              {currentStepConfig?.step_title || "Vehicle Details"}
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              {currentStepConfig?.step_description || "Enter VIN to auto-fill or select year, make & model"}
            </p>

            <div className="space-y-6 max-h-[30vh] overflow-y-auto pr-1">
              {vehicles.map((vehicle, index) => (
                <VehicleSelector
                  key={vehicle.id}
                  vehicle={vehicle}
                  index={index}
                  showRemove={vehicles.length > 1}
                  onUpdate={(updates) => updateVehicle(vehicle.id, updates)}
                  onRemove={() => removeVehicle(vehicle.id)}
                  vehicleColorOptions={vehicleColorOptions}
                  vehicleColorsLoading={vehicleColorsLoading}
                  vehicleTypeOptions={vehicleTypeOptions}
                  vehicleTypesLoading={vehicleTypesLoading}
                  vehicleFieldConfig={formConfig.vehicleFieldConfig || {
                    id: 0,
                    vehicle_label_format: "Vehicle {index}",
                    vin_label: "VIN Number (optional - auto-fills details)",
                    vin_placeholder: "Enter 17-character VIN",
                    vin_lookup_button: "Lookup",
                    manual_select_divider: "or select manually",
                    year_label: "Year",
                    year_placeholder: "Select year",
                    make_model_label: "Make & Model",
                    make_model_placeholder: "Search make & model...",
                  }}
                  vehicleData={vehicleData}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-4"
              onClick={addVehicle}
            >
              <Plus className="w-4 h-4 mr-2" />
              {formConfig.buttonTexts.add_vehicle_button}
            </Button>
          </motion.div>
        )}

        {/* Step 2: Running Status */}
        {currentStep === "running" && (
          <motion.div
            key="running"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              {currentStepConfig?.step_title || "Vehicle Condition"}
            </h2>

            <div className="space-y-6 max-h-[52vh] overflow-y-auto pr-1">
              {vehicles.map((vehicle, index) => {
                const runningQuestion = currentStepConfig?.running_question_text || "Is it running?";
                const runningOptions = formConfig.runningStatusOptions.length > 0
                  ? formConfig.runningStatusOptions
                  : [
                    { id: 1, value: true, label: "Running", icon_name: "checkCircle" },
                    { id: 2, value: false, label: "Not Running", icon_name: "x" },
                  ];

                return (
                  <div key={vehicle.id} className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-3">
                      {getVehicleDisplayName(vehicle, index)} - {runningQuestion}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {runningOptions.map((option) => {
                        const isSelected = vehicle.operational === option.value;
                        const runsAndDrives = option.value === true;
                        const IconComponent = getIcon(option.icon_name) as LucideIcon;

                        return (
                          <button
                            key={option.id || option.label}
                            type="button"
                            onClick={() =>
                              updateVehicle(vehicle.id, {
                                operational: option.value as boolean | null,
                              })
                            }
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                              ${isSelected
                                ? runsAndDrives
                                  ? 'border-success bg-success/10 text-success'
                                  : 'border-destructive bg-destructive/10 text-destructive'
                                : 'border-border hover:border-muted-foreground'}`}
                          >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center
                              ${isSelected
                                ? runsAndDrives
                                  ? 'bg-success text-success-foreground'
                                  : 'bg-destructive text-destructive-foreground'
                                : 'bg-muted'}`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <span className="font-medium">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 3: Pickup Location */}
        {currentStep === "pickup" && (
          <motion.div
            key="pickup"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-2 text-center">
              {currentStepConfig?.step_title || "Pickup Location"}
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              {currentStepConfig?.step_description || "Enter the city or zipcode of your pickup location"}
            </p>
            <div className="relative">
              {/* <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /> */}
              {/* <Input
                placeholder={getFieldValue("pickup_location", "pickup") || "e.g., Dallas, TX or 10007"}
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="pl-10 h-14 text-lg"
              /> */}
            <AddressAutocomplete
              key={DEFAULT_COUNTRY_CODE}
              countryCode={DEFAULT_COUNTRY_CODE}
              AddressListContainerClassName="AddressListContainer"
              googleSearchBarMainContainerClassName="w-full bg-text-input-primary AddressListContainer h-[49px] relative  z-[9]"
              searchInputClassName="primaryFontNormalWeight bg-text-input-primary text-[14px] !pl-3 w-full h-[49px]"
              showSearchIcon={false}
              mainContainerHeight="49px"
              placeValue={pickupDisplayLocation || pickupLocation || ""}
              showSearchPointNameReactNode={true}
              searchPointNameReactNode={
                <MapPin className="ml-2 w-5 h-5 text-muted-foreground" />
              }
              placeholderText={getFieldValue("pickup_location", "pickup") || "e.g., Dallas, TX or 10007"}
              clearAllValues={() => {
                setPickupLocation("");
                setPickupDisplayLocation("");
                setPickupCity("");
                setPickupState("");
                setPickupZip("");
                setPickupLat(null);
                setPickupLng(null);
              }}
              getSelectedAddressDetails={(
                coordinates: any,
                place: any,
                fullAddress: string
              ) => {
                const formatted = getFormattedAddressFromGooglePlace(place);

                const line1 = formatted?.addLine1 || fullAddress || "";
                const city  = formatted?.city || "";
                const state = formatted?.stateCode || formatted?.state || "";
                const zip   = formatted?.zipCode || "";
                const display = fullAddress || "";
                setPickupDisplayLocation(display);
                setPickupLocation(line1);
                setPickupCity(city);
                setPickupState(state);
                setPickupZip(zip);
                if (coordinates?.lat != null && coordinates?.lng != null) {
                  setPickupLat(coordinates.lat);
                  setPickupLng(coordinates.lng);
                }
              }}
            />
            {(!pickupCity || !pickupState || !pickupZip) && (pickupDisplayLocation || pickupLocation) ? (
              <p className="text-sm text-destructive mt-1">
                Please select a full address including city, state, and ZIP from the suggestions.
              </p>
            ) : null}
            </div>
          </motion.div>
        )}

        {/* Step 4: Drop Locations */}
        {currentStep === "drops" && (
          <motion.div
            key="drops"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-2 text-center">
              {currentStepConfig?.step_title || `Delivery Location${dropLocations.length > 1 ? 's' : ''}`}
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              {vehicles.length > 1
                ? (currentStepConfig?.dynamic_description || "Add multiple delivery locations if vehicles go to different places")
                : (currentStepConfig?.step_description || "Enter where you want your vehicle delivered")}
            </p>

            <div className="space-y-4">
              {dropLocations.map((drop, index) => (
                <div key={drop.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Label className="text-sm font-medium">
                        {dropLocations.length > 1
                          ? formConfig.deliveryLocationLabelMultiple.replace("{index}", (index + 1).toString())
                          : formConfig.deliveryLocationLabelSingle}
                      </Label>
                      <div className="relative mt-1">
                        {/* <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /> */}
                        {/* <Input
                          placeholder={getFieldValue("drop_location", "drops") || "e.g., Los Angeles, CA or 90210"}
                          value={drop.location}
                          onChange={(e) => updateDropLocation(drop.id, { location: e.target.value })}
                          className="pl-9"
                        /> */}
                        <AddressAutocomplete
                          key={DEFAULT_COUNTRY_CODE}
                          countryCode={DEFAULT_COUNTRY_CODE}
                          AddressListContainerClassName="AddressListContainer"
                          googleSearchBarMainContainerClassName="w-full bg-text-input-primary AddressListContainer h-[49px] relative  z-[9]"
                          searchInputClassName="primaryFontNormalWeight bg-text-input-primary text-[14px] !pl-3 w-full h-[49px]"
                          showSearchIcon={false}
                          mainContainerHeight="49px"
                          placeValue={drop.displayLocation || drop.location || ""}
                          showSearchPointNameReactNode={true}
                          searchPointNameReactNode={
                            <MapPin className="ml-2 w-5 h-5 text-muted-foreground" />
                          }
                          placeholderText={getFieldValue("drop_location", "drops") || "e.g., Los Angeles, CA or 90210"}
                          clearAllValues={() => {
                            updateDropLocation(drop.id, {
                              displayLocation: "",
                              location: "",
                              city: "",
                              state: "",
                              zip: "",
                              lat: null,
                              lng: null,
                            });
                          }}
                          getSelectedAddressDetails={(
                            coordinates: any,
                            place: any,
                            fullAddress: string
                          ) => {
                            const formatted = getFormattedAddressFromGooglePlace(place);

                            const line1 = formatted?.addLine1 || fullAddress || "";
                            const city  = formatted?.city || "";
                            const state = formatted?.stateCode || formatted?.state || "";
                            const zip   = formatted?.zipCode || "";
                            const display = fullAddress || "";

                            updateDropLocation(drop.id, {
                              displayLocation: display, 
                              location: line1,
                              city,
                              state,
                              zip,
                              lat: coordinates?.lat,
                              lng: coordinates?.lng,
                            });
                          }}
                        />
                        {(!drop.city || !drop.state || !drop.zip) && (drop.displayLocation || drop.location) ? (
                          <p className="text-sm text-destructive mt-1">
                            Please select a full address including city, state, and ZIP from the suggestions.
                          </p>
                        ) : null}
                      </div>
                    </div>
                    {dropLocations.length > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-6 text-destructive hover:text-destructive"
                        onClick={() => removeDropLocation(drop.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    ) : null}
                  </div>

                  {vehicles.length > 1 && dropLocations.length > 1 ? (
                    <div className="mt-3">
                      <Label className="text-xs text-muted-foreground">
                        {currentStepConfig?.vehicle_assignment_question || "Which vehicles to this location?"}
                      </Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {vehicles.map((v, vIndex) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => {
                              const newIds = drop.vehicleIds.includes(v.id)
                                ? drop.vehicleIds.filter(id => id !== v.id)
                                : [...drop.vehicleIds, v.id];
                              updateDropLocation(drop.id, { vehicleIds: newIds });
                            }}
                            className={`px-3 py-1 text-sm rounded-full border transition-all
                              ${drop.vehicleIds.includes(v.id)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-border hover:border-primary'}`}
                          >
                            {getVehicleDisplayName(v, vIndex)}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
{/* 
            {vehicles.length > 1 ? (
              <Button
                type="button"
                variant="outline"
                className="w-full mt-4"
                onClick={addDropLocation}
              >
                <Plus className="w-4 h-4 mr-2" />
                {formConfig.buttonTexts.add_drop_location_button}
              </Button>
            ) : null} */}
          </motion.div>
        )}

        {/* Step 5: Transport Type */}
        {currentStep === "transport" && (
          <motion.div
            key="transport"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              {currentStepConfig?.step_title || "Transportation Type"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {formConfig.transportTypeOptions.map((option) => {
                const isSelected = transportType === option.value;
                const IconComponent = getIcon(option.icon_name) as LucideIcon;

                return (
                  <button
                    key={option.id || option.value}
                    type="button"
                    onClick={() => setTransportType(option.value as "open" | "enclosed")}
                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3
                      ${isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'}`}
                  >
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center
                      ${isSelected ? 'bg-primary/10' : 'bg-muted'}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <span className="font-semibold">{option.label}</span>
                    {option.description ? (
                      <span className="text-xs text-muted-foreground text-center">
                        {option.description}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Step 6: Timeframe */}
        {currentStep === "timeframe" && (
          <motion.div
            key="timeframe"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              {currentStepConfig?.step_title || "Pickup Timeframe"}
            </h2>

            <RadioGroup value={timeframe} onValueChange={setTimeframe}>
              <div className="space-y-3">
                {formConfig.timeframeOptions.map((option) => (
                  <label
                    key={option.id || option.value}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${timeframe === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'}`}
                  >
                    <RadioGroupItem value={option.value} className="mr-4" />
                    <span className="font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        )}

        {/* Step 7: Contact Info */}
        {currentStep === "contact" && (
          <motion.div
            key="contact"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-2 text-center">
              {currentStepConfig?.step_title || "Your Contact Info"}
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              {currentStepConfig?.step_description || "We'll send your quote to this email"}
            </p>

            <div className="space-y-4">
              {currentStepConfig?.fields.map((field) => {
                const fieldId = `contact-${field.field_key}`;
                const isRequired = field.is_required;
                const fieldValue = contactInfo[field.field_key as keyof typeof contactInfo] || "";

                return (
                  <div key={field.id || field.field_key}>
                    <Label htmlFor={fieldId}>
                      {field.label || field.field_key}
                      {!isRequired ? <span className="text-muted-foreground"> (optional)</span> : null}
                    </Label>
                    {field.field_key === "phone" ? (
                      <div className="mt-1">
                        <CustomPhoneNumberInputField
                          intlInputFieldId={fieldId}
                          intlInputFieldName="phone_number"
                          customIntlTelInputContainer="
                          flex
                          intl-tel-input separate-dial-code w-full
                          border border-input rounded-md bg-background
                          text-sm shadow-sm
                          focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1
                         "
                         customIntlTelInputWrapper="
                          w-full bg-transparent border-0
                          px-3 py-2
                          text-sm text-foreground
                          placeholder:text-muted-foreground
                          focus-visible:outline-none
                         "
                          phoneNumberValue={contactInfo.phone}
                          phoneNumberDefaultValue={contactInfo.phone}
                          useSeparateDialCode={true}
                          useNationalMode={false}
                          country={DEFAULT_COUNTRY_CODE}
                          onPhoneNumberChanges={(value: any) => {
                            const mobile = value?.mobile ?? "";
                            const countryCode = value?.countryCode ?? "";
                            handleContactChange("phone", mobile);
                            handleContactChange("phone_country_code", countryCode);

                            // Minimal validation (no RHF here): show error if user typed something invalid.
                            if (!mobile) {
                              setContactErrors((prev) => ({ ...prev, phone: "" }));
                              return;
                            }

                            if (value?.isValid === false) {
                              setContactErrors((prev) => ({
                                ...prev,
                                phone: "Please enter a valid phone number",
                              }));
                            } else {
                              setContactErrors((prev) => ({ ...prev, phone: "" }));
                            }
                          }}
                        />
                        {contactErrors.phone ? (
                          <p className="text-sm text-destructive mt-1">
                            {contactErrors.phone}
                          </p>
                        ) : null}
                      </div>
                    ) : (
                      <Input
                        id={fieldId}
                        type={field.field_key === "email" ? "email" : "text"}
                        placeholder={field.placeholder || ""}
                        value={fieldValue}
                        name={field.field_key}
                        onChange={(e) => handleContactChange(field.field_key, e.target.value)}
                        className={`mt-1 ${
                          (field.field_key === "email" && contactErrors.email) ||
                          (field.field_key === "first_name" && contactErrors.first_name) ||
                          (field.field_key === "last_name" && contactErrors.last_name)
                            ? "border-destructive"
                            : ""
                        }`}
                        required={isRequired}
                      />
                    )}
                    {field.field_key === "first_name" && contactErrors.first_name ? (
                      <p className="text-sm text-destructive mt-1">{contactErrors.first_name}</p>
                    ) : null}
                    {field.field_key === "last_name" && contactErrors.last_name ? (
                      <p className="text-sm text-destructive mt-1">{contactErrors.last_name}</p>
                    ) : null}
                    {field.field_key === "email" && contactErrors.email ? (
                      <p className="text-sm text-destructive mt-1">{contactErrors.email}</p>
                    ) : null}
                    {field.helper_text ? (
                      <p className="text-xs text-muted-foreground mt-1">{field.helper_text}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-8">
        {currentStepIndex > 0 ? (
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={handleBackClick}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {formConfig.buttonTexts.back_button}
          </Button>
        ) : null}

        {currentStep === "contact" ? (
          <Button
            type="button"
            variant="hero"
            size="lg"
            className="flex-1"
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-success-foreground border-t-transparent rounded-full"
                />
                {formConfig.buttonTexts.submitting_text}
              </span>
            ) : (
              <>
                {formConfig.buttonTexts.submit_button}
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            variant="hero"
            size="lg"
            className={currentStepIndex === 0 ? "w-full" : "flex-1"}
            onClick={nextStep}
            disabled={!canProceed()}
          >
            {formConfig.buttonTexts.next_button}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>

      <p className="text-sm text-muted-foreground text-center mt-4 flex items-center justify-center gap-2">
        <Lock className="w-4 h-4" />
        {formConfig.footerMessage}
      </p>
      <style jsx global>{`
        .AddressListContainer {
          ul {
            position: absolute;
            left: 0;
            background: var(--white_color);
            font-family: var(--primary-font);
            font-weight:500;
            font-size: 14px;
            box-shadow: -8px 8px 12px var(--background-secondary);
            text-transform: capitalize;
            color: var(--text-active-loads-primary);
            width: 80%;
            height: 100px;
            overflow-y: auto; 
            z-index: 99;
            border: 1px solid var(--tabs-border-color);
            border-radius: 5px;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default QuoteForm;
