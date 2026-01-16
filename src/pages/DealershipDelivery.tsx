import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import {
  Store,
  Shield,
  Clock,
  CheckCircle,
  Truck,
  Phone,
  MessageSquare,
  MapPin,
  BarChart3,
  FileText,
  Route,
  Weight,
  AlertTriangle,
} from "lucide-react";

import { useDealershipDelivery } from "@/hooks/api/useDealershipDelivery";

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
  Store,
  MessageSquare,
  MapPin,
  BarChart3,
};

const getIcon = (name?: string | null): React.ComponentType<any> => {
  if (!name) return CheckCircle;
  return ICONS[name] || CheckCircle;
};

const DealershipDelivery = () => {
  const { data: page, isLoading } = useDealershipDelivery();

  if (isLoading || !page) return null;

  const benefits = page.secondary_section?.services ?? [];
  const features = page.service_cards?.[0]?.services ?? [];
  const processSteps = page.process_cards?.[0]?.Stats ?? [];
  const testimonials = page.trailer_options?.Stats ?? [];

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
        {/* Hero Section with Quote Form */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                  <PageIcon className="w-4 h-4" />
                  <span>{page.page_tagline}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {page.title} <span className="text-primary">{page.title_highlight}</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                  {page.description}
                </p>
              </motion.div>

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

        {/* Benefits Section */}
        <section className="py-16 bg-muted/30">
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
                  {page.secondary_section?.hero_title ?? "Why Dealers Choose Us"}
                </h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {benefits.map((benefit) => {
                    const Icon = getIcon(benefit.icon_name);
                    return (
                      <div key={benefit.id} className="flex items-center gap-2 text-sm">
                        <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{benefit.text}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {page.service_cards?.[0]?.hero_title ?? "An Extension of Your Dealership Team"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {page.service_cards?.[0]?.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = getIcon(feature.icon_name);
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.text}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {page.process_cards?.[0]?.hero_title ?? "How We Work with Dealerships"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {page.process_cards?.[0]?.description}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 shadow-lg border text-center w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(20%-1rem)]"
                >
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                    {step.value}
                  </div>
                  <h3 className="font-semibold mb-2">{String(step.label)}</h3>
                  <p className="text-muted-foreground text-sm">{step.descrption}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {testimonials.length > 0 && (
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {page.trailer_options?.hero_title ?? "Trusted by Dealerships Nationwide"}
              </h2>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm"
                  >
                    <p className="text-primary-foreground/90 italic mb-4">
                      {testimonial.descrption}
                    </p>
                    <div>
                      <p className="font-semibold">{String(testimonial.label)}</p>
                      <p className="text-primary-foreground/70 text-sm">{testimonial.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
};

export default DealershipDelivery;
