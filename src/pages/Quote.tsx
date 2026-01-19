import { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useQuote } from "@/api/quote";
import { getIcon } from "@/lib/icons";
import { Shield, Clock, Star, Phone, CheckCircle, Info } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HeroSection, StatsBar, CallToAction } from "@/types/LandingPage.types";
import type { SectionIntro, ComparisonTable, SimpleStepsSection } from "@/types/Quote.types";
import type { PricingFactorsSection } from "@/types/Pricing.types";

/**
 * Quote page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const Quote = () => {
  const { data, isLoading } = useQuote();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const statsBar = content.find(c => c.__component === "shared.stats-bar") as StatsBar | undefined;
    const sectionIntro = content.find(c => c.__component === "shared.section-intro") as SectionIntro | undefined;
    const distanceTable = content.find(c => 
      c.__component === "shared.comparison-table" && 
      (c as ComparisonTable).section_title === "Average Cost by Distance"
    ) as ComparisonTable | undefined;
    const vehicleTable = content.find(c => 
      c.__component === "shared.comparison-table" && 
      (c as ComparisonTable).section_title === "Average Cost by Vehicle Type"
    ) as ComparisonTable | undefined;
    const pricingFactors = content.find(c => c.__component === "shared.pricing-factors-section") as PricingFactorsSection | undefined;
    const simpleSteps = content.find(c => c.__component === "shared.simple-steps-section") as SimpleStepsSection | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: heroSection,
      stats: statsBar,
      sectionIntro,
      distanceTable,
      vehicleTable,
      pricingFactors,
      simpleSteps,
      cta,
    };
  }, [data]);

  // Hardcoded pricing data for comparison tables (since cells aren't in the JSON)
  // These should ideally come from Strapi, but for now we'll use the original data structure
  const distanceTableData = useMemo(() => {
    if (!pageData?.distanceTable) return [];
    
    const pricingMap: Record<string, { open: string; enclosed: string }> = {
      "Less than 500 miles": { open: "$450-$650", enclosed: "$700-$950" },
      "500-1,000 miles": { open: "$600-$850", enclosed: "$900-$1,200" },
      "1,000-1,500 miles": { open: "$750-$1,000", enclosed: "$1,100-$1,400" },
      "1,500-2,000 miles": { open: "$900-$1,150", enclosed: "$1,300-$1,600" },
      "Over 2,000 miles": { open: "$1,050-$1,400", enclosed: "$1,500-$1,900" },
    };

    return pageData.distanceTable.rows.map(row => ({
      ...row,
      openCost: pricingMap[row.feature]?.open || "",
      enclosedCost: pricingMap[row.feature]?.enclosed || "",
    }));
  }, [pageData?.distanceTable]);

  const vehicleTableData = useMemo(() => {
    if (!pageData?.vehicleTable) return [];
    
    const pricingMap: Record<string, { short: string; medium: string; long: string }> = {
      "Sedan/Coupe": { short: "$425-$550", medium: "$725-$900", long: "$925-$1,150" },
      "Compact SUV": { short: "$455-$600", medium: "$775-$950", long: "$1,025-$1,250" },
      "Full-Size SUV": { short: "$505-$675", medium: "$825-$1,050", long: "$1,075-$1,350" },
      "Pickup Truck": { short: "$575-$750", medium: "$925-$1,150", long: "$1,275-$1,500" },
      "Motorcycle": { short: "$275-$400", medium: "$400-$550", long: "$550-$750" },
    };

    return pageData.vehicleTable.rows.map(row => ({
      ...row,
      short: pricingMap[row.feature]?.short || "",
      medium: pricingMap[row.feature]?.medium || "",
      long: pricingMap[row.feature]?.long || "",
    }));
  }, [pageData?.vehicleTable]);

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
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {pageData.hero?.tagline ? (
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                      {pageData.hero.tagline_icon ? (
                        (() => {
                          const TaglineIcon = getIcon(pageData.hero.tagline_icon) as LucideIcon;
                          return <TaglineIcon className="w-4 h-4" aria-hidden="true" />;
                        })()
                      ) : null}
                      <span className="text-sm font-medium">{pageData.hero.tagline}</span>
                    </div>
                  ) : null}

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {pageData.hero?.main_headline || "Calculate Your"}{" "}
                    {pageData.hero?.highlighted_text ? (
                      <span className="text-primary">{pageData.hero.highlighted_text}</span>
                    ) : null}
                  </h1>

                  {pageData.hero?.description ? (
                    <p className="text-lg text-muted-foreground mb-6">
                      {pageData.hero.description}
                    </p>
                  ) : null}

                  {/* Benefits */}
                  {pageData.hero?.quick_points && pageData.hero.quick_points.length > 0 ? (
                    <div className="space-y-3 mb-8">
                      {pageData.hero.quick_points.map((benefit: any) => (
                        <div key={benefit.id || benefit.text} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" aria-hidden="true" />
                          <span>{benefit.text}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {/* Trust Badges */}
                  {pageData.hero?.trust_indicators && pageData.hero.trust_indicators.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
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

                {/* Quote Form */}
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

          {/* Stats Section */}
          {pageData.stats && pageData.stats.statistics && pageData.stats.statistics.length > 0 ? (
            <section className="py-12 bg-muted/30">
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

          {/* How Much Does It Cost */}
          {pageData.sectionIntro ? (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  {pageData.sectionIntro.section_title ? (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {pageData.sectionIntro.section_title}
                    </h2>
                  ) : null}
                  {pageData.sectionIntro.section_description ? (
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                      {pageData.sectionIntro.section_description}
                    </p>
                  ) : null}
                </motion.div>

                {/* Cost by Distance Table */}
                {pageData.distanceTable ? (
                  <div className="mb-12">
                    {pageData.distanceTable.section_title ? (
                      <h3 className="text-xl font-semibold mb-4">{pageData.distanceTable.section_title}</h3>
                    ) : null}
                    <div className="overflow-x-auto">
                      <table className="w-full bg-background rounded-lg overflow-hidden shadow-sm border border-border">
                        <thead className="bg-primary text-primary-foreground">
                          <tr>
                            {pageData.distanceTable.column_headers && pageData.distanceTable.column_headers.length > 0 ? (
                              pageData.distanceTable.column_headers.map((header) => (
                                <th key={header.id} className="px-4 py-3 text-left">
                                  {header.header_text}
                                </th>
                              ))
                            ) : null}
                          </tr>
                        </thead>
                        <tbody>
                          {distanceTableData.map((row: any, index: number) => (
                            <tr key={row.id || index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                              <td className="px-4 py-3 font-medium">{row.feature}</td>
                              <td className="px-4 py-3 text-primary">{row.openCost}</td>
                              <td className="px-4 py-3 text-primary">{row.enclosedCost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}

                {/* Cost by Vehicle Table */}
                {pageData.vehicleTable ? (
                  <div>
                    {pageData.vehicleTable.section_title ? (
                      <h3 className="text-xl font-semibold mb-4">{pageData.vehicleTable.section_title}</h3>
                    ) : null}
                    <div className="overflow-x-auto">
                      <table className="w-full bg-background rounded-lg overflow-hidden shadow-sm border border-border">
                        <thead className="bg-primary text-primary-foreground">
                          <tr>
                            {pageData.vehicleTable.column_headers && pageData.vehicleTable.column_headers.length > 0 ? (
                              pageData.vehicleTable.column_headers.map((header) => (
                                <th key={header.id} className="px-4 py-3 text-left">
                                  {header.header_text}
                                </th>
                              ))
                            ) : null}
                          </tr>
                        </thead>
                        <tbody>
                          {vehicleTableData.map((row: any, index: number) => (
                            <tr key={row.id || index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                              <td className="px-4 py-3 font-medium">{row.feature}</td>
                              <td className="px-4 py-3 text-primary">{row.short}</td>
                              <td className="px-4 py-3 text-primary">{row.medium}</td>
                              <td className="px-4 py-3 text-primary">{row.long}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Cost Factors */}
          {pageData.pricingFactors ? (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  {pageData.pricingFactors.section_title ? (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {pageData.pricingFactors.section_title}
                    </h2>
                  ) : null}
                  {pageData.pricingFactors.section_description ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {pageData.pricingFactors.section_description}
                    </p>
                  ) : null}
                </motion.div>

                {pageData.pricingFactors.factors && pageData.pricingFactors.factors.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {pageData.pricingFactors.factors.map((factor: any, index: number) => {
                      const FactorIcon = factor.icon_name
                        ? (getIcon(factor.icon_name) as LucideIcon)
                        : null;

                      return (
                        <motion.div
                          key={factor.id || factor.factor_name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-background p-6 rounded-xl border border-border"
                        >
                          {FactorIcon ? (
                            <FactorIcon className="w-8 h-8 text-primary mb-4" aria-hidden="true" />
                          ) : null}
                          <h3 className="font-semibold text-lg mb-2">{factor.factor_name}</h3>
                          <p className="text-sm text-muted-foreground">{factor.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* How It Works */}
          {pageData.simpleSteps ? (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.simpleSteps.section_title ? (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {pageData.simpleSteps.section_title}
                    </h2>
                  ) : null}
                </div>

                {pageData.simpleSteps.steps && pageData.simpleSteps.steps.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {pageData.simpleSteps.steps.map((step: any, index: number) => (
                      <motion.div
                        key={step.id || step.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-center"
                      >
                        {step.step_number ? (
                          <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            {step.step_number}
                          </div>
                        ) : null}
                        <h3 className="font-semibold mb-2">{step.title}</h3>
                        {step.description ? (
                          <p className="text-sm text-muted-foreground">{step.description.trim()}</p>
                        ) : null}
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Call CTA */}
          {pageData.cta ? (
            <section className="py-12 bg-primary">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                    {pageData.cta.headline || "Prefer to Talk to Someone?"}
                  </h2>
                  {pageData.cta.description ? (
                    <p className="text-primary-foreground/80 mb-4">
                      {pageData.cta.description}
                    </p>
                  ) : null}
                  {pageData.cta.phone_number ? (
                    <a
                      href={pageData.cta.phone_href || `tel:${pageData.cta.phone_number.replace(/\D/g, '')}`}
                      className="inline-flex items-center gap-2 text-xl font-bold text-primary-foreground hover:underline"
                    >
                      {pageData.cta.icon_name ? (
                        (() => {
                          const PhoneIcon = getIcon(pageData.cta.icon_name) as LucideIcon;
                          return <PhoneIcon className="w-6 h-6" aria-hidden="true" />;
                        })()
                      ) : (
                        <Phone className="w-6 h-6" aria-hidden="true" />
                      )}
                      {pageData.cta.phone_number}
                    </a>
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

export default Quote;
