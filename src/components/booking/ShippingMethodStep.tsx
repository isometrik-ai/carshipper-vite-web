import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  Calendar, Car, MapPin, Truck, Shield, Package, CheckCircle2, ArrowRight, 
  Phone, User, Pencil, ArrowLeft, ArrowRightIcon, DollarSign, Lock, Clock, Star, Zap,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { EditPickupDateDialog } from "@/components/ui/dialogs/EditPickupDateDialog";
import { EditVehicleDialog, Vehicle } from "@/components/ui/dialogs/EditVehicleDialog";
import { EditAddressDialog } from "@/components/ui/dialogs/EditAddressDialog";
import { EditTransportTypeDialog } from "@/components/booking/EditTransportTypeDialog";
import { QuoteGetDetailsAPI, UpdateQuote } from "@/services/quote-services";
import { toast } from "sonner";

interface ShippingMethodStepProps {
  quoteData: {
    quoteId: string;
    vehicle: { year: number; make: string; model: string };
    origin: { addLine1: string; addLine2: string; city: string; state: string; zip: string };
    destination: { addLine1: string; addLine2: string; city: string; state: string; zip: string };
    distance: string;
    transitTime: string;
    earliestPickup: string;
    condition: string;
    personalItems: string;
    transportType: string;
    serviceType: string;
    prices: { saver: number; priority: number; rush: number };
  };
  selectedTier: "saver" | "priority" | "rush";
  onTierChange: (tier: "saver" | "priority" | "rush") => void;
  onNext: () => void;
  getQuoteDetails: () => void;
}

const tiers = [
  {
    id: "saver" as const,
    name: "Saver Rate",
    badge: "Budget Friendly",
    badgeColor: "text-emerald-600",
    features: [
      { icon: DollarSign, text: "Lowest cost" },
      { icon: Calendar, text: "Best for a flexible pickup schedule" },
      { icon: Calendar, text: "You fill last-minute cancellations if they arise" },
    ],
  },
  {
    id: "priority" as const,
    name: "Priority Rate",
    badge: "Best Value",
    badgeColor: "text-primary",
    popular: true,
    features: [
      { icon: Lock, text: "Locked-in rate" },
      { icon: Clock, text: "Standard pickup window (3 business days)" },
      { icon: Star, text: "Our most selected option for cost, timing, and peace of mind" },
    ],
  },
  {
    id: "rush" as const,
    name: "Rush Service",
    badge: "Fastest pickup for urgent moves",
    badgeColor: "text-destructive",
    features: [
      { icon: Lock, text: "Locked-in rate" },
      { icon: Zap, text: "Priority scheduling (often next-day pickup)" },
      { icon: Star, text: "Best if your schedule is tight or you need quick availability on your route" },
    ],
  },
];

