import { useState } from "react";
import { ArrowLeft, MapPin, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "pickup" | "delivery";
  currentAddress: { city: string; state: string; zip: string };
  onSave: (address: { city: string; state: string; zip: string }) => void;
}

export function EditAddressDialog({
  open,
  onOpenChange,
  type,
  currentAddress,
  onSave,
}: EditAddressDialogProps) {
  const [address, setAddress] = useState(
    `${currentAddress.city}, ${currentAddress.state}, ${currentAddress.zip}`
  );

  const handleSave = () => {
    // Parse the address - in production this would use a proper address parser
    const parts = address.split(",").map(p => p.trim());
    if (parts.length >= 3) {
      onSave({
        city: parts[0],
        state: parts[1],
        zip: parts[2],
      });
    } else if (parts.length === 2) {
      onSave({
        city: parts[0],
        state: parts[1].split(" ")[0] || "",
        zip: parts[1].split(" ")[1] || "",
      });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
            <ArrowLeft className="w-6 h-6 text-muted-foreground" />
          </div>
          <DialogTitle className="text-xl font-bold">
            {type === "pickup" ? "Pickup Address" : "Delivery Address"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Confirm your {type} location. Don't worry—if it changes later, minor adjustments 
            within 10–15 miles rarely impact pricing.
          </p>
        </DialogHeader>

        <div className="bg-muted/50 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Label className="font-medium text-foreground">
              {type === "pickup" ? "Pickup from" : "Deliver to"} (city, state, zip)
            </Label>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <Input
            placeholder="Enter city, state or zipcode"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
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
