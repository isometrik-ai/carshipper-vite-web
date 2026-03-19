import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  MapPin, Home, Gavel, Car, Building2, Ship, Warehouse, Wrench, Plus,
  ArrowRight, ArrowLeft, User, Phone, FileText
} from "lucide-react";
import PhoneInput from "@/components/ui/customPhoneNumber/phoneInput"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { getFormattedAddressFromGooglePlace } from "@/lib/global";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingFormData } from "@/containers/BookingPage";
import { cn } from "@/lib/utils";
import { OrderSummaryPanel } from "@/components/booking/OrderSummaryPanel";
import CustomPhoneNumberInputField from "@/components/ui/customPhoneNumber/phoneInput";
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE, PREFERRED_COUNTRY_CODES } from "@/lib/config";
import AddressAutocomplete from "../custom-google-searchbar";

const pickupSchema = z.object({
  pickupLocationType: z.string().min(1, "Please select a location type"),
  pickupAddress: z.string().min(5, "Please enter a valid address"),
  pickupCity: z.string().min(2, "City is required"),
  pickupState: z.string().min(2, "State is required"),
  pickupZip: z.string().min(5, "Please enter a valid ZIP code"),
  businessName: z.string().optional(),
  buyerNumber: z.string().optional(),
  lotNumber: z.string().optional(),
  vinNumber: z.string().optional(),
  vehicleColor: z.string().optional(),
  pickupContactName: z.string().min(2, "Contact name is required"),
  pickupContactPhone: z.string().min(10, "Phone number is required"),
  pickupBackupPhone: z.string().optional(),
  pickupNotes: z.string().optional(),
  willBePresent: z.boolean(),
});

type PickupFormData = z.infer<typeof pickupSchema>;

