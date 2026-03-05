import { useState } from "react";
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
// import { EditPickupDateDialog } from "./dialogs/EditPickupDateDialog";
// import { EditVehicleDialog, Vehicle } from "./dialogs/EditVehicleDialog";
// import { EditAddressDialog } from "./dialogs/EditAddressDialog";
// import { EditTransportTypeDialog } from "./dialogs/EditTransportTypeDialog";

interface ShippingMethodStepProps {
  quoteData: {
    quoteId: string;
    vehicle: { year: number; make: string; model: string };
    origin: { city: string; state: string; zip: string };
    destination: { city: string; state: string; zip: string };
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
  onNext 
}: ShippingMethodStepProps) {
  // Editable state
  const [pickupDate, setPickupDate] = useState(new Date(2026, 0, 9)); // 09/01/2026
  const [schedulingNotes, setSchedulingNotes] = useState("");
  // const [vehicles, setVehicles] = useState<Vehicle[]>([{
  //   id: "1",
  //   year: quoteData.vehicle.year,
  //   make: quoteData.vehicle.make,
  //   model: quoteData.vehicle.model,
  //   type: "SUV",
  //   operational: true,
  //   personalItems: "None or less than 100 lbs.",
  // }]);
  const [pickupAddress, setPickupAddress] = useState(quoteData.origin);
  const [deliveryAddress, setDeliveryAddress] = useState(quoteData.destination);
  const [transportType, setTransportType] = useState<"Open" | "Enclosed">("Open");

  // Dialog states
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [vehicleDialogOpen, setVehicleDialogOpen] = useState(false);
  const [pickupAddressDialogOpen, setPickupAddressDialogOpen] = useState(false);
  const [deliveryAddressDialogOpen, setDeliveryAddressDialogOpen] = useState(false);
  const [transportDialogOpen, setTransportDialogOpen] = useState(false);

  // const primaryVehicle = vehicles[0];
  // const vehicleDisplay = vehicles.length === 1 
  //   ? `${primaryVehicle.year} ${primaryVehicle.make} ${primaryVehicle.model}`
  //   : `${vehicles.length} vehicles`;

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
      // value: vehicleDisplay,
      editable: true,
      onEdit: () => setVehicleDialogOpen(true),
    },
    { 
      label: "Condition", 
      // value: primaryVehicle.operational ? "Runs and Drives" : "Inoperable",
      indent: true,
    },
    { 
      label: "Personal Items", 
      // value: primaryVehicle.personalItems,
      indent: true,
    },
    { 
      icon: ArrowLeft, 
      label: "Pickup from", 
      value: `${pickupAddress.city}, ${pickupAddress.state}, ${pickupAddress.zip}`,
      editable: true,
      onEdit: () => setPickupAddressDialogOpen(true),
    },
    { 
      icon: ArrowRightIcon, 
      label: "Deliver to", 
      value: `${deliveryAddress.city}, ${deliveryAddress.state}, ${deliveryAddress.zip}`,
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
                    <span className="text-sm font-medium text-foreground">{row.value}</span>
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
            <Button onClick={onNext} size="lg" className="w-full gap-2">
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
      {/* <EditPickupDateDialog
        open={dateDialogOpen}
        onOpenChange={setDateDialogOpen}
        currentDate={pickupDate}
        schedulingNotes={schedulingNotes}
        onSave={(date, notes) => {
          setPickupDate(date);
          setSchedulingNotes(notes);
        }}
      /> */}

      {/* <EditVehicleDialog
        open={vehicleDialogOpen}
        onOpenChange={setVehicleDialogOpen}
        vehicles={vehicles}
        onSave={setVehicles}
      /> */}

      {/* <EditAddressDialog
        open={pickupAddressDialogOpen}
        onOpenChange={setPickupAddressDialogOpen}
        type="pickup"
        currentAddress={pickupAddress}
        onSave={setPickupAddress}
      /> */}

      {/* <EditAddressDialog
        open={deliveryAddressDialogOpen}
        onOpenChange={setDeliveryAddressDialogOpen}
        type="delivery"
        currentAddress={deliveryAddress}
        onSave={setDeliveryAddress}
      /> */}

      {/* <EditTransportTypeDialog
        open={transportDialogOpen}
        onOpenChange={setTransportDialogOpen}
        currentType={transportType}
        onSave={setTransportType}
      /> */}
    </>
  );
}
