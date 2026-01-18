import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { LoadingState } from "@/components/landing/LoadingState";
import { useLosAngelesShipping } from "@/api/losAngelesShipping";
import { getIcon } from "@/lib/icons";
import { MapPin, Phone, Building2, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSection, StatsBar, FAQDisplay, CallToAction } from "@/types/LandingPage.types";
import type { RouteTable } from "@/types/CaliforniaShipping.types";
import type { ServiceCards } from "@/types/AutoAuctionShipping.types";
import type { NeighborhoodsSection, RelatedPagesSection } from "@/types/LosAngelesShipping.types";

/**
 * Los Angeles Shipping page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const LosAngelesShipping = () => {
  const { data, isLoading } = useLosAngelesShipping();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const statsBar = content.find(c => c.__component === "shared.stats-bar") as StatsBar | undefined;
    const neighborhoodsSection = content.find(c => c.__component === "shared.neighborhoods-section") as NeighborhoodsSection | undefined;
    const routeTableFrom = content.find(c =>
      c.__component === "shared.route-table" &&
      (c as RouteTable).section_title?.includes("FROM Los Angeles")
    ) as RouteTable | undefined;
    const routeTableTo = content.find(c =>
      c.__component === "shared.route-table" &&
      (c as RouteTable).section_title?.includes("TO Los Angeles")
    ) as RouteTable | undefined;
    const serviceCards = content.find(c => c.__component === "shared.service-cards") as ServiceCards | undefined;
    const faqDisplay = content.find(c => c.__component === "shared.faq-display") as FAQDisplay | undefined;
    const relatedPages = content.find(c => c.__component === "shared.related-pages-section") as RelatedPagesSection | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: heroSection,
      stats: statsBar,
      neighborhoods: neighborhoodsSection,
      routeTableFrom,
      routeTableTo,
      serviceCards,
      faq: faqDisplay,
      relatedPages,
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
                      ) : (
                        <Building2 className="w-4 h-4" aria-hidden="true" />
                      )}
                      <span className="text-sm font-medium">{pageData.hero.tagline}</span>
                    </div>
                  ) : null}

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {pageData.hero?.main_headline || "Los Angeles Car Shipping"}{" "}
                    {pageData.hero?.highlighted_text ? (
                      <span className="text-primary">{pageData.hero.highlighted_text}</span>
                    ) : null}
                  </h1>

                  {pageData.hero?.description ? (
                    <p className="text-lg text-muted-foreground mb-6">
                      {pageData.hero.description.split('\n\n').map((paragraph, index) => (
                        <span key={index}>
                          {paragraph}
                          {index < pageData.hero.description.split('\n\n').length - 1 && <><br /><br /></>}
                        </span>
                      ))}
                    </p>
                  ) : null}

                  {pageData.hero?.trust_indicators && pageData.hero.trust_indicators.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {pageData.hero.trust_indicators.map((indicator) => {
                        const IndicatorIcon = indicator.icon_name
                          ? (getIcon(indicator.icon_name) as LucideIcon)
                          : null;
                        const iconColor = indicator.icon_name === "shield"
                          ? "text-success"
                          : indicator.icon_name === "clock"
                            ? "text-primary"
                            : indicator.icon_name === "truck"
                              ? "text-warning"
                              : indicator.icon_name === "checkCircle" || indicator.icon_name === "star"
                                ? "text-success"
                                : "text-primary";

                        return (
                          <div key={indicator.id} className="flex items-center gap-3">
                            {IndicatorIcon ? (
                              <IndicatorIcon className={`w-5 h-5 ${iconColor}`} aria-hidden="true" />
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

          {/* LA Service Areas */}
          {pageData.neighborhoods ? (
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  {pageData.neighborhoods.section_title ? (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {pageData.neighborhoods.section_title}
                    </h2>
                  ) : null}
                  {pageData.neighborhoods.section_description ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {pageData.neighborhoods.section_description}
                    </p>
                  ) : null}
                </motion.div>

                {pageData.neighborhoods.neighborhoods && pageData.neighborhoods.neighborhoods.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
                    {pageData.neighborhoods.neighborhoods.map((area) => (
                      <motion.div
                        key={area.id || area.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm"
                      >
                        <MapPin className="w-3 h-3 text-primary flex-shrink-0" aria-hidden="true" />
                        <span>{area.name}</span>
                      </motion.div>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Shipping From LA Table */}
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

          {/* Shipping To LA Table */}
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

          {/* Why Choose Us for LA */}
          {pageData.serviceCards ? (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  {pageData.serviceCards.section_title ? (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {pageData.serviceCards.section_title}
                    </h2>
                  ) : null}
                </motion.div>

                {pageData.serviceCards.service_cards && pageData.serviceCards.service_cards.length > 0 ? (
                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {pageData.serviceCards.service_cards.map((item, index) => {
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
                          className="text-center p-6 rounded-xl bg-background border border-border"
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
            <section className="py-16">
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
                        className="bg-muted/30 rounded-lg p-6 border border-border"
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

          {/* Related Pages */}
          {pageData.relatedPages && pageData.relatedPages.links && pageData.relatedPages.links.length > 0 ? (
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-4">
                  {pageData.relatedPages.links.map((link) => {
                    const LinkIcon = link.icon_name
                      ? (getIcon(link.icon_name) as LucideIcon)
                      : null;

                    return (
                      <Link
                        key={link.id || link.label}
                        to={link.href}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:border-primary transition-colors"
                      >
                        {LinkIcon ? (
                          <LinkIcon className="w-4 h-4 text-primary" aria-hidden="true" />
                        ) : null}
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
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
                    {pageData.cta.headline || "Ship Your Car to or from Los Angeles Today"}
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
                        {pageData.cta.primary_button.button_text || "Get Your LA Quote"}
                      </Button>
                    ) : null}
                    {pageData.cta.secondary_button ? (
                      <a
                        href={pageData.cta.secondary_button.button_link || "tel:+18885551234"}
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

export default LosAngelesShipping;
