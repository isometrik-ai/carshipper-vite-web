import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import {
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Factory,
  BarChart,
  Zap,
  Phone,
  Star,
  Award,
  MapPin,
  DollarSign,
  FileText,
  Route,
  Weight,
  AlertTriangle,
  MessageSquare,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { useOEMTransport } from "@/hooks/api/useOEMTransport";

const ICONS: Record<string, any> = {
  Truck,
  Shield,
  Clock,
  FileText,
  Route,
  Weight,
  CheckCircle,
  Phone,
  AlertTriangle,
  Factory,
  MessageSquare,
  MapPin,
  BarChart3,
  BarChart,
  Zap,
  Award,
  DollarSign,
  Star,
  ArrowRight,
};

const getIcon = (name?: string | null): React.ComponentType<any> => {
  if (!name) return CheckCircle;
  return ICONS[name] || CheckCircle;
};

const getChipColorClasses = (index: number) => {
  const colors = [
    "bg-success/10 text-success", // First chip - green
    "bg-primary/10 text-primary", // Second chip - blue
    "bg-warning/10 text-warning-foreground", // Third chip - yellow/gold
  ];
  return colors[index % colors.length] || "bg-primary/10 text-primary";
};

const OEMTransport = () => {
  const { data: page, isLoading } = useOEMTransport();

  if (isLoading || !page) return null;

  const capabilities = page.secondary_section?.services ?? [];
  const stats = page.stats?.stats ?? [];
  const benefits = page.service_cards?.[0]?.services ?? [];
  const features = page.process_cards?.[0]?.services ?? [];
  const faqs = page.faqs?.FAQS ?? [];
  const badges = page.services ?? [];

  const PageIcon = getIcon(page.page_icon);

  return (
    <>
      <Helmet>
        <title>
          {page.title} {page.title_highlight}
        </title>
        {page.description ? (
          <meta name="description" content={page.description} />
        ) : null}
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          {/* Hero Section with Quote Form */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {page.page_tagline ? (
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                      <PageIcon className="w-4 h-4" />
                      <span>{page.page_tagline}</span>
                    </div>
                  ) : null}

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {page.title} <span className="text-primary">{page.title_highlight}</span>
                  </h1>

                  {page.description ? (
                    <p className="text-lg text-muted-foreground mb-6">
                      {page.description}
                    </p>
                  ) : null}

                  {badges.length > 0 && (
                    <div className="flex flex-wrap gap-4 mb-8">
                      {badges.map((badge, index) => {
                        const Icon = getIcon(badge.icon_name);
                        const colorClasses = getChipColorClasses(index);
                        return (
                          <div key={badge.id} className={`flex items-center gap-2 ${colorClasses} px-4 py-2 rounded-full`}>
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{badge.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
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

          {/* Capabilities List */}
          {capabilities.length > 0 && (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-card rounded-2xl p-8 border border-border shadow-lg"
                  >
                    <h2 className="text-2xl font-bold mb-6 text-center">
                      {page.secondary_section?.hero_title ?? "Finished Vehicle Logistics Capabilities"}
                    </h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {capabilities.map((capability) => {
                        const Icon = getIcon(capability.icon_name);
                        return (
                          <div key={capability.id} className="flex items-center gap-2 text-sm">
                            <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{capability.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          )}

          {/* Stats Section */}
          {stats.length > 0 && (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={String(stat.label)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{String(stat.label)}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Benefits Section */}
          {benefits.length > 0 && (
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {page.service_cards?.[0]?.hero_title ?? "Why Manufacturers Choose Us"}
                  </h2>
                  {page.service_cards?.[0]?.description ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {page.service_cards[0].description}
                    </p>
                  ) : null}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {benefits.map((benefit, index) => {
                    const Icon = getIcon(benefit.icon_name);
                    return (
                      <motion.div
                        key={benefit.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-card rounded-xl p-6 shadow-lg border text-center"
                      >
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{benefit.text}</h3>
                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Features Section */}
          {features.length > 0 && (
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {page.process_cards?.[0]?.hero_title ?? "OEM-Grade Transport Standards"}
                  </h2>
                  {page.process_cards?.[0]?.description ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {page.process_cards[0].description}
                    </p>
                  ) : null}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => {
                    const Icon = getIcon(feature.icon_name);
                    return (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center"
                      >
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{feature.text}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {page.faqs?.title ?? "Frequently Asked Questions"}
                  </h2>
                  {page.faqs?.sub_title ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {page.faqs.sub_title}
                    </p>
                  ) : null}
                </div>

                <div className="max-w-3xl mx-auto">
                  <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={faq.id} value={`item-${index}`} className="bg-card rounded-lg border px-6">
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

          {/* CTA Section */}
          {page.cta && (
            <section className="py-20 bg-primary">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    {page.cta.title}
                  </h2>
                  <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                    {page.cta.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {page.cta.primary_button_link ? (
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => (window.location.href = page.cta.primary_button_link || "/quote")}
                      >
                        {page.cta.primary_button_text}
                      </Button>
                    ) : null}
                    {page.cta.show_phone && page.cta.secondary_button_link ? (
                      <a
                        href={page.cta.secondary_button_link}
                        className="flex items-center gap-2 text-primary-foreground hover:underline"
                      >
                        <Phone className="w-5 h-5" />
                        <span className="font-medium">{page.cta.secondary_button_text}</span>
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            </section>
          )}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default OEMTransport;