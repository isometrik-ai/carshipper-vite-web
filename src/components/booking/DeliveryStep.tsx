import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  MapPin, Home, Gavel, Car, Building2, Ship, Warehouse, Wrench, Plus,
  ArrowRight, ArrowLeft, User, Phone, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingFormData } from "@/containers/BookingPage";
import { cn } from "@/lib/utils";
import { OrderSummaryPanel } from "./OrderSummaryPanel";
import CustomPhoneNumberInputField from "@/components/ui/customPhoneNumber/phoneInput";
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE, PREFERRED_COUNTRY_CODES } from "@/lib/config";
import AddressAutocomplete from "../custom-google-searchbar";
import { getFormattedAddressFromGooglePlace } from "@/lib/global";

const deliverySchema = z.object({
  deliveryLocationType: z.string().min(1, "Please select a location type"),
  deliveryAddress: z.string().min(5, "Please enter a valid address"),
  deliveryCity: z.string().min(2, "City is required"),
  deliveryState: z.string().min(2, "State is required"),
  deliveryZip: z.string().min(5, "Please enter a valid ZIP code"),
  deliveryBusinessName: z.string().optional(),
  deliveryBuyerNumber: z.string().optional(),
  deliveryLotNumber: z.string().optional(),
  deliveryContactName: z.string().min(2, "Contact name is required"),
  deliveryContactPhone: z.string().min(10, "Phone number is required"),
  deliveryBackupPhone: z.string().optional(),
  deliveryNotes: z.string().optional(),
  deliveryWillBePresent: z.boolean(),
});

type DeliveryFormData = z.infer<typeof deliverySchema>;

