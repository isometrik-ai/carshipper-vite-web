'use client';

import { useMemo } from "react";
import { motion } from "framer-motion";
import QuoteForm from "@/components/QuoteForm";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useHeavyHauling } from "@/api/heavyHauling";
import { getIcon } from "@/lib/icons";
import { Weight, CheckCircle, AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HeroSection, ProcessSection } from "@/types/LandingPage.types";
import type { ServiceList, ServiceCards, AlertWarning } from "@/types/AutoAuctionShipping.types";
import type { TrailerTypes } from "@/types/EnclosedTransport.types";

export const dynamic = 'force-dynamic';

export default function HeavyHauling() {
  const { data, isLoading } = useHeavyHauling();

  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;
    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const serviceList = content.find(c => c.__component === "shared.service-list") as ServiceList | undefined;
    const serviceCards = content.find(c => c.__component === "shared.service-cards") as ServiceCards | undefined;
    const processSection = content.find(c => c.__component === "shared.process-section") as ProcessSection | undefined;
    const trailerTypes = content.find(c => c.__component === "shared.trailer-types") as TrailerTypes | undefined;
    const alertWarning = content.find(c => c.__component === "shared.alert-warning") as AlertWarning | undefined;

    return {
      hero: heroSection,
      equipmentList: serviceList,
      features: serviceCards,
      process: processSection,
      trailers: trailerTypes,
      compliance: alertWarning,
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
                  {pageData.hero?.main_headline || "Heavy Hauling"}{" "}
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

        {pageData.equipmentList ? (
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                {pageData.equipmentList.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.equipmentList.section_title}</h2>
                ) : null}
              </motion.div>
              {pageData.equipmentList.services && pageData.equipmentList.services.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {pageData.equipmentList.services.map((service: any, index: number) => (
                    <motion.div
                      key={service.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card p-6 rounded-2xl border border-border"
                    >
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      {service.description ? (
                        <p className="text-muted-foreground">{service.description}</p>
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {pageData.process ? (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                {pageData.process.section_title ? (
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{pageData.process.section_title}</h2>
                ) : null}
              </motion.div>
              {pageData.process.steps && pageData.process.steps.length > 0 ? (
                <div className="grid md:grid-cols-3 gap-8">
                  {pageData.process.steps.map((step: any, index: number) => (
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

        {pageData.compliance ? (
          <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-3xl p-8 md:p-12 border border-border"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-warning/10 rounded-2xl flex items-center justify-center">
                      <AlertTriangle className="w-7 h-7 text-warning" aria-hidden="true" />
                    </div>
                    {pageData.compliance.title ? (
                      <h2 className="text-2xl md:text-3xl font-bold">{pageData.compliance.title}</h2>
                    ) : null}
                  </div>
                  {pageData.compliance.message ? (
                    <p className="text-muted-foreground">{pageData.compliance.message}</p>
                  ) : null}
                </motion.div>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}

