import { Calendar, Car, ArrowLeft, ArrowRight, Truck, Shield, DollarSign, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrderSummaryPanelProps {
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

const tierNames = {
  saver: "Saver Rate",
  priority: "Priority Rate",
  rush: "Rush Service",
};

const tierColors = {
  saver: "text-success",
  priority: "text-primary",
  rush: "text-rush",
};

export function OrderSummaryPanel({ quoteData, tier, price }: OrderSummaryPanelProps) {
  const effectiveVehicles =
    Array.isArray(quoteData.vehicles) && quoteData.vehicles.length > 0
      ? quoteData.vehicles
      : [quoteData.vehicle];
  const primaryVehicle = effectiveVehicles[0];
  const vehicleLabel =
    effectiveVehicles.length > 1
      ? `${effectiveVehicles.length} vehicles`
      : `${primaryVehicle.year} ${primaryVehicle.make} ${primaryVehicle.model}`;
  const vehicleCondition =
    effectiveVehicles.length > 1
      ? "Mixed"
      : (primaryVehicle as { is_running?: boolean }).is_running === false
        ? "Inoperable"
        : "Runs and Drives";

  const summaryRows = [
    {
      icon: Calendar,
      label: "Earliest pickup date",
      value: quoteData.earliestPickup,
    },
    {
      icon: Car,
      label: "Vehicle",
      value: vehicleLabel,
    },
    {
      label: "Condition",
      value: vehicleCondition,
      indent: true,
    },
    {
      label: "Personal Items",
      value: "0 to 100 lbs",
      indent: true,
    },
    {
      icon: ArrowLeft,
      label: "Pickup from",
      value: `${quoteData.origin.addLine1}, ${quoteData.origin.addLine2 ? `${quoteData.origin.addLine2}, ` :"" } ${quoteData.origin.city}, ${quoteData.origin.state}, ${quoteData.origin.zip}`,
    },
    {
      icon: ArrowRight,
      label: "Deliver to",
      value: `${quoteData.destination.addLine1}, ${quoteData.destination.addLine2 ? `${quoteData.destination.addLine2}, ` :"" } ${quoteData.destination.city}, ${quoteData.destination.state}, ${quoteData.destination.zip}`,
    },
    {
      icon: Truck,
      label: "Transport type",
      value: quoteData.transportType,
    },
    {
      label: "Service type",
      value: "Door to door",
      indent: true,
    },
    {
      icon: Shield,
      label: "Insurance",
      value: "Included",
    },
  ];

  return (
    <div className="bg-card rounded-2xl shadow-card sticky top-24">
      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Details</h3>

        <div className="space-y-4">
          {summaryRows.map((row, index) => (
            <div key={index} className={cn("flex items-start justify-between", row.indent && "pl-8")}>
              <div className="flex items-center gap-2 text-muted-foreground">
                {row.icon && <row.icon className="w-4 h-4" />}
                <span className="text-sm">{row.label}</span>
              </div>
              <span className="text-sm font-medium text-foreground text-right max-w-[180px]">{row.value}</span>
            </div>
          ))}

          {/* Due Now */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Due now</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-success">$0.00</span>
              <p className="text-xs text-muted-foreground max-w-[150px]">
                Don't worry—you won't pay until your pickup is scheduled.
              </p>
            </div>
          </div>

          {/* Price Option */}
          <div className="flex items-start justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Price option</span>
            </div>
            <span className={cn("text-sm font-bold", tierColors[tier])}>
              {tierNames[tier]} ${price.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Dedicated Agent */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Your Dedicated Agent</p>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">David White</p>
              <p className="text-sm text-muted-foreground">Senior Logistics Agent</p>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2" asChild>
            <a href="tel:9548694039">
              <Phone className="w-4 h-4" />
              (954) 869-4039
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
