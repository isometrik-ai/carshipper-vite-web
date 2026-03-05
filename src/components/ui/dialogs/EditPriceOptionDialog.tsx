import { useState } from "react";
import { Truck, DollarSign, Clock, Lock, Calendar, Zap, Sparkles, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EditPriceOptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentTier: "saver" | "priority" | "rush";
  prices: {
    saver: number;
    priority: number;
    rush: number;
  };
  onSave: (tier: "saver" | "priority" | "rush") => void;
}

const tiers = [
  {
    id: "saver" as const,
    name: "Saver Rate",
    tagline: "Budget Friendly",
    tagColor: "text-primary",
    features: [
      { icon: DollarSign, text: "Lowest cost" },
      { icon: Calendar, text: "Best for a flexible pickup schedule" },
      { icon: Truck, text: "You fill last-minute cancellations if they arise" },
    ],
  },
  {
    id: "priority" as const,
    name: "Priority Rate",
    tagline: "Best Value",
    tagColor: "text-emerald-600",
    features: [
      { icon: Lock, text: "Locked-in rate" },
      { icon: Clock, text: "Standard pickup window (3 business days)" },
      { icon: Sparkles, text: "Our most selected option for cost, timing, and peace of mind" },
    ],
  },
  {
    id: "rush" as const,
    name: "Rush Service",
    tagline: "Fastest pickup for urgent moves",
    tagColor: "text-primary",
    features: [
      { icon: Lock, text: "Locked-in rate" },
      { icon: Zap, text: "Priority scheduling (often next-day pickup)" },
      { icon: Sparkles, text: "Best if your schedule is tight or you need quick availability on your route" },
    ],
  },
];

export function EditPriceOptionDialog({
  open,
  onOpenChange,
  currentTier,
  prices,
  onSave,
}: EditPriceOptionDialogProps) {
  const [selectedTier, setSelectedTier] = useState<"saver" | "priority" | "rush">(currentTier);

  const handleSave = () => {
    onSave(selectedTier);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Truck className="w-6 h-6 text-muted-foreground" />
          </div>
          <DialogTitle className="text-xl">Change Price Option</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select the transport option that best fits your shipment.
          </p>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => setSelectedTier(tier.id)}
              className={cn(
                "w-full text-left p-4 rounded-xl border-2 transition-all",
                selectedTier === tier.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{tier.name}</h3>
                  <p className={cn("text-sm font-medium", tier.tagColor)}>{tier.tagline}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">${prices[tier.id]}</span>
                  {selectedTier === tier.id && (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2 mt-3">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <feature.icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature.text}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1">
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
