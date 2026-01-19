import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Lock, ArrowRight, ArrowLeft, Plus, MapPin, Check, X, Truck, Shield, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { VehicleSelector, Vehicle, getVehicleDisplayName, isVehicleComplete } from "./VehicleSelector";
import { useQuoteForm } from "@/api/quoteForm";
import { getIcon } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";
import { PageSkeleton } from "./ui/page-skeleton";

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
  const { data, isLoading: isConfigLoading } = useQuoteForm();
  const [currentStep, setCurrentStep] = useState<Step>("vehicles");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Extract form config with fallbacks
  const formConfig = useMemo(() => {
    const config = data?.data?.form_config;
    return {
      progressBadgeText: config?.progress_badge_text || "⚡ Quote in 30 minutes",
      footerMessage: config?.footer_message || "No credit card required. Expert-verified quote in 30 minutes.",
      successTitle: config?.success_title || "Quote request submitted!",
      successDescription: config?.success_description || "We'll get back to you within 30 minutes with your personalized quote.",
      successToastTitle: config?.success_toast_title || "Quote request submitted!",
      successToastDescription: config?.success_toast_description || "We'll get back to you within 30 minutes with your personalized quote.",
      stepCounterFormat: config?.step_counter_format || "Step {current} of {total}",
      deliveryLocationLabelSingle: config?.delivery_location_label_single || "Delivery Location",
      deliveryLocationLabelMultiple: config?.delivery_location_label_multiple || "Delivery #{index}",
      steps: config?.steps || [],
      timeframeOptions: config?.timeframe_options || [],
      transportTypeOptions: config?.transport_type_options || [],
      buttonTexts: config?.button_texts || {
        back_button: "Back",
        next_button: "Next",
        submit_button: "Get My Quote",
        submitting_text: "Submitting...",
        add_vehicle_button: "Add Another Vehicle",
        add_drop_location_button: "Add Another Delivery Location",
        vin_lookup_button: "Lookup",
      },
      runningStatusOptions: config?.running_status_options || [],
      vehicleFieldConfig: config?.vehicle_field_config,
    };
  }, [data]);

  // Transform vehicle_data from Strapi format to Record<string, string[]>
  const vehicleData = useMemo(() => {
    if (!data?.data?.form_config?.vehicle_data || data.data.form_config.vehicle_data.length === 0) {
      return undefined; // Will use fallback in VehicleSelector
    }

    const vehicleDataMap: Record<string, string[]> = {};
    data.data.form_config.vehicle_data.forEach((make) => {
      if (make.make_name && make.models && make.models.length > 0) {
        vehicleDataMap[make.make_name] = make.models.map((model) => model.model_name);
      }
    });

    return vehicleDataMap;
  }, [data]);

  // Get step order from API or use default
  const STEPS = useMemo(() => {
    if (formConfig.steps.length > 0) {
      return formConfig.steps.map((step) => step.step_key as Step);
    }
    return ["vehicles", "running", "pickup", "drops", "transport", "timeframe", "contact"] as Step[];
  }, [formConfig.steps]);

  // Get current step config
  const currentStepConfig = useMemo(() => {
    return formConfig.steps.find((step) => step.step_key === currentStep);
  }, [formConfig.steps, currentStep]);

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

  // Format step counter text
  const stepCounterText = useMemo(() => {
    return formConfig.stepCounterFormat
      .replace("{current}", (currentStepIndex + 1).toString())
      .replace("{total}", STEPS.length.toString());
  }, [formConfig.stepCounterFormat, currentStepIndex, STEPS.length]);

  const addVehicle = useCallback(() => {
    setVehicles([...vehicles, { id: Date.now().toString(), year: "", make: "", model: "", isRunning: null, vin: "", vinLookupLoading: false }]);
  }, [vehicles]);


  const removeVehicle = useCallback((id: string) => {
    if (vehicles.length > 1) {
      setVehicles(vehicles.filter(v => v.id !== id));
      // Also remove from drop locations
      setDropLocations(drops => drops.map(d => ({
        ...d,
        vehicleIds: d.vehicleIds.filter(vid => vid !== id)
      })));
    }
  }, [vehicles]);

  const updateVehicle = useCallback((id: string, updates: Partial<Vehicle>) => {
    setVehicles(vehicles.map(v => v.id === id ? { ...v, ...updates } : v));
  }, [vehicles]);

  const addDropLocation = useCallback(() => {
    setDropLocations([...dropLocations, { id: Date.now().toString(), location: "", vehicleIds: [] }]);
  }, [dropLocations]);

  const removeDropLocation = useCallback((id: string) => {
    if (dropLocations.length > 1) {
      setDropLocations(dropLocations.filter(d => d.id !== id));
    }
  }, [dropLocations]);

  const updateDropLocation = useCallback((id: string, updates: Partial<DropLocation>) => {
    setDropLocations(dropLocations.map(d => d.id === id ? { ...d, ...updates } : d));
  }, [dropLocations]);

  const canProceed = useCallback((): boolean => {
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
  }, [currentStep, vehicles, pickupLocation, dropLocations, transportType, timeframe, contactInfo]);

  const nextStep = useCallback(() => {
    const idx = STEPS.indexOf(currentStep);
    if (idx < STEPS.length - 1) {
      setCurrentStep(STEPS[idx + 1]);
    }
  }, [currentStep, STEPS]);

  const prevStep = useCallback(() => {
    const idx = STEPS.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(STEPS[idx - 1]);
    }
  }, [currentStep, STEPS]);

  const handleSubmit = async () => {
    if (!canProceed()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success(formConfig.successToastTitle, {
      description: formConfig.successToastDescription,
    });

    setIsSubmitting(false);
  };

  // Get field value helper
  const getFieldValue = useCallback((fieldKey: string, stepKey: string): string | null => {
    const step = formConfig.steps.find(s => s.step_key === stepKey);
    const field = step?.fields.find(f => f.field_key === fieldKey);
    return field?.label || field?.placeholder || null;
  }, [formConfig.steps]);

  // Show loading state if config is loading
  if (isConfigLoading && !data) {
    return (
      <div className="flex-1" role="main" aria-label="Main content">
        <PageSkeleton />
      </div>
    );
  }

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
            {formConfig.progressBadgeText}
          </span>
          <span className="text-sm text-muted-foreground">
            {stepCounterText}
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
              {currentStepConfig?.step_title || "Vehicle Details"}
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              {currentStepConfig?.step_description || "Enter VIN to auto-fill or select year, make & model"}
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
                  vehicleFieldConfig={formConfig.vehicleFieldConfig || {
                    id: 0,
                    vehicle_label_format: "Vehicle {index}",
                    vin_label: "VIN Number (optional - auto-fills details)",
                    vin_placeholder: "Enter 17-character VIN",
                    vin_lookup_button: "Lookup",
                    manual_select_divider: "or select manually",
                    year_label: "Year",
                    year_placeholder: "Select year",
                    make_model_label: "Make & Model",
                    make_model_placeholder: "Search make & model...",
                  }}
                  vehicleData={vehicleData}
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
              {formConfig.buttonTexts.add_vehicle_button}
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
              {currentStepConfig?.step_title || "Vehicle Condition"}
            </h2>

            <div className="space-y-6">
              {vehicles.map((vehicle, index) => {
                const runningQuestion = currentStepConfig?.running_question_text || "Is it running?";
                const runningOptions = formConfig.runningStatusOptions.length > 0
                  ? formConfig.runningStatusOptions
                  : [
                    { id: 1, value: true, label: "Running", icon_name: "checkCircle" },
                    { id: 2, value: false, label: "Not Running", icon_name: "x" },
                  ];

                return (
                  <div key={vehicle.id} className="p-4 bg-muted/50 rounded-lg">
                    <p className="font-medium mb-3">
                      {getVehicleDisplayName(vehicle, index)} - {runningQuestion}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {runningOptions.map((option) => {
                        const isSelected = vehicle.isRunning === option.value;
                        const isRunning = option.value === true;
                        const IconComponent = getIcon(option.icon_name) as LucideIcon;

                        return (
                          <button
                            key={option.id || option.label}
                            type="button"
                            onClick={() => updateVehicle(vehicle.id, { isRunning: option.value as boolean | null })}
                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                              ${isSelected
                                ? isRunning
                                  ? 'border-success bg-success/10 text-success'
                                  : 'border-destructive bg-destructive/10 text-destructive'
                                : 'border-border hover:border-muted-foreground'}`}
                          >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center
                              ${isSelected
                                ? isRunning
                                  ? 'bg-success text-success-foreground'
                                  : 'bg-destructive text-destructive-foreground'
                                : 'bg-muted'}`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <span className="font-medium">{option.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
              {currentStepConfig?.step_title || "Pickup Location"}
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              {currentStepConfig?.step_description || "Enter the city or zipcode of your pickup location"}
            </p>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={getFieldValue("pickup_location", "pickup") || "e.g., Dallas, TX or 10007"}
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
              {currentStepConfig?.step_title || `Delivery Location${dropLocations.length > 1 ? 's' : ''}`}
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              {vehicles.length > 1
                ? (currentStepConfig?.dynamic_description || "Add multiple delivery locations if vehicles go to different places")
                : (currentStepConfig?.step_description || "Enter where you want your vehicle delivered")}
            </p>

            <div className="space-y-4">
              {dropLocations.map((drop, index) => (
                <div key={drop.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex gap-3 items-start">
                    <div className="flex-1">
                      <Label className="text-sm font-medium">
                        {dropLocations.length > 1
                          ? formConfig.deliveryLocationLabelMultiple.replace("{index}", (index + 1).toString())
                          : formConfig.deliveryLocationLabelSingle}
                      </Label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder={getFieldValue("drop_location", "drops") || "e.g., Los Angeles, CA or 90210"}
                          value={drop.location}
                          onChange={(e) => updateDropLocation(drop.id, { location: e.target.value })}
                          className="pl-9"
                        />
                      </div>
                    </div>
                    {dropLocations.length > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-6 text-destructive hover:text-destructive"
                        onClick={() => removeDropLocation(drop.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    ) : null}
                  </div>

                  {vehicles.length > 1 && dropLocations.length > 1 ? (
                    <div className="mt-3">
                      <Label className="text-xs text-muted-foreground">
                        {currentStepConfig?.vehicle_assignment_question || "Which vehicles to this location?"}
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
                  ) : null}
                </div>
              ))}
            </div>

            {vehicles.length > 1 ? (
              <Button
                type="button"
                variant="outline"
                className="w-full mt-4"
                onClick={addDropLocation}
              >
                <Plus className="w-4 h-4 mr-2" />
                {formConfig.buttonTexts.add_drop_location_button}
              </Button>
            ) : null}
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
              {currentStepConfig?.step_title || "Transportation Type"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {formConfig.transportTypeOptions.map((option) => {
                const isSelected = transportType === option.value;
                const IconComponent = getIcon(option.icon_name) as LucideIcon;

                return (
                  <button
                    key={option.id || option.value}
                    type="button"
                    onClick={() => setTransportType(option.value as "open" | "enclosed")}
                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3
                      ${isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground'}`}
                  >
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center
                      ${isSelected ? 'bg-primary/10' : 'bg-muted'}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <span className="font-semibold">{option.label}</span>
                    {option.description ? (
                      <span className="text-xs text-muted-foreground text-center">
                        {option.description}
                      </span>
                    ) : null}
                  </button>
                );
              })}
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
              {currentStepConfig?.step_title || "Pickup Timeframe"}
            </h2>

            <RadioGroup value={timeframe} onValueChange={setTimeframe}>
              <div className="space-y-3">
                {formConfig.timeframeOptions.map((option) => (
                  <label
                    key={option.id || option.value}
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
              {currentStepConfig?.step_title || "Your Contact Info"}
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              {currentStepConfig?.step_description || "We'll send your quote to this email"}
            </p>

            <div className="space-y-4">
              {currentStepConfig?.fields.map((field) => {
                const fieldId = `contact-${field.field_key}`;
                const isRequired = field.is_required;
                const fieldValue = contactInfo[field.field_key as keyof typeof contactInfo] || "";

                return (
                  <div key={field.id || field.field_key}>
                    <Label htmlFor={fieldId}>
                      {field.label || field.field_key}
                      {!isRequired ? <span className="text-muted-foreground"> (optional)</span> : null}
                    </Label>
                    <Input
                      id={fieldId}
                      type={field.field_key === "email" ? "email" : field.field_key === "phone" ? "tel" : "text"}
                      placeholder={field.placeholder || ""}
                      value={fieldValue}
                      onChange={(e) => setContactInfo({ ...contactInfo, [field.field_key]: e.target.value })}
                      className="mt-1"
                      required={isRequired}
                    />
                    {field.helper_text ? (
                      <p className="text-xs text-muted-foreground mt-1">{field.helper_text}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex gap-3 mt-8">
        {currentStepIndex > 0 ? (
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={prevStep}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {formConfig.buttonTexts.back_button}
          </Button>
        ) : null}

        {currentStep === "contact" ? (
          <Button
            type="button"
            variant="hero"
            size="lg"
            className="flex-1"
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-success-foreground border-t-transparent rounded-full"
                />
                {formConfig.buttonTexts.submitting_text}
              </span>
            ) : (
              <>
                {formConfig.buttonTexts.submit_button}
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
            {formConfig.buttonTexts.next_button}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        )}
      </div>

      <p className="text-sm text-muted-foreground text-center mt-4 flex items-center justify-center gap-2">
        <Lock className="w-4 h-4" />
        {formConfig.footerMessage}
      </p>
    </motion.div>
  );
};

export default QuoteForm;
