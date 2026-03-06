'use client';

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useLosAngelesShipping } from "@/api/losAngelesShipping";
import { getIcon } from "@/lib/icons";
import { MapPin, Phone, Building2, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { HeroSection, StatsBar, FAQDisplay, CallToAction } from "@/types/LandingPage.types";
import type { RouteTable } from "@/types/CaliforniaShipping.types";
import type { ServiceCards } from "@/types/AutoAuctionShipping.types";
import type { NeighborhoodsSection, RelatedPagesSection } from "@/types/LosAngelesShipping.types";

export const dynamic = 'force-dynamic';

export default function LosAngelesShipping() {
  const { data, isLoading } = useLosAngelesShipping();

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
                  {pageData.hero?.main_headline || "Los Angeles Car Shipping"}{" "}
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

        {pageData.neighborhoods ? (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                {pageData.neighborhoods.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.neighborhoods.section_title}</h2>
                ) : null}
              </motion.div>
              {pageData.neighborhoods.neighborhoods && pageData.neighborhoods.neighborhoods.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-4">
                  {pageData.neighborhoods.neighborhoods.map((neighborhood: any) => (
                    <div
                      key={neighborhood.id}
                      className="bg-card p-4 rounded-xl border border-border"
                    >
                      {neighborhood.neighborhood_name}
                    </div>
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
                  {pageData.cta.headline || "Get Your Los Angeles Car Shipping Quote"}
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

