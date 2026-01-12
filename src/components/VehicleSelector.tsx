import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Car, Hash, Loader2, Trash2, Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Generate years from current year + 1 down to 1980
const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1979 + 1 }, (_, i) => (currentYear + 1 - i).toString());

export interface Vehicle {
  id: string;
  year: string;
  make: string;
  model: string;
  isRunning: boolean | null;
  vin: string;
  vinLookupLoading: boolean;
}

export interface VehicleSelectorProps {
  vehicle: Vehicle;
  index: number;
  showRemove: boolean;
  onUpdate: (updates: Partial<Vehicle>) => void;
  onRemove: () => void;
  vinLookupLabel?: string;
  vinPlaceholder?: string;
  manualDividerText?: string;
  makeModelPlaceholder?: string;
  vehicleData?: Record<string, string[]>;
}

export const VehicleSelector = ({
  vehicle,
  index,
  showRemove,
  onUpdate,
  onRemove,
  vinPlaceholder = "Enter 17-character VIN",
  manualDividerText = "or select manually",
  makeModelPlaceholder = "Search make & model...",
  vehicleData = {},
}: VehicleSelectorProps) => {
  const [makeModelOpen, setMakeModelOpen] = useState(false);

  // Build make/model options for combobox
  const makeModelOptions = useMemo(() => {
    const options: { value: string; label: string; make: string; model: string }[] = [];
    const MAKES = Object.keys(vehicleData).sort();
    for (const make of MAKES) {
      for (const model of vehicleData[make]) {
        options.push({
          value: `${make}|${model}`,
          label: `${make} ${model}`,
          make,
          model,
        });
      }
    }
    return options;
  }, []);

  const lookupVin = async (vin: string) => {
    if (vin.length !== 17) {
      toast.error("VIN must be exactly 17 characters");
      return;
    }

    onUpdate({ vinLookupLoading: true });

    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`
      );
      const data = await response.json();

      if (data.Results && data.Results[0]) {
        const result = data.Results[0];
        const year = result.ModelYear || "";
        const make = result.Make || "";
        const model = result.Model || "";

        if (make && model) {
          onUpdate({
            year,
            make,
            model,
            vinLookupLoading: false,
          });
          toast.success("Vehicle details found!");
        } else {
          toast.error("Could not decode VIN. Please select manually.");
          onUpdate({ vinLookupLoading: false });
        }
      }
    } catch (error) {
      toast.error("VIN lookup failed. Please select manually.");
      onUpdate({ vinLookupLoading: false });
    }
  };

  const selectedMakeModel = vehicle.make && vehicle.model
    ? `${vehicle.make}|${vehicle.model}`
    : "";

  const displayValue = vehicle.year && vehicle.make && vehicle.model
    ? `${vehicle.year} ${vehicle.make} ${vehicle.model}`
    : vehicle.make && vehicle.model
      ? `${vehicle.make} ${vehicle.model}`
      : "";

  return (
    <div className="p-4 bg-muted/50 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <Label className="text-sm font-semibold">Vehicle {index + 1}</Label>
        {showRemove && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* VIN Input */}
      <div className="mb-4">
        <Label className="text-xs text-muted-foreground flex items-center gap-1">
          <Hash className="w-3 h-3" /> VIN Number (optional - auto-fills details)
        </Label>
        <div className="flex gap-2 mt-1">
          <Input
            placeholder={vinPlaceholder}
            value={vehicle.vin}
            onChange={(e) => onUpdate({ vin: e.target.value.toUpperCase() })}
            maxLength={17}
            className="font-mono text-sm uppercase"
            disabled={vehicle.vinLookupLoading}
          />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => lookupVin(vehicle.vin)}
            disabled={vehicle.vin.length !== 17 || vehicle.vinLookupLoading}
            className="shrink-0"
          >
            {vehicle.vinLookupLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Lookup"
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted-foreground">{manualDividerText}</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Year Dropdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Year</Label>
          <Select
            value={vehicle.year}
            onValueChange={(value) => onUpdate({ year: value })}
            disabled={vehicle.vinLookupLoading}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {YEARS.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Make & Model Combobox */}
        <div>
          <Label className="text-xs text-muted-foreground flex items-center gap-1">
            <Car className="w-3 h-3" /> Make & Model
          </Label>
          <Popover open={makeModelOpen} onOpenChange={setMakeModelOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={makeModelOpen}
                className="w-full justify-between mt-1 font-normal"
                disabled={vehicle.vinLookupLoading}
              >
                {selectedMakeModel
                  ? makeModelOptions.find((opt) => opt.value === selectedMakeModel)?.label
                  : makeModelPlaceholder}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search make or model..." />
                <CommandList>
                  <CommandEmpty>No vehicle found.</CommandEmpty>
                  <CommandGroup className="max-h-[300px] overflow-auto">
                    {makeModelOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => {
                          onUpdate({ make: option.make, model: option.model });
                          setMakeModelOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedMakeModel === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Display selected vehicle */}
      {displayValue && (
        <div className="mt-3 p-2 bg-primary/5 rounded-md border border-primary/20">
          <p className="text-sm font-medium text-primary flex items-center gap-2">
            <Car className="w-4 h-4" />
            {displayValue}
          </p>
        </div>
      )}
    </div>
  );
};

export const getVehicleDisplayName = (vehicle: Vehicle, index: number): string => {
  if (vehicle.year && vehicle.make && vehicle.model) {
    return `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  }
  if (vehicle.make && vehicle.model) {
    return `${vehicle.make} ${vehicle.model}`;
  }
  return `Vehicle ${index + 1}`;
};

export const isVehicleComplete = (vehicle: Vehicle): boolean => {
  return vehicle.make.length > 0 && vehicle.model.length > 0 && !vehicle.vinLookupLoading;
};
