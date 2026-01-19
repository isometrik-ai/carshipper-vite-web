import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { LoadingState } from "@/components/landing/LoadingState";
import { useCaliforniaShipping } from "@/api/californiaShipping";
import { getIcon } from "@/lib/icons";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import type { HeroSection, StatsBar, ProcessSection, FAQDisplay, CallToAction } from "@/types/LandingPage.types";
import type { RouteTable, CityLinks } from "@/types/CaliforniaShipping.types";

/**
 * California Shipping page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const CaliforniaShipping = () => {
  const { data, isLoading } = useCaliforniaShipping();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const statsBar = content.find(c => c.__component === "shared.stats-bar") as StatsBar | undefined;
    const howItWorks = content.find(c =>
      c.__component === "shared.process-section" &&
      (c as ProcessSection).section_title === "How California Auto Transport Works"
    ) as ProcessSection | undefined;
    const routeTableFrom = content.find(c =>
      c.__component === "shared.route-table" &&
      (c as RouteTable).section_title?.includes("FROM California")
    ) as RouteTable | undefined;
    const routeTableTo = content.find(c =>
      c.__component === "shared.route-table" &&
      (c as RouteTable).section_title?.includes("TO California")
    ) as RouteTable | undefined;
    const cityLinks = content.find(c => c.__component === "shared.city-links") as CityLinks | undefined;
    const faqDisplay = content.find(c => c.__component === "shared.faq-display") as FAQDisplay | undefined;
    const whyChooseUs = content.find(c =>
      c.__component === "shared.process-section" &&
      (c as ProcessSection).section_title === "Why Choose Us for California Car Shipping?"
    ) as ProcessSection | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: heroSection,
      stats: statsBar,
      howItWorks,
      routeTableFrom,
      routeTableTo,
      cityLinks,
      faq: faqDisplay,
      whyChooseUs,
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

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/20 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                    {pageData.hero?.main_headline || "California Car Shipping"}{" "}
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
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {pageData.hero.trust_indicators.map((indicator) => {
                        const IndicatorIcon = indicator.icon_name
                          ? (getIcon(indicator.icon_name) as LucideIcon)
                          : null;
                        return (
                          <div key={indicator.id} className="flex items-center gap-3">
                            {IndicatorIcon ? (
                              <IndicatorIcon className="w-5 h-5 text-success" aria-hidden="true" />
                            ) : null}
                            <span className="text-sm">{indicator.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}

                  {pageData.hero?.phone_number ? (
                    <div className="flex flex-wrap gap-3">
                      <a href={`tel:${pageData.hero.phone_number.replace(/\D/g, '')}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                        <Phone className="w-5 h-5" aria-hidden="true" />
                        {pageData.hero.phone_number}
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

          {/* Trust Badges */}
          {pageData.stats && pageData.stats.statistics && pageData.stats.statistics.length > 0 ? (
            <section className="py-8 bg-muted/30 border-y border-border">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                  {pageData.stats.statistics.map((stat) => (
                    <div key={stat.id || stat.label} className="text-center">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* How It Works */}
          {pageData.howItWorks ? (
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  {pageData.howItWorks.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.howItWorks.section_title}
                    </h2>
                  ) : null}
                  {pageData.howItWorks.section_subtitle ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {pageData.howItWorks.section_subtitle}
                    </p>
                  ) : null}
                </motion.div>

                {pageData.howItWorks.steps && pageData.howItWorks.steps.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {pageData.howItWorks.steps.map((step, index) => (
                      <motion.div
                        key={step.id || step.step_number}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                      >
                        {step.step_number ? (
                          <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            {step.step_number}
                          </div>
                        ) : null}
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Shipping From CA Table */}
          {pageData.routeTableFrom ? (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  {pageData.routeTableFrom.section_title ? (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {pageData.routeTableFrom.section_title}
                    </h2>
                  ) : null}
                  {pageData.routeTableFrom.section_description ? (
                    <p className="text-muted-foreground">
                      {pageData.routeTableFrom.section_description}
                    </p>
                  ) : null}
                </motion.div>

                {pageData.routeTableFrom.routes && pageData.routeTableFrom.routes.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full bg-background rounded-lg overflow-hidden shadow-sm">
                      <thead className="bg-primary text-primary-foreground">
                        <tr>
                          <th className="px-4 py-3 text-left">From</th>
                          <th className="px-4 py-3 text-left">To</th>
                          <th className="px-4 py-3 text-left">Distance</th>
                          <th className="px-4 py-3 text-left">Est. Time</th>
                          <th className="px-4 py-3 text-left">Est. Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pageData.routeTableFrom.routes.map((route, index) => (
                          <tr key={route.id || index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                            <td className="px-4 py-3">{route.from}</td>
                            <td className="px-4 py-3">{route.to}</td>
                            <td className="px-4 py-3">{route.distance}</td>
                            <td className="px-4 py-3">{route.time}</td>
                            <td className="px-4 py-3 font-semibold text-primary">{route.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Shipping To CA Table */}
          {pageData.routeTableTo ? (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  {pageData.routeTableTo.section_title ? (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {pageData.routeTableTo.section_title}
                    </h2>
                  ) : null}
                  {pageData.routeTableTo.section_description ? (
                    <p className="text-muted-foreground">
                      {pageData.routeTableTo.section_description}
                    </p>
                  ) : null}
                </motion.div>

                {pageData.routeTableTo.routes && pageData.routeTableTo.routes.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full bg-background rounded-lg overflow-hidden shadow-sm border border-border">
                      <thead className="bg-primary text-primary-foreground">
                        <tr>
                          <th className="px-4 py-3 text-left">From</th>
                          <th className="px-4 py-3 text-left">To</th>
                          <th className="px-4 py-3 text-left">Distance</th>
                          <th className="px-4 py-3 text-left">Est. Time</th>
                          <th className="px-4 py-3 text-left">Est. Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pageData.routeTableTo.routes.map((route, index) => (
                          <tr key={route.id || index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                            <td className="px-4 py-3">{route.from}</td>
                            <td className="px-4 py-3">{route.to}</td>
                            <td className="px-4 py-3">{route.distance}</td>
                            <td className="px-4 py-3">{route.time}</td>
                            <td className="px-4 py-3 font-semibold text-primary">{route.cost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Popular California Cities */}
          {pageData.cityLinks ? (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-8"
                >
                  {pageData.cityLinks.section_title ? (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {pageData.cityLinks.section_title}
                    </h2>
                  ) : null}
                  {pageData.cityLinks.section_description ? (
                    <p className="text-muted-foreground">
                      {pageData.cityLinks.section_description}
                    </p>
                  ) : null}
                </motion.div>

                {pageData.cityLinks.cities && pageData.cityLinks.cities.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                    {pageData.cityLinks.cities.map((city) => (
                      <Link
                        key={city.id || city.city_name}
                        to={city.link}
                        className="flex items-center gap-2 p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all"
                      >
                        <MapPin className="w-4 h-4 text-primary" aria-hidden="true" />
                        <span className="font-medium">{city.city_name}</span>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Why Choose Us */}
          {pageData.whyChooseUs ? (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  {pageData.whyChooseUs.section_title ? (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {pageData.whyChooseUs.section_title}
                    </h2>
                  ) : null}
                </motion.div>

                {pageData.whyChooseUs.steps && pageData.whyChooseUs.steps.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {pageData.whyChooseUs.steps.map((item, index) => {
                      const ItemIcon = item.icon_name
                        ? (getIcon(item.icon_name) as LucideIcon)
                        : null;

                      return (
                        <motion.div
                          key={item.id || item.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="text-center p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          {ItemIcon ? (
                            <ItemIcon className="w-10 h-10 text-primary mx-auto mb-4" aria-hidden="true" />
                          ) : null}
                          <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* FAQs */}
          {pageData.faq ? (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  {pageData.faq.section_title ? (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {pageData.faq.section_title}
                    </h2>
                  ) : null}
                </motion.div>

                {pageData.faq.faq_items && pageData.faq.faq_items.length > 0 ? (
                  <div className="max-w-3xl mx-auto space-y-4">
                    {pageData.faq.faq_items.map((faq, index) => (
                      <motion.div
                        key={faq.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-background rounded-lg p-6 border border-border"
                      >
                        <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
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
            <section className="py-16 bg-primary">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    {pageData.cta.headline || "Ready to Ship Your Car in California?"}
                  </h2>
                  {pageData.cta.description ? (
                    <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                      {pageData.cta.description}
                    </p>
                  ) : null}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {pageData.cta.primary_button ? (
                      <Button
                        variant="secondary"
                        size="lg"
                        className="text-lg px-8"
                        onClick={() => {
                          if (pageData.cta.primary_button?.button_link) {
                            window.location.href = pageData.cta.primary_button.button_link;
                          } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                      >
                        {pageData.cta.primary_button.button_text || "Get Your California Quote"}
                      </Button>
                    ) : null}
                    {pageData.cta.secondary_button ? (
                      <a
                        href={pageData.cta.secondary_button.button_link ? `tel:${pageData.cta.secondary_button.button_link}` : "tel:+18885551234"}
                        className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80"
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

export default CaliforniaShipping;
