import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useFleetTransport } from "@/hooks/api/useFleetTransport";
import { getIcon } from "@/utils/getIcon";

const FleetTransport = () => {
  const { data: page, isLoading } = useFleetTransport();

  if (isLoading || !page) return null;

  const industries = page.secondary_section?.services ?? [];
  const features = page.service_cards?.[0]?.services ?? [];
  const stats = page.stats?.stats ?? [];
  const solutions = page.solutions?.services ?? [];

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
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  {page.page_icon && getIcon(page.page_icon)({ className: "w-4 h-4" })}
                  {page.page_tagline}
                </span>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {page.title} <span className="text-primary">{page.title_highlight}</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                  {page.description}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <QuoteForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* INDUSTRIES SECTION */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-card rounded-2xl shadow-lg p-8 border"
              >
                <h3 className="text-2xl font-semibold mb-6 text-center">
                  {page.secondary_section?.hero_title ?? "Industries We Serve"}
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {industries.map((industry) => {
                    const Icon = getIcon(industry.icon_name);
                    return (
                      <div key={industry.id} className="flex items-center gap-2 text-sm">
                        <Icon className="w-4 h-4 text-primary" />
                        <span>{industry.text}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        {stats.length > 0 && (
          <section className="py-12 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURES SECTION */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {page.service_cards?.[0]?.hero_title ?? "Why Fleet Managers Choose Us"}
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
                    className="bg-card rounded-xl p-6 shadow-lg border"
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

        {/* SOLUTIONS SECTION */}
        {solutions.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{page.solutions?.title}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {page.solutions?.sub_title}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {solutions.map((item, index) => {
                  const Icon = getIcon(item.icon_name);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card rounded-xl p-8 shadow-lg border"
                    >
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground mb-4">{item.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA SECTION */}
        {page.cta && (
          <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{page.cta.title}</h2>
                <p className="text-primary-foreground/90 mb-8 text-lg">{page.cta.description}</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="gap-2">
                    {page.cta.primary_button_text} <ArrowRight className="w-4 h-4" />
                  </Button>

                  {page.cta.show_phone && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 gap-2"
                    >
                      <Phone className="w-4 h-4" /> Speak to Fleet Specialist
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default FleetTransport;