interface DeliveryStepProps {
  formData: BookingFormData;
  updateFormData: (data: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  quoteData: {
    vehicle: { year: number; make: string; model: string };
    vehicles?: Array<{ year: number; make: string; model: string; is_running?: boolean }>;
    origin: { addLine1: string; addLine2: string; city: string; state: string; zip: string };
    destination: { addLine1: string; addLine2: string; city: string; state: string; zip: string };
    earliestPickup: string;
    transportType: string;
  };
  tier: "saver" | "priority" | "rush";
  price: number;
}

const locationTypes = [
  { id: "residence", label: "Private Residence", icon: Home },
  { id: "auction", label: "Auction", icon: Gavel },
  { id: "dealership", label: "Dealership", icon: Car },
  { id: "commercial", label: "Commercial or Industrial", icon: Building2 },
  { id: "seaport", label: "Seaport", icon: Ship },
  { id: "storage", label: "Tow Yard or Storage", icon: Warehouse },
  { id: "mechanic", label: "Mechanic or Body Shop", icon: Wrench },
  { id: "other", label: "Other", icon: Plus },
];

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

export function DeliveryStep({ formData, updateFormData, onNext, onBack, quoteData, tier, price }: DeliveryStepProps) {
  const [locationType, setLocationType] = useState(formData?.deliveryLocationType || "residence");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      deliveryLocationType: formData.deliveryLocationType ?? "residence",
      deliveryAddress: formData.deliveryAddress ?? "",
      deliveryCity: formData.deliveryCity ?? "",
      deliveryState: formData.deliveryState ?? "",
      deliveryZip: formData.deliveryZip ?? "",
      deliveryBusinessName: formData.deliveryBusinessName ?? "",
      deliveryContactName: `${formData.firstName ?? ""} ${formData.lastName ?? ""}`,
      deliveryContactPhone: formData.phone ?? "",
      deliveryBackupPhone: formData.deliveryBackupPhone ?? "",
      deliveryNotes: formData.deliveryNotes ?? "",
      deliveryWillBePresent: formData.deliveryWillBePresent ?? true,
    },
  });

  const deliveryState = watch("deliveryState");
  const deliveryWillBePresent = watch("deliveryWillBePresent");

  const onSubmit = (data: DeliveryFormData) => {
    updateFormData({
      deliveryLocationType: data.deliveryLocationType,
      deliveryAddress: data.deliveryAddress,
      deliveryCity: data.deliveryCity,
      deliveryState: data.deliveryState,
      deliveryZip: data.deliveryZip,
      deliveryBusinessName: data.deliveryBusinessName || "",
      deliveryContactName: data.deliveryContactName,
      deliveryContactPhone: data.deliveryContactPhone,
      deliveryBackupPhone: data.deliveryBackupPhone || "",
      deliveryNotes: data.deliveryNotes,
      deliveryWillBePresent: data.deliveryWillBePresent,
      deliveryBuyerNumber: data.deliveryBuyerNumber || "",
      deliveryLotNumber: data.deliveryLotNumber || "",
    });
    onNext();
  };

  const showBusinessFields = ["auction", "dealership", "commercial", "storage", "mechanic"].includes(locationType);
  // Synchronize local state with formData if formData.deliveryLocationType changes
  useEffect(() => {
    if (formData.deliveryLocationType && formData.deliveryLocationType !== locationType) {
      setLocationType(formData.deliveryLocationType);
    }
  }, [formData.deliveryLocationType]);

  return (
    <div className="grid lg:grid-cols-[380px,1fr] gap-6">
      {/* Left: Order Summary */}
      <div className="hidden lg:block">
        <OrderSummaryPanel quoteData={quoteData} tier={tier} price={price} />
      </div>

      {/* Right: Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Delivery Location */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="bg-muted/50 px-6 py-4 flex items-center gap-3">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Delivery Location</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Location Type Grid */}
          <div>
            <Label className="text-base mb-3 block">Delivering to *</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {locationTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    setLocationType(type.id);
                    setValue("deliveryLocationType", type.id);
                  }}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-left",
                    locationType === type.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <type.icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Street Address */}
          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Street Address *</Label>
            <Input
              id="deliveryAddress"
              placeholder="54 RBI Colony, 1st Main"
              {...register("deliveryAddress")}
              className={`${errors.deliveryAddress ? "border-destructive" : ""} hidden`}
            />
            <AddressAutocomplete
              key={DEFAULT_COUNTRY_CODE}
              countryCode={DEFAULT_COUNTRY_CODE}
              AddressListContainerClassName="AddressListContainer"
              googleSearchBarMainContainerClassName="w-full bg-text-input-primary AddressListContainer h-[49px] relative  z-[9]"
              searchInputClassName="primaryFontNormalWeight bg-text-input-primary text-[14px] !pl-3 w-full h-[49px]"
              showSearchIcon={true}
              mainContainerHeight="49px"
              placeValue={formData.deliveryAddress || ""}
              placeholderText="Search delivery address"
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
                const latitude =
                  coordinates?.lat ??
                  formatted?.lat ??
                  null;
                const longitude =
                  coordinates?.lng ??
                  coordinates?.long ??
                  formatted?.long ??
                  null;
                const deliveryLatNumber =
                  latitude === null || latitude === undefined || latitude === ""
                    ? undefined
                    : Number(latitude);
                const deliveryLngNumber =
                  longitude === null || longitude === undefined || longitude === ""
                    ? undefined
                    : Number(longitude);

                // Auto-fill RHF fields so Zod can validate them
                setValue("deliveryAddress", line1, { shouldDirty: true, shouldValidate: true });
                setValue("deliveryCity",    city,  { shouldDirty: true, shouldValidate: true });
                setValue("deliveryState",   state, { shouldDirty: true, shouldValidate: true });
                setValue("deliveryZip",     zip,   { shouldDirty: true, shouldValidate: true });
                updateFormData({
                  deliveryAddress: line1,
                  deliveryCity: city,
                  deliveryState: state,
                  deliveryZip: zip,
                  deliveryLatitude:
                    Number.isFinite(deliveryLatNumber) ? deliveryLatNumber : undefined,
                  deliveryLongitude:
                    Number.isFinite(deliveryLngNumber) ? deliveryLngNumber : undefined,
                });
              }}
            />
            {errors.deliveryAddress && (
              <p className="text-sm text-destructive">{errors.deliveryAddress.message}</p>
            )}
          </div>

          {/* City, State, Zip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="deliveryCity">City *</Label>
              <Input
                id="deliveryCity"
                {...register("deliveryCity")}
                className={errors.deliveryCity ? "border-destructive" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label>State *</Label>
              <Select
                value={deliveryState}
                onValueChange={(value) => setValue("deliveryState", value)}
              >
                <SelectTrigger className={errors.deliveryState ? "border-destructive" : ""}>
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryZip">ZIP Code *</Label>
              <Input
                id="deliveryZip"
                {...register("deliveryZip")}
                className={errors.deliveryZip ? "border-destructive" : ""}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Business Information (conditional) */}
      {/* {showBusinessFields && (
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="bg-muted/50 px-6 py-4 flex items-center gap-3">
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Business Information</h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="deliveryBusinessName">Business Name</Label>
              <Input
                id="deliveryBusinessName"
                placeholder="Enter business name"
                {...register("deliveryBusinessName")}
              />
            </div>
          </div>
        </div>
      )} */}

      {/* Business Information (conditional) */}
      {showBusinessFields && (
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="bg-muted/50 px-6 py-4 flex items-center gap-3">
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Business Information</h2>
          </div>

          <div className="p-6 space-y-4">
          <div className="space-y-2">
              <Label htmlFor="deliveryBusinessName">Business Name</Label>
              <Input
                id="deliveryBusinessName"
                placeholder="Enter business name"
                {...register("deliveryBusinessName")}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buyerNumber">Buyer Number (Optional)</Label>
                <Input
                  id="buyerNumber"
                  placeholder="Enter buyer number"
                  {...register("deliveryBuyerNumber")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lotNumber">Lot Number (Optional)</Label>
                <Input
                  id="lotNumber"
                  placeholder="Enter lot number"
                  {...register("deliveryLotNumber")}
                />
              </div>
            </div>

            {/* <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vinNumber">VIN Number (Optional)</Label>
                <Input
                  id="vinNumber"
                  placeholder="Enter VIN number"
                  {...register("vinNumber")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vehicleColor">Vehicle Color (Optional)</Label>
                <Input
                  id="vehicleColor"
                  placeholder="Enter vehicle color"
                  {...register("vehicleColor")}
                />
              </div>
            </div> */}
          </div>
        </div>
      )}
      {/* Contact Information */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="bg-muted/50 px-6 py-4 flex items-center gap-3">
          <User className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="deliveryWillBePresent"
              checked={deliveryWillBePresent}
              onCheckedChange={(checked) => setValue("deliveryWillBePresent", checked as boolean)}
            />
            <Label htmlFor="deliveryWillBePresent" className="cursor-pointer">
              I will be present at delivery
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryContactName">Contact Name *</Label>
            <Input
              id="deliveryContactName"
              placeholder="John Doe"
              {...register("deliveryContactName")}
              className={errors.deliveryContactName ? "border-destructive" : ""}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deliveryContactPhone">Contact Phone *</Label>
              {/* Hidden input to register with react-hook-form / zod */}
              <input type="hidden" {...register("deliveryContactPhone")} />
              <CustomPhoneNumberInputField
                name="deliveryContact.phoneNumber"
                countryCodeName="deliveryContact.countryCode"
                defaultCountryCode={DEFAULT_COUNTRY_CODE}
                required
                id="deliveryContactPhone"
                customPhoneNumberFieldStructure="w-full"
                customPhoneNumberFieldWrapper="w-full"
                intlInputFieldId="deliveryContactPhone"
                phoneNumberValue={formData.deliveryContactPhone || ""}
                phoneNumberDefaultValue={formData.deliveryContactPhone || ""}
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
                useSeparateDialCode={true}
                useNationalMode={false}
                onPhoneNumberChanges={(value) => {
                  const mobile = value?.mobile ?? "";

                  // update RHF value but DO NOT trigger schema validation yet
                  setValue("deliveryContactPhone", mobile, {
                    shouldValidate: false,
                    shouldDirty: true,
                  });

                  // manual live validation based on intl-tel
                  if (!mobile) {
                    // user cleared the field → clear live error, Zod will handle "required" on submit
                    clearErrors("deliveryContactPhone");
                    return;
                  }

                  if (!value?.isValid) {
                    setError("deliveryContactPhone", {
                      type: "manual",
                      message: "Please enter a valid phone number",
                    });
                  } else {
                    clearErrors("deliveryContactPhone");
                  }
                }}
                initialCountry={DEFAULT_COUNTRY_CODE?.toUpperCase()}
                onlyCountries={COUNTRY_CODES}
                preferredCountries={PREFERRED_COUNTRY_CODES}
                country={DEFAULT_COUNTRY_CODE}
                placeholder="(770) 298-5828"
              />
              {errors.deliveryContactPhone && (
                <p className="text-sm text-destructive">
                  {errors.deliveryContactPhone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryBackupPhone">Backup Phone (Optional)</Label>
              {/* Hidden input to register backup phone with react-hook-form / zod */}
              <input type="hidden" {...register("deliveryBackupPhone")} />
              <CustomPhoneNumberInputField
                name="deliveryBackup.phoneNumber"
                countryCodeName="deliveryBackup.countryCode"
                defaultCountryCode={DEFAULT_COUNTRY_CODE}
                id="deliveryBackupPhone"
                customPhoneNumberFieldStructure="w-full"
                customPhoneNumberFieldWrapper="w-full"
                intlInputFieldId="deliveryBackupPhone"
                phoneNumberValue={formData.deliveryBackupPhone}
                phoneNumberDefaultValue={formData.deliveryBackupPhone}
                customIntlTelInputContainer="
                  intl-tel-input separate-dial-code w-full flex
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
                useSeparateDialCode={true}
                useNationalMode={false}
                onPhoneNumberChanges={(value) => {
                  const mobile = value?.mobile ?? "";
                  setValue("deliveryBackupPhone", mobile, {
                    shouldValidate: false,
                    shouldDirty: true,
                  });

                  // Only validate if user actually typed something
                  if (mobile && !value?.isValid) {
                    setError("deliveryBackupPhone", {
                      type: "manual",
                      message: "Please enter a valid backup phone number",
                    });
                  } else {
                    clearErrors("deliveryBackupPhone");
                  }
                }}
                initialCountry={DEFAULT_COUNTRY_CODE?.toUpperCase()}
                onlyCountries={COUNTRY_CODES}
                preferredCountries={PREFERRED_COUNTRY_CODES}
                country={DEFAULT_COUNTRY_CODE}
                placeholder="(000) 000-0000"
              />
              {errors.deliveryBackupPhone && (
                <p className="text-sm text-destructive">
                  {errors.deliveryBackupPhone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryNotes">Special Note (Optional)</Label>
            <Textarea
              id="deliveryNotes"
              placeholder="Any special instructions or notes..."
              rows={3}
              {...register("deliveryNotes")}
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-card rounded-2xl p-6 shadow-card">
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button type="button" variant="default" onClick={onBack} className="gap-2">
            Back
          </Button>
          <Button type="submit" className="gap-2">
            Continue to Book Shipment
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          No stress—our flexible booking system has you covered. You can update your details anytime.
        </p>
        <p className="text-center text-muted-foreground mt-3">— OR —</p>
        <p className="text-center mt-2">
          <span className="text-muted-foreground">Book via Call: </span>
          <a href="tel:8005531828" className="text-primary font-medium hover:underline">
            800-553-1828
          </a>
        </p>
      </div>
      </form>
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
                width: 100%;
                z-index: 99;
                border: 1px solid var(--tabs-border-color);
                border-radius: 5px;
              }
        }
      `}</style>
    </div>
  );
}
