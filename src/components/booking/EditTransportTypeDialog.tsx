import { useEffect, useState } from "react";
import { Truck, DollarSign, HelpCircle, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface EditTransportTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentType: "Open" | "Enclosed";
  onSave: (type: "Open" | "Enclosed") => void;
}

const transportOptions = [
  {
    id: "Open" as const,
    name: "Open Carrier",
    description: "Most common and cost-effective option.",
  },
  {
    id: "Enclosed" as const,
    name: "Enclosed Carrier",
    description: "Added protection for high-value or specialty vehicles.",
  },
];

export function EditTransportTypeDialog({
  open,
  onOpenChange,
  currentType,
  onSave,
}: EditTransportTypeDialogProps) {
  const [selected, setSelected] = useState<"Open" | "Enclosed">(currentType);

  const handleSave = () => {
    onSave(selected);
    onOpenChange(false);
  };
  
  useEffect(() => {
    setSelected(currentType);
  }, [currentType]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <Truck className="w-6 h-6 text-muted-foreground" />
          </div>
          <DialogTitle className="text-xl font-bold">Transport Type</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select the transport option that best fits your shipment.
          </p>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto pr-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">Choose Your Carrier Type</span>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <a href="#" className="flex items-center gap-1 text-sm text-primary hover:underline">
              <HelpCircle className="w-4 h-4" />
              What's This?
            </a>
          </div>

          <div className="space-y-3">
            {transportOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border-2 transition-all flex items-start justify-between",
                  selected === option.id
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                    : "border-border hover:border-muted-foreground/50"
                )}
              >
                <div>
                  <h4 className="font-bold text-foreground">{option.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                </div>
                {selected === option.id && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