export function ShippingMethodStep({ 
  quoteData, 
  selectedTier, 
  onTierChange, 
  onNext,
  getQuoteDetails
}: ShippingMethodStepProps) {
  // Editable state
  const [pickupDate, setPickupDate] = useState(() => {
    if (quoteData.earliestPickup) {
      const [month, day, year] = quoteData.earliestPickup.split("/").map(Number);
      if (month && day && year) {
        return new Date(year, month - 1, day);
      }
    }
    return new Date();
  });
  const [schedulingNotes, setSchedulingNotes] = useState("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([{
    id: "1",
    year: quoteData.vehicle.year,
    make: quoteData.vehicle.make,
    model: quoteData.vehicle.model,
    type: "SUV",
    operational: true,
    personalItems: "None or less than 100 lbs.",
  }]);
  const [pickupAddress, setPickupAddress] = useState({ addLine1: quoteData.origin.addLine1, addLine2: quoteData.origin.addLine2, city: quoteData.origin.city, state: quoteData.origin.state, zip: quoteData.origin.zip });
  const [deliveryAddress, setDeliveryAddress] = useState({ addLine1: quoteData.destination.addLine1, addLine2: quoteData.destination.addLine2, city: quoteData.destination.city, state: quoteData.destination.state, zip: quoteData.destination.zip });
  const [transportType, setTransportType] = useState<"Open" | "Enclosed">("Open");
  const [currentPrices, setCurrentPrices] = useState(quoteData.prices);

  // Sync local state when quoteData updates from API
  useEffect(() => {
    if (quoteData.earliestPickup) {
      const [month, day, year] = quoteData.earliestPickup.split("/").map(Number);
      if (month && day && year) {
        setPickupDate(new Date(year, month - 1, day));
      }
    }

    setVehicles([{
      id: "1",
      year: quoteData.vehicle.year,
      make: quoteData.vehicle.make,
      model: quoteData.vehicle.model,
      type: "SUV",
      operational: true,
      personalItems: "None or less than 100 lbs.",
    }]);

    setPickupAddress(quoteData.origin);
    setDeliveryAddress(quoteData.destination);
    setTransportType(quoteData.transportType === "Enclosed" ? "Enclosed" : "Open");
    setCurrentPrices(quoteData.prices);
  }, [quoteData.quoteId]);

  // Dialog states
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false);
  const [pickupAddressDialogOpen, setPickupAddressDialogOpen] = useState(false);
  const [deliveryAddressDialogOpen, setDeliveryAddressDialogOpen] = useState(false);
  const [transportDialogOpen, setTransportDialogOpen] = useState(false);

  const primaryVehicle = vehicles[0];
  const vehicleDisplay = vehicles.length === 1 
    ? `${primaryVehicle.year} ${primaryVehicle.make} ${primaryVehicle.model}`
    : `${vehicles.length} vehicles`;

  const formatAddressWithEllipsis = (address: string, maxLength = 60) => {
    if (!address) return "";
    return address.length > maxLength ? `${address.slice(0, maxLength - 3)}...` : address;
  };

  const pickupFullAddress = `${pickupAddress.addLine1}, ${pickupAddress.addLine2 ? `${pickupAddress.addLine2}, ` : ""}${pickupAddress.city}, ${pickupAddress.state}, ${pickupAddress.zip}`;
  const deliveryFullAddress = `${deliveryAddress.addLine1}, ${deliveryAddress.addLine2 ? `${deliveryAddress.addLine2}, ` : ""}${deliveryAddress.city}, ${deliveryAddress.state}, ${deliveryAddress.zip}`;

  type AddressState = { addLine1: string; addLine2: string; city: string; state: string; zip: string };

  const buildUpdatePayload = (overrides?: {
    pickupAddress?: AddressState;
    deliveryAddress?: AddressState;
    vehicles?: Vehicle[];
    transportType?: "Open" | "Enclosed";
  }) => {
    const effectivePickup = overrides?.pickupAddress ?? pickupAddress;
    const effectiveDelivery = overrides?.deliveryAddress ?? deliveryAddress;
    const effectiveVehicles = overrides?.vehicles ?? vehicles;
    const effectiveTransportType = overrides?.transportType ?? transportType;

    return {
    quote_number: quoteData.quoteId,
    pickup_zip: effectivePickup.zip,
    delivery_zip: effectiveDelivery.zip,
    distance_miles: undefined,
    transport_type: effectiveTransportType === "Open" ? "Open Transport" : "Enclosed Transport",
    pickup_city: effectivePickup.city,
    pickup_state: effectivePickup.state,
    pickup_addLine1: effectivePickup.addLine1,
    pickup_addLine2: effectivePickup.addLine2,
    pickup_country: "USA",
    pickup_latitude: undefined,
    pickup_longitude: undefined,
    delivery_city: effectiveDelivery.city,
    delivery_state: effectiveDelivery.state,
    delivery_addLine1: effectiveDelivery.addLine1,
    delivery_addLine2: effectiveDelivery.addLine2,
    delivery_country: "USA",
    delivery_latitude: undefined,
    delivery_longitude: undefined,
    customer_email: undefined,
    customer_name: undefined,
    customer_first_name: undefined,
    customer_last_name: undefined,
    customer_company: undefined,
    customer_phone: undefined,
    customer_country_code: undefined,
    vehicles: effectiveVehicles.map((v) => ({
      year: v.year,
      make: v.make,
      model: v.model,
      is_running: v.operational,
    })),
    };
  };

  const syncQuoteWithServer = async (overrides?: {
    pickupAddress?: AddressState;
    deliveryAddress?: AddressState;
    vehicles?: Vehicle[];
    transportType?: "Open" | "Enclosed";
  }) => {
    try {
      const payload = buildUpdatePayload(overrides);
      await UpdateQuote(payload);
      await getQuoteDetails();
    } catch (error) {
      console.error("Failed to update quote", error);
      toast.error("Unable to update quote. Please try again.");
    }
  };

  const detailRows = [
    { 
      icon: Calendar, 
      label: "Earliest pickup date", 
      value: format(pickupDate, "MM/dd/yyyy"),
      editable: true,
      onEdit: () => setDateDialogOpen(true),
    },
    { 
      icon: Car, 
      label: "Vehicle", 
      value: vehicleDisplay,
      editable: true,
      onEdit: () => setVehicleDialogOpen(true),
    },
    { 
      label: "Condition", 
      value: primaryVehicle.operational ? "Runs and Drives" : "Inoperable",
      indent: true,
    },
    { 
      label: "Personal Items", 
      value: primaryVehicle.personalItems,
      indent: true,
    },
    { 
      icon: ArrowLeft, 
      label: "Pickup from", 
      value: formatAddressWithEllipsis(pickupFullAddress),
      title: pickupFullAddress,
      editable: true,
      onEdit: () => setPickupAddressDialogOpen(true),
    },
    { 
      icon: ArrowRightIcon, 
      label: "Deliver to", 
      value: formatAddressWithEllipsis(deliveryFullAddress),
      title: deliveryFullAddress,
      editable: true,
      onEdit: () => setDeliveryAddressDialogOpen(true),
    },
    { 
      icon: Truck, 
      label: "Transport type", 
      value: transportType,
      editable: true,
      onEdit: () => setTransportDialogOpen(true),
    },
    { 
      icon: Truck, 
      label: "Service type", 
      value: quoteData.serviceType,
    },
    { 
      icon: Shield, 
      label: "Insurance", 
      value: "Included",
    },
  ];

  const handleContinue = async () => {
    try {
      const payload = buildUpdatePayload();
      await UpdateQuote(payload);
    } catch (error) {
      console.error("Failed to update quote", error);
    }

    onNext();
  };

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN - Details */}
        <div className="space-y-6">
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Details</h2>

            <div className="space-y-0">
              {detailRows.map((row, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-center justify-between py-3 border-b border-border/50 last:border-0",
                    row.indent && "pl-6"
                  )}
                >
                  <div className="flex items-center gap-3 text-muted-foreground">
                    {row.icon && <row.icon className="w-4 h-4" />}
                    <span className="text-sm">{row.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-medium text-foreground max-w-[260px] truncate"
                      title={row.title || row.value}
                    >
                      {row.value}
                    </span>
                    {row.editable && (
                      <button 
                        onClick={row.onEdit}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Due Now */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Due now</span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-600">$0.00</p>
                  <p className="text-xs text-muted-foreground">
                    Don't worry—you won't pay<br />until your pickup is scheduled.
                  </p>
                </div>
              </div>
            </div>
          </div>

        {/* Dedicated Agent */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <p className="text-sm text-muted-foreground mb-3">Your Dedicated Agent</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">David White</p>
              <p className="text-sm text-muted-foreground">Senior Logistics Agent</p>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2" asChild>
            <a href="tel:8005531828">
              <Phone className="w-4 h-4" />
              (800) 553-1828
            </a>
          </Button>
        </div>

          {/* Every Order Includes */}
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <h3 className="font-bold text-foreground mb-4">Every Order Includes:</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
              <div>
                <p className="font-semibold text-foreground">CarShippers.ai Shield Network</p>
                <p className="text-sm text-muted-foreground">
                  Access to our nationwide network of dedicated, top-rated carriers.
                </p>
              </div>
            </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Full Insurance Coverage</p>
                  <p className="text-sm text-muted-foreground">
                    Every shipment is fully insured for your vehicle's safety and peace of mind.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Priority Claims Support</p>
                  <p className="text-sm text-muted-foreground">
                    Guided claims assistance with our dedicated support team for fast resolutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Price Options */}
        <div className="space-y-6">
          {/* No Payment Notice */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300">
                No payment is processed at this stage
              </h4>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Your card will only be charged once your carrier is assigned, typically 24-72 hours before your pickup date. 
                We'll notify you as soon as that happens.
              </p>
            </div>
          </div>

          {/* Price Options */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">Choose Price Option</h3>

            <RadioGroup 
              value={selectedTier} 
              onValueChange={(value) => onTierChange(value as "saver" | "priority" | "rush")}
              className="space-y-4"
            >
              {tiers.map((tier) => (
                <motion.div
                  key={tier.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Label
                    htmlFor={tier.id}
                    className={cn(
                      "flex cursor-pointer rounded-xl border-2 p-5 transition-all bg-card",
                      selectedTier === tier.id
                        ? "border-emerald-500"
                        : "border-border hover:border-muted-foreground/50"
                    )}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-foreground">{tier.name}</span>
                          {tier.popular && (
                            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              Most popular!
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-foreground">
                            ${quoteData.prices[tier.id].toLocaleString()}
                          </span>
                          <RadioGroupItem value={tier.id} id={tier.id} />
                        </div>
                      </div>
                      
                      <p className={cn("text-sm mb-3", tier.badgeColor)}>{tier.badge}</p>
                      
                      <ul className="space-y-2">
                        {tier.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <feature.icon className="w-4 h-4 mt-0.5 shrink-0" />
                            {feature.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          </div>

          {/* Continue Button */}
          <div className="pt-4">
            <Button onClick={handleContinue} size="lg" className="w-full gap-2">
              Continue to Booking Details
              <ArrowRight className="w-4 h-4" />
            </Button>
            <p className="text-sm text-muted-foreground text-center mt-4">
              No stress—our flexible booking system has you covered. You can update your details anytime.
            </p>
            <p className="text-center text-muted-foreground mt-4">— OR —</p>
            <p className="text-center mt-2">
              <span className="text-muted-foreground">Book via Call: </span>
              <a href="tel:8005531828" className="text-primary font-medium hover:underline">
                800-553-1828
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Edit Dialogs */}
      <EditPickupDateDialog
        open={dateDialogOpen}
        onOpenChange={setDateDialogOpen}
        currentDate={pickupDate}
        schedulingNotes={schedulingNotes}
        onSave={async (date, notes) => {
          setPickupDate(date);
          setSchedulingNotes(notes);
          await syncQuoteWithServer();
        }}
      />

      <EditVehicleDialog
        open={vehicleDialogOpen}
        onOpenChange={setVehicleDialogOpen}
        vehicles={vehicles}
        onSave={async (updatedVehicles) => {
          setVehicles(updatedVehicles);
          await syncQuoteWithServer({ vehicles: updatedVehicles });
        }}
      />

      <EditAddressDialog
        open={pickupAddressDialogOpen}
        onOpenChange={setPickupAddressDialogOpen}
        type="pickup"
        currentAddress={pickupAddress}
        onSave={async (updatedAddress) => {
          setPickupAddress(updatedAddress);
          await syncQuoteWithServer({ pickupAddress: updatedAddress });
        }}
      />

      <EditAddressDialog
        open={deliveryAddressDialogOpen}
        onOpenChange={setDeliveryAddressDialogOpen}
        type="delivery"
        currentAddress={deliveryAddress}
        onSave={async (updatedAddress) => {
          setDeliveryAddress(updatedAddress);
          await syncQuoteWithServer({ deliveryAddress: updatedAddress });
        }}
      />

      <EditTransportTypeDialog
        open={transportDialogOpen}
        onOpenChange={setTransportDialogOpen}
        currentType={transportType}
        onSave={async (type) => {
          setTransportType(type);
          await syncQuoteWithServer({ transportType: type });
        }}
      />
    </>
  );
}
