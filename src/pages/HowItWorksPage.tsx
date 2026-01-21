import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";
import ProcessStepsSection from "@/components/sections/ProcessStepsSection";
import { getIcon } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";
import { useHowItWorks } from "@/api/howItWorks";
import { useMemo } from "react";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";

const HowItWorksPage = () => {

  const { data, isLoading } = useHowItWorks();

  // Extract page content components
  const pageContent = useMemo(() => {
    return data?.data?.page_content || [];
  }, [data]);


  // Show loading state while fetching initial data
  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1" role="main" aria-label="Main content">
            <PageSkeleton />
          </main>
          <Footer />
        </div>
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
      <PageSEO seoMetadata={data?.data?.seo_metadata} />

      <div className="min-h-screen flex flex-col">
        <Header />

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
                    {heroData.main_headline ? heroData.main_headline.trim() : "How Auto Transport"}{" "}
                    {heroData.highlighted_text ? (
                      <span className="text-primary">{heroData.highlighted_text}</span>
                    ) : null}
                  </h1>
                  {heroData.description ? (
                    <p className="text-lg md:text-xl text-muted-foreground mb-8">
                      {heroData.description}
                    </p>
                  ) : null}
                  {heroData.trust_indicators && heroData.trust_indicators.length > 0 ? (
                    <div className="flex flex-wrap gap-4 mb-8">
                      {heroData.trust_indicators.map((indicator) => {
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
                  {heroData.phone_number ? (
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
                    {comparisonSection?.section_title}
                  </h2>
                  {comparisonSection?.section_subtitle ? (
                    <p className="text-muted-foreground">
                      {comparisonSection?.section_subtitle}
                    </p>
                  ) : null}
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  {comparisonSection?.columns.map((column, index) => (
                    <motion.div
                      key={column.id}
                      initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className={column.is_highlighted
                        ? "bg-destructive/5 border border-destructive/20 rounded-2xl p-6"
                        : "bg-success/5 border border-success/20 rounded-2xl p-6"
                      }
                    >
                      <h3 className={`font-semibold mb-3 ${column.is_highlighted ? "text-destructive" : "text-success"
                        }`}>
                        {column.column_title}
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {column.bullet_points && column.bullet_points.length > 0
                          ? column.bullet_points.map((point) => (
                            <li key={point.id}>• {point.text}</li>
                          ))
                          : null}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {testimonialsSection?.section_title}
                </h2>
                {testimonialsSection?.section_subtitle ? (
                  <p className="text-muted-foreground">
                    {testimonialsSection?.section_subtitle}
                  </p>
                ) : null}
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {testimonialsSection?.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-muted/30 rounded-xl p-6 border border-border"
                  >
                    <p className="text-muted-foreground mb-4">{testimonial.quote_text}</p>
                    <div>
                      <p className="font-semibold">{testimonial.customer_name}</p>
                      {testimonial.location ? (
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {ctaSection?.headline ? (
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    {ctaSection?.headline}
                  </h2>
                ) : null}
                {ctaSection?.description ? (
                  <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                    {ctaSection?.description}
                  </p>
                ) : null}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {ctaSection?.primary_button ? (
                    <Link to={ctaSection?.primary_button.button_link}>
                      <Button
                        variant="secondary"
                        size="lg"
                        className="text-lg px-8"
                      >
                        {ctaSection?.primary_button.button_text}
                      </Button>
                    </Link>
                  ) : null}
                  {ctaSection?.secondary_button ? (
                    <a
                      href={ctaSection?.secondary_button.button_link}
                      className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="font-medium">{ctaSection?.secondary_button.button_text}</span>
                    </a>
                  ) : null}
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HowItWorksPage;
