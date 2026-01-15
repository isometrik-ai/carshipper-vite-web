import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Truck, MapPin, Clock, Package, Phone, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useTrackShipment } from "@/hooks/api/useTrackShipment";

const ICONS: Record<string, any> = {
  Truck,
  MapPin,
  Clock,
  Package,
  Phone,
  CheckCircle,
  Search,
};

const getIcon = (name?: string | null): React.ComponentType<any> => {
  if (!name) return CheckCircle;
  return ICONS[name] || CheckCircle;
};

const TrackShipment = () => {
  const { data: page, isLoading } = useTrackShipment();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | "found" | "not-found">(null);

  if (isLoading || !page) return null;

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

  const trackingSteps = page.trackingSteps ?? [];
  const whatYouGet = page.what_you_get ?? [];
  const PageIcon = getIcon(page.page_icon);

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
                  <PageIcon className="w-8 h-8 text-primary" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {page.title} <span className="text-primary">{page.title_highlight}</span>
                </h1>

                {page.description ? (
                  <p className="text-lg text-muted-foreground mb-8">
                    {page.description}
                  </p>
                ) : null}
              </motion.div>

              {/* Tracking Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-xl mx-auto"
              >
                <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border">
                  {page.track_form && (
                    <Tabs defaultValue="tracking" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        {page.track_form.tab_title && page.track_form.tab_title.length >= 2 ? (
                          <>
                            <TabsTrigger value="tracking">{page.track_form.tab_title[0]}</TabsTrigger>
                            <TabsTrigger value="vin">{page.track_form.tab_title[1]}</TabsTrigger>
                          </>
                        ) : (
                          <>
                            <TabsTrigger value="tracking">Tracking Number</TabsTrigger>
                            <TabsTrigger value="vin">VIN Number</TabsTrigger>
                          </>
                        )}
                      </TabsList>

                      <TabsContent value="tracking">
                        <form onSubmit={handleTrackByNumber} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {page.track_form.tracking_no_title || "Enter Tracking Number"}
                            </label>
                            <div className="relative">
                              {(() => {
                                const SearchIcon = getIcon(page.track_form.search_icon);
                                return <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />;
                              })()}
                              <Input
                                placeholder={page.track_form.tracking_no_placeholder || "e.g., CS-2025-123456"}
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                className="pl-12 h-12"
                              />
                            </div>
                            {page.track_form.tracking_number_msg ? (
                              <p className="text-xs text-muted-foreground mt-2">
                                {page.track_form.tracking_number_msg}
                              </p>
                            ) : null}
                          </div>
                          <Button
                            type="submit"
                            variant="hero"
                            className="w-full"
                            size="lg"
                            disabled={isSearching || !trackingNumber.trim()}
                          >
                            {isSearching ? (page.track_form.loading_title || "Searching...") : (page.track_form.tracking_number_label || "Track Shipment")}
                          </Button>
                        </form>
                      </TabsContent>

                      <TabsContent value="vin">
                        <form onSubmit={handleTrackByVin} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {page.track_form.vin_no_title || "Enter Vehicle VIN"}
                            </label>
                            <div className="relative">
                              {(() => {
                                const SearchIcon = getIcon(page.track_form.search_icon);
                                return <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />;
                              })()}
                              <Input
                                placeholder={page.track_form.vehicle_vin_placeholder || "e.g., 1HGCM82633A123456"}
                                value={vinNumber}
                                onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                                className="pl-12 h-12 uppercase"
                                maxLength={17}
                              />
                            </div>
                            {page.track_form.vin_number_msg ? (
                              <p className="text-xs text-muted-foreground mt-2">
                                {page.track_form.vin_number_msg}
                              </p>
                            ) : null}
                          </div>
                          <Button
                            type="submit"
                            variant="hero"
                            className="w-full"
                            size="lg"
                            disabled={isSearching || vinNumber.length < 17}
                          >
                            {isSearching ? (page.track_form.loading_title || "Searching...") : (page.track_form.vehicle_vin_label || "Track by VIN")}
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>
                  )}

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
          {trackingSteps.length > 0 && (
            <section className="py-16 md:py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {page.tracking_title || "How Shipment Tracking Works"}
                  </h2>
                  {page.tracking_sub_title ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {page.tracking_sub_title}
                    </p>
                  ) : null}
                </div>

                <div className="max-w-3xl mx-auto">
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border md:hidden" />
                    <div className="hidden md:block absolute top-6 left-8 right-8 h-0.5 bg-border" />

                    <div className="grid md:grid-cols-5 gap-4 md:gap-0">
                      {trackingSteps.map((step, index) => {
                        const StepIcon = getIcon(step.icon);
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative flex md:flex-col items-center md:text-center gap-4 md:gap-2"
                          >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${step.status === "complete" ? "bg-success text-success-foreground" :
                              step.status === "current" ? "bg-primary text-primary-foreground" :
                                "bg-muted text-muted-foreground"
                              }`}>
                              <StepIcon className="w-5 h-5" />
                            </div>
                            <span className={`text-sm font-medium ${step.status === "pending" ? "text-muted-foreground" : ""
                              }`}>
                              {step.label}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* What You Get */}
          {whatYouGet.length > 0 && (
            <section className="py-16 md:py-20">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                  {whatYouGet.map((item, index) => {
                    const Icon = getIcon(item.icon_name);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{item.text}</h3>
                        {item.description ? (
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Need Help */}
          {page.track_shipment_cta && (
            <section className="py-16 bg-primary">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                    {page.track_shipment_cta.title}
                  </h2>
                  {page.track_shipment_cta.description ? (
                    <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                      {page.track_shipment_cta.description}
                    </p>
                  ) : null}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {page.track_shipment_cta.primary_button_text && page.track_shipment_cta.primary_button_link ? (
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => window.location.href = page.track_shipment_cta.primary_button_link || "/contact"}
                      >
                        {page.track_shipment_cta.primary_button_text}
                      </Button>
                    ) : null}
                    {page.track_shipment_cta.show_phone && page.track_shipment_cta.secondary_button_text && page.track_shipment_cta.secondary_button_link ? (
                      <a
                        href={page.track_shipment_cta.secondary_button_link}
                        className="flex items-center gap-2 text-primary-foreground hover:underline"
                      >
                        <Phone className="w-5 h-5" />
                        <span className="font-medium">{page.track_shipment_cta.secondary_button_text}</span>
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TrackShipment;