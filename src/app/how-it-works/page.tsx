'use client';

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Link from "next/link";
import ProcessStepsSection from "@/components/sections/ProcessStepsSection";
import { getIcon } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";
import { useHowItWorks } from "@/api/howItWorks";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

/**
 * How It Works page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
export default function HowItWorksPage() {
  const { data, isLoading } = useHowItWorks();

  // Extract page content components
  const pageContent = useMemo(() => {
    return data?.data?.page_content || [];
  }, [data]);


  // Show loading state while fetching initial data
  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} pageContent={null} />
        <PageSkeleton />
      </>
    );
  }

  const heroData = pageContent.find((component) => component.__component === "shared.hero-section");
  const processSection = pageContent.find((component) => component.__component === "shared.process-section");
  const comparisonSection = pageContent.find((component) => component.__component === "shared.comparison-section");
  const testimonialsSection = pageContent.find((component) => component.__component === "shared.testimonials-display");
  const ctaSection = pageContent.find((component) => component.__component === "shared.call-to-action");

  return (
    <>
      <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {heroData?.main_headline ? heroData.main_headline.trim() : "How Auto Transport"}{" "}
                  {heroData?.highlighted_text ? (
                    <span className="text-primary">{heroData.highlighted_text}</span>
                  ) : null}
                </h1>
                {heroData?.description ? (
                  <p className="text-lg md:text-xl text-muted-foreground mb-8">
                    {heroData.description}
                  </p>
                ) : null}
                {heroData?.trust_indicators && heroData.trust_indicators.length > 0 ? (
                  <div className="flex flex-wrap gap-4 mb-8">
                    {heroData.trust_indicators.map((indicator: any) => {
                      const IndicatorIcon = indicator.icon_name
                        ? (getIcon(indicator.icon_name) as LucideIcon)
                        : null;
                      return (
                        <div key={indicator.id} className="flex items-center gap-2 text-sm bg-muted/50 px-4 py-2 rounded-full">
                          {IndicatorIcon ? (
                            <IndicatorIcon className="w-4 h-4 text-primary" aria-hidden="true" />
                          ) : null}
                          <span>{indicator.text}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                {heroData?.phone_number ? (
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`tel:${heroData.phone_number.replace(/\D/g, '')}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                    >
                      <Phone className="w-5 h-5" />
                      {heroData.phone_number}
                    </a>
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

        {/* Steps */}
        <ProcessStepsSection
          sectionTitle={processSection?.section_title}
          sectionSubtitle={processSection?.section_subtitle}
          steps={processSection?.steps || []}
          ctaButton={processSection?.cta_button}
        />

        {/* Comparison Section */}
        {comparisonSection ? (
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
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {comparisonSection.section_title}
                  </h2>
                  {comparisonSection.section_description ? (
                    <p className="text-muted-foreground">
                      {comparisonSection.section_description}
                    </p>
                  ) : null}
                </motion.div>
                {comparisonSection.columns && comparisonSection.columns.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {comparisonSection.columns.map((column: any, index: number) => (
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
                          <ul className="space-y-2 mb-4">
                            {column.features.map((feature: any) => (
                              <li key={feature.id || feature.text} className="flex items-start gap-2">
                                <span className="text-success mt-1">✓</span>
                                <span>{feature.text}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {column.bullet_points && column.bullet_points.length > 0 ? (
                          <ul className="space-y-2">
                            {column.bullet_points.map((point: any) => (
                              <li key={point.id || point.text} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="mt-1">•</span>
                                <span>{point.text}</span>
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

        {/* Testimonials */}
        {testimonialsSection ? (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {testimonialsSection.section_title || "What Our Customers Say"}
                </h2>
              </motion.div>
              {testimonialsSection.testimonials && testimonialsSection.testimonials.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {testimonialsSection.testimonials.map((testimonial: any, index: number) => (
                    <motion.div
                      key={testimonial.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card p-6 rounded-2xl border border-border"
                    >
                      <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {testimonial.customer_name?.charAt(0) || "C"}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.customer_name}</p>
                          {testimonial.rating ? (
                            <p className="text-sm text-muted-foreground">{testimonial.rating} stars</p>
                          ) : null}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* CTA */}
        {ctaSection ? (
          <section className="py-16 md:py-24 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  {ctaSection.headline || "Ready to Get Started?"}
                </h2>
                {ctaSection.description ? (
                  <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                    {ctaSection.description}
                  </p>
                ) : null}
                {ctaSection.primary_button ? (
                  <Button
                    variant="secondary"
                    size="lg"
                    className="text-lg px-8"
                    onClick={() => {
                      if (ctaSection.primary_button?.button_link) {
                        const link = ctaSection.primary_button.button_link;
                        if (link.startsWith("http") || link.startsWith("tel:") || link.startsWith("mailto:")) {
                          window.location.href = link;
                        } else {
                          window.location.href = link;
                        }
                      }
                    }}
                  >
                    {ctaSection.primary_button.button_text || "Get Your Quote"}
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

