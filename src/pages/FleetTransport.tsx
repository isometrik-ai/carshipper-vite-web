import { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useFleetTransport } from "@/api/fleetTransport";
import { getIcon } from "@/lib/icons";
import { Car, CheckCircle, Phone, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSection, ProcessSection, CallToAction } from "@/types/LandingPage.types";

/**
 * Fleet Transport page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const FleetTransport = () => {
  const { data, isLoading } = useFleetTransport();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section" && c.tagline) as HeroSection | undefined;
    const industriesSection = content.find(c => c.__component === "shared.hero-section" && c.main_headline === "Industries We Serve") as HeroSection | undefined;
    const featuresSection = content.find(c => c.__component === "shared.process-section" && c.section_title === "Why Fleet Managers Choose Us") as ProcessSection | undefined;
    const solutionsSection = content.find(c => c.__component === "shared.process-section" && c.section_title === "Fleet Transport Solutions") as ProcessSection | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: heroSection,
      industries: industriesSection,
      features: featuresSection,
      solutions: solutionsSection,
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
        
        <main>
          {/* Hero Section with Quote Form */}
          <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {pageData.hero?.tagline ? (
                    <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                      {pageData.hero.tagline_icon ? (
                        (() => {
                          const TaglineIcon = getIcon(pageData.hero.tagline_icon) as LucideIcon;
                          return <TaglineIcon className="w-4 h-4" aria-hidden="true" />;
                        })()
                      ) : (
                        <Car className="w-4 h-4" aria-hidden="true" />
                      )}
                      {pageData.hero.tagline}
                    </span>
                  ) : null}
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    {pageData.hero?.main_headline || "Fleet"}{" "}
                    {pageData.hero?.highlighted_text ? (
                      <span className="text-primary">{pageData.hero.highlighted_text}</span>
                    ) : null}
                  </h1>
                  
                  {pageData.hero?.description ? (
                    <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                      {pageData.hero.description}
                    </p>
                  ) : null}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <QuoteForm />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Industries - Moved from hero */}
          {pageData.industries?.quick_points && pageData.industries.quick_points.length > 0 ? (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-card rounded-2xl shadow-lg p-8 border"
                  >
                    {pageData.industries.main_headline ? (
                      <h3 className="text-2xl font-semibold mb-6 text-center">{pageData.industries.main_headline}</h3>
                    ) : null}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {pageData.industries.quick_points.map((point: any) => (
                        <div key={point.id || point.text} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                          <span>{point.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          ) : null}

          {/* Stats Section */}
          {pageData.industries?.statistics && pageData.industries.statistics.length > 0 ? (
            <section className="py-12 bg-primary text-primary-foreground">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {pageData.industries.statistics.map((stat: any) => (
                    <div key={stat.id || stat.label} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                      <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
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
                  {pageData.features.section_subtitle ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {pageData.features.section_subtitle}
                    </p>
                  ) : null}
                </div>

                {pageData.features.steps && pageData.features.steps.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pageData.features.steps.map((feature: any, index: number) => {
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
                          className="bg-card rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow"
                        >
                          {FeatureIcon ? (
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                              <FeatureIcon className="w-6 h-6 text-primary" aria-hidden="true" />
                            </div>
                          ) : null}
                          <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                          <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Solutions Section */}
          {pageData.solutions ? (
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.solutions.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.solutions.section_title}
                    </h2>
                  ) : null}
                  {pageData.solutions.section_subtitle ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {pageData.solutions.section_subtitle}
                    </p>
                  ) : null}
                </div>

                {pageData.solutions.steps && pageData.solutions.steps.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-8">
                    {pageData.solutions.steps.map((solution: any, index: number) => (
                      <motion.div
                        key={solution.id || solution.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-card rounded-xl p-8 shadow-lg border"
                      >
                        <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                        <p className="text-muted-foreground mb-4">{solution.description}</p>
                        {/* Note: The JSON doesn't include items array, but the description contains the information */}
                        {/* If items are needed, they would need to be added to the Strapi schema */}
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Partnership CTA */}
          {pageData.cta ? (
            <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  {pageData.cta.headline ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.cta.headline}
                    </h2>
                  ) : null}
                  {pageData.cta.description ? (
                    <p className="text-primary-foreground/90 mb-8 text-lg">
                      {pageData.cta.description}
                    </p>
                  ) : null}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {pageData.cta.primary_button ? (
                      <Button
                        size="lg"
                        variant="secondary"
                        className="gap-2"
                        onClick={() => {
                          if (pageData.cta.primary_button?.button_link && pageData.cta.primary_button.button_link.trim()) {
                            window.location.href = pageData.cta.primary_button.button_link.trim();
                          }
                        }}
                      >
                        {pageData.cta.primary_button.button_text || "Request Fleet Consultation"}
                        {pageData.cta.primary_button.icon_name ? (
                          (() => {
                            const ButtonIcon = getIcon(pageData.cta.primary_button.icon_name) as LucideIcon;
                            return <ButtonIcon className="w-4 h-4" aria-hidden="true" />;
                          })()
                        ) : (
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        )}
                      </Button>
                    ) : null}
                    {pageData.cta.secondary_button ? (
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 gap-2"
                        onClick={() => {
                          if (pageData.cta.secondary_button?.button_link) {
                            window.location.href = pageData.cta.secondary_button.button_link;
                          } else {
                            window.location.href = "tel:+18885551234";
                          }
                        }}
                      >
                        {pageData.cta.secondary_button.icon_name ? (
                          (() => {
                            const ButtonIcon = getIcon(pageData.cta.secondary_button.icon_name) as LucideIcon;
                            return <ButtonIcon className="w-4 h-4" aria-hidden="true" />;
                          })()
                        ) : (
                          <Phone className="w-4 h-4" aria-hidden="true" />
                        )}
                        {pageData.cta.secondary_button.button_text || "Speak to Fleet Specialist"}
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FleetTransport;
