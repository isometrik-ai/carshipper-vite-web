import { useState } from "react";
import { 
  Check, Shield, Loader2, ChevronDown, ChevronUp,
  Calendar, Car, ArrowLeftIcon, ArrowRightIcon, User, Truck, CreditCard, DollarSign, MapPin, Building, Phone, CheckCircle, Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BookingFormData } from "@/containers/BookingPage";
import { cn } from "@/lib/utils";
import { EditPriceOptionDialog } from "@/components/ui/dialogs/EditPriceOptionDialog";
import { getStripe } from "@/utils/stripe-utils";
import AddNewCardsSection from "../addCards/addNewCard";
import { Elements } from "@stripe/react-stripe-js";
import RouteMap from "@/components/maps/RouteMap";

interface BookShipmentStepProps {
  formData: BookingFormData;
  updateFormData: (data: Partial<BookingFormData>) => void;
  onBack: () => void;
  onSubmit: () => Promise<void> | void;
  tier: "saver" | "priority" | "rush";
  price: number;
  onTierChange?: (tier: "saver" | "priority" | "rush", price: number) => void;
  quoteData: {
    vehicle: { year: number; make: string; model: string };
    origin: { addLine1:string, addLine2:string, city: string; state: string; zip: string };
    destination: { addLine1:string, addLine2:string, city: string; state: string; zip: string };
    earliestPickup: string;
    transportType: string;
    customer?: {
      name: string;
      email: string;
      phone: string;
    };
  };
}

const tierNames = {
  saver: "Saver Rate",
  priority: "Priority Rate",
  rush: "Rush Service",
};

const tierPrices = {
  saver: 931,
  priority: 1275,
  rush: 1900,
};

