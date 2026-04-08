import { useEffect, useMemo, useState } from "react";
import { Car, Pencil, Trash2, Plus, Scan, CarFront, CheckCircle2, Briefcase, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { VinNumberDetails } from "@/services/quote-services";
import { QUOTE_PERSONAL_ITEMS_OPTIONS } from "@/components/VehicleSelector";

export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  type: string;
  operational: boolean;
  personalItems: string;
  vin?: string;
}

interface EditVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicles: Vehicle[];
  onSave: (vehicles: Vehicle[]) => void;
}

const years = Array.from({ length: 30 }, (_, i) => 2026 - i);
const makes = ["Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "Nissan", "Porsche", "Ram", "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"];
const vehicleTypes = ["Sedan", "SUV", "Truck", "Van", "Coupe", "Convertible", "Wagon", "Hatchback", "Motorcycle"];
const personalItemsOptions = useMemo(() => QUOTE_PERSONAL_ITEMS_OPTIONS, []);

export function EditVehicleDialog({
  open,
  onOpenChange,
  vehicles,
  onSave,
}: EditVehicleDialogProps) {
  const [localVehicles, setLocalVehicles] = useState<Vehicle[]>(vehicles);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [vinInput, setVinInput] = useState("");
  const [vinLookupLoading, setVinLookupLoading] = useState(false);
  const [addMethod, setAddMethod] = useState<"manual" | "vin">("manual");

  useEffect(() => {
    if (!open) return;
    setLocalVehicles(vehicles);
    setEditingVehicle(null);
    setIsAddingNew(false);
    setVinInput("");
    setAddMethod("manual");
  }, [open, vehicles]);

  // Form state for new/edit vehicle
  const [formData, setFormData] = useState<Partial<Vehicle>>({
    year: 2026,
    make: "",
    model: "",
    type: "SUV",
    operational: true,
    personalItems: "None or less than 100 lbs.",
  });

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle);
    setIsAddingNew(true);
    setAddMethod("manual");
  };

  const handleDeleteVehicle = (id: string) => {
    setLocalVehicles(localVehicles.filter(v => v.id !== id));
  };

  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setFormData({
      year: 2026,
      make: "",
      model: "",
      type: "SUV",
      operational: true,
      personalItems: "None or less than 100 lbs.",
    });
    setVinInput("");
    setIsAddingNew(true);
    setAddMethod("manual");
  };

  const handleVinDetect = async () => {
    if (vinInput.length !== 17) {
      toast.error("VIN must be exactly 17 characters");
      return;
    }

    if (vinLookupLoading) return; // Prevent overlapping requests
    setVinLookupLoading(true);

    try {
      const response = await VinNumberDetails({ vin: vinInput });
      const data = response?.data;

      if (data && Object.keys(data).length > 0) {
        const yearStr = data?.year || "";
        const make = data?.make || "";
        const model = data?.model || "";

        if (make && model) {
          const parsedYear = yearStr ? parseInt(yearStr, 10) : undefined;
          setFormData((prev) => ({
            ...prev,
            year: parsedYear || prev.year || 2026,
            make,
            model,
            type: prev.type || "SUV",
            operational: prev.operational ?? true,
            personalItems: prev.personalItems || "None or less than 100 lbs.",
            vin: vinInput,
          }));
          toast.success("Vehicle details found!");
          setAddMethod("manual");
        } else {
          toast.error("Could not decode VIN. Please enter details manually.");
        }
      } else {
        toast.error("VIN lookup failed. Please enter details manually.");
      }
    } catch (error) {
      toast.error("VIN lookup failed. Please enter details manually.");
    } finally {
      setVinLookupLoading(false);
    }
  };

  const handleSaveVehicle = () => {
    if (!formData.make || !formData.model) return;

    const newVehicle: Vehicle = {
      id: editingVehicle?.id || `vehicle-${Date.now()}`,
      year: formData.year || 2026,
      make: formData.make || "",
      model: formData.model || "",
      type: formData.type || "SUV",
      operational: formData.operational ?? true,
      personalItems: formData.personalItems || "None or less than 100 lbs.",
      vin: formData.vin,
    };

    if (editingVehicle) {
      setLocalVehicles(localVehicles.map(v => v.id === editingVehicle.id ? newVehicle : v));
    } else {
      setLocalVehicles([...localVehicles, newVehicle]);
    }

    setIsAddingNew(false);
    setEditingVehicle(null);
  };

  const handleSave = () => {
    onSave(localVehicles);
    onOpenChange(false);
  };

  if (isAddingNew) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="text-center gap-4 pb-4">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-xl font-bold">
               {editingVehicle ? "Edit Vehicle" : "Add Vehicle"}
              </DialogTitle>
              <div className="w-6 h-6 rounded-full bg-muted flex ">
                <Car className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>
          </DialogHeader>

          <Tabs value={addMethod} onValueChange={(v) => setAddMethod(v as "manual" | "vin")} className="overflow-y-auto pr-1">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="manual" className="gap-2">
                <CarFront className="w-4 h-4" />
                Manual Entry
              </TabsTrigger>
              <TabsTrigger value="vin" className="gap-2">
                <Scan className="w-4 h-4" />
                VIN Detection
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vin" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Enter VIN Number</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter 17-character VIN"
                    value={vinInput}
                    onChange={(e) => setVinInput(e.target.value.toUpperCase())}
                    maxLength={17}
                    disabled={vinLookupLoading}
                  />
                  <Button
                    onClick={handleVinDetect}
                    disabled={vinInput.length !== 17 || vinLookupLoading}
                  >
                    {vinLookupLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Detect"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter your vehicle's VIN to automatically detect year, make, and model.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label>Year</Label>
                  <Select
                    value={String(formData.year)}
                    onValueChange={(v) => setFormData({ ...formData, year: parseInt(v) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Make</Label>
                  <Select
                    value={formData.make}
                    onValueChange={(v) => setFormData({ ...formData, make: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {makes.map(make => (
                        <SelectItem key={make} value={make}>{make}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Model</Label>
                  <Input
                    placeholder="e.g. Encore"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Vehicle Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(v) => setFormData({ ...formData, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {vehicleTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Is the vehicle operational?</Label>
                <RadioGroup
                  value={formData.operational ? "yes" : "no"}
                  onValueChange={(v) => setFormData({ ...formData, operational: v === "yes" })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="op-yes" />
                    <Label htmlFor="op-yes">Yes (Runs and Drives)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="op-no" />
                    <Label htmlFor="op-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Personal Items</Label>
                <Select
                  value={formData.personalItems}
                  onValueChange={(v) => setFormData({ ...formData, personalItems: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {personalItemsOptions.map(option => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => setIsAddingNew(false)}>
              Back
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleSaveVehicle}
              disabled={!formData.make || !formData.model}
            >
              {editingVehicle ? "Save" : "Add"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="text-center pb-4">
          <div className="flex items-center gap-4 pb-4">
            <DialogTitle className="text-xl font-bold">Vehicle(s)</DialogTitle>
            <div className=" w-12 h-12 rounded-full bg-muted flex items-center justify-center ">
              <Car className="w-6 h-6 text-muted-foreground" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Add/remove vehicle(s) that will be shipped together on this order.
          </p>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto pr-1">
          {localVehicles.map((vehicle) => (
            <div key={vehicle.id} className="border rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-muted-foreground">Make/Model</p>
                  <p className="text-lg font-bold">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditVehicle(vehicle)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                    disabled={localVehicles.length === 1}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="border-t pt-3 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <CarFront className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle Type</p>
                    <p className="font-medium">{vehicle.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Operational</p>
                    <p className="font-medium">{vehicle.operational ? "Yes" : "No"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Personal Items</p>
                    <p className="font-medium">{vehicle.personalItems}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddVehicle}
            className="flex items-center gap-2 text-primary font-medium hover:underline"
          >
            <Plus className="w-4 h-4" />
            Add Vehicle
            <span className="text-emerald-500">$</span>
          </button>
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
