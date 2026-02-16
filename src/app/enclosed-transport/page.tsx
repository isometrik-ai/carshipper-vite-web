'use client';

import { useMemo } from "react";
import { motion } from "framer-motion";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useEnclosedTransport } from "@/api/enclosedTransport";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Car, Lock, Eye, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HeroSection, ComparisonSection, TestimonialsDisplay, FAQDisplay, CallToAction } from "@/types/LandingPage.types";
import type { TextSection } from "@/types/AboutPage.types";
import type { ServiceCards } from "@/types/AutoAuctionShipping.types";
import type { VehicleTypesGrid, TrailerTypes } from "@/types/EnclosedTransport.types";

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

/**
 * Enclosed Transport page component
 */
export default function EnclosedTransport() {
  const { data, isLoading } = useEnclosedTransport();

  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;
    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const textSection = content.find(c => c.__component === "shared.text-section") as TextSection | undefined;
    const vehicleTypesGrid = content.find(c => c.__component === "shared.vehicle-types-grid") as VehicleTypesGrid | undefined;
    const serviceCards = content.find(c => c.__component === "shared.service-cards") as ServiceCards | undefined;
    const comparisonSection = content.find(c => c.__component === "shared.comparison-section") as ComparisonSection | undefined;
    const trailerTypes = content.find(c => c.__component === "shared.trailer-types") as TrailerTypes | undefined;
    const testimonials = content.find(c => c.__component === "shared.testimonials-display") as TestimonialsDisplay | undefined;
    const faqDisplay = content.find(c => c.__component === "shared.faq-display") as FAQDisplay | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: heroSection,
      textSection,
      vehicleTypes: vehicleTypesGrid,
      serviceCards,
      comparison: comparisonSection,
      trailerTypes,
      testimonials,
      faq: faqDisplay,
      cta,
    };
  }, [data]);

  const pageContent = useMemo(() => {
    return data?.data?.page_content || [];
  }, [data]);

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

  const parsedParagraphs = useMemo(() => {
    if (!pageData?.textSection?.paragraphs) return [];
    return pageData.textSection.paragraphs
      .split(/\n\n+/)
      .map((p: string) => p.trim())
      .filter((p: string) => p.length > 0);
  }, [pageData?.textSection?.paragraphs]);

  return (
    <>
      <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />
      <main className="flex-1 pt-20">
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {pageData.hero?.main_headline || "Enclosed"}{" "}
                  {pageData.hero?.highlighted_text ? (
                    <span className="text-primary">{pageData.hero.highlighted_text}</span>
                  ) : null}
                </h1>
                {pageData.hero?.description ? (
                  <p className="text-lg md:text-xl text-muted-foreground mb-6">
                    {pageData.hero.description}
                  </p>
                ) : null}
                {pageData.hero?.trust_indicators && pageData.hero.trust_indicators.length > 0 ? (
                  <div className="flex flex-wrap gap-4 mb-6">
                    {pageData.hero.trust_indicators.map((indicator) => {
                      const IndicatorIcon = indicator.icon_name
                        ? (getIcon(indicator.icon_name) as LucideIcon)
                        : null;
                      const bgColor = indicator.icon_name === "shield"
                        ? "bg-success/10 text-success"
                        : indicator.icon_name === "star"
                          ? "bg-warning/10 text-warning-foreground"
                          : "bg-primary/10 text-primary";
                      return (
                        <div key={indicator.id} className={`flex items-center gap-2 ${bgColor} px-4 py-2 rounded-full`}>
                          {IndicatorIcon ? (
                            <IndicatorIcon className="w-4 h-4" aria-hidden="true" />
                          ) : null}
                          <span className="text-sm font-medium">{indicator.text}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <QuoteForm />
              </motion.div>
            </div>
          </div>
        </section>

        {pageData.textSection ? (
          <section className="py-16 md:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl p-8 border border-border shadow-lg"
                >
                  {pageData.textSection.section_title ? (
                    <h2 className="text-2xl font-bold mb-4">{pageData.textSection.section_title}</h2>
                  ) : null}
                  {parsedParagraphs.map((paragraph, index) => (
                    <p key={index} className={index > 0 ? "mt-4" : ""}>
                      {paragraph}
                    </p>
                  ))}
                  {pageData.textSection.bullet_points && pageData.textSection.bullet_points.length > 0 ? (
                    <div className="grid sm:grid-cols-2 gap-3 mt-6">
                      {pageData.textSection.bullet_points.map((point: any) => (
                        <div key={point.id || point.text} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>{point.text}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              </div>
            </div>
          </section>
        ) : null}

        {pageData.vehicleTypes ? (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                {pageData.vehicleTypes.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.vehicleTypes.section_title}</h2>
                ) : null}
              </motion.div>
              {pageData.vehicleTypes.vehicle_types && pageData.vehicleTypes.vehicle_types.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {pageData.vehicleTypes.vehicle_types.map((vehicle: any, index: number) => (
                    <motion.div
                      key={vehicle.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card p-6 rounded-2xl border border-border"
                    >
                      <h3 className="text-xl font-semibold mb-2">{vehicle.vehicle_type}</h3>
                      {vehicle.description ? (
                        <p className="text-muted-foreground">{vehicle.description}</p>
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {pageData.comparison ? (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  {pageData.comparison.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.comparison.section_title}</h2>
                  ) : null}
                </motion.div>
                {pageData.comparison.columns && pageData.comparison.columns.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {pageData.comparison.columns.map((column: any, index: number) => (
                      <motion.div
                        key={column.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-card p-6 rounded-2xl border border-border"
                      >
                        <h3 className="text-xl font-bold mb-4">{column.column_title}</h3>
                        {column.features && column.features.length > 0 ? (
                          <ul className="space-y-2">
                            {column.features.map((feature: any) => (
                              <li key={feature.id || feature.text} className="flex items-start gap-2">
                                <span className="text-success mt-1">✓</span>
                                <span>{feature.text}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}

        {pageData.testimonials && pageData.testimonials.testimonials && pageData.testimonials.testimonials.length > 0 ? (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                {pageData.testimonials.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.testimonials.section_title}</h2>
                ) : null}
              </motion.div>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {pageData.testimonials.testimonials.map((testimonial: any, index: number) => (
                  <motion.div
                    key={testimonial.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-warning text-warning" aria-hidden="true" />
                      ))}
                    </div>
                    {testimonial.title ? (
                      <h3 className="text-lg font-semibold mb-3">{testimonial.title}</h3>
                    ) : null}
                    {testimonial.quote_text ? (
                      <p className="text-muted-foreground">{testimonial.quote_text}</p>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {pageData.faq ? (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                {pageData.faq.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.faq.section_title}</h2>
                ) : null}
              </motion.div>
              {pageData.faq.faq_items && pageData.faq.faq_items.length > 0 ? (
                <div className="max-w-3xl mx-auto space-y-6">
                  {pageData.faq.faq_items.map((faq: any, index: number) => (
                    <motion.div
                      key={faq.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card p-6 rounded-xl border border-border"
                    >
                      <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
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
                  {pageData.cta.headline || "Get Your Enclosed Transport Quote"}
                </h2>
                {pageData.cta.description ? (
                  <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                    {pageData.cta.description}
                  </p>
                ) : null}
                {pageData.cta.primary_button ? (
                  <Button
                    variant="secondary"
                    size="xl"
                    onClick={() => {
                      if (pageData.cta.primary_button?.button_link) {
                        window.location.href = pageData.cta.primary_button.button_link;
                      } else {
                        window.location.href = "/#quote-form";
                      }
                    }}
                  >
                    {pageData.cta.primary_button.button_text || "Get Your Free Quote"}
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
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