export function BookShipmentStep({
  formData,
  updateFormData,
  onBack,
  onSubmit,
  tier,
  price,
  onTierChange,
  quoteData,
}: BookShipmentStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [priceDialogOpen, setPriceDialogOpen] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

const handleSubmit = async () => {
    if (!formData.agreedToTerms || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit();
    } catch (error) {
      // Optionally, set an error state to inform the user
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePriceChange = (newTier: "saver" | "priority" | "rush") => {
    if (onTierChange) {
      onTierChange(newTier, tierPrices[newTier]);
    }
  };

  const shipperName =
    quoteData.customer?.name ||
    `${formData.firstName} ${formData.lastName}`.trim();
  const shipperEmail = quoteData.customer?.email || formData.email;
  const shipperPhone = quoteData.customer?.phone || formData.phone;

  const originAddress = [
    quoteData?.origin?.addLine1,
    quoteData?.origin?.addLine2,
    quoteData?.origin?.city,
    quoteData?.origin?.state,
    quoteData?.origin?.zip,
  ]
    .filter(Boolean)
    .join(", ");

  const destinationAddress = [
    quoteData?.destination?.addLine1,
    quoteData?.destination?.addLine2,
    quoteData?.destination?.city,
    quoteData?.destination?.state,
    quoteData?.destination?.zip,
  ]
    .filter(Boolean)
    .join(", ");
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* LEFT: Map & Agent */}
      <div className="space-y-6">
        {/* Route Display */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="space-y-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Pickup</p>
                <p className="font-semibold">
                  {quoteData?.origin?.addLine1}, 
                  {quoteData?.origin?.addLine2 ? `${quoteData?.origin?.addLine2}, ` :"" } 
                  {quoteData?.origin?.city}, 
                  {quoteData?.origin?.state}, 
                  {quoteData?.origin?.zip}
                  </p>
              </div>
            </div>
            <div className="ml-1.5 border-l-2 border-dashed border-muted-foreground/30 h-6" />
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Delivery</p>
                <p className="font-semibold">
                  {quoteData?.destination?.addLine1}, 
                  {quoteData?.destination?.addLine2 ? `${quoteData?.destination?.addLine2}, ` :"" } 
                  {quoteData?.destination?.city}, 
                  {quoteData?.destination?.state}, 
                  {quoteData?.destination?.zip}
                </p>
              </div>
            </div>
          </div>

          {/* Route Map: all geocoding and route rendering lives in RouteMap */}
          <RouteMap origin={originAddress} destination={destinationAddress} />
        </div>

        {/* Dedicated Agent */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <p className="text-sm text-muted-foreground mb-3">Your Dedicated Agent</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">David White</p>
              <p className="text-sm text-muted-foreground">Senior Logistics Agent</p>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2" asChild>
            <a href="tel:8005531828">
              📞 (800) 553-1828
            </a>
          </Button>
        </div>

        {/* Every Order Includes */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <h3 className="font-bold text-foreground mb-4">Every Order Includes:</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">CarShippers.ai Shield Network</p>
                <p className="text-sm text-muted-foreground">
                  Access to our nationwide network of dedicated, top-rated carriers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Full Insurance Coverage</p>
                <p className="text-sm text-muted-foreground">
                  Every shipment is fully insured for your vehicle's safety and peace of mind.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Priority Claims Support</p>
                <p className="text-sm text-muted-foreground">
                  Guided claims assistance with our dedicated support team for fast resolutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Order Overview & Terms */}
      <div className="space-y-6">
        {/* Order Overview */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="bg-muted/50 px-6 py-4 flex items-center gap-3">
            <Truck className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Order Overview</h2>
          </div>

          <div className="divide-y divide-border">
            {/* Earliest Pickup Date */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Earliest Pickup Date</p>
                  <p className="text-sm text-muted-foreground">{quoteData.earliestPickup}</p>
                </div>
              </div>
            </div>

            {/* Vehicles - Expandable */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Car className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Vehicle(s)</p>
                    <p className="text-sm text-muted-foreground">
                      {quoteData.vehicle.year} {quoteData.vehicle.make} {quoteData.vehicle.model} (Suv)
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSection("vehicles")}
                  className="text-primary text-sm font-medium flex items-center gap-1"
                >
                  {expandedSections.vehicles ? "Collapse" : "Expand"}
                  {expandedSections.vehicles ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
              {expandedSections.vehicles && (
                <div className="mt-4 ml-8 p-4 bg-muted/30 rounded-xl border-l-4 border-primary/30">
                  <p className="font-medium text-foreground">
                    {quoteData.vehicle.year} {quoteData.vehicle.make} {quoteData.vehicle.model} (Suv)
                  </p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-emerald-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Operational
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Package className="w-4 h-4" /> None or less than 100lbs of personal items
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Pickup From - Expandable */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ArrowLeftIcon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Pickup From</p>
                    <p className="text-sm text-muted-foreground">
                      {quoteData?.origin?.addLine1}, {quoteData?.origin?.addLine2 ? `${quoteData?.origin?.addLine2}, ` :"" } {quoteData?.origin?.city}, {quoteData?.origin?.state} {quoteData?.origin?.zip}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSection("pickup")}
                  className="text-primary text-sm font-medium flex items-center gap-1"
                >
                  {expandedSections.pickup ? "Collapse" : "Expand"}
                  {expandedSections.pickup ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
              {expandedSections.pickup && (
                <div className="mt-4 ml-8 p-4 bg-muted/30 rounded-xl border-l-4 border-primary/30 space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm text-foreground">
                      {quoteData?.origin?.addLine1}, {quoteData?.origin?.addLine2 ? `${quoteData?.origin?.addLine2}, ` :"" } {quoteData?.origin?.city}, {quoteData?.origin?.state} {quoteData?.origin?.zip}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm text-foreground">
                      {formData.pickupLocationType || "Business"} | {formData.pickupBusinessName || "Company"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-foreground">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {formData.pickupContactName || formData.firstName + " " + formData.lastName}
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {formData.pickupContactPhone || formData.phone}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Deliver To - Expandable */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ArrowRightIcon className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Deliver To</p>
                    <p className="text-sm text-muted-foreground">
                      {formData.deliveryAddress || "54 RBI Colony"}, {formData.deliveryCity}, {formData.deliveryState} {formData.deliveryZip}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSection("delivery")}
                  className="text-primary text-sm font-medium flex items-center gap-1"
                >
                  {expandedSections.delivery ? "Collapse" : "Expand"}
                  {expandedSections.delivery ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
              {expandedSections.delivery && (
                <div className="mt-4 ml-8 p-4 bg-muted/30 rounded-xl border-l-4 border-primary/30 space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm text-foreground">
                      {formData.deliveryAddress || "54 RBI Colony"}, {formData.deliveryCity}, {formData.deliveryState} {formData.deliveryZip}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm text-foreground">
                      {formData.deliveryLocationType || "Business"} | {formData.deliveryBusinessName || "Company"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-foreground">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {formData.deliveryContactName || formData.firstName + " " + formData.lastName}
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {formData.deliveryContactPhone || formData.phone}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Shipper - Expandable */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Shipper</p>
                    <p className="text-sm text-muted-foreground">
                      {shipperName}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleSection("shipper")}
                  className="text-primary text-sm font-medium flex items-center gap-1"
                >
                  {expandedSections.shipper ? "Collapse" : "Expand"}
                  {expandedSections.shipper ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
              {expandedSections.shipper && (
                <div className="mt-4 ml-8 p-4 bg-muted/30 rounded-xl border-l-4 border-primary/30 space-y-2">
                  <p className="text-sm text-foreground">
                    <span className="text-muted-foreground">Name:</span> {shipperName}
                  </p>
                  <p className="text-sm text-foreground">
                    <span className="text-muted-foreground">Email:</span> {shipperEmail}
                  </p>
                  <p className="text-sm text-foreground">
                    <span className="text-muted-foreground">Phone:</span> {shipperPhone}
                  </p>
                </div>
              )}
            </div>

            {/* Transport Type */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Transport Type</p>
                  <p className="text-sm text-muted-foreground">{quoteData.transportType}</p>
                </div>
              </div>
            </div>

            {/* Insurance */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Insurance</p>
                  <p className="text-sm text-muted-foreground">Included</p>
                </div>
              </div>
            </div>

            {/* Due Now */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Due Now</p>
                  <p className="text-sm">
                    <span className="text-emerald-600 font-bold">$0.00</span>
                    <span className="text-muted-foreground"> (Payment is only required once pickup is scheduled)</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="bg-muted/50 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">Payment Details</h2>
            </div>
            <Button variant="default" size="sm" onClick={() => setPriceDialogOpen(true)}>
              Change Price Option
            </Button>
          </div>

          <div className="p-6 space-y-4">
            {/* Selected Price Option */}
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">{tierNames[tier]}</p>
                  <p className="text-sm text-muted-foreground">Selected price option</p>
                </div>
              </div>
              <span className="text-xl font-bold text-foreground">${price}</span>
            </div>

            {/* Card Information Notice */}
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-amber-800 dark:text-amber-300">
                    Your card will NOT be charged today
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    We securely capture your card to reserve your booking. Your card is only charged once a carrier is assigned to your shipment—typically 24-72 hours before your pickup date. You'll be notified before any charge.
                  </p>
                </div>
              </div>
            </div>

            {/* Card Input Fields (Placeholder for Stripe) */}
            {/* <div className="space-y-4 pt-2">
              <div>
                <Label htmlFor="cardNumber" className="text-sm font-medium text-foreground">Card Number</Label>
                <div className="mt-1.5 relative">
                  <input
                    id="cardNumber"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full h-11 px-4 pr-12 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-[8px] font-bold flex items-center justify-center">VISA</div>
                    <div className="w-8 h-5 bg-red-500 rounded text-white text-[8px] font-bold flex items-center justify-center">MC</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry" className="text-sm font-medium text-foreground">Expiry Date</Label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM / YY"
                    className="mt-1.5 w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="cvc" className="text-sm font-medium text-foreground">CVC</Label>
                  <input
                    id="cvc"
                    type="text"
                    placeholder="123"
                    className="mt-1.5 w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName" className="text-sm font-medium text-foreground">Name on Card</Label>
                <input
                  id="cardName"
                  type="text"
                  placeholder="John Doe"
                  className="mt-1.5 w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div> */}
            {/* stripe add card section */}
            <div className="space-y-4 pt-2">
            <Elements stripe={getStripe()}>
              <AddNewCardsSection
                handleSubmit={(id: string, nameOnCard: string) => {
                  updateFormData({ cardholderName: nameOnCard, stripePaymentMethodId: id })
                }}
                />
              </Elements>
            </div>
            {/* Security Badge */}
            <div className="flex items-center gap-2 pt-2">
              <Shield className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Your payment information is encrypted and secured by your card provider.</span>
            </div>
          </div>
        </div>

        {/* Acceptance */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          <div className="bg-muted/50 px-6 py-4 flex items-center gap-3">
            <Check className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Acceptance</h2>
          </div>

          <div className="p-6 space-y-6">
            <p className="text-sm text-destructive">
              *By selecting "I Agree" and entering my full name as a binding electronic signature, I understand that an electronic signature has the same legal effect and can be enforced in the same way as a written signature. Furthermore, I hereby accept terms and conditions of service as described in the "Terms & Conditions" section below.
            </p>

            {/* Terms & Conditions */}
            <div className="bg-muted/30 rounded-xl p-4">
              <h4 className="font-semibold text-foreground mb-3">Terms & Conditions</h4>
              <div className="text-sm text-muted-foreground space-y-3 max-h-48 overflow-y-auto">
                <p>1. CarShippers.ai agrees to have the vehicle(s) described in this shipping form shipped on or about the dates requested. CarShippers.ai will find a licensed Carrier (agent) to fulfill the terms and conditions of this agreement. CarShippers.ai does not guarantee a specific pickup or delivery date. The normal pickup time frame is 1 to 3 business days from the first available pickup date.</p>
                <p>2. This order is subject to all terms and conditions of the Carrier's bills of lading, copies of which are available at the office of the Carrier and are incorporated herein.</p>
                <p>3. Carrier's responsibility begins when the shipper or his agent signs the bill of lading at pickup, and ends when the receiver or their agent signs the bill of lading at delivery.</p>
              </div>
            </div>

            {/* I Agree Checkbox */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={formData.agreedToTerms}
                onCheckedChange={(checked) =>
                  updateFormData({ agreedToTerms: checked as boolean })
                }
              />
              <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
                I Agree
              </Label>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              type="button" 
              variant="default" 
              onClick={onBack}
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!formData.agreedToTerms || isSubmitting}
              className={cn(
                "gap-2",
                !formData.agreedToTerms && "opacity-50"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Finish & Submit
                  <ArrowRightIcon className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            No stress—our flexible booking system has you covered. You can update your details anytime.
          </p>
          <p className="text-center text-muted-foreground mt-3">— OR —</p>
          <p className="text-center mt-2">
            <span className="text-muted-foreground">Book via Call: </span>
            <a href="tel:8005531828" className="text-primary font-medium hover:underline">
              800-553-1828
            </a>
          </p>
        </div>
      </div>

      {/* Price Option Dialog */}
      <EditPriceOptionDialog
        open={priceDialogOpen}
        onOpenChange={setPriceDialogOpen}
        currentTier={tier}
        prices={tierPrices}
        onSave={handlePriceChange}
      />
    </div>
  );
}