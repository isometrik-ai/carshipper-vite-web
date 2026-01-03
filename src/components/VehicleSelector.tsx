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

// Popular vehicle makes with their models
const VEHICLE_DATA: Record<string, string[]> = {
  "Acura": ["ILX", "Integra", "MDX", "NSX", "RDX", "RLX", "TL", "TLX", "TSX"],
  "Alfa Romeo": ["Giulia", "Stelvio", "4C", "Tonale"],
  "Aston Martin": ["DB11", "DBS", "Vantage", "DBX"],
  "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "Q3", "Q5", "Q7", "Q8", "e-tron", "RS3", "RS5", "RS6", "RS7", "S3", "S4", "S5", "TT"],
  "Bentley": ["Bentayga", "Continental GT", "Flying Spur"],
  "BMW": ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "i7", "iX", "M2", "M3", "M4", "M5", "M8"],
  "Buick": ["Enclave", "Encore", "Encore GX", "Envision"],
  "Cadillac": ["CT4", "CT5", "Escalade", "Lyriq", "XT4", "XT5", "XT6"],
  "Chevrolet": ["Blazer", "Bolt", "Camaro", "Colorado", "Corvette", "Equinox", "Malibu", "Silverado", "Suburban", "Tahoe", "Traverse", "Trailblazer", "Trax"],
  "Chrysler": ["300", "Pacifica", "Voyager"],
  "Dodge": ["Challenger", "Charger", "Durango", "Hornet"],
  "Ferrari": ["296 GTB", "812", "F8", "Portofino", "Purosangue", "Roma", "SF90"],
  "Fiat": ["500", "500X"],
  "Ford": ["Bronco", "Bronco Sport", "Edge", "Escape", "Expedition", "Explorer", "F-150", "Maverick", "Mustang", "Mustang Mach-E", "Ranger", "Transit"],
  "Genesis": ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
  "GMC": ["Acadia", "Canyon", "Hummer EV", "Sierra", "Terrain", "Yukon"],
  "Honda": ["Accord", "Civic", "CR-V", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Ridgeline"],
  "Hyundai": ["Elantra", "Ioniq", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson", "Venue"],
  "Infiniti": ["Q50", "Q60", "QX50", "QX55", "QX60", "QX80"],
  "Jaguar": ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "XE", "XF"],
  "Jeep": ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Grand Wagoneer", "Renegade", "Wagoneer", "Wrangler"],
  "Kia": ["Carnival", "EV6", "Forte", "K5", "Niro", "Seltos", "Sorento", "Soul", "Sportage", "Stinger", "Telluride"],
  "Lamborghini": ["Huracan", "Urus", "Revuelto"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  "Lexus": ["ES", "GX", "IS", "LC", "LS", "LX", "NX", "RX", "RZ", "UX"],
  "Lincoln": ["Aviator", "Corsair", "Nautilus", "Navigator"],
  "Lucid": ["Air"],
  "Maserati": ["Ghibli", "Grecale", "Levante", "MC20", "Quattroporte"],
  "Mazda": ["CX-30", "CX-5", "CX-50", "CX-9", "CX-90", "Mazda3", "MX-5 Miata", "MX-30"],
  "McLaren": ["570S", "720S", "Artura", "GT"],
  "Mercedes-Benz": ["A-Class", "C-Class", "CLA", "CLS", "E-Class", "EQB", "EQE", "EQS", "G-Class", "GLA", "GLB", "GLC", "GLE", "GLS", "S-Class", "SL", "AMG GT"],
  "Mini": ["Clubman", "Convertible", "Countryman", "Hardtop"],
  "Mitsubishi": ["Eclipse Cross", "Mirage", "Outlander", "Outlander Sport"],
  "Nissan": ["Altima", "Armada", "Frontier", "GT-R", "Kicks", "Leaf", "Maxima", "Murano", "Pathfinder", "Rogue", "Sentra", "Titan", "Versa", "Z"],
  "Polestar": ["1", "2", "3"],
  "Porsche": ["718 Boxster", "718 Cayman", "911", "Cayenne", "Macan", "Panamera", "Taycan"],
  "Ram": ["1500", "2500", "3500", "ProMaster"],
  "Rivian": ["R1S", "R1T"],
  "Rolls-Royce": ["Cullinan", "Dawn", "Ghost", "Phantom", "Spectre", "Wraith"],
  "Subaru": ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "Solterra", "WRX"],
  "Tesla": ["Model 3", "Model S", "Model X", "Model Y", "Cybertruck"],
  "Toyota": ["4Runner", "Avalon", "bZ4X", "Camry", "Corolla", "Crown", "GR Supra", "GR86", "Highlander", "Land Cruiser", "Prius", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra", "Venza"],
  "Volkswagen": ["Arteon", "Atlas", "Golf", "ID.4", "Jetta", "Passat", "Taos", "Tiguan"],
  "Volvo": ["C40", "S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
};

const MAKES = Object.keys(VEHICLE_DATA).sort();

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

interface VehicleSelectorProps {
  vehicle: Vehicle;
  index: number;
  showRemove: boolean;
  onUpdate: (updates: Partial<Vehicle>) => void;
  onRemove: () => void;
}

export const VehicleSelector = ({
  vehicle,
  index,
  showRemove,
  onUpdate,
  onRemove,
}: VehicleSelectorProps) => {
  const [makeModelOpen, setMakeModelOpen] = useState(false);

  // Build make/model options for combobox
  const makeModelOptions = useMemo(() => {
    const options: { value: string; label: string; make: string; model: string }[] = [];
    for (const make of MAKES) {
      for (const model of VEHICLE_DATA[make]) {
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
            placeholder="Enter 17-character VIN"
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
        <span className="text-xs text-muted-foreground">or select manually</span>
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
                  : "Search make & model..."}
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
