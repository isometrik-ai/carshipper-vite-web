import { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { LoadingState } from "@/components/landing/LoadingState";
import { useRentalCarLogistics } from "@/api/rentalCarLogistics";
import { getIcon } from "@/lib/icons";
import { Shield, Clock, Star, Phone, CheckCircle, Building } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { HeroSection, ProcessSection, FAQDisplay, CallToAction } from "@/types/LandingPage.types";

/**
 * Rental Car Logistics page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const RentalCarLogistics = () => {
  const { data, isLoading } = useRentalCarLogistics();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const servicesSection = content.find(c => 
      c.__component === "shared.process-section" && 
      (c as ProcessSection).section_title === "Comprehensive Rental Car Logistics"
    ) as ProcessSection | undefined;
    const benefitsSection = content.find(c => 
      c.__component === "shared.process-section" && 
      (c as ProcessSection).section_title === "Value-Driven Logistics Solutions"
    ) as ProcessSection | undefined;
    const featuresSection = content.find(c => 
      c.__component === "shared.process-section" && 
      (c as ProcessSection).section_title === "Proven Rental Industry Experience"
    ) as ProcessSection | undefined;
    const faqDisplay = content.find(c => c.__component === "shared.faq-display") as FAQDisplay | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: heroSection,
      services: servicesSection,
      benefits: benefitsSection,
      features: featuresSection,
      faq: faqDisplay,
      cta,
    };
  }, [data]);

  // Show loading state while fetching initial data
  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-20" role="main" aria-label="Main content">
            <LoadingState />
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
          {/* Hero Section with Quote Form */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {pageData.hero?.tagline ? (
                    <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                      {pageData.hero.tagline_icon ? (
                        (() => {
                          const TaglineIcon = getIcon(pageData.hero.tagline_icon) as LucideIcon;
                          return <TaglineIcon className="w-4 h-4" aria-hidden="true" />;
                        })()
                      ) : (
                        <Building className="w-4 h-4" aria-hidden="true" />
                      )}
                      {pageData.hero.tagline}
                    </span>
                  ) : null}

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {pageData.hero?.main_headline || "Rental Car"}{" "}
                    {pageData.hero?.highlighted_text ? (
                      <span className="text-primary">{pageData.hero.highlighted_text}</span>
                    ) : null}
                  </h1>

                  {pageData.hero?.description ? (
                    <p className="text-lg text-muted-foreground mb-6">
                      {pageData.hero.description}
                    </p>
                  ) : null}

                  {/* Trust Badges */}
                  {pageData.hero?.trust_indicators && pageData.hero.trust_indicators.length > 0 ? (
                    <div className="flex flex-wrap gap-4 mb-8">
                      {pageData.hero.trust_indicators.map((indicator) => {
                        const IndicatorIcon = indicator.icon_name
                          ? (getIcon(indicator.icon_name) as LucideIcon)
                          : null;
                        const bgColor = indicator.icon_name === "shield"
                          ? "bg-success/10 text-success"
                          : indicator.icon_name === "clock"
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

          {/* Services List */}
          {pageData.services && pageData.services.steps && pageData.services.steps.length > 0 ? (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-card rounded-2xl p-8 border border-border shadow-lg"
                  >
                    {pageData.services.section_title ? (
                      <h2 className="text-2xl font-bold mb-6 text-center">{pageData.services.section_title}</h2>
                    ) : null}
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {pageData.services.steps.map((step: any) => (
                        <div key={step.id || step.title} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                          <span>{step.title}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          ) : null}

          {/* Benefits Section */}
          {pageData.benefits ? (
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.benefits.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.benefits.section_title}
                    </h2>
                  ) : null}
                  {pageData.benefits.section_subtitle ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {pageData.benefits.section_subtitle}
                    </p>
                  ) : null}
                </div>

                {pageData.benefits.steps && pageData.benefits.steps.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pageData.benefits.steps.map((step: any, index: number) => {
                      const StepIcon = step.icon_name
                        ? (getIcon(step.icon_name) as LucideIcon)
                        : null;

                      return (
                        <motion.div
                          key={step.id || step.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-card rounded-xl p-6 shadow-lg border text-center"
                        >
                          {StepIcon ? (
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <StepIcon className="w-8 h-8 text-primary" aria-hidden="true" />
                            </div>
                          ) : null}
                          <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                          {step.description ? (
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                          ) : null}
                        </motion.div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Features Section */}
          {pageData.features ? (
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.features.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.features.section_title}
                    </h2>
                  ) : null}
                </div>

                {pageData.features.steps && pageData.features.steps.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pageData.features.steps.map((step: any, index: number) => {
                      const StepIcon = step.icon_name
                        ? (getIcon(step.icon_name) as LucideIcon)
                        : null;

                      return (
                        <motion.div
                          key={step.id || step.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="text-center"
                        >
                          {StepIcon ? (
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <StepIcon className="w-8 h-8 text-primary" aria-hidden="true" />
                            </div>
                          ) : null}
                          <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                          {step.description ? (
                            <p className="text-muted-foreground text-sm">{step.description}</p>
                          ) : null}
                        </motion.div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* FAQ Section */}
          {pageData.faq ? (
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.faq.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.faq.section_title}
                    </h2>
                  ) : null}
                </div>

                {pageData.faq.faq_items && pageData.faq.faq_items.length > 0 ? (
                  <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                      {pageData.faq.faq_items.map((faq: any, index: number) => (
                        <AccordionItem key={faq.id || index} value={`item-${index}`} className="bg-card rounded-lg border px-6">
                          <AccordionTrigger className="text-left hover:no-underline">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* CTA Section */}
          {pageData.cta ? (
            <section className="py-20 bg-primary">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    {pageData.cta.headline || "Ready to Streamline Your Fleet Logistics?"}
                  </h2>
                  {pageData.cta.description && pageData.cta.description !== pageData.cta.headline ? (
                    <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
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
                            window.location.href = "/quote";
                          }
                        }}
                      >
                        {pageData.cta.primary_button.button_text || "Get Fleet Quote"}
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

export default RentalCarLogistics;
