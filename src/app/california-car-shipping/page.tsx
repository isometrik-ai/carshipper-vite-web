'use client';

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useCaliforniaShipping } from "@/api/californiaShipping";
import { getIcon } from "@/lib/icons";
import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import type { HeroSection, StatsBar, ProcessSection, FAQDisplay, CallToAction } from "@/types/LandingPage.types";
import type { RouteTable, CityLinks } from "@/types/CaliforniaShipping.types";

export const dynamic = 'force-dynamic';

export default function CaliforniaShipping() {
  const { data, isLoading } = useCaliforniaShipping();

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

  const pageContent = useMemo(() => {
    return data?.data?.page_content || [];
  }, [data]);

  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} pageContent={null} />
        <PageSkeleton />
      </>
    );
  }

  if (!pageData) {
    return (
      <>
        <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">No content available.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />
      <main className="flex-1 pt-20">
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {pageData.hero?.main_headline || "California Car Shipping"}{" "}
                  {pageData.hero?.highlighted_text ? (
                    <span className="text-primary">{pageData.hero.highlighted_text}</span>
                  ) : null}
                </h1>
                {pageData.hero?.description ? (
                  <p className="text-lg md:text-xl text-muted-foreground mb-6">
                    {pageData.hero.description}
                  </p>
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

        {pageData.stats ? (
          <section className="py-8 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pageData.stats.statistics && pageData.stats.statistics.map((stat: any) => (
                  <div key={stat.id} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {pageData.howItWorks ? (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                {pageData.howItWorks.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.howItWorks.section_title}</h2>
                ) : null}
              </motion.div>
              {pageData.howItWorks.steps && pageData.howItWorks.steps.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-8">
                  {pageData.howItWorks.steps.map((step: any, index: number) => (
                    <motion.div
                      key={step.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold text-primary">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{step.step_title}</h3>
                      {step.step_description ? (
                        <p className="text-muted-foreground">{step.step_description}</p>
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {pageData.cityLinks ? (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                {pageData.cityLinks.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.cityLinks.section_title}</h2>
                ) : null}
              </motion.div>
              {pageData.cityLinks.cities && pageData.cityLinks.cities.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-4">
                  {pageData.cityLinks.cities.map((city: any) => (
                    <Link
                      key={city.id}
                      href={city.link || "#"}
                      className="bg-card p-4 rounded-xl border border-border hover:border-primary transition-colors"
                    >
                      {city.city_name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

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
                  {pageData.cta.headline || "Get Your California Car Shipping Quote"}
                </h2>
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
                  </Button>
                ) : null}
              </motion.div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}

