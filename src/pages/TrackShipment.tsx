import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useTrackShipment } from "@/api/trackShipment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Phone, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getIcon } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";
import type { HeroSection, ServiceCards, CallToAction } from "@/types/LandingPage.types";
import type { TrackingForm, TrackingStepsSection } from "@/types/TrackShipment.types";

/**
 * Track Shipment page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const TrackShipment = () => {
  const { data, isLoading } = useTrackShipment();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | "found" | "not-found">(null);

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const trackingForm = content.find(c => c.__component === "shared.tracking-form") as TrackingForm | undefined;
    const trackingSteps = content.find(c => c.__component === "shared.tracking-steps-section") as TrackingStepsSection | undefined;
    const serviceCards = content.find(c => c.__component === "shared.service-cards") as ServiceCards | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: heroSection,
      trackingForm,
      trackingSteps,
      serviceCards,
      cta,
    };
  }, [data]);

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

  // Show loading state while fetching initial data
  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-20" role="main" aria-label="Main content">
            <PageSkeleton />
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!pageData) {
    return (
      <>
        <PageSEO seoMetadata={data?.data?.seo_metadata} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-20" role="main" aria-label="Main content">
            <div className="container mx-auto px-4 py-12 text-center">
              <p className="text-muted-foreground">No content available.</p>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO seoMetadata={data?.data?.seo_metadata} />

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
                {pageData.hero?.tagline_icon ? (
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {(() => {
                      const HeroIcon = getIcon(pageData.hero.tagline_icon) as LucideIcon;
                      return <HeroIcon className="w-8 h-8 text-primary" aria-hidden="true" />;
                    })()}
                  </div>
                ) : null}

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {pageData.hero?.main_headline || "Track Your"}{" "}
                  {pageData.hero?.highlighted_text ? (
                    <span className="text-primary">{pageData.hero.highlighted_text}</span>
                  ) : null}
                </h1>

                {pageData.hero?.description ? (
                  <p className="text-lg text-muted-foreground mb-8">
                    {pageData.hero.description}
                  </p>
                ) : null}
              </motion.div>

              {/* Tracking Form */}
              {pageData.trackingForm ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="max-w-xl mx-auto"
                >
                  <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border">
                    <Tabs defaultValue="tracking" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="tracking">
                          {pageData.trackingForm.tracking_tab_label || "Tracking Number"}
                        </TabsTrigger>
                        <TabsTrigger value="vin">
                          {pageData.trackingForm.vin_tab_label || "VIN Number"}
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="tracking">
                        <form onSubmit={handleTrackByNumber} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {pageData.trackingForm.tracking_label || "Enter Tracking Number"}
                            </label>
                            <div className="relative">
                              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                              <Input
                                placeholder={pageData.trackingForm.tracking_placeholder || "e.g., CS-2025-123456"}
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                className="pl-12 h-12"
                              />
                            </div>
                            {pageData.trackingForm.tracking_helper_text ? (
                              <p className="text-xs text-muted-foreground mt-2">
                                {pageData.trackingForm.tracking_helper_text}
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
                            {isSearching
                              ? (pageData.trackingForm.tracking_searching_text || "Searching...")
                              : (pageData.trackingForm.tracking_button_text || "Track Shipment")}
                          </Button>
                        </form>
                      </TabsContent>

                      <TabsContent value="vin">
                        <form onSubmit={handleTrackByVin} className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              {pageData.trackingForm.vin_label || "Enter Vehicle VIN"}
                            </label>
                            <div className="relative">
                              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                              <Input
                                placeholder={pageData.trackingForm.vin_placeholder || "e.g., 1HGCM82633A123456"}
                                value={vinNumber}
                                onChange={(e) => setVinNumber(e.target.value.toUpperCase())}
                                className="pl-12 h-12 uppercase"
                                maxLength={17}
                              />
                            </div>
                            {pageData.trackingForm.vin_helper_text ? (
                              <p className="text-xs text-muted-foreground mt-2">
                                {pageData.trackingForm.vin_helper_text}
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
                            {isSearching
                              ? (pageData.trackingForm.vin_searching_text || "Searching...")
                              : (pageData.trackingForm.vin_button_text || "Track by VIN")}
                          </Button>
                        </form>
                      </TabsContent>
                    </Tabs>

                    {/* Search Result */}
                    {searchResult === "not-found" && pageData.trackingForm.error_title ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl"
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <h4 className="font-medium text-destructive">
                              {pageData.trackingForm.error_title}
                            </h4>
                            {pageData.trackingForm.error_message ? (
                              <p className="text-sm text-muted-foreground mt-1">
                                {pageData.trackingForm.error_message}
                              </p>
                            ) : null}
                            {pageData.trackingForm.error_phone_number ? (
                              <a
                                href={`tel:${pageData.trackingForm.error_phone_number.replace(/\D/g, '')}`}
                                className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-2"
                              >
                                <Phone className="w-4 h-4" aria-hidden="true" />
                                {pageData.trackingForm.error_phone_number}
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </div>
          </section>

          {/* How Tracking Works */}
          {pageData.trackingSteps ? (
            <section className="py-16 md:py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.trackingSteps.section_title ? (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {pageData.trackingSteps.section_title}
                    </h2>
                  ) : null}
                  {pageData.trackingSteps.section_description ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {pageData.trackingSteps.section_description.trim()}
                    </p>
                  ) : null}
                </div>

                {pageData.trackingSteps.steps && pageData.trackingSteps.steps.length > 0 ? (
                  <div className="max-w-3xl mx-auto">
                    <div className="relative">
                      {/* Progress Line */}
                      <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border md:hidden" />
                      <div className="hidden md:block absolute top-6 left-8 right-8 h-0.5 bg-border" />

                      <div className="grid md:grid-cols-5 gap-4 md:gap-0">
                        {pageData.trackingSteps.steps.map((step: any, index: number) => {
                          const StepIcon = step.icon_name
                            ? (getIcon(step.icon_name) as LucideIcon)
                            : null;

                          return (
                            <motion.div
                              key={step.id || step.label}
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
                                {StepIcon ? (
                                  <StepIcon className="w-5 h-5" aria-hidden="true" />
                                ) : null}
                              </div>
                              <span className={`text-sm font-medium ${
                                step.status === "pending" ? "text-muted-foreground" : ""
                              }`}>
                                {step.label}
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* What You Get */}
          {pageData.serviceCards && pageData.serviceCards.service_cards && pageData.serviceCards.service_cards.length > 0 ? (
            <section className="py-16 md:py-20">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8">
                  {pageData.serviceCards.service_cards.map((card: any, index: number) => {
                    const CardIcon = card.icon_name
                      ? (getIcon(card.icon_name) as LucideIcon)
                      : null;

                    return (
                      <motion.div
                        key={card.id || card.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                      >
                        {CardIcon ? (
                          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <CardIcon className="w-7 h-7 text-primary" aria-hidden="true" />
                          </div>
                        ) : null}
                        <h3 className="font-semibold mb-2">{card.title}</h3>
                        {card.description ? (
                          <p className="text-sm text-muted-foreground">{card.description}</p>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : null}

          {/* Need Help */}
          {pageData.cta ? (
            <section className="py-16 bg-primary">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                    {pageData.cta.headline || "Need Help Finding Your Shipment?"}
                  </h2>
                  {pageData.cta.description && pageData.cta.description !== pageData.cta.headline ? (
                    <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
                      {pageData.cta.description}
                    </p>
                  ) : null}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {pageData.cta.primary_button ? (
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => {
                          if (pageData.cta.primary_button?.button_link) {
                            window.location.href = pageData.cta.primary_button.button_link;
                          } else {
                            window.location.href = "/contact";
                          }
                        }}
                      >
                        {pageData.cta.primary_button.button_text || "Contact Support"}
                      </Button>
                    ) : null}
                    {pageData.cta.secondary_button ? (
                      <a
                        href={pageData.cta.secondary_button.button_link || "tel:+18885551234"}
                        className="flex items-center gap-2 text-primary-foreground hover:underline"
                      >
                        <Phone className="w-5 h-5" aria-hidden="true" />
                        <span className="font-medium">{pageData.cta.secondary_button.button_text || "(888) 555-1234"}</span>
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            </section>
          ) : null}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TrackShipment;
