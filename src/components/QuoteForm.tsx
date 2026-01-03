import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, ArrowRight, ArrowLeft, Plus, MapPin, Check, X, Truck, Shield, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { VehicleSelector, Vehicle, getVehicleDisplayName, isVehicleComplete } from "./VehicleSelector";

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

const STEPS: Step[] = ["vehicles", "running", "pickup", "drops", "transport", "timeframe", "contact"];

const TIMEFRAME_OPTIONS = [
  { value: "asap", label: "ASAP, today or tomorrow" },
  { value: "1-2weeks", label: "Within the next 1-2 weeks" },
  { value: "3-4weeks", label: "Within the next 3-4 weeks" },
  { value: "1month+", label: "More than 1 month out" },
];

const QuoteForm = ({ defaultOrigin = "", defaultDestination = "" }: QuoteFormProps) => {
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
  const [transportType, setTransportType] = useState<"open" | "enclosed" | null>(null);
  const [timeframe, setTimeframe] = useState("");

  // Contact info
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const currentStepIndex = STEPS.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const addVehicle = () => {
    setVehicles([...vehicles, { id: Date.now().toString(), year: "", make: "", model: "", isRunning: null, vin: "", vinLookupLoading: false }]);
  };


  const removeVehicle = (id: string) => {
    if (vehicles.length > 1) {
      setVehicles(vehicles.filter(v => v.id !== id));
      // Also remove from drop locations
      setDropLocations(drops => drops.map(d => ({
        ...d,
        vehicleIds: d.vehicleIds.filter(vid => vid !== id)
      })));
    }
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updates } : v));
  };

  const addDropLocation = () => {
    setDropLocations([...dropLocations, { id: Date.now().toString(), location: "", vehicleIds: [] }]);
  };

  const removeDropLocation = (id: string) => {
    if (dropLocations.length > 1) {
      setDropLocations(dropLocations.filter(d => d.id !== id));
    }
  };

  const updateDropLocation = (id: string, updates: Partial<DropLocation>) => {
    setDropLocations(dropLocations.map(d => d.id === id ? { ...d, ...updates } : d));
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case "vehicles":
        return vehicles.every(v => isVehicleComplete(v));
      case "running":
        return vehicles.every(v => v.isRunning !== null);
      case "pickup":
        return pickupLocation.trim().length > 0;
      case "drops":
        return dropLocations.every(d => d.location.trim().length > 0);
      case "transport":
        return transportType !== null;
      case "timeframe":
        return timeframe !== "";
      case "contact":
        return contactInfo.name.trim().length > 0 && contactInfo.email.trim().length > 0;
      default:
        return true;
    }
  };

  const nextStep = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx < STEPS.length - 1) {
      setCurrentStep(STEPS[idx + 1]);
    }
  };

  const prevStep = () => {
    const idx = STEPS.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(STEPS[idx - 1]);
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Quote request submitted!", {
      description: "We'll get back to you within 30 minutes with your personalized quote.",
    });

    setIsLoading(false);
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden"
    >
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-success/10 text-success text-xs font-semibold px-2 py-1 rounded-full">
            ⚡ Quote in 30 minutes
          </span>
          <span className="text-sm text-muted-foreground">
            Step {currentStepIndex + 1} of {STEPS.length}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Vehicles */}
        {currentStep === "vehicles" && (
          <motion.div
            key="vehicles"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-2 text-center">
              Vehicle Details
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              Enter VIN to auto-fill or select year, make & model
            </p>

            <div className="space-y-6">
              {vehicles.map((vehicle, index) => (
                <VehicleSelector
                  key={vehicle.id}
                  vehicle={vehicle}
                  index={index}
                  showRemove={vehicles.length > 1}
                  onUpdate={(updates) => updateVehicle(vehicle.id, updates)}
                  onRemove={() => removeVehicle(vehicle.id)}
                />
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full mt-4"
              onClick={addVehicle}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Another Vehicle
            </Button>
          </motion.div>
        )}

        {/* Step 2: Running Status */}
        {currentStep === "running" && (
          <motion.div
            key="running"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              Vehicle Condition
            </h2>

            <div className="space-y-6">
              {vehicles.map((vehicle, index) => (
                <div key={vehicle.id} className="p-4 bg-muted/50 rounded-lg">
                  <p className="font-medium mb-3">
                    {getVehicleDisplayName(vehicle, index)} - Is it running?
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => updateVehicle(vehicle.id, { isRunning: true })}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                        ${vehicle.isRunning === true 
                          ? 'border-success bg-success/10 text-success' 
                          : 'border-border hover:border-muted-foreground'}`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center
                        ${vehicle.isRunning === true ? 'bg-success text-success-foreground' : 'bg-muted'}`}>
                        <Check className="w-6 h-6" />
                      </div>
                      <span className="font-medium">Running</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateVehicle(vehicle.id, { isRunning: false })}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                        ${vehicle.isRunning === false 
                          ? 'border-destructive bg-destructive/10 text-destructive' 
                          : 'border-border hover:border-muted-foreground'}`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center
                        ${vehicle.isRunning === false ? 'bg-destructive text-destructive-foreground' : 'bg-muted'}`}>
                        <X className="w-6 h-6" />
                      </div>
                      <span className="font-medium">Not Running</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Pickup Location */}
        {currentStep === "pickup" && (
          <motion.div
            key="pickup"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-2 text-center">
              Pickup Location
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              Enter the city or zipcode of your pickup location
            </p>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="e.g., Dallas, TX or 10007"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="pl-10 h-14 text-lg"
              />
            </div>
          </motion.div>
        )}

        {/* Step 4: Drop Locations */}
        {currentStep === "drops" && (
          <motion.div
            key="drops"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-2 text-center">
              Delivery Location{dropLocations.length > 1 ? 's' : ''}
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              {vehicles.length > 1 
                ? "Add multiple delivery locations if vehicles go to different places"
                : "Enter where you want your vehicle delivered"}
            </p>

            <div className="space-y-4">
              {dropLocations.map((drop, index) => (
                <div key={drop.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Label className="text-sm font-medium">
                        Delivery {dropLocations.length > 1 ? `#${index + 1}` : 'Location'}
                      </Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="e.g., Los Angeles, CA or 90210"
                          value={drop.location}
                          onChange={(e) => updateDropLocation(drop.id, { location: e.target.value })}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    {dropLocations.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-6 text-destructive hover:text-destructive"
                        onClick={() => removeDropLocation(drop.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {vehicles.length > 1 && dropLocations.length > 1 && (
                    <div className="mt-3">
                      <Label className="text-xs text-muted-foreground">
                        Which vehicles to this location?
                      </Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {vehicles.map((v, vIndex) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => {
                              const newIds = drop.vehicleIds.includes(v.id)
                                ? drop.vehicleIds.filter(id => id !== v.id)
                                : [...drop.vehicleIds, v.id];
                              updateDropLocation(drop.id, { vehicleIds: newIds });
                            }}
                            className={`px-3 py-1 text-sm rounded-full border transition-all
                              ${drop.vehicleIds.includes(v.id)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-border hover:border-primary'}`}
                          >
                            {getVehicleDisplayName(v, vIndex)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {vehicles.length > 1 && (
              <Button
                type="button"
                variant="outline"
                className="w-full mt-4"
                onClick={addDropLocation}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Another Delivery Location
              </Button>
            )}
          </motion.div>
        )}

        {/* Step 5: Transport Type */}
        {currentStep === "transport" && (
          <motion.div
            key="transport"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              Transportation Type
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTransportType("open")}
                className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3
                  ${transportType === "open" 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-muted-foreground'}`}
              >
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center
                  ${transportType === "open" ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Truck className="w-8 h-8" />
                </div>
                <span className="font-semibold">Open Carrier</span>
                <span className="text-xs text-muted-foreground text-center">
                  Most affordable option
                </span>
              </button>
              <button
                type="button"
                onClick={() => setTransportType("enclosed")}
                className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3
                  ${transportType === "enclosed" 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-muted-foreground'}`}
              >
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center
                  ${transportType === "enclosed" ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Shield className="w-8 h-8" />
                </div>
                <span className="font-semibold">Enclosed Carrier</span>
                <span className="text-xs text-muted-foreground text-center">
                  Premium protection
                </span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 6: Timeframe */}
        {currentStep === "timeframe" && (
          <motion.div
            key="timeframe"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-6 text-center">
              Pickup Timeframe
            </h2>

            <RadioGroup value={timeframe} onValueChange={setTimeframe}>
              <div className="space-y-3">
                {TIMEFRAME_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${timeframe === option.value 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-muted-foreground'}`}
                  >
                    <RadioGroupItem value={option.value} className="mr-4" />
                    <span className="font-medium">{option.label}</span>
                  </label>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        )}

        {/* Step 7: Contact Info */}
        {currentStep === "contact" && (
          <motion.div
            key="contact"
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-card-foreground mb-2 text-center">
              Your Contact Info
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              We'll send your quote to this email
            </p>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">
                  Phone Number <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-8">
        {currentStepIndex > 0 && (
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={prevStep}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        
        {currentStep === "contact" ? (
          <Button
            type="button"
            variant="hero"
            size="lg"
            className="flex-1"
            onClick={handleSubmit}
            disabled={!canProceed() || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-success-foreground border-t-transparent rounded-full"
                />
                Submitting...
              </span>
            ) : (
              <>
                Get My Quote
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            variant="hero"
            size="lg"
            className={currentStepIndex === 0 ? "w-full" : "flex-1"}
            onClick={nextStep}
            disabled={!canProceed()}
          >
            Next
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>

      <p className="text-sm text-muted-foreground text-center mt-4 flex items-center justify-center gap-2">
        <Lock className="w-4 h-4" />
        No credit card required. Expert-verified quote in 30 minutes.
      </p>
    </motion.div>
  );
};

export default QuoteForm;
