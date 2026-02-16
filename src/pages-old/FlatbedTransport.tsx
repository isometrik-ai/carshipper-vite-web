import { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useFlatbedTransport } from "@/api/flatbedTransport";
import { getIcon } from "@/lib/icons";
import { Truck, CheckCircle, DollarSign, HelpCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { HeroSection, FAQDisplay } from "@/types/LandingPage.types";
import type { ServiceCards } from "@/types/AutoAuctionShipping.types";
import type { ComparisonTable, PricingInfo } from "@/types/FlatbedTransport.types";

/**
 * Flatbed Transport page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const FlatbedTransport = () => {
  const { data, isLoading } = useFlatbedTransport();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section" && c.tagline) as HeroSection | undefined;
    const vehicleTypesSection = content.find(c => c.__component === "shared.hero-section" && c.main_headline === "Do You Need a Flatbed?") as HeroSection | undefined;
    const serviceCards = content.find(c => c.__component === "shared.service-cards") as ServiceCards | undefined;
    const comparisonTable = content.find(c => c.__component === "shared.comparison-table") as ComparisonTable | undefined;
    const pricingInfo = content.find(c => c.__component === "shared.pricing-info") as PricingInfo | undefined;
    const faqDisplay = content.find(c => c.__component === "shared.faq-display") as FAQDisplay | undefined;

    return {
      hero: heroSection,
      vehicleTypes: vehicleTypesSection,
      serviceCards,
      comparison: comparisonTable,
      pricing: pricingInfo,
      faq: faqDisplay,
    };
  }, [data]);

  // Fallback comparison data (used when column_values are not populated in Strapi)
  const comparisonDataFallback = useMemo(() => {
    if (!pageData?.comparison) return [];
    
    const fallbackValues: Record<string, { open: string; enclosed: string; flatbed: string }> = {
      "Cost": { open: "Lowest", enclosed: "Higher", flatbed: "Highest" },
      "Availability": { open: "Most Common", enclosed: "Less Common", flatbed: "Limited" },
      "Weather Protection": { open: "None", enclosed: "Full", flatbed: "None" },
      "Oversized Vehicles": { open: "Limited", enclosed: "Limited", flatbed: "Best" },
      "Inoperable Vehicles": { open: "Possible", enclosed: "Possible", flatbed: "Best" },
    };

    return pageData.comparison.rows.map(row => ({
      feature: row.feature,
      ...(fallbackValues[row.feature] || { open: "", enclosed: "", flatbed: "" }),
      column_values: row.column_values || [],
    }));
  }, [pageData?.comparison]);

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
                        <Truck className="w-4 h-4" aria-hidden="true" />
                      )}
                      {pageData.hero.tagline}
                    </span>
                  ) : null}
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    {pageData.hero?.main_headline || "Flatbed"}{" "}
                    {pageData.hero?.highlighted_text ? (
                      <span className="text-primary">{pageData.hero.highlighted_text}</span>
                    ) : null}
                  </h1>
                  
                  {pageData.hero?.description ? (
                    <p className="text-xl text-muted-foreground mb-6 max-w-xl">
                      {pageData.hero.description}
                    </p>
                  ) : null}

                  {/* Vehicle Types - Below left text */}
                  {pageData.vehicleTypes?.quick_points && pageData.vehicleTypes.quick_points.length > 0 ? (
                    <div className="bg-card/50 backdrop-blur rounded-xl p-4 border">
                      <h3 className="text-sm font-semibold mb-3">Do You Need a Flatbed?</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {pageData.vehicleTypes.quick_points.slice(0, 6).map((point: any) => (
                          <div key={point.id || point.text} className="flex items-center gap-2 text-xs">
                            <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" aria-hidden="true" />
                            <span>{point.text}</span>
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

          {/* Additional Vehicle Types */}
          {pageData.vehicleTypes?.quick_points && pageData.vehicleTypes.quick_points.length > 0 ? (
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
                    <h3 className="text-2xl font-semibold mb-6 text-center">Do You Need a Flatbed?</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {pageData.vehicleTypes.quick_points.map((point: any) => (
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

          {/* Benefits Section */}
          {pageData.serviceCards ? (
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.serviceCards.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.serviceCards.section_title}
                    </h2>
                  ) : null}
                  {pageData.serviceCards.section_subtitle ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {pageData.serviceCards.section_subtitle}
                    </p>
                  ) : null}
                </div>

                {pageData.serviceCards.service_cards && pageData.serviceCards.service_cards.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pageData.serviceCards.service_cards.map((benefit: any, index: number) => {
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

          {/* Comparison Table */}
          {pageData.comparison ? (
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.comparison.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.comparison.section_title}
                    </h2>
                  ) : null}
                  {pageData.comparison.section_subtitle ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {pageData.comparison.section_subtitle}
                    </p>
                  ) : null}
                </div>

                {pageData.comparison.column_headers && pageData.comparison.column_headers.length > 0 ? (
                  <div className="max-w-4xl mx-auto overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          {pageData.comparison.column_headers.map((header: any, index: number) => (
                            <th
                              key={header.id || index}
                              className={`py-4 px-4 ${index === 0 ? "text-left" : "text-center"} ${header.is_highlighted ? "bg-primary/10" : ""}`}
                            >
                              {header.header_text}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonDataFallback.map((row: any, rowIndex: number) => {
                          // Use column_values if available, otherwise use fallback
                          const hasColumnValues = row.column_values && row.column_values.length > 0;
                          const columnCount = pageData.comparison.column_headers.length - 1; // Exclude feature column

                          return (
                            <tr key={row.feature || rowIndex} className="border-b">
                              <td className="py-4 px-4 font-medium">{row.feature}</td>
                              {hasColumnValues ? (
                                // Use Strapi column_values
                                row.column_values.map((cell: any, cellIndex: number) => (
                                  <td
                                    key={cell.id || cellIndex}
                                    className={`text-center py-4 px-4 ${cell.is_highlighted ? "bg-primary/10 font-medium" : ""}`}
                                  >
                                    {cell.value}
                                  </td>
                                ))
                              ) : (
                                // Use fallback values
                                <>
                                  <td className="text-center py-4 px-4">{row.open || ""}</td>
                                  <td className="text-center py-4 px-4">{row.enclosed || ""}</td>
                                  <td className="text-center py-4 px-4 bg-primary/10 font-medium">{row.flatbed || ""}</td>
                                </>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Pricing Info */}
          {pageData.pricing ? (
            <section className="py-20 bg-primary text-primary-foreground">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-start gap-6">
                    {pageData.pricing.icon_name ? (
                      (() => {
                        const PricingIcon = getIcon(pageData.pricing.icon_name) as LucideIcon;
                        return <PricingIcon className="w-12 h-12 flex-shrink-0" aria-hidden="true" />;
                      })()
                    ) : (
                      <DollarSign className="w-12 h-12 flex-shrink-0" aria-hidden="true" />
                    )}
                    <div>
                      {pageData.pricing.title ? (
                        <h2 className="text-3xl font-bold mb-4">{pageData.pricing.title}</h2>
                      ) : null}
                      {pageData.pricing.description ? (
                        <p className="text-primary-foreground/90 mb-4">
                          {pageData.pricing.description}
                        </p>
                      ) : null}
                      {pageData.pricing.bullet_points && pageData.pricing.bullet_points.length > 0 ? (
                        <ul className="space-y-2 text-primary-foreground/90">
                          {pageData.pricing.bullet_points.map((point: any) => (
                            <li key={point.id || point.text}>{point.text}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {/* FAQ Section */}
          {pageData.faq ? (
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  {pageData.faq.icon_name ? (
                    (() => {
                      const FAQIcon = getIcon(pageData.faq.icon_name) as LucideIcon;
                      return <FAQIcon className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />;
                    })()
                  ) : (
                    <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                  )}
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
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FlatbedTransport;
