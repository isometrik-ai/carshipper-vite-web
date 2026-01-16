import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";

import {
  Truck,
  Shield,
  Clock,
  FileText,
  Route,
  Weight,
  CheckCircle,
  AlertTriangle,
  Phone,
} from "lucide-react";

import { useHeavyHauling } from "@/hooks/api/useHeavyHauling";

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
};

const getIcon = (name?: string | null): React.ComponentType<any> => {
  if (!name) return CheckCircle;
  return ICONS[name] || CheckCircle;
};


const HeavyHauling = () => {
  const { data: page, isLoading } = useHeavyHauling();

  if (isLoading || !page) return null;

  const heroSection = page.service_cards?.[0];
  const equipmentList = page.service_card?.servieces || [];
  const secondaryEquipment = page.secondary_section?.services || [];
  const processSteps = page.process_cards?.[0]?.features || [];
  const trailers = page.trailer_options?.services || [];

  const PageIcon = getIcon(page.page_icon);

  return (
    <>
      <Helmet>
        <title>
          {page.title} {page.title_highlight}
        </title>
        <meta name="description" content={page.description} />
      </Helmet>

      <Header />

      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Section */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                  <PageIcon className="w-4 h-4" />
                  <span>{page.page_tagline}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {page.title}{" "}
                  <span className="text-primary">{page.title_highlight}</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-6 max-w-xl">
                  {page.description}
                </p>

                {/* Equipment List */}
                <div className="bg-card/50 backdrop-blur rounded-xl p-4 border">
                  <h3 className="text-sm font-semibold mb-3">
                    {page.service_card?.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                    {equipmentList.slice(0, 6).map((item) => {
                      const Icon = getIcon(item.icon_name);
                      return (
                        <div key={item.id} className="flex items-center gap-2 text-xs">
                          <Icon className="w-3 h-3 text-primary" />
                          {item.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Quote Form */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <QuoteForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECONDARY EQUIPMENT LIST */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-card p-8 rounded-2xl shadow-lg border">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                {page.secondary_section?.hero_title}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {secondaryEquipment.map((item) => {
                  const Icon = getIcon(item.icon_name);
                  return (
                    <div key={item.id} className="flex items-center gap-2 text-sm">
                      <Icon className="w-4 h-4 text-primary" />
                      {item.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US (service_cards[0]) */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {heroSection.hero_title}
            </h2>

            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              {heroSection.description}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {heroSection.services.map((item, index) => {
                const Icon = getIcon(item.icon_name);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-xl p-6 border shadow-lg"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.text}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS STEPS */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {page.process_cards?.[0]?.hero_title}
            </h2>

            {processSteps.map((step, index) => (
              <div key={step.id} className="flex gap-6 mb-8">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                  {step.value}
                </div>
                <div className="flex-1 pb-8 border-b last:border-0">
                  <h3 className="text-xl font-semibold mb-2">{step.label}</h3>
                  <p className="text-muted-foreground">{step.descrption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRAILER OPTIONS */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {page.trailer_options.hero_title}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trailers.map((item) => (
                <div key={item.id} className="bg-primary-foreground/10 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">{item.text}</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPLIANCE */}
        <section className="py-12 bg-accent/10">
          <div className="container mx-auto px-4 max-w-4xl flex gap-6">
            <AlertTriangle className="w-10 h-10 text-accent" />
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {page.compliance.hero_title}
              </h3>
              <p className="text-muted-foreground">{page.compliance.description}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default HeavyHauling;
