import { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

/**
 * Enclosed Transport page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const EnclosedTransport = () => {
  const { data, isLoading } = useEnclosedTransport();

  // Extract components from page content
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

  // Parse paragraphs from richtext
  const parsedParagraphs = useMemo(() => {
    if (!pageData?.textSection?.paragraphs) return [];
    return pageData.textSection.paragraphs
      .split(/\n\n+/)
      .map((p: string) => p.trim())
      .filter((p: string) => p.length > 0);
  }, [pageData?.textSection?.paragraphs]);

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

                  {/* Quick Points */}
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

          {/* What is Enclosed Transport */}
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
                    <div className="text-muted-foreground mb-4">
                      {parsedParagraphs.map((paragraph: string, index: number) => (
                        <p key={index} className={index < parsedParagraphs.length - 1 ? "mb-4" : ""}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
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

          {/* Ideal For Section */}
          {pageData.vehicleTypes ? (
            <section className="py-16 md:py-24 bg-primary">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  {pageData.vehicleTypes.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                      {pageData.vehicleTypes.section_title}
                    </h2>
                  ) : null}
                  {pageData.vehicleTypes.section_subtitle ? (
                    <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                      {pageData.vehicleTypes.section_subtitle}
                    </p>
                  ) : null}
                </motion.div>

                {pageData.vehicleTypes.vehicle_types && pageData.vehicleTypes.vehicle_types.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                    {pageData.vehicleTypes.vehicle_types.map((type: any, index: number) => (
                      <motion.div
                        key={type.id || type.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center"
                      >
                        <Car className="w-6 h-6 text-primary-foreground mx-auto mb-2" aria-hidden="true" />
                        <span className="text-primary-foreground font-medium">{type.name}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Features Grid */}
          {pageData.serviceCards ? (
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  {pageData.serviceCards.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.serviceCards.section_title}
                    </h2>
                  ) : null}
                  {pageData.serviceCards.section_subtitle ? (
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      {pageData.serviceCards.section_subtitle}
                    </p>
                  ) : null}
                </motion.div>

                {pageData.serviceCards.service_cards && pageData.serviceCards.service_cards.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8">
                    {pageData.serviceCards.service_cards.map((feature: any, index: number) => {
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

          {/* Comparison Section */}
          {pageData.comparison ? (
            <section className="py-16 md:py-24 bg-muted/30">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  {pageData.comparison.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.comparison.section_title}
                    </h2>
                  ) : null}
                  {pageData.comparison.section_subtitle ? (
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      {pageData.comparison.section_subtitle}
                    </p>
                  ) : null}
                </motion.div>

                {pageData.comparison.columns && pageData.comparison.columns.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {pageData.comparison.columns.map((column: any, index: number) => {
                      const ColumnIcon = column.icon_name
                        ? (getIcon(column.icon_name) as LucideIcon)
                        : null;

                      // Use bullet_points if available, otherwise use features
                      const items = column.bullet_points && column.bullet_points.length > 0
                        ? column.bullet_points
                        : column.features && column.features.length > 0
                          ? column.features
                          : [];

                      return (
                        <motion.div
                          key={column.id || column.column_title}
                          initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5 }}
                          className={`bg-card p-6 rounded-2xl ${column.is_highlighted ? "border-2 border-primary shadow-lg" : "border border-border"}`}
                        >
                          <div className="flex items-center gap-3 mb-6">
                            {ColumnIcon ? (
                              <div className={`w-10 h-10 ${column.is_highlighted ? "bg-primary" : "bg-muted"} rounded-xl flex items-center justify-center`}>
                                <ColumnIcon className={`w-5 h-5 ${column.is_highlighted ? "text-primary-foreground" : "text-muted-foreground"}`} aria-hidden="true" />
                              </div>
                            ) : null}
                            <h3 className="text-xl font-bold">{column.column_title}</h3>
                          </div>
                          {items.length > 0 ? (
                            <ul className="space-y-3">
                              {items.map((item: any, itemIndex: number) => {
                                const isPositive = column.is_highlighted || (item.is_positive !== null ? item.is_positive : true);

                                return (
                                  <li key={item.id || itemIndex} className={`flex items-start gap-3 ${!isPositive ? "text-muted-foreground" : ""}`}>
                                    {isPositive ? (
                                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                                    ) : (
                                      <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center mt-0.5 flex-shrink-0 text-xs">•</span>
                                    )}
                                    <span>{item.text}</span>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : null}
                        </motion.div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Trailer Types */}
          {pageData.trailerTypes ? (
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  {pageData.trailerTypes.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.trailerTypes.section_title}
                    </h2>
                  ) : null}
                  {pageData.trailerTypes.section_subtitle ? (
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      {pageData.trailerTypes.section_subtitle}
                    </p>
                  ) : null}
                </motion.div>

                {pageData.trailerTypes.trailer_types && pageData.trailerTypes.trailer_types.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pageData.trailerTypes.trailer_types.map((trailer: any, index: number) => (
                      <motion.div
                        key={trailer.id || trailer.type}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-card p-6 rounded-2xl border border-border text-center"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Car className="w-6 h-6 text-primary" aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold mb-2">{trailer.type}</h3>
                        <div className="text-primary font-bold mb-2">{trailer.capacity}</div>
                        <p className="text-sm text-muted-foreground">{trailer.description}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Testimonials */}
          {pageData.testimonials ? (
            <section className="py-16 md:py-24 bg-secondary/50">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  {pageData.testimonials.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.testimonials.section_title}
                    </h2>
                  ) : null}
                </motion.div>

                {pageData.testimonials.testimonials && pageData.testimonials.testimonials.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                          <p className="text-muted-foreground text-sm">{testimonial.quote_text}</p>
                        ) : null}
                      </motion.div>
                    ))}
                  </div>
                ) : null}

                {pageData.testimonials.ratings && pageData.testimonials.ratings.length > 0 ? (
                  <div className="flex justify-center gap-8 mt-12">
                    {pageData.testimonials.ratings.map((rating: any) => (
                      <div key={rating.id || rating.score} className="text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">{rating.score}</div>
                        <div className="text-sm text-muted-foreground">{rating.label}</div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* FAQs */}
          {pageData.faq ? (
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  {pageData.faq.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.faq.section_title}
                    </h2>
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
                    {pageData.cta.headline || "How much will my enclosed auto shipping cost?"}
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
                      {pageData.cta.primary_button.icon_name ? (
                        (() => {
                          const ButtonIcon = getIcon(pageData.cta.primary_button.icon_name) as LucideIcon;
                          return <ButtonIcon className="w-5 h-5 ml-2" aria-hidden="true" />;
                        })()
                      ) : (
                        <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                      )}
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

export default EnclosedTransport;
