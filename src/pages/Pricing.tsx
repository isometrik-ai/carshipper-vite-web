import { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { usePricing } from "@/api/pricing";
import { getIcon } from "@/lib/icons";
import { CheckCircle, Info, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSection, CallToAction } from "@/types/LandingPage.types";
import type { RouteTable } from "@/types/CaliforniaShipping.types";
import type { ServiceTypesSection, PricingFactorsSection, IncludedItemsSection } from "@/types/Pricing.types";

/**
 * Pricing page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const Pricing = () => {
  const { data, isLoading } = usePricing();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const serviceTypesSection = content.find(c => c.__component === "shared.service-types-section") as ServiceTypesSection | undefined;
    const routeTable = content.find(c => c.__component === "shared.route-table") as RouteTable | undefined;
    const pricingFactorsSection = content.find(c => c.__component === "shared.pricing-factors-section") as PricingFactorsSection | undefined;
    const includedItemsSection = content.find(c => c.__component === "shared.included-items-section") as IncludedItemsSection | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: heroSection,
      serviceTypes: serviceTypesSection,
      routes: routeTable,
      pricingFactors: pricingFactorsSection,
      includedItems: includedItemsSection,
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
        
        <main className="flex-1 pt-20">
          {/* Hero */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {pageData.hero?.main_headline || "Transparent"}{" "}
                  {pageData.hero?.highlighted_text ? (
                    <span className="text-primary">{pageData.hero.highlighted_text}</span>
                  ) : null}
                </h1>
                {pageData.hero?.description ? (
                  <p className="text-lg md:text-xl text-muted-foreground mb-8">
                    {pageData.hero.description}
                  </p>
                ) : null}
                {pageData.hero?.badge_text ? (
                  <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
                    {pageData.hero.badge_icon ? (
                      (() => {
                        const BadgeIcon = getIcon(pageData.hero.badge_icon) as LucideIcon;
                        return <BadgeIcon className="w-4 h-4" aria-hidden="true" />;
                      })()
                    ) : (
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                    )}
                    {pageData.hero.badge_text}
                  </div>
                ) : null}
              </motion.div>
            </div>
          </section>

          {/* Service Types */}
          {pageData.serviceTypes ? (
            <section className="py-16">
              <div className="container mx-auto px-4">
                {pageData.serviceTypes.section_title ? (
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-center mb-12"
                  >
                    {pageData.serviceTypes.section_title}
                  </motion.h2>
                ) : null}
                {pageData.serviceTypes.service_types && pageData.serviceTypes.service_types.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {pageData.serviceTypes.service_types.map((service: any, index: number) => (
                      <motion.div
                        key={service.id || service.service_name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative bg-card rounded-2xl border p-6 ${
                          service.is_recommended ? "border-primary shadow-lg" : "border-border"
                        }`}
                      >
                        {service.is_recommended ? (
                          <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                            {service.recommended_badge_text || "Most Popular"}
                          </span>
                        ) : null}
                        <h3 className="text-xl font-bold mb-2">{service.service_name}</h3>
                        <p className="text-3xl font-bold text-primary mb-4">{service.price}</p>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        {service.features && service.features.length > 0 ? (
                          <ul className="space-y-2">
                            {service.features.map((feature: any, i: number) => (
                              <li key={feature.id || i} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
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
            </section>
          ) : null}

          {/* Popular Routes */}
          {pageData.routes ? (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                {pageData.routes.section_title ? (
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-center mb-4"
                  >
                    {pageData.routes.section_title}
                  </motion.h2>
                ) : null}
                {pageData.routes.section_description ? (
                  <p className="text-center text-muted-foreground mb-12">
                    {pageData.routes.section_description}
                  </p>
                ) : null}
                {pageData.routes.routes && pageData.routes.routes.length > 0 ? (
                  <div className="max-w-5xl mx-auto overflow-x-auto">
                    <table className="w-full bg-card rounded-2xl border border-border overflow-hidden">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="text-left p-4 font-semibold">Route</th>
                          <th className="text-left p-4 font-semibold">Distance</th>
                          <th className="text-left p-4 font-semibold">Price Range</th>
                          <th className="text-left p-4 font-semibold">Transit Time</th>
                          <th className="p-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {pageData.routes.routes.map((route: any, index: number) => (
                          <motion.tr
                            key={route.id || index}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-t border-border hover:bg-muted/30 transition-colors"
                          >
                            <td className="p-4">
                              <span className="font-medium">{route.from}</span>
                              <span className="text-muted-foreground mx-2">→</span>
                              <span className="font-medium">{route.to}</span>
                            </td>
                            <td className="p-4 text-muted-foreground">{route.distance}</td>
                            <td className="p-4 font-semibold text-primary">{route.cost}</td>
                            <td className="p-4 text-muted-foreground">{route.time}</td>
                            <td className="p-4">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-primary"
                                onClick={() => window.location.href = "/#quote-form"}
                              >
                                Quote <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                              </Button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Pricing Factors */}
          {pageData.pricingFactors ? (
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  {pageData.pricingFactors.section_title ? (
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-3xl font-bold text-center mb-4"
                    >
                      {pageData.pricingFactors.section_title}
                    </motion.h2>
                  ) : null}
                  {pageData.pricingFactors.section_description ? (
                    <p className="text-center text-muted-foreground mb-12">
                      {pageData.pricingFactors.section_description}
                    </p>
                  ) : null}
                  {pageData.pricingFactors.factors && pageData.pricingFactors.factors.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {pageData.pricingFactors.factors.map((item: any, index: number) => (
                        <motion.div
                          key={item.id || item.factor_name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
                        >
                          {item.icon_name ? (
                            (() => {
                              const FactorIcon = getIcon(item.icon_name) as LucideIcon;
                              return <FactorIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />;
                            })()
                          ) : (
                            <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                          )}
                          <div>
                            <h3 className="font-semibold mb-1">{item.factor_name}</h3>
                            <p className="text-sm text-muted-foreground">{item.description.trim()}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}

          {/* What's Included */}
          {pageData.includedItems ? (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                  {pageData.includedItems.section_title ? (
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-3xl font-bold mb-8"
                    >
                      {pageData.includedItems.section_title}
                    </motion.h2>
                  ) : null}
                  {pageData.includedItems.items && pageData.includedItems.items.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {pageData.includedItems.items.map((item: any, index: number) => (
                        <motion.div
                          key={item.id || item.text}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-center justify-center gap-2 bg-card p-4 rounded-xl border border-border"
                        >
                          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" aria-hidden="true" />
                          <span className="font-medium">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  ) : null}
                </div>
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
                    {pageData.cta.headline || "Get Your Exact Price"}
                  </h2>
                  {pageData.cta.description ? (
                    <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                      {pageData.cta.description}
                    </p>
                  ) : null}
                  {pageData.cta.primary_button ? (
                    <Button
                      variant="secondary"
                      size="lg"
                      className="text-lg px-8"
                      onClick={() => {
                        if (pageData.cta.primary_button?.button_link) {
                          window.location.href = pageData.cta.primary_button.button_link;
                        } else {
                          window.location.href = "/#quote-form";
                        }
                      }}
                    >
                      {pageData.cta.primary_button.button_text || "Get Your Quote"}
                    </Button>
                  ) : null}
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

export default Pricing;
