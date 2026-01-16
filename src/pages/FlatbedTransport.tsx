import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import {
  Truck,
  Shield,
  DollarSign,
  CheckCircle,
  Scale,
  HelpCircle,
  ArrowRight,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FlatbedData } from "@/types/FlatbedTransport.types";
import { useFlatbedTransport } from "@/hooks/api/useFlatbedTransport";

const ICONS: Record<string, any> = {
  Truck,
  Shield,
  DollarSign,
  CheckCircle,
  Scale,
  HelpCircle,
  ArrowRight,
  Phone,
};

const getIcon = (name: string | null) => {
  if (!name) return CheckCircle;
  return ICONS[name] || CheckCircle;
};

const FlatbedTransport = () => {
  const { data, isLoading } = useFlatbedTransport();

  if (isLoading || !data) return null;

  const page: FlatbedData = data;

  const heroSection = page.service_cards?.[0];
  const serviceCardList = page.service_card?.servieces || [];
  const vehicleTypesSection = page.secondary_section;
  const compliance = page.compliance;
  const faqs = page.faqs;

  return (
    <>
      <Helmet>
        <title>
          {`${page?.title ?? ""} ${page?.title_highlight ?? ""}`.trim() || "Flatbed Transport"}
        </title>

        <meta name="description" content={page?.description ?? ""} />
        <link rel="canonical" href="/flatbed-transport" />
      </Helmet>

      <Header />

      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Truck className="w-4 h-4" />
                  {page.page_tagline}
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {page.title}{" "}
                  <span className="text-primary">{page.title_highlight}</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-6 max-w-xl">
                  {page.description}
                </p>

                {/* Vehicle List (service_card) */}
                {serviceCardList.length > 0 && (
                  <div className="bg-card/50 backdrop-blur rounded-xl p-4 border">
                    <h3 className="text-sm font-semibold mb-3">
                      {page.service_card?.title}
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {serviceCardList.slice(0, 6).map((item) => {
                        const Icon = getIcon(item.icon_name);
                        return (
                          <div
                            key={item.id}
                            className="flex items-center gap-2 text-xs"
                          >
                            <Icon className="w-3 h-3 text-primary flex-shrink-0" />
                            <span>{item.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Quote Form */}
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

        {/* Secondary Vehicle Types (secondary_section) */}
        {vehicleTypesSection && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl shadow-lg p-8 border"
                >
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    {vehicleTypesSection.hero_title}
                  </h3>

                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {vehicleTypesSection.services.map((item) => {
                      const Icon = getIcon(item.icon_name);
                      return (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Benefits (from service_cards[0].services) */}
        {heroSection?.services?.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {heroSection.hero_title}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {heroSection.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {heroSection.services.map((item, index) => {
                  const Icon = getIcon(item.icon_name);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-card rounded-xl p-6 shadow-lg border text-center"
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>

                      <h3 className="text-lg font-semibold mb-2">
                        {item.text}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Compliance / Pricing */}
        {compliance && (
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start gap-6">
                  <DollarSign className="w-12 h-12 flex-shrink-0" />
                  <div>
                    <h2 className="text-3xl font-bold mb-4">
                      {compliance.hero_title}
                    </h2>

                    <p className="text-primary-foreground/90 mb-4">
                      {compliance.description}
                    </p>

                    <ul className="space-y-2 text-primary-foreground/90">
                      {compliance.services.map((item) => (
                        <li key={item.id}>• {item.text}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faqs && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {faqs.title}
                </h2>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.FAQS.map((faq, index) => (
                    <AccordionItem
                      key={faq.id}
                      value={`item-${index}`}
                      className="bg-card rounded-lg border px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.questions}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default FlatbedTransport;
