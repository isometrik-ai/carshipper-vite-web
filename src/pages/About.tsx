import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useAboutPage } from "@/api/about";
import { getIcon } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";

/**
 * About page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const About = () => {
  const { data, isLoading } = useAboutPage();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section");
    const textSection = content.find(c => c.__component === "shared.text-section");
    const processSection = content.find(c => c.__component === "shared.process-section");
    const featureListSection = content.find(c => c.__component === "shared.feature-list-section");
    const ctaSection = content.find(c => c.__component === "shared.call-to-action");

    return {
      hero: heroSection,
      stats: heroSection?.statistics || [],
      text: textSection,
      values: processSection,
      why30Minutes: featureListSection,
      cta: ctaSection,
    };
  }, [data]);

  // Parse paragraphs from richtext
  const parsedParagraphs = useMemo(() => {
    if (!pageData?.text?.paragraphs) return [];
    return pageData.text.paragraphs
      .split(/\n\n+/)
      .map((p: string) => p.trim())
      .filter((p: string) => p.length > 0);
  }, [pageData?.text?.paragraphs]);

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
          <main className="flex-1" role="main" aria-label="Main content">
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

        <main className="flex-1 pt-20" role="main" aria-label="About page main content">
          {/* Hero Section - Contains the ONLY H1 on the page */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background" aria-labelledby="about-hero-heading">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h1 id="about-hero-heading" className="text-4xl md:text-5xl font-bold mb-6">
                  {pageData.hero?.main_headline || "Shipping Cars with"}{" "}
                  {pageData.hero?.highlighted_text ? (
                    <span className="text-primary">{pageData.hero.highlighted_text}</span>
                  ) : null}
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  {pageData.hero?.description || ""}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Stats Section - No headings, just statistics */}
          {pageData.stats.length > 0 ? (
            <section className="py-12 bg-primary" aria-label="Statistics">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8" role="list">
                  {pageData.stats.map((stat: any, index: number) => (
                    <motion.div
                      key={stat.id || stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center"
                      role="listitem"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2" aria-label={`${stat.value} ${stat.label}`}>
                        {stat.value}
                      </div>
                      <div className="text-primary-foreground/80">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* Our Story Section */}
          {pageData.text ? (
            <section className="py-16 md:py-24" aria-labelledby="our-story-heading">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    {pageData.text.section_title ? (
                      <h2 id="our-story-heading" className="text-3xl md:text-4xl font-bold mb-6 text-center">
                        {pageData.text.section_title}
                      </h2>
                    ) : null}
                    <div className="prose prose-lg max-w-none text-muted-foreground">
                      {parsedParagraphs.map((paragraph: string, index: number) => (
                        <p key={index} className={index < parsedParagraphs.length - 1 ? "mb-4" : ""}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          ) : null}

          {/* Values Section */}
          {pageData.values ? (
            <section className="py-16 md:py-24 bg-muted/30" aria-labelledby="our-values-heading">
              <div className="container mx-auto px-4">
                <motion.h2
                  id="our-values-heading"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold mb-12 text-center"
                >
                  {pageData.values.section_title || "Our Values"}
                </motion.h2>
                {pageData.values.steps && pageData.values.steps.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list" aria-label="Company values">
                    {pageData.values.steps.map((value: any, index: number) => {
                      const ValueIcon = getIcon(value.icon_name) as LucideIcon;
                      return (
                        <motion.article
                          key={value.id || value.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-card p-6 rounded-2xl border border-border"
                          role="listitem"
                        >
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4" aria-hidden="true">
                            <ValueIcon className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                          <p className="text-muted-foreground">{value.description}</p>
                        </motion.article>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* Why 30 Minutes Section */}
          {pageData.why30Minutes ? (
            <section className="py-16 md:py-24" aria-labelledby="why-30-minutes-heading">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-secondary/50 rounded-3xl p-8 md:p-12"
                  >
                    {pageData.why30Minutes.section_title ? (
                      <h2 id="why-30-minutes-heading" className="text-2xl md:text-3xl font-bold mb-6">
                        {pageData.why30Minutes.section_title}
                      </h2>
                    ) : null}
                    {pageData.why30Minutes.intro_text ? (
                      <p className="text-muted-foreground mb-6">
                        {pageData.why30Minutes.intro_text}
                      </p>
                    ) : null}
                    {pageData.why30Minutes.bullet_points && pageData.why30Minutes.bullet_points.length > 0 ? (
                      <ul className="space-y-4">
                        {pageData.why30Minutes.bullet_points.map((point: any) => (
                          <li key={point.id || point.text} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                            <span>{point.text}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {pageData.why30Minutes.closing_text ? (
                      <p className="text-muted-foreground mt-6">
                        {pageData.why30Minutes.closing_text}
                      </p>
                    ) : null}
                  </motion.div>
                </div>
              </div>
            </section>
          ) : null}

          {/* CTA Section */}
          {pageData.cta ? (
            <section className="py-16 md:py-24 bg-primary" aria-labelledby="cta-heading">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                    <Truck className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    {pageData.cta.headline || "Ready to Ship Your Car?"}
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

export default About;
