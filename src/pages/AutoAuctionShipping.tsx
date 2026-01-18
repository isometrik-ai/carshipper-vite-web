import { useMemo } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { LoadingState } from "@/components/landing/LoadingState";
import { useAutoAuctionShipping } from "@/api/autoAuctionShipping";
import { getIcon } from "@/lib/icons";
import { CheckCircle, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ProcessSection, HeroSection, TestimonialsDisplay } from "@/types/LandingPage.types";
import type { ServiceList, ServiceCards, AlertWarning } from "@/types/AutoAuctionShipping.types";

/**
 * Auto Auction Shipping page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const AutoAuctionShipping = () => {
  const { data, isLoading } = useAutoAuctionShipping();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const serviceList = content.find(c => c.__component === "shared.service-list") as ServiceList | undefined;
    const serviceCards = content.find(c => c.__component === "shared.service-cards") as ServiceCards | undefined;
    const featuresSection = content.find(c =>
      c.__component === "shared.process-section" &&
      (c as ProcessSection).section_title === "Why Auction Buyers Trust Us"
    ) as ProcessSection | undefined;
    const processSection = content.find(c =>
      c.__component === "shared.process-section" &&
      (c as ProcessSection).section_title === "From Winning Bid to Delivery"
    ) as ProcessSection | undefined;
    const testimonials = content.find(c => c.__component === "shared.testimonials-display") as TestimonialsDisplay | undefined;
    const alertWarning = content.find(c => c.__component === "shared.alert-warning") as AlertWarning | undefined;

    return {
      hero: heroSection,
      serviceList,
      serviceCards,
      features: featuresSection,
      process: processSection,
      testimonials,
      alertWarning,
    };
  }, [data]);

  // Show loading state while fetching initial data
  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1" role="main" aria-label="Main content">
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
          <main className="flex-1" role="main" aria-label="Main content">
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
                  {pageData.hero?.main_headline || "Auto Auction"}{" "}
                  {pageData.hero?.highlighted_text ? (
                    <span className="text-primary">{pageData.hero.highlighted_text}</span>
                  ) : null}
                </h1>

                {pageData.hero?.description ? (
                  <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                    {pageData.hero.description.trim()}
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

        {/* Auction Services */}
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

        {/* Two-Way Service */}
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
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" role="list">
                  {pageData.serviceCards.service_cards.map((service: any, index: number) => {
                    const ServiceIcon = service.icon_name
                      ? (getIcon(service.icon_name) as LucideIcon)
                      : null;

                    return (
                      <motion.div
                        key={service.id || service.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-card rounded-xl p-8 shadow-lg border"
                        role="listitem"
                      >
                        {ServiceIcon ? (
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                            <ServiceIcon className="w-6 h-6 text-primary" aria-hidden="true" />
                          </div>
                        ) : null}
                        <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                        <p className="text-muted-foreground">{service.description}</p>
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
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
              {pageData.process.section_title ? (
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                  {pageData.process.section_title}
                </h2>
              ) : null}

              {pageData.process.steps && pageData.process.steps.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-4" role="list">
                  {pageData.process.steps.map((item: any, index: number) => (
                    <motion.div
                      key={item.id || item.step_number}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(20%-1rem)]"
                      role="listitem"
                    >
                      {item.step_number ? (
                        <div className="w-10 h-10 bg-primary-foreground text-primary rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                          {item.step_number}
                        </div>
                      ) : null}
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-primary-foreground/80 text-sm">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* Testimonial */}
        {pageData.testimonials && pageData.testimonials.testimonials && pageData.testimonials.testimonials.length > 0 ? (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                {pageData.testimonials.testimonials.map((testimonial: any, index: number) => (
                  <motion.div
                    key={testimonial.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    {testimonial.quote_text ? (
                      <p className="text-xl italic text-muted-foreground mb-6">
                        {testimonial.quote_text}
                      </p>
                    ) : null}
                    {testimonial.customer_name ? (
                      <p className="font-semibold">{testimonial.customer_name}</p>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Storage Fee Warning */}
        {pageData.alertWarning ? (
          <section className="py-12 bg-accent/10">
            <div className="container mx-auto px-4">
              <div className="flex items-start gap-4 max-w-4xl mx-auto">
                {pageData.alertWarning.icon_name ? (
                  (() => {
                    const AlertIcon = getIcon(pageData.alertWarning.icon_name) as LucideIcon;
                    return <AlertIcon className="w-8 h-8 text-accent flex-shrink-0 mt-1" aria-hidden="true" />;
                  })()
                ) : (
                  <Clock className="w-8 h-8 text-accent flex-shrink-0 mt-1" aria-hidden="true" />
                )}
                <div>
                  {pageData.alertWarning.title ? (
                    <h3 className="text-lg font-semibold mb-2">
                      {pageData.alertWarning.title}
                    </h3>
                  ) : null}
                  {pageData.alertWarning.message ? (
                    <p className="text-muted-foreground">
                      {pageData.alertWarning.message}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <Footer />
    </>
  );
};

export default AutoAuctionShipping;
