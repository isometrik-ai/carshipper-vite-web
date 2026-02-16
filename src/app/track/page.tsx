'use client';

import { useState, useMemo } from "react";
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

export const dynamic = 'force-dynamic';

export default function TrackShipment() {
  const { data, isLoading } = useTrackShipment();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [vinNumber, setVinNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<null | "found" | "not-found">(null);

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

  const pageContent = useMemo(() => {
    return data?.data?.page_content || [];
  }, [data]);

  const handleTrackByNumber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult("not-found");
    }, 1500);
  };

  const handleTrackByVIN = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vinNumber.trim()) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult("not-found");
    }, 1500);
  };

  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} pageContent={null} />
        <PageSkeleton />
      </>
    );
  }

  if (!pageData) {
    return (
      <>
        <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">No content available.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />
      <main className="flex-1 pt-20">
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {pageData.hero?.main_headline || "Track Your Shipment"}{" "}
                {pageData.hero?.highlighted_text ? (
                  <span className="text-primary">{pageData.hero.highlighted_text}</span>
                ) : null}
              </h1>
              {pageData.hero?.description ? (
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  {pageData.hero.description}
                </p>
              ) : null}
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Tabs defaultValue="tracking-number" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tracking-number">Track by Number</TabsTrigger>
                  <TabsTrigger value="vin">Track by VIN</TabsTrigger>
                </TabsList>
                <TabsContent value="tracking-number">
                  <form onSubmit={handleTrackByNumber} className="space-y-4">
                    <Input
                      placeholder={pageData.trackingForm?.tracking_number_placeholder || "Enter tracking number"}
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                      className="h-12"
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={isSearching}>
                      {isSearching ? "Searching..." : "Track Shipment"}
                      <Search className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="vin">
                  <form onSubmit={handleTrackByVIN} className="space-y-4">
                    <Input
                      placeholder={pageData.trackingForm?.vin_placeholder || "Enter VIN number"}
                      value={vinNumber}
                      onChange={(e) => setVinNumber(e.target.value)}
                      className="h-12"
                    />
                    <Button type="submit" size="lg" className="w-full" disabled={isSearching}>
                      {isSearching ? "Searching..." : "Track Shipment"}
                      <Search className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              {searchResult === "not-found" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 bg-warning/10 border border-warning rounded-xl p-4 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <p className="text-sm">No shipment found. Please check your tracking number or contact support.</p>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {pageData.trackingSteps ? (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                {pageData.trackingSteps.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.trackingSteps.section_title}</h2>
                ) : null}
              </motion.div>
              {pageData.trackingSteps.steps && pageData.trackingSteps.steps.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-8">
                  {pageData.trackingSteps.steps.map((step: any, index: number) => (
                    <motion.div
                      key={step.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-primary">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.step_title}</h3>
                      {step.step_description ? (
                        <p className="text-muted-foreground">{step.step_description}</p>
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {pageData.cta ? (
          <section className="py-16 md:py-24 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  {pageData.cta.headline || "Need Help?"}
                </h2>
                {pageData.cta.primary_button ? (
                  <Button
                    variant="secondary"
                    size="xl"
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
              </motion.div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}

