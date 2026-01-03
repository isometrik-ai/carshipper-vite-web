import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, Users, Award, TrendingUp, CheckCircle, Truck } from "lucide-react";

const About = () => {
  const stats = [
    { value: "50,000+", label: "Cars Shipped" },
    { value: "4.9★", label: "Customer Rating" },
    { value: "50", label: "States Covered" },
    { value: "30 min", label: "Quote Delivery" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "No hidden fees, no surprises. Every quote includes all costs upfront.",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "24/7 support from real shipping experts who care about your vehicle.",
    },
    {
      icon: Award,
      title: "Quality Carriers",
      description: "We only work with licensed, insured, and highly-rated transport carriers.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "AI-powered tools help us deliver faster, more accurate quotes.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About CarShippers.ai | Licensed Auto Transport Broker</title>
        <meta
          name="description"
          content="Learn about CarShippers.ai - a licensed auto transport broker providing expert-verified quotes in 30 minutes. 50,000+ cars shipped, 4.9★ rating."
        />
        <link rel="canonical" href="https://carshippers.ai/about" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Shipping Cars with <span className="text-primary">Trust & Expertise</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  CarShippers.ai combines human expertise with AI technology to deliver 
                  fast, accurate quotes and reliable car shipping across all 50 states.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 bg-primary">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-primary-foreground/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Story</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    <p className="mb-4">
                      We started CarShippers.ai because we experienced firsthand how frustrating 
                      the car shipping process can be. Long wait times for quotes, unclear pricing, 
                      and unreliable carriers made what should be simple into a headache.
                    </p>
                    <p className="mb-4">
                      Our solution? Combine the best of human expertise with AI technology. 
                      Our shipping experts use advanced tools to verify routes, check carrier 
                      availability, and ensure every quote is accurate—not a generic estimate.
                    </p>
                    <p>
                      The result is quotes delivered in 30 minutes or less, backed by a team 
                      that genuinely cares about getting your car from A to B safely and affordably.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
              >
                Our Values
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why 30 Minutes */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-secondary/50 rounded-3xl p-8 md:p-12"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    Why 30 Minutes (Not 30 Seconds)?
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Many websites promise "instant" quotes, but they're just algorithms 
                    spitting out generic estimates. We take a different approach:
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Real shipping experts review every quote",
                      "We check actual carrier availability on your route",
                      "Prices are verified, not estimated",
                      "We account for your specific vehicle and needs",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground mt-6">
                    The extra 29 minutes and 30 seconds? Worth it for a quote you can trust.
                  </p>
                </motion.div>
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
                <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to Ship Your Car?
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Get your expert-verified quote in 30 minutes or less.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => window.location.href = "/#quote-form"}
                >
                  Get Your Quote
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

export default About;
