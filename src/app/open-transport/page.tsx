'use client';

import { useMemo } from "react";
import { motion } from "framer-motion";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useOpenTransport } from "@/api/openTransport";
import { getIcon } from "@/lib/icons";
import { Shield, Truck, Star, CheckCircle, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSection, FAQDisplay, CallToAction, TestimonialsDisplay } from "@/types/LandingPage.types";
import type { TextSection } from "@/types/AboutPage.types";
import type { ServiceCards } from "@/types/AutoAuctionShipping.types";
import type { SafetyInfoSection } from "@/types/OpenTransport.types";

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

/**
 * Open Transport page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
export default function OpenTransport() {
  const { data, isLoading } = useOpenTransport();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const textSection = content.find(c => c.__component === "shared.text-section") as TextSection | undefined;
    const specificsSection = content.find(c => c.__component === "shared.service-cards" && (c as ServiceCards).section_title === "Open Auto Transport Specifics") as ServiceCards | undefined;
    const benefitsSection = content.find(c => c.__component === "shared.service-cards" && (c as ServiceCards).section_title === "Why Choose Our Open Carrier Services?") as ServiceCards | undefined;
    const safetySection = content.find(c => c.__component === "shared.safety-info-section") as SafetyInfoSection | undefined;
    const testimonialsSection = content.find(c => c.__component === "shared.testimonials-display") as TestimonialsDisplay | undefined;
    const faqDisplay = content.find(c => c.__component === "shared.faq-display") as FAQDisplay | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: heroSection,
      textSection,
      specifics: specificsSection,
      benefits: benefitsSection,
      safety: safetySection,
      testimonials: testimonialsSection,
      faq: faqDisplay,
      cta,
    };
  }, [data]);

  // Extract page content for SEO
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
        {/* Hero Section with Quote Form */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {pageData.hero?.main_headline || "Open"}{" "}
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
                        : indicator.icon_name === "truck"
                        ? "bg-primary/10 text-primary"
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

                {/* Quick Points - Below left text */}
                {pageData.hero?.quick_points && pageData.hero.quick_points.length > 0 ? (
                  <div className="bg-card/50 backdrop-blur rounded-xl p-4 border">
                    <div className="grid grid-cols-2 gap-2">
                      {pageData.hero.quick_points.map((point: any) => (
                        <div key={point.id || point.text} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-success flex-shrink-0" aria-hidden="true" />
                          <span>{point.text}</span>
                        </div>
                      ))}
                    </div>
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

        {/* What is Open Transport */}
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
                  {pageData.textSection.paragraphs ? (
                    <div className="text-muted-foreground mb-4">
                      {pageData.textSection.paragraphs.split('\n\n').map((paragraph, index) => (
                        <p key={index} className={index > 0 ? "mt-4" : ""}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}
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

        {/* Features Grid */}
        {pageData.specifics ? (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                {pageData.specifics.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.specifics.section_title}</h2>
                ) : null}
                {pageData.specifics.section_subtitle ? (
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {pageData.specifics.section_subtitle}
                  </p>
                ) : null}
              </motion.div>

              {pageData.specifics.service_cards && pageData.specifics.service_cards.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {pageData.specifics.service_cards.map((feature: any, index: number) => {
                    const FeatureIcon = feature.icon_name
                      ? (getIcon(feature.icon_name) as LucideIcon)
                      : null;

                    return (
                      <motion.div
                        key={feature.id || feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-card p-6 rounded-2xl border border-border"
                      >
                        {FeatureIcon ? (
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                            <FeatureIcon className="w-6 h-6 text-primary" aria-hidden="true" />
                          </div>
                        ) : null}
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* Benefits */}
        {pageData.benefits ? (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                {pageData.benefits.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.benefits.section_title}</h2>
                ) : null}
              </motion.div>

              {pageData.benefits.service_cards && pageData.benefits.service_cards.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-8">
                  {pageData.benefits.service_cards.map((benefit: any, index: number) => {
                    const BenefitIcon = benefit.icon_name
                      ? (getIcon(benefit.icon_name) as LucideIcon)
                      : null;

                    return (
                      <motion.div
                        key={benefit.id || benefit.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                      >
                        {BenefitIcon ? (
                          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <BenefitIcon className="w-8 h-8 text-primary" aria-hidden="true" />
                          </div>
                        ) : null}
                        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* Safety Section */}
        {pageData.safety ? (
          <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-3xl p-8 md:p-12 border border-border"
                >
                  <div className="flex items-center gap-4 mb-6">
                    {pageData.safety.icon_name ? (
                      (() => {
                        const SafetyIcon = getIcon(pageData.safety.icon_name) as LucideIcon;
                        return (
                          <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center">
                            <SafetyIcon className="w-7 h-7 text-success" aria-hidden="true" />
                          </div>
                        );
                      })()
                    ) : (
                      <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center">
                        <Shield className="w-7 h-7 text-success" aria-hidden="true" />
                      </div>
                    )}
                    {pageData.safety.section_title ? (
                      <h2 className="text-2xl md:text-3xl font-bold">{pageData.safety.section_title}</h2>
                    ) : null}
                  </div>
                  
                  {pageData.safety.paragraphs ? (
                    <div className="text-muted-foreground mb-6">
                      {pageData.safety.paragraphs.split('\n\n').map((paragraph, index) => (
                        <p key={index} className={index > 0 ? "mt-4" : ""}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}

                  {pageData.safety.statistics && pageData.safety.statistics.length > 0 ? (
                    <div className="grid sm:grid-cols-3 gap-4">
                      {pageData.safety.statistics.map((stat: any) => (
                        stat.value && stat.label ? (
                          <div key={stat.id} className="bg-muted/50 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                          </div>
                        ) : null
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Testimonials */}
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

        {/* FAQs */}
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

        {/* CTA */}
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
                  {pageData.cta.headline || "How much will my open auto transport cost?"}
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

