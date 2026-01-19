import { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useOEMTransport } from "@/api/oemTransport";
import { getIcon } from "@/lib/icons";
import { Factory, CheckCircle, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { HeroSection, StatsBar, FAQDisplay, CallToAction } from "@/types/LandingPage.types";
import type { FeatureListSection } from "@/types/AboutPage.types";
import type { ServiceCards } from "@/types/AutoAuctionShipping.types";

/**
 * OEM Transport page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const OEMTransport = () => {
  const { data, isLoading } = useOEMTransport();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const capabilitiesSection = content.find(c => c.__component === "shared.feature-list-section") as FeatureListSection | undefined;
    const statsBar = content.find(c => c.__component === "shared.stats-bar") as StatsBar | undefined;
    const benefitsSection = content.find(c => c.__component === "shared.service-cards" && (c as ServiceCards).section_title === "Why Manufacturers Choose Us") as ServiceCards | undefined;
    const featuresSection = content.find(c => c.__component === "shared.service-cards" && (c as ServiceCards).section_title === "OEM-Grade Transport Standards") as ServiceCards | undefined;
    const faqDisplay = content.find(c => c.__component === "shared.faq-display") as FAQDisplay | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: heroSection,
      capabilities: capabilitiesSection,
      stats: statsBar,
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
                        <Factory className="w-4 h-4" aria-hidden="true" />
                      )}
                      {pageData.hero.tagline}
                    </span>
                  ) : null}
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {pageData.hero?.main_headline || "OEM"}{" "}
                    {pageData.hero?.highlighted_text ? (
                      <span className="text-primary">{pageData.hero.highlighted_text}</span>
                    ) : null}
                  </h1>
                  
                  {pageData.hero?.description ? (
                    <p className="text-lg text-muted-foreground mb-6">
                      {pageData.hero.description}
                    </p>
                  ) : null}

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

          {/* Capabilities List */}
          {pageData.capabilities ? (
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
                    {pageData.capabilities.section_title ? (
                      <h2 className="text-2xl font-bold mb-6 text-center">{pageData.capabilities.section_title}</h2>
                    ) : null}
                    {pageData.capabilities.bullet_points && pageData.capabilities.bullet_points.length > 0 ? (
                      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {pageData.capabilities.bullet_points.map((point: any) => (
                          <div key={point.id || point.text} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
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

          {/* Stats Section */}
          {pageData.stats && pageData.stats.statistics && pageData.stats.statistics.length > 0 ? (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {pageData.stats.statistics.map((stat: any, index: number) => (
                    <motion.div
                      key={stat.id || stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* Benefits Section */}
          {pageData.benefits ? (
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.benefits.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.benefits.section_title}
                    </h2>
                  ) : null}
                </div>

                {pageData.benefits.service_cards && pageData.benefits.service_cards.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pageData.benefits.service_cards.map((benefit: any, index: number) => {
                      const BenefitIcon = benefit.icon_name
                        ? (getIcon(benefit.icon_name) as LucideIcon)
                        : null;

                      return (
                        <motion.div
                          key={benefit.id || benefit.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="bg-card rounded-xl p-6 shadow-lg border text-center"
                        >
                          {BenefitIcon ? (
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <BenefitIcon className="w-8 h-8 text-primary" aria-hidden="true" />
                            </div>
                          ) : null}
                          <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                          <p className="text-muted-foreground text-sm">{benefit.description}</p>
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
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.features.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.features.section_title}
                    </h2>
                  ) : null}
                </div>

                {pageData.features.service_cards && pageData.features.service_cards.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pageData.features.service_cards.map((feature: any, index: number) => {
                      const FeatureIcon = feature.icon_name
                        ? (getIcon(feature.icon_name) as LucideIcon)
                        : null;

                      return (
                        <motion.div
                          key={feature.id || feature.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="text-center"
                        >
                          {FeatureIcon ? (
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                              <FeatureIcon className="w-8 h-8 text-primary" aria-hidden="true" />
                            </div>
                          ) : null}
                          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
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
            <section className="py-20 bg-muted/30">
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
                        <AccordionItem
                          key={faq.id || index}
                          value={`item-${index}`}
                          className="bg-card rounded-lg border px-6"
                        >
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
                    {pageData.cta.headline || "Partner With Us for OEM Logistics"}
                  </h2>
                  {pageData.cta.description ? (
                    <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                      {pageData.cta.description.trim()}
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
                        {pageData.cta.primary_button.button_text || "Get OEM Quote"}
                      </Button>
                    ) : null}
                    {pageData.cta.secondary_button ? (
                      <a
                        href={pageData.cta.secondary_button.button_link || "tel:+18885551234"}
                        className="flex items-center gap-2 text-primary-foreground hover:underline"
                      >
                        {pageData.cta.secondary_button.icon_name ? (
                          (() => {
                            const PhoneIcon = getIcon(pageData.cta.secondary_button.icon_name) as LucideIcon;
                            return <PhoneIcon className="w-5 h-5" aria-hidden="true" />;
                          })()
                        ) : (
                          <Phone className="w-5 h-5" aria-hidden="true" />
                        )}
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

export default OEMTransport;
