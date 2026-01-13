import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, ArrowRight, ArrowLeft, Plus, MapPin, Check, X, Truck, Shield, Trash2, CloudCog } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { VehicleSelector, Vehicle, getVehicleDisplayName, isVehicleComplete } from "./VehicleSelector";
import { useQuoteFormConfig } from "@/hooks/api/useQuoteFormConfig";
import { StepConfig, FormOption } from "@/types/quote-form.types";

interface QuoteFormProps {
  defaultOrigin?: string;
  defaultDestination?: string;
}

interface DropLocation {
  id: string;
  location: string;
  vehicleIds: string[];
}

type Step = "vehicles" | "running" | "pickup" | "drops" | "transport" | "timeframe" | "contact";

const QuoteForm = ({ defaultOrigin = "", defaultDestination = "" }: QuoteFormProps) => {
  // Fetch dynamic configuration via React Query
  const { data: configResponse, isLoading: isConfigLoading } = useQuoteFormConfig();
  const config = configResponse;

  const [currentStep, setCurrentStep] = useState<Step>("vehicles");
  const [isLoading, setIsLoading] = useState(false);

  // Vehicles
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: "1", year: "", make: "", model: "", isRunning: null, vin: "", vinLookupLoading: false }
  ]);

  // Locations
  const [pickupLocation, setPickupLocation] = useState(defaultOrigin);
  const [dropLocations, setDropLocations] = useState<DropLocation[]>([
    { id: "1", location: defaultDestination, vehicleIds: [] }
  ]);

  // Transport options
  const [transportType, setTransportType] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState("");

  // Contact info
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" });

  // Map JSON metadata to Step Titles and Descriptions
  const stepMeta = useMemo(() => {
    const defaultMeta: Record<Step, { title: string; description: string }> = {
      vehicles: { title: "Vehicle Details", description: "" },
      running: { title: "Vehicle Condition", description: "" },
      pickup: { title: "Pickup Location", description: "" },
      drops: { title: "Delivery Location", description: "" },
      transport: { title: "Transportation Type", description: "" },
      timeframe: { title: "Pickup Timeframe", description: "" },
      contact: { title: "Your Contact Info", description: "" },
    };

    config?.steps_config?.forEach((s: StepConfig) => {
      if (s.step_key in defaultMeta) {
        defaultMeta[s.step_key as Step] = { title: s.title, description: s.description };
      }
    });
    return defaultMeta;
  }, [config]);

  const steps: Step[] = ["vehicles", "running", "pickup", "drops", "transport", "timeframe", "contact"];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  if (isConfigLoading || !config) {
    return <div className="h-[400px] flex items-center justify-center text-muted-foreground">Loading form configuration...</div>;
  }

  // Original Logic Handlers
  const addVehicle = () => {
    setVehicles([...vehicles, { id: Date.now().toString(), year: "", make: "", model: "", isRunning: null, vin: "", vinLookupLoading: false }]);
  };

  const removeVehicle = (id: string) => {
    if (vehicles.length > 1) {
      setVehicles(vehicles.filter(v => v.id !== id));
      setDropLocations(drops => drops.map(d => ({ ...d, vehicleIds: d.vehicleIds.filter(vid => vid !== id) })));
    }
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const addDropLocation = () => {
    setDropLocations([...dropLocations, { id: Date.now().toString(), location: "", vehicleIds: [] }]);
  };

  const removeDropLocation = (id: string) => {
    if (dropLocations.length > 1) setDropLocations(dropLocations.filter(d => d.id !== id));
  };

  const updateDropLocation = (id: string, updates: Partial<DropLocation>) => {
    setDropLocations(dropLocations.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case "vehicles": return vehicles.every(v => isVehicleComplete(v));
      case "running": return vehicles.every(v => v.isRunning !== null);
      case "pickup": return pickupLocation.trim().length > 0;
      case "drops": return dropLocations.every(d => d.location.trim().length > 0);
      case "transport": return transportType !== null;
      case "timeframe": return timeframe !== "";
      case "contact": return contactInfo.name.trim().length > 0 && contactInfo.email.trim().length > 0;
      default: return true;
    }
  };

  const nextStep = () => { if (currentStepIndex < steps.length - 1) setCurrentStep(steps[currentStepIndex + 1]); };
  const prevStep = () => { if (currentStepIndex > 0) setCurrentStep(steps[currentStepIndex - 1]); };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Quote request submitted!");
    setIsLoading(false);
  };

  const stepVariants = { enter: { opacity: 0, x: 20 }, center: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-success/10 text-success text-xs font-semibold px-2 py-1 rounded-full">
            {config.banner_timer_text}
          </span>
          <span className="text-sm text-muted-foreground">Step {currentStepIndex + 1} of {steps.length}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentStep} variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
          <h2 className="text-2xl font-bold text-card-foreground mb-2 text-center">{stepMeta[currentStep].title}</h2>
          <p className="text-muted-foreground text-center mb-6">{stepMeta[currentStep].description}</p>

          {currentStep === "vehicles" && (
            <>
              <div className="space-y-6">
                {vehicles.map((vehicle, index) => (
                  <VehicleSelector
                    key={vehicle.id} vehicle={vehicle} index={index} showRemove={vehicles.length > 1}
                    onUpdate={(updates) => updateVehicle(vehicle.id, updates)}
                    onRemove={() => removeVehicle(vehicle.id)}
                    vehicleData={config.VEHICLE_DATA}
                    vinLookupLabel={config.vin_lookup_label}
                    vinPlaceholder={config.vin_placeholder}
                    manualDividerText={config.manual_divider_text}
                    makeModelPlaceholder={config.make_model_placeholder}
                  />
                ))}
              </div>
              <Button type="button" variant="outline" className="w-full mt-4" onClick={addVehicle}><Plus className="w-4 h-4 mr-2" /> Add Another Vehicle</Button>
            </>
          )}

          {currentStep === "running" && (
            <div className="space-y-6">
              {vehicles.map((vehicle, index) => (
                <div key={vehicle.id} className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium mb-3">{getVehicleDisplayName(vehicle, index)} - Is it running?</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button type="button" onClick={() => updateVehicle(vehicle.id, { isRunning: true })} className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${vehicle.isRunning === true ? 'border-success bg-success/10 text-success' : 'border-border hover:border-muted-foreground'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${vehicle.isRunning === true ? 'bg-success text-success-foreground' : 'bg-muted'}`}><Check className="w-6 h-6" /></div>
                      <span className="font-medium">Running</span>
                    </button>
                    <button type="button" onClick={() => updateVehicle(vehicle.id, { isRunning: false })} className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${vehicle.isRunning === false ? 'border-destructive bg-destructive/10 text-destructive' : 'border-border hover:border-muted-foreground'}`}>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${vehicle.isRunning === false ? 'bg-destructive text-destructive-foreground' : 'bg-muted'}`}><X className="w-6 h-6" /></div>
                      <span className="font-medium">Not Running</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentStep === "pickup" && (
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="e.g., Dallas, TX or 10007" value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)} className="pl-10 h-14 text-lg" />
            </div>
          )}

          {currentStep === "drops" && (
            <div className="space-y-4">
              {dropLocations.map((drop, index) => (
                <div key={drop.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Label className="text-sm font-medium">Delivery {dropLocations.length > 1 ? `#${index + 1}` : 'Location'}</Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="e.g., Los Angeles, CA or 90210" value={drop.location} onChange={(e) => updateDropLocation(drop.id, { location: e.target.value })} className="pl-9" />
                      </div>
                    </div>
                    {dropLocations.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" className="mt-6 text-destructive" onClick={() => removeDropLocation(drop.id)}><Trash2 className="w-4 h-4" /></Button>
                    )}
                  </div>
                </div>
              ))}
              {vehicles.length > 1 && <Button type="button" variant="outline" className="w-full mt-4" onClick={addDropLocation}><Plus className="w-4 h-4 mr-2" /> Add Delivery Location</Button>}
            </div>
          )}

          {currentStep === "transport" && (
            <div className="grid grid-cols-2 gap-4">
              {config.transport_options.map((opt) => {
                const Icon = opt.value === "open" ? Truck : Shield;
                return (
                  <button key={opt.id} type="button" onClick={() => setTransportType(opt.value)} className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${transportType === opt.value ? 'border-primary bg-primary/5' : 'border-border'}`}>
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${transportType === opt.value ? 'bg-primary/10' : 'bg-muted'}`}><Icon className="w-8 h-8" /></div>
                    <span className="font-semibold">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {currentStep === "timeframe" && (
            <RadioGroup value={timeframe} onValueChange={setTimeframe} className="space-y-3">
              {config.timeframe_options.map((option) => (
                <label key={option.id} className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${timeframe === option.value ? 'border-primary bg-primary/5' : 'border-border'}`}>
                  <RadioGroupItem value={option.value} className="mr-4" />
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </RadioGroup>
          )}

          {currentStep === "contact" && (
            <div className="space-y-4">
              <div><Label htmlFor="name">Full Name *</Label><Input id="name" value={contactInfo.name} onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })} className="mt-1" required /></div>
              <div><Label htmlFor="email">Email Address *</Label><Input id="email" type="email" value={contactInfo.email} onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })} className="mt-1" required /></div>
              <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" type="tel" value={contactInfo.phone} onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })} className="mt-1" /></div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3 mt-8">
        {currentStepIndex > 0 && <Button type="button" variant="outline" className="flex-1" onClick={prevStep}><ArrowLeft className="w-4 h-4 mr-2" /> {config.back_button_text}</Button>}
        <Button type="button" variant="hero" size="lg" className={currentStepIndex === 0 ? "w-full" : "flex-1"} onClick={currentStep === "contact" ? handleSubmit : nextStep} disabled={!canProceed() || isLoading}>
          {isLoading ? "Submitting..." : (currentStep === "contact" ? config.submit_button_text : config.next_button_text)}
          {!isLoading && <ArrowRight className="w-5 h-5 ml-2" />}
        </Button>
      </div>

      <p className="text-sm text-muted-foreground text-center mt-4 flex items-center justify-center gap-2">
        <Lock className="w-4 h-4" /> {config.privacy_lock_text}
      </p>
    </motion.div>
  );
};

export default QuoteForm;