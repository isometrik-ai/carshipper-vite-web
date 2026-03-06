import { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useHeavyHauling } from "@/api/heavyHauling";
import { getIcon } from "@/lib/icons";
import { Weight, CheckCircle, AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HeroSection, ProcessSection } from "@/types/LandingPage.types";
import type { ServiceList, ServiceCards, AlertWarning } from "@/types/AutoAuctionShipping.types";
import type { TrailerTypes } from "@/types/EnclosedTransport.types";

/**
 * Heavy Hauling page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const HeavyHauling = () => {
  const { data, isLoading } = useHeavyHauling();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const serviceList = content.find(c => c.__component === "shared.service-list") as ServiceList | undefined;
    const serviceCards = content.find(c => c.__component === "shared.service-cards") as ServiceCards | undefined;
    const processSection = content.find(c => c.__component === "shared.process-section") as ProcessSection | undefined;
    const trailerTypes = content.find(c => c.__component === "shared.trailer-types") as TrailerTypes | undefined;
    const alertWarning = content.find(c => c.__component === "shared.alert-warning") as AlertWarning | undefined;

    return {
      hero: heroSection,
      equipmentList: serviceList,
      features: serviceCards,
      process: processSection,
      trailers: trailerTypes,
      compliance: alertWarning,
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
        <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />
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
      <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />

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
                        <Weight className="w-4 h-4" aria-hidden="true" />
                      )}
                      {pageData.hero.tagline}
                    </span>
                  ) : null}
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    {pageData.hero?.main_headline || "Heavy Hauling &"}{" "}
                    {pageData.hero?.highlighted_text ? (
                      <span className="text-primary">{pageData.hero.highlighted_text}</span>
                    ) : null}
                  </h1>
                  
                  {pageData.hero?.description ? (
                    <p className="text-xl text-muted-foreground mb-6 max-w-xl">
                      {pageData.hero.description}
                    </p>
                  ) : null}

                  {/* Equipment Types - Below left text */}
                  {pageData.equipmentList?.services && pageData.equipmentList.services.length > 0 ? (
                    <div className="bg-card/50 backdrop-blur rounded-xl p-4 border">
                      <h3 className="text-sm font-semibold mb-3">Equipment We Transport</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {pageData.equipmentList.services.slice(0, 6).map((service: any) => (
                          <div key={service.id || service.text} className="flex items-center gap-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" aria-hidden="true" />
                            <span>{service.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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

          {/* Additional Equipment Types */}
          {pageData.equipmentList?.services && pageData.equipmentList.services.length > 0 ? (
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-card rounded-2xl shadow-lg p-8 border"
                  >
                    {pageData.equipmentList.section_title ? (
                      <h3 className="text-2xl font-semibold mb-6 text-center">{pageData.equipmentList.section_title}</h3>
                    ) : null}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {pageData.equipmentList.services.map((service: any) => (
                        <div key={service.id || service.text} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                          <span>{service.text}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
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

                {pageData.features.service_cards && pageData.features.service_cards.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

          {/* Process Section */}
          {pageData.process ? (
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.process.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.process.section_title}
                    </h2>
                  ) : null}
                  {pageData.process.section_subtitle ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {pageData.process.section_subtitle}
                    </p>
                  ) : null}
                </div>

                {pageData.process.steps && pageData.process.steps.length > 0 ? (
                  <div className="max-w-4xl mx-auto">
                    {pageData.process.steps.map((item: any, index: number) => (
                      <motion.div
                        key={item.id || item.step_number}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex gap-6 mb-8"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                            {item.step_number || (index + 1).toString()}
                          </div>
                        </div>
                        <div className="flex-1 pb-8 border-b last:border-0">
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Trailer Types */}
          {pageData.trailers ? (
            <section className="py-20 bg-primary text-primary-foreground">
              <div className="container mx-auto px-4">
                {pageData.trailers.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    {pageData.trailers.section_title}
                  </h2>
                ) : null}
                
                {pageData.trailers.trailer_types && pageData.trailers.trailer_types.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pageData.trailers.trailer_types.map((trailer: any) => (
                      <div key={trailer.id || trailer.type} className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold mb-2">{trailer.type}</h3>
                        {trailer.capacity ? (
                          <div className="text-primary-foreground/80 font-bold mb-2 text-sm">{trailer.capacity}</div>
                        ) : null}
                        <p className="text-primary-foreground/80 text-sm">{trailer.description}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Safety Notice */}
          {pageData.compliance ? (
            <section className="py-12 bg-accent/10">
              <div className="container mx-auto px-4">
                <div className="flex items-start gap-4 max-w-4xl mx-auto">
                  {pageData.compliance.icon_name ? (
                    (() => {
                      const AlertIcon = getIcon(pageData.compliance.icon_name) as LucideIcon;
                      return <AlertIcon className="w-8 h-8 text-accent flex-shrink-0 mt-1" aria-hidden="true" />;
                    })()
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-accent flex-shrink-0 mt-1" aria-hidden="true" />
                  )}
                  <div>
                    {pageData.compliance.title ? (
                      <h3 className="text-lg font-semibold mb-2">{pageData.compliance.title}</h3>
                    ) : null}
                    {pageData.compliance.message ? (
                      <p className="text-muted-foreground">
                        {pageData.compliance.message}
                      </p>
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

export default HeavyHauling;
