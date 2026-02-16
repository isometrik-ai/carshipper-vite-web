'use client';

import { useMemo } from "react";
import { motion } from "framer-motion";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useFleetTransport } from "@/api/fleetTransport";
import { getIcon } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { HeroSection, FAQDisplay, CallToAction } from "@/types/LandingPage.types";
import type { TextSection } from "@/types/AboutPage.types";
import type { ServiceCards } from "@/types/AutoAuctionShipping.types";

export const dynamic = 'force-dynamic';

export default function FleetTransport() {
  const { data, isLoading } = useFleetTransport();

  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;
    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const textSection = content.find(c => c.__component === "shared.text-section") as TextSection | undefined;
    const serviceCards = content.find(c => c.__component === "shared.service-cards") as ServiceCards | undefined;
    const faqDisplay = content.find(c => c.__component === "shared.faq-display") as FAQDisplay | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: heroSection,
      textSection,
      serviceCards,
      faq: faqDisplay,
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
                  {pageData.hero?.main_headline || "Fleet Transport"}{" "}
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

        {pageData.textSection ? (
          <section className="py-16 md:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl p-8 border border-border"
                >
                  {pageData.textSection.section_title ? (
                    <h2 className="text-2xl font-bold mb-4">{pageData.textSection.section_title}</h2>
                  ) : null}
                  {pageData.textSection.paragraphs ? (
                    <div className="text-muted-foreground">
                      {pageData.textSection.paragraphs.split('\n\n').map((paragraph: string, index: number) => (
                        <p key={index} className={index > 0 ? "mt-4" : ""}>
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              </div>
            </div>
          </section>
        ) : null}

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
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.serviceCards.section_title}</h2>
                ) : null}
              </motion.div>
              {pageData.serviceCards.service_cards && pageData.serviceCards.service_cards.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-8">
                  {pageData.serviceCards.service_cards.map((card: any, index: number) => {
                    const CardIcon = card.icon_name
                      ? (getIcon(card.icon_name) as LucideIcon)
                      : null;
                    return (
                      <motion.div
                        key={card.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-card p-6 rounded-2xl border border-border text-center"
                      >
                        {CardIcon ? (
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <CardIcon className="w-6 h-6 text-primary" aria-hidden="true" />
                          </div>
                        ) : null}
                        <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                        <p className="text-muted-foreground">{card.description}</p>
                      </motion.div>
                    );
                  })}
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
                  {pageData.cta.headline || "Get Your Fleet Transport Quote"}
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
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
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

