import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useOpenTransport } from "@/hooks/api/useOpenTransport";

// Helper to resolve dynamic icons from Lucide
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon className={className} /> : <LucideIcons.HelpCircle className={className} />;
};

const OpenTransport = () => {
  const { data: response, isLoading } = useOpenTransport();
  const data = response?.data;

  if (isLoading || !data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>Open Auto Transport | Affordable Car Shipping | CarShippers.ai</title>
        <meta name="description" content={data.heroSection.description} />
        <link rel="canonical" href="https://carshippers.ai/open-transport" />
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
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {data.heroSection.hero_title}{" "}
                    <span className="text-primary">{data.heroSection.hero_title_highlight}</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-6">
                    {data.heroSection.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    {data.heroSection.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${idx === 0 ? "bg-success/10 text-success" :
                          idx === 1 ? "bg-primary/10 text-primary" :
                            "bg-warning/10 text-warning-foreground"
                          }`}
                      >
                        {feature.icon_name && <DynamicIcon name={feature.icon_name} className="w-4 h-4" />}
                        <span className="text-sm font-medium">{feature.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Points */}
                  <div className="bg-card/50 backdrop-blur rounded-xl p-4 border">
                    <div className="grid grid-cols-2 gap-2">
                      {data.heroSection.services.map((service) => (
                        <div key={service.id} className="flex items-center gap-2 text-xs">
                          <LucideIcons.CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                          <span>{service.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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

          {/* What is Open Transport */}
          <section className="py-16 md:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl p-8 border border-border shadow-lg"
                >
                  <h2 className="text-2xl font-bold mb-4">{data.openTransportSecondaryHeader.hero_title}</h2>
                  <p className="text-muted-foreground mb-4">
                    {data.openTransportSecondaryHeader.description}
                  </p>
                  <p className="text-muted-foreground mb-4">
                    {data.openTransportSecondaryHeader.secondary_description} <strong>8-10 cars</strong>.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-6">
                    {data.openTransportSecondaryHeader.services.map((service) => (
                      <div key={service.id} className="flex items-start gap-3">
                        <LucideIcons.CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span>{service.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.featuresGrid.title}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {data.featuresGrid.descrption}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {data.featuresGrid.shipping_process.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <DynamicIcon name={feature.icon_name} className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.benefits.title}</h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {data.benefits.shipping_process.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <DynamicIcon name={benefit.icon_name} className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Safety Section */}
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
                    <div className="w-14 h-14 bg-success/10 rounded-2xl flex items-center justify-center">
                      <LucideIcons.Shield className="w-7 h-7 text-success" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">{data.safety.hero_title}</h2>
                  </div>

                  <p className="text-muted-foreground mb-6">{data.safety.description}</p>
                  <p className="text-muted-foreground mb-6">{data.safety.secondary_description}</p>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {data.safety.Stats.map((stat) => (
                      <div key={stat.id} className="bg-muted/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{stat.label}</div>
                        <div className="text-sm text-muted-foreground">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {data.testimonials.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <LucideIcons.Star key={i} className="w-5 h-5 fill-warning text-warning" />
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{testimonial.title}</h3>
                    <p className="text-muted-foreground">{testimonial.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              </motion.div>

              <div className="max-w-3xl mx-auto space-y-6">
                {data.faqs.FAQS.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-xl border border-border"
                  >
                    <h3 className="text-lg font-semibold mb-3">{faq.questions}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  {data.CTA.title}
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  {data.CTA.description}
                </p>
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={() => window.location.href = data.CTA.primary_button_link}
                >
                  {data.CTA.primary_button_text}
                  <LucideIcons.ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default OpenTransport;