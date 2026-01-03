import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Truck, MapPin, Clock, Package, Phone, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TrackShipment = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | "found" | "not-found">(null);

  const handleTrackByNumber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult("not-found");
    }, 1500);
  };

  const handleTrackByVin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vinNumber.trim()) return;
    
    setIsSearching(true);
    // Simulate search
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult("not-found");
    }, 1500);
  };

  const trackingSteps = [
    { label: "Order Confirmed", icon: CheckCircle, status: "complete" },
    { label: "Carrier Assigned", icon: Truck, status: "complete" },
    { label: "Vehicle Picked Up", icon: Package, status: "current" },
    { label: "In Transit", icon: MapPin, status: "pending" },
    { label: "Delivered", icon: CheckCircle, status: "pending" },
  ];

  return (
    <>
      <Helmet>
        <title>Track Your Shipment | Vehicle Tracking | CarShippers.ai</title>
        <meta name="description" content="Track your car shipment in real-time. Enter your tracking number or VIN to see current status, location, and estimated delivery time." />
        <link rel="canonical" href="https://carshippers.ai/track" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-8 h-8 text-primary" />
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Track Your <span className="text-primary">Shipment</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Enter your tracking number or VIN to see real-time status updates on your vehicle shipment.
                </p>
              </motion.div>

              {/* Tracking Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-xl mx-auto"
              >
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border">
                  <Tabs defaultValue="tracking" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="tracking">Tracking Number</TabsTrigger>
                      <TabsTrigger value="vin">VIN Number</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="tracking">
                      <form onSubmit={handleTrackByNumber} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Enter Tracking Number
                          </label>
                          <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="e.g., CS-2025-123456"
                              value={trackingNumber}
                              onChange={(e) => setTrackingNumber(e.target.value)}
                              className="pl-12 h-12"
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Your tracking number was sent via email and SMS when you booked.
                          </p>
                        </div>
                        <Button 
                          type="submit" 
                          variant="hero" 
                          className="w-full" 
                          size="lg"
                          disabled={isSearching || !trackingNumber.trim()}
                        >
                          {isSearching ? "Searching..." : "Track Shipment"}
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="vin">
                      <form onSubmit={handleTrackByVin} className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Enter Vehicle VIN
                          </label>
                          <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                              placeholder="e.g., 1HGCM82633A123456"
                              value={vinNumber}
                              onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                              className="pl-12 h-12 uppercase"
                              maxLength={17}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Your 17-character Vehicle Identification Number (found on registration or dashboard).
                          </p>
                        </div>
                        <Button 
                          type="submit" 
                          variant="hero" 
                          className="w-full" 
                          size="lg"
                          disabled={isSearching || vinNumber.length < 17}
                        >
                          {isSearching ? "Searching..." : "Track by VIN"}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>

                  {/* Search Result */}
                  {searchResult === "not-found" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-destructive">Shipment Not Found</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            We couldn't find a shipment with that number. Please check your entry and try again, 
                            or contact us for assistance.
                          </p>
                          <a 
                            href="tel:+18885551234" 
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-2"
                          >
                            <Phone className="w-4 h-4" />
                            (888) 555-1234
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* How Tracking Works */}
          <section className="py-16 md:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  How Shipment Tracking Works
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Stay informed at every step of your vehicle's journey.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border md:hidden" />
                  <div className="hidden md:block absolute top-6 left-8 right-8 h-0.5 bg-border" />

                  <div className="grid md:grid-cols-5 gap-4 md:gap-0">
                    {trackingSteps.map((step, index) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="relative flex md:flex-col items-center md:text-center gap-4 md:gap-2"
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                          step.status === "complete" ? "bg-success text-success-foreground" :
                          step.status === "current" ? "bg-primary text-primary-foreground" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          <step.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-sm font-medium ${
                          step.status === "pending" ? "text-muted-foreground" : ""
                        }`}>
                          {step.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What You Get */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Real-Time Location</h3>
                  <p className="text-sm text-muted-foreground">
                    See exactly where your vehicle is at any time during transport.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">ETA Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Get accurate estimated arrival times with live traffic updates.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Direct Driver Contact</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact your driver directly for updates or scheduling changes.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Need Help */}
          <section className="py-16 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                  Need Help Finding Your Shipment?
                </h2>
                <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                  Our support team is available 24/7 to help you track your vehicle.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="secondary" size="lg" onClick={() => window.location.href = "/contact"}>
                    Contact Support
                  </Button>
                  <a href="tel:+18885551234" className="flex items-center gap-2 text-primary-foreground hover:underline">
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">(888) 555-1234</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default TrackShipment;