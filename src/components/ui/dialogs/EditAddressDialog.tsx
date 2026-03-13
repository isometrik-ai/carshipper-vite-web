import { useState } from "react";
import { ArrowLeft, MapPin, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AddressAutocomplete from "@/components/custom-google-searchbar";
import { DEFAULT_COUNTRY_CODE } from "@/lib/config";
import { getFormattedAddressFromGooglePlace } from "@/lib/global";

interface EditAddressDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "pickup" | "delivery";
  currentAddress: { addLine1: string; addLine2: string; city: string; state: string; zip: string };
  onSave: (address: { addLine1: string; addLine2: string; city: string; state: string; zip: string }) => void;
}

export function EditAddressDialog({
  open,
  onOpenChange,
  type,
  currentAddress,
  onSave,
}: EditAddressDialogProps) {
  const [addressDisplay, setAddressDisplay] = useState(
    `${currentAddress.addLine1}, ${currentAddress.addLine2 ? `${currentAddress.addLine2}, ` :"" } ${currentAddress.city}, ${currentAddress.state}, ${currentAddress.zip}`
  );
  const [addLine2, setAddLine2] = useState(currentAddress.addLine2);
  const [city, setCity] = useState(currentAddress.city);
  const [state, setState] = useState(currentAddress.state);
  const [zip, setZip] = useState(currentAddress.zip);

  const isAddressComplete = city.trim() !== "" && state.trim() !== "" && zip.trim() !== "";

  const handleSave = () => {
    if (!isAddressComplete) return;

    onSave({
      addLine1: currentAddress.addLine1,
      addLine2: currentAddress.addLine2,
      city: currentAddress.city,
      state: currentAddress.state,
      zip,
    });
    onOpenChange(false);
  };

  return (
    <>
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
              {type === "pickup" ? "Pickup from" : "Deliver to"} (addLine1, addLine2, city, state, zip)
            </Label>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="relative">
            <AddressAutocomplete
              key={DEFAULT_COUNTRY_CODE}
              countryCode={DEFAULT_COUNTRY_CODE}
              AddressListContainerClassName="AddressListContainer"
              googleSearchBarMainContainerClassName="w-full bg-text-input-primary AddressListContainer h-[49px] relative z-[9]"
              searchInputClassName="primaryFontNormalWeight bg-text-input-primary text-[14px] !pl-3 w-full h-[49px]"
              showSearchIcon={false}
              mainContainerHeight="49px"
              placeValue={addressDisplay || ""}
              showSearchPointNameReactNode={true}
              searchPointNameReactNode={
                <MapPin className="ml-2 w-5 h-5 text-muted-foreground" />
              }
              placeholderText="Enter addLine1, addLine2, city, state or zipcode"
              getSelectedAddressDetails={(coordinates: any, place: any, fullAddress: string) => {
                const formatted = getFormattedAddressFromGooglePlace(place);
                const line1 = formatted?.addLine1 || fullAddress || "";
                const line2 = formatted?.addLine2 || "";
                const nextCity = formatted?.city || "";
                const nextState = formatted?.stateCode || formatted?.state || "";
                const nextZip = formatted?.zipCode || "";
                const display = fullAddress || line1;

                setAddressDisplay(display || line1);
                setAddLine2(line2);
                setCity(nextCity);
                setState(nextState);
                setZip(nextZip);
              }}
            />
            {!isAddressComplete && addressDisplay ? (
              <p className="text-sm text-destructive mt-1">
                Please select a full address including city, state, and ZIP from the suggestions.
              </p>
            ) : null}
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
            border: 1px solid gray;
            border-radius: 5px;
          }
        }
      `}</style>
    </>
  );
}
