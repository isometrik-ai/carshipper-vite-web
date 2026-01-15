import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Eye, 
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Car,
  BadgeCheck,
  Locate,
  Truck,
  Phone,
} from "lucide-react";

import { useEnclosedTransport } from "@/hooks/api/useEnclosedTransport";

const ICONS: Record<string, any> = {
  Truck,
  Shield,
  Lock,
  Eye,
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Car,
  BadgeCheck,
  Locate,
  Phone,
};

const getIcon = (name?: string | null): React.ComponentType<any> => {
  if (!name) return CheckCircle;
  return ICONS[name] || CheckCircle;
};

const EnclosedTransport = () => {
  const { data: page, isLoading } = useEnclosedTransport();

  if (isLoading || !page) return null;

  const vehicleTypes = page.service_cards?.[0]?.services ?? [];
  const features = page.process_cards?.[0]?.services ?? [];
  const trailerTypes = page.trailer_options?.features ?? [];
  const faqs = page.faqs?.FAQS ?? [];
  const testimonials = page.service_card?.servieces ?? [];
  const stats = page.stats?.stats ?? [];
  const secondarySection = page.secondary_section;
  const solutions = page.solutions;

  const PageIcon = getIcon(page.page_icon);

  return (
    <>
      <Helmet>
        <title>Enclosed Auto Transport | Premium Car Shipping | CarShippers.ai</title>
        <meta
          name="description"
          content="Enclosed auto carrier provides ultimate protection for your exotic, classic, or luxury vehicle. Fully insured premium car shipping with qualified drivers."
        />
        <link rel="canonical" href="https://carshippers.ai/enclosed-transport" />
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
                      <span className="text-sm font-medium">{page.page_tagline}</span>
                    </div>
                  ) : null}

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {page.title} <span className="text-primary">{page.title_highlight}</span>
                  </h1>
                  {page.description ? (
                    <p className="text-lg md:text-xl text-muted-foreground mb-6">
                      {page.description}
                    </p>
                  ) : null}
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Premium Protection</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm font-medium">Secure & Private</span>
                    </div>
                    <div className="flex items-center gap-2 bg-warning/10 text-warning-foreground px-4 py-2 rounded-full">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">A+ Service</span>
                    </div>
                  </div>

                  {/* Quick Points - Below left text */}
                  {secondarySection && secondarySection.services && secondarySection.services.length > 0 && (
                    <div className="bg-card/50 backdrop-blur rounded-xl p-4 border">
                      <div className="grid grid-cols-2 gap-2">
                        {secondarySection.services.slice(0, 4).map((item) => {
                          const Icon = getIcon(item.icon_name);
                          return (
                            <div key={item.id} className="flex items-center gap-2 text-xs">
                              <Icon className="w-3 h-3 text-success flex-shrink-0" />
                              <span>{item.text}</span>
                            </div>
                          );
                        })}
                      </div>
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

          {/* What is Enclosed Transport - Moved from hero */}
          {secondarySection && (
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
                    <h2 className="text-2xl font-bold mb-4">
                      {secondarySection.hero_title || "What is Enclosed Auto Transport?"}
                    </h2>
                    {secondarySection.description ? (
                      <p className="text-muted-foreground mb-4">
                        {secondarySection.description}
                      </p>
                    ) : null}
                    {secondarySection.secondary_description ? (
                      <p className="text-muted-foreground mb-4">
                        {secondarySection.secondary_description}
                      </p>
                    ) : null}
                    {secondarySection.services && secondarySection.services.length > 0 && (
                      <div className="grid sm:grid-cols-2 gap-3 mt-6">
                        {secondarySection.services.map((item) => {
                          const Icon = getIcon(item.icon_name);
                          return (
                            <div key={item.id} className="flex items-start gap-3">
                              <Icon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                              <span>{item.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </section>
          )}

          {/* Ideal For Section */}
          {vehicleTypes.length > 0 && (
            <section className="py-16 md:py-24 bg-primary">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    {page.service_cards?.[0]?.hero_title ?? "Ideal For Special Vehicles"}
                  </h2>
                  {page.service_cards?.[0]?.description ? (
                    <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                      {page.service_cards[0].description}
                    </p>
                  ) : null}
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                  {vehicleTypes.map((item, index) => {
                    const Icon = getIcon(item.icon_name);
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center"
                      >
                        <Icon className="w-6 h-6 text-primary-foreground mx-auto mb-2" />
                        <span className="text-primary-foreground font-medium">{item.text}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Features Grid */}
          {features.length > 0 && (
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {page.process_cards?.[0]?.hero_title ?? "Enclosed Car Hauler Services"}
                  </h2>
                  {page.process_cards?.[0]?.description ? (
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      {page.process_cards[0].description}
                    </p>
                  ) : null}
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                  {features.map((feature, index) => {
                    const Icon = getIcon(feature.icon_name);
                    return (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-card p-6 rounded-2xl border border-border"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.text}</h3>
                        {feature.description ? (
                          <p className="text-muted-foreground">{feature.description}</p>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Comparison Section */}
          {solutions && (
            <section className="py-16 md:py-24 bg-muted/30">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {solutions.title}
                  </h2>
                  {solutions.sub_title ? (
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      {solutions.sub_title}
                    </p>
                  ) : null}
                </motion.div>

                {solutions.services && solutions.services.length >= 2 && (
                  <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-card p-6 rounded-2xl border-2 border-primary shadow-lg"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        {(() => {
                          const EnclosedIcon = getIcon(solutions.services[0].icon_name);
                          return (
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                              <EnclosedIcon className="w-5 h-5 text-primary-foreground" />
                            </div>
                          );
                        })()}
                        <h3 className="text-xl font-bold">{solutions.services[0].title}</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>Full protection from elements</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>Reduces risk of exterior damage</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>Security against theft</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>Premium handling & care</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>2-3 vehicles per carrier</span>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-card p-6 rounded-2xl border border-border"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        {(() => {
                          const OpenIcon = getIcon(solutions.services[1].icon_name);
                          return (
                            <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                              <OpenIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                          );
                        })()}
                        <h3 className="text-xl font-bold">{solutions.services[1].title}</h3>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center mt-0.5 flex-shrink-0 text-xs">•</span>
                          <span>No protection from debris</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center mt-0.5 flex-shrink-0 text-xs">•</span>
                          <span>Exposed to weather</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center mt-0.5 flex-shrink-0 text-xs">•</span>
                          <span>Less security</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center mt-0.5 flex-shrink-0 text-xs">•</span>
                          <span>Standard handling</span>
                        </li>
                        <li className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center mt-0.5 flex-shrink-0 text-xs">•</span>
                          <span>8-10 vehicles per carrier</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Trailer Types */}
          {trailerTypes.length > 0 && (
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {page.trailer_options?.hero_title || "Trailer Options"}
                  </h2>
                  {page.trailer_options?.description ? (
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      {page.trailer_options.description}
                    </p>
                  ) : null}
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trailerTypes.map((trailer, index) => {
                    const Icon = getIcon(trailer.icon_name);
                    return (
                      <motion.div
                        key={trailer.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-card p-6 rounded-2xl border border-border text-center"
                      >
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{String(trailer.label)}</h3>
                        {trailer.value ? (
                          <div className="text-primary font-bold mb-2">{trailer.value}</div>
                        ) : null}
                        {trailer.descrption ? (
                          <p className="text-sm text-muted-foreground">{trailer.descrption}</p>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Testimonials */}
          {testimonials.length > 0 && (
            <section className="py-16 md:py-24 bg-secondary/50">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {page.service_card?.title || "A Trusted Car Shipping Company"}
                  </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card p-6 rounded-2xl border border-border"
                    >
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                        ))}
                      </div>
                      <h3 className="text-lg font-semibold mb-3">{testimonial.label}</h3>
                      {testimonial.descrption ? (
                        <p className="text-muted-foreground text-sm">{testimonial.descrption}</p>
                      ) : null}
                    </motion.div>
                  ))}
                </div>

                {stats && stats.length > 0 && (
                  <div className="flex justify-center gap-8 mt-12">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{String(stat.title)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* FAQs */}
          {faqs.length > 0 && (
            <section className="py-16 md:py-24">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {page.faqs?.title || "Frequently Asked Questions"}
                  </h2>
                  {page.faqs?.sub_title ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {page.faqs.sub_title}
                    </p>
                  ) : null}
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-6">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
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
          )}

          {/* CTA */}
          {page.cta && (
            <section className="py-16 md:py-24 bg-primary">
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
                  {page.cta.description ? (
                    <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                      {page.cta.description}
                    </p>
                  ) : null}
                  {page.cta.primary_button_text && page.cta.primary_button_link ? (
                    <Button
                      variant="secondary"
                      size="xl"
                      onClick={() => window.location.href = page.cta.primary_button_link || "/#quote-form"}
                    >
                      {page.cta.primary_button_text}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  ) : null}
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

export default EnclosedTransport;