interface PickupStepProps {
  formData: BookingFormData;
  updateFormData: (data: Partial<BookingFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  quoteData: {
    vehicle: { year: number; make: string; model: string };
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

export function PickupStep({ formData, updateFormData, onNext, onBack, quoteData, tier, price }: PickupStepProps) {
  const [locationType, setLocationType] = useState(formData.pickupLocationType || "auction");
  const [phone, setPhone] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<PickupFormData>({
    resolver: zodResolver(pickupSchema),
    defaultValues: {
      pickupLocationType: formData.pickupLocationType || "auction",
      pickupAddress: formData.pickupAddress,
      pickupCity: formData.pickupCity,
      pickupState: formData.pickupState,
      pickupZip: formData.pickupZip,
      businessName: formData.pickupBusinessName || "",
      buyerNumber: formData.pickupBuyerNumber || "",
      lotNumber: formData.pickupLotNumber || "",
      vinNumber: formData.pickupVinNumber || "",
      vehicleColor: formData.pickupVehicleColor || "",
      pickupContactName: formData.pickupContactName,
      pickupContactPhone: formData.phone,
      pickupNotes: formData.pickupNotes,
      willBePresent: formData.pickupWillBePresent ?? true,
    },
  });

  const pickupState = watch("pickupState");
  const willBePresent = watch("willBePresent");

  const onSubmit = (data: PickupFormData) => {
    updateFormData({
      pickupLocationType: data.pickupLocationType,
      pickupAddress: data.pickupAddress,
      pickupCity: data.pickupCity,
      pickupState: data.pickupState,
      pickupZip: data.pickupZip,
      pickupBusinessName: data.businessName || "",
      pickupBuyerNumber: data.buyerNumber || "",
      pickupLotNumber: data.lotNumber || "",
      pickupVinNumber: data.vinNumber || "",
      pickupVehicleColor: data.vehicleColor || "",
      pickupContactName: data.pickupContactName,
      pickupContactPhone: data.pickupContactPhone,
      pickupBackupPhone: data.pickupBackupPhone || "",
      pickupNotes: data.pickupNotes,
      pickupWillBePresent: data.willBePresent,
    });
    onNext();
  };

  const showBusinessFields = ["auction", "dealership", "commercial", "storage", "mechanic"].includes(locationType);

  return (
    <div className="grid lg:grid-cols-[380px,1fr] gap-6">
      {/* Left: Order Summary */}
      <div className="hidden lg:block">
        <OrderSummaryPanel quoteData={quoteData} tier={tier} price={price} />
      </div>

      {/* Right: Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Pickup Location */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="bg-muted/50 px-6 py-4 flex items-center gap-3">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Pickup Location</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Location Type Grid */}
          <div>
            <Label className="text-base mb-3 block">Picking up from *</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {locationTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => {
                    setLocationType(type.id);
                    setValue("pickupLocationType", type.id);
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
            <Label htmlFor="pickupAddress">Street Address *</Label>
            <Input
              id="pickupAddress"
              placeholder="131 Continental Dr"
              {...register("pickupAddress")}
              className={`${errors.pickupAddress ? "border-destructive" : ""} ${"hidden"}`}
            />
          </div>
             <AddressAutocomplete
                key={DEFAULT_COUNTRY_CODE}
                countryCode={DEFAULT_COUNTRY_CODE}
                AddressListContainerClassName="AddressListContainer"
                googleSearchBarMainContainerClassName="w-full bg-text-input-primary AddressListContainer h-[49px] relative  z-[9]"
                searchInputClassName="primaryFontNormalWeight bg-text-input-primary text-[14px] !pl-3 w-full h-[49px]"
                getSelectedAddressDetails={(
                  coOrdinates: any,
                  addressData: any,
                  address: string
                ) => {
                  const formatted = getFormattedAddressFromGooglePlace(addressData);
                  const line1 =  address || formatted?.addLine1 || "";
                  const city  = formatted?.city || "";
                  const state = formatted?.stateCode || formatted?.state || "";
                  const zip   = formatted?.zipCode || "";
                  setValue("pickupAddress", line1,  { shouldDirty: true, shouldValidate: false });
                  setValue("pickupCity",    city,   { shouldDirty: true, shouldValidate: true });
                  setValue("pickupState",   state,  { shouldDirty: true, shouldValidate: true });
                  setValue("pickupZip",     zip,    { shouldDirty: true, shouldValidate: true });
                  // parseAddressComponents(coOrdinates, addressData, address);
                }}
                restrictToCitiesOnly={false}
                setIsSearchAddress={(value: boolean) => {
                  // setValue("pickupAddress", "");
                }}
                placeValue={formData.pickupAddress || ""}
                mainContainerHeight="49px"
                showSearchIcon={true}
              />
              {errors.pickupAddress && (
               <p className="text-sm text-destructive">{errors.pickupAddress.message}</p>
               )}

          {/* City, State, Zip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="pickupCity">City *</Label>
              <Input
                id="pickupCity"
                {...register("pickupCity")}
                className={errors.pickupCity ? "border-destructive" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label>State *</Label>
              <Select
                value={pickupState}
                onValueChange={(value) => setValue("pickupState", value)}
              >
                <SelectTrigger className={errors.pickupState ? "border-destructive" : ""}>
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
              <Label htmlFor="pickupZip">ZIP Code *</Label>
              <Input
                id="pickupZip"
                {...register("pickupZip")}
                className={errors.pickupZip ? "border-destructive" : ""}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Business Information (conditional) */}
      {showBusinessFields && (
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="bg-muted/50 px-6 py-4 flex items-center gap-3">
            <Building2 className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Business Information</h2>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="Isometrik AI Inc"
                {...register("businessName")}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="buyerNumber">Buyer Number (Optional)</Label>
                <Input
                  id="buyerNumber"
                  placeholder="Enter buyer number"
                  {...register("buyerNumber")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lotNumber">Lot Number (Optional)</Label>
                <Input
                  id="lotNumber"
                  placeholder="Enter lot number"
                  {...register("lotNumber")}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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
            </div>
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
              id="willBePresent"
              checked={willBePresent}
              onCheckedChange={(checked) => setValue("willBePresent", checked as boolean)}
            />
            <Label htmlFor="willBePresent" className="cursor-pointer">
              I will be present at pick up
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickupContactName">Contact Name *</Label>
            <Input
              id="pickupContactName"
              placeholder="John Doe"
              defaultValue={formData.pickupContactName}
              {...register("pickupContactName")}
              className={errors.pickupContactName ? "border-destructive" : ""}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupContactPhone">Contact Phone *</Label>
              {/* Hidden input to register with react-hook-form / zod */}
              <input type="hidden" {...register("pickupContactPhone")} />
              <CustomPhoneNumberInputField
                name="pickupContactPhone"
                countryCodeName={DEFAULT_COUNTRY_CODE}
                defaultCountryCode={DEFAULT_COUNTRY_CODE}
                required
                id="pickupContactPhone"
                customPhoneNumberFieldStructure="w-full"
                customPhoneNumberFieldWrapper="w-full"
                intlInputFieldId="pickupContactPhone"
                phoneNumberValue={formData.pickupContactPhone}
                phoneNumberDefaultValue={formData.pickupContactPhone}
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
                
                  // update RHF value but DO NOT trigger schema validation yet
                  setValue("pickupContactPhone", mobile, {
                    shouldValidate: false,
                    shouldDirty: true,
                  });
                
                  // manual live validation based on intl-tel
                  if (!mobile) {
                    // user cleared the field → clear live error, Zod will handle "required" on submit
                    clearErrors("pickupContactPhone");
                    return;
                  }
                
                  if (!value?.isValid) {
                    setError("pickupContactPhone", {
                      type: "manual",
                      message: "Please enter a valid phone number",
                    });
                  } else {
                    clearErrors("pickupContactPhone");
                  }
                }}
                initialCountry={DEFAULT_COUNTRY_CODE?.toUpperCase()}
                onlyCountries={COUNTRY_CODES}
                preferredCountries={PREFERRED_COUNTRY_CODES}
                country={DEFAULT_COUNTRY_CODE}
                placeholder="(770) 298-5828"
              />
              {errors.pickupContactPhone && (
                <p className="text-sm text-destructive">
                  {errors.pickupContactPhone.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickupBackupPhone">Backup Phone (Optional)</Label>
              {/* Hidden input to register backup phone with react-hook-form / zod */}
              <input type="hidden" {...register("pickupBackupPhone")} />
              <CustomPhoneNumberInputField
                name="pickupBackup.phoneNumber"
                countryCodeName="pickupBackup.countryCode"
                defaultCountryCode={DEFAULT_COUNTRY_CODE}
                id="pickupBackupPhone"
                customPhoneNumberFieldStructure="w-full"
                customPhoneNumberFieldWrapper="w-full"
                intlInputFieldId="pickupBackupPhone"
                phoneNumberValue={formData.pickupBackupPhone}
                phoneNumberDefaultValue={formData.pickupBackupPhone}
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
                  setValue("pickupBackupPhone", mobile, {
                    shouldValidate: false,
                    shouldDirty: true,
                  });

                  // Only validate if user actually typed something
                  if (mobile && !value?.isValid) {
                    setError("pickupBackupPhone", {
                      type: "manual",
                      message: "Please enter a valid backup phone number",
                    });
                  } else {
                    clearErrors("pickupBackupPhone");
                  }
                }}
                initialCountry={DEFAULT_COUNTRY_CODE?.toUpperCase()}
                onlyCountries={COUNTRY_CODES}
                preferredCountries={PREFERRED_COUNTRY_CODES}
                country={DEFAULT_COUNTRY_CODE}
                placeholder="(770) 298-5828"
              />
              {errors.pickupBackupPhone && (
                <p className="text-sm text-destructive">
                  {errors.pickupBackupPhone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickupNotes">Special Note (Optional)</Label>
            <Textarea
              id="pickupNotes"
              placeholder="Any special instructions or notes..."
              rows={3}
              {...register("pickupNotes")}
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
            Continue to Delivery
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
