import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, UserCheck, Truck, MapPin, CheckCircle, Clock, Shield, Phone, CreditCard, Search, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";

const HowItWorksPage = () => {
  const steps = [
    {
      number: "01",
      icon: FileText,
      title: "Get a Free, Instant Quote",
      description: "Use our advanced car shipping calculator to get an accurate quote. Enter your vehicle details, pickup and delivery locations, and preferred dates.",
      details: [
        "Enter origin and destination ZIP codes or cities",
        "Provide vehicle year, make, model, and condition",
        "Select your preferred pickup date",
        "Add special services like enclosed transport",
      ],
      time: "2 minutes",
    },
    {
      number: "02",
      icon: UserCheck,
      title: "Expert Quote Verification",
      description: "Unlike generic instant quotes, our shipping specialists verify every quote using real-time market data and carrier availability.",
      details: [
        "Live carrier availability check",
        "Current market rate verification",
        "Route optimization for best pricing",
        "Discount eligibility review",
      ],
      time: "~20 minutes",
    },
    {
      number: "03",
      icon: ClipboardCheck,
      title: "Receive Your Verified Quote",
      description: "Get your expert-verified quote via email and text within 30 minutes. Clear pricing breakdown with no hidden fees.",
      details: [
        "Detailed cost breakdown",
        "Pickup and delivery timeline",
        "Carrier insurance information",
        "Available service options",
      ],
      time: "Within 30 min",
    },
    {
      number: "04",
      icon: CreditCard,
      title: "Book Your Shipment",
      description: "Happy with your quote? Book online in 2 minutes or call us. No deposit required—pay on delivery or get a 5% discount for prepayment.",
      details: [
        "Secure online booking available",
        "No upfront deposit required",
        "5% discount for COD transactions",
        "Confirmation sent immediately",
      ],
      time: "2 minutes",
    },
    {
      number: "05",
      icon: Truck,
      title: "Carrier Assignment & Pickup",
      description: "We handpick a top-rated, fully insured carrier from our network. Your driver will contact you 24 hours before pickup.",
      details: [
        "4.5+ star rated carriers only",
        "Fully insured ($1M+ coverage)",
        "Driver calls 24 hours before pickup",
        "Thorough vehicle inspection at pickup",
      ],
      time: "24-48 hours",
    },
    {
      number: "06",
      icon: MapPin,
      title: "Track & Receive Your Vehicle",
      description: "Track your shipment in real-time. Receive your car at destination, inspect it, and pay the remaining balance.",
      details: [
        "Real-time GPS tracking available",
        "Text/email updates throughout",
        "Final inspection at delivery",
        "Pay remaining balance (cash, card, Zelle)",
      ],
      time: "5-10 days",
    },
  ];

  const testimonials = [
    {
      name: "Michael R.",
      location: "Los Angeles, CA",
      quote: "No hassles, great communication. My car arrived in perfect condition.",
    },
    {
      name: "Sarah T.",
      location: "New York, NY",
      quote: "Hassle-free car delivery. The tracking feature was incredibly helpful.",
    },
    {
      name: "David K.",
      location: "Miami, FL",
      quote: "Impressed with the professionalism. Will definitely use again.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>How Auto Transport Works | Complete Car Shipping Guide 2025 | CarShippers.ai</title>
        <meta
          name="description"
          content="Learn how car shipping works in 6 simple steps. Request a quote, get expert verification in 30 min, book online, and track your shipment door-to-door."
        />
        <link rel="canonical" href="https://carshippers.ai/how-it-works" />
        <meta name="keywords" content="how auto transport works, car shipping process, vehicle transport guide, car shipping steps" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          {/* Hero */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    How Auto Transport <span className="text-primary">Works</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8">
                    From quote to delivery in 6 simple steps. Get expert-verified quotes,
                    licensed carriers, and real-time tracking for complete peace of mind.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm bg-muted/50 px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>30-min verified quotes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-muted/50 px-4 py-2 rounded-full">
                      <Shield className="w-4 h-4 text-primary" />
                      <span>Fully insured carriers</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-muted/50 px-4 py-2 rounded-full">
                      <Truck className="w-4 h-4 text-primary" />
                      <span>Door-to-door service</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a href="tel:+18885551234" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                      <Phone className="w-5 h-5" />
                      (888) 555-1234
                    </a>
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

          {/* Steps */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  The Complete Car Shipping Process
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We've streamlined car shipping into 6 simple steps, ensuring a hassle-free experience from start to finish.
                </p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex gap-6 md:gap-8 ${index !== steps.length - 1 ? "mb-12 pb-12 border-b border-border" : ""}`}
                  >
                    {/* Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-2xl flex items-center justify-center relative">
                        <step.icon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                        <span className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center text-sm font-bold text-success-foreground">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Human Verified */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Why Expert-Verified Quotes?
                  </h2>
                  <p className="text-muted-foreground">
                    Other companies give you algorithm-generated estimates that often change later. We do better.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-destructive/5 border border-destructive/20 rounded-2xl p-6"
                  >
                    <h3 className="font-semibold text-destructive mb-3">❌ Generic "Instant" Quotes</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Algorithm-generated estimates</li>
                      <li>• No carrier availability check</li>
                      <li>• Prices often change later</li>
                      <li>• Outdated pricing data</li>
                      <li>• Hidden fees revealed at booking</li>
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-success/5 border border-success/20 rounded-2xl p-6"
                  >
                    <h3 className="font-semibold text-success mb-3">✓ Expert-Verified Quotes</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Real expert reviews every quote</li>
                      <li>• Live carrier availability check</li>
                      <li>• Price you see = price you pay</li>
                      <li>• Current market rates</li>
                      <li>• All fees included upfront</li>
                    </ul>
                  </motion.div>
                </div>
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
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  What Our Customers Say
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-muted/30 rounded-xl p-6 border border-border"
                  >
                    <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
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
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Get your expert-verified quote in 30 minutes or less.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/quote">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="text-lg px-8"
                    >
                      Get Your Quote
                    </Button>
                  </Link>
                  <a
                    href="tel:+18885551234"
                    className="flex items-center gap-2 text-primary-foreground hover:text-primary-foreground/80"
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">(888) 555-1234</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HowItWorksPage;
