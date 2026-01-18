import { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { LoadingState } from "@/components/landing/LoadingState";
import { useDealershipDelivery } from "@/api/dealershipDelivery";
import { getIcon } from "@/lib/icons";
import { CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HeroSection, ProcessSection, TestimonialsDisplay } from "@/types/LandingPage.types";
import type { ServiceList } from "@/types/AutoAuctionShipping.types";

/**
 * Dealership Delivery page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const DealershipDelivery = () => {
  const { data, isLoading } = useDealershipDelivery();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const serviceList = content.find(c => c.__component === "shared.service-list") as ServiceList | undefined;
    const featuresSection = content.find(c => 
      c.__component === "shared.process-section" && 
      (c as ProcessSection).section_title === "An Extension of Your Dealership Team"
    ) as ProcessSection | undefined;
    const processSection = content.find(c => 
      c.__component === "shared.process-section" && 
      (c as ProcessSection).section_title === "How We Work with Dealerships"
    ) as ProcessSection | undefined;
    const testimonials = content.find(c => c.__component === "shared.testimonials-display") as TestimonialsDisplay | undefined;

    return {
      hero: heroSection,
      serviceList,
      features: featuresSection,
      process: processSection,
      testimonials,
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
                    ) : null}
                    {pageData.hero.tagline}
                  </span>
                ) : null}
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {pageData.hero?.main_headline || "Dealership"}{" "}
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

        {/* Benefits */}
        {pageData.serviceList ? (
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
                  {pageData.serviceList.section_title ? (
                    <h3 className="text-2xl font-semibold mb-6 text-center">
                      {pageData.serviceList.section_title}
                    </h3>
                  ) : null}
                  {pageData.serviceList.services && pageData.serviceList.services.length > 0 ? (
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4" role="list">
                      {pageData.serviceList.services.map((service: any) => (
                        <div key={service.id || service.text} className="flex items-center gap-2 text-sm" role="listitem">
                          <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                          <span>{service.text}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
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

              {pageData.features.steps && pageData.features.steps.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
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
                        role="listitem"
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
                <div className="flex flex-wrap justify-center gap-4" role="list">
                  {pageData.process.steps.map((item: any, index: number) => (
                    <motion.div
                      key={item.id || item.step_number}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-card rounded-xl p-6 shadow-lg border text-center w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(20%-1rem)]"
                      role="listitem"
                    >
                      {item.step_number ? (
                        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                          {item.step_number}
                        </div>
                      ) : null}
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* Testimonials */}
        {pageData.testimonials && pageData.testimonials.testimonials && pageData.testimonials.testimonials.length > 0 ? (
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
              {pageData.testimonials.section_title ? (
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                  {pageData.testimonials.section_title}
                </h2>
              ) : null}
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" role="list">
                {pageData.testimonials.testimonials.map((testimonial: any, index: number) => (
                  <motion.div
                    key={testimonial.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm"
                    role="listitem"
                  >
                    {testimonial.quote_text ? (
                      <p className="text-primary-foreground/90 italic mb-4">
                        {testimonial.quote_text}
                      </p>
                    ) : null}
                    <div>
                      {testimonial.customer_name ? (
                        <p className="font-semibold">{testimonial.customer_name}</p>
                      ) : null}
                      {testimonial.role ? (
                        <p className="text-primary-foreground/70 text-sm">{testimonial.role}</p>
                      ) : null}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </>
  );
};

export default DealershipDelivery;
