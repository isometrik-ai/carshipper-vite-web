import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Shield, 
  Truck, 
  DollarSign, 
  MapPin, 
  Phone, 
  FileCheck, 
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Headphones
} from "lucide-react";

const OpenTransport = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Cost-Effective",
      description: "An open auto carrier is the most cost-effective shipping service available. When you're on a budget, open auto transport carriers are the right option for you.",
    },
    {
      icon: MapPin,
      title: "Door-to-Door",
      description: "The driver will come as close as possible to your desired pickup and delivery spots. If the trucker cannot enter the exact location, the person releasing or accepting the vehicle might need to meet at a nearby location for safe loading and unloading.",
    },
    {
      icon: Phone,
      title: "Communication",
      description: "Our trucking partners usually call 24 hours in advance to schedule the pickup and delivery of your vehicle. Upon arrival, the driver will notify the customer to complete inspections, acquire signatures, and accept payment.",
    },
    {
      icon: FileCheck,
      title: "Vehicle Inspection",
      description: "Open auto carriers perform detailed inspections of all vehicles before pickup and delivery. All previous dings, dents, and damages will be noted for insurance purposes with a minimum coverage of $100,000.",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Efficient & Affordable",
      description: "Instant quotes for efficient, affordable car shipping with the right car shipping calculator.",
    },
    {
      icon: Truck,
      title: "Reliable Car Shipping",
      description: "We only work with reliable, experienced car carriers with full insurance coverage.",
    },
    {
      icon: Headphones,
      title: "Dedicated Customer Service",
      description: "Complete shipping management for your open auto transport order from start to finish.",
    },
  ];

  const faqs = [
    {
      question: "How many vehicles can a car hauler move at one time?",
      answer: "Open car haulers typically transport anywhere from 5 to 10 vehicles at a time. Sometimes, these loads consist of multi-car shipments from one or two clients. Other times, a trucker is tasked with servicing 5 to 10 customers on the same route.",
    },
    {
      question: "What is the difference between open and enclosed transport?",
      answer: "Open carrier car transport utilizes a multiple-car storage system exposed to the elements. Usually, an open carrier can service up to ten vehicles at a time. An enclosed carrier offers less space and costs more yet shields your car from view, debris, and inclement weather.",
    },
    {
      question: "Is open car shipping safe?",
      answer: "Yes! We pride ourselves on our reputation for safe, secure, open transport services. Every open car transport carrier we work with adheres to all state and federal safety regulations for commercial transport. We vet all carriers for driving history, equipment quality, customer service, and active insurance policies.",
    },
    {
      question: "What are the risks of open vehicle transport?",
      answer: "The risks are minimal. Open carrier car shipping does expose your car to external factors. However, we only work with the safest auto transport carriers in the nation with the experience necessary to navigate all transport challenges. Every shipment includes comprehensive cargo insurance.",
    },
  ];

  const testimonials = [
    {
      text: "I am very happy with the service. The employees were very quick to communicate and arrange for a delivery of my Audi S7 all the way from Iowa to New Jersey, and they also did an excellent job at keeping me updated with the progress of the pick and delivery. I would highly recommend!",
      title: "Excellent, Efficient Service",
    },
    {
      text: "I had an excellent experience and would recommend them highly. They transported my daughter's classic Miata that only has 35,000 miles on it. It was delivered in the exact same shape as it was picked up (From Southern California to Seattle) even through rough weather!!! Can't say enough good things!",
      title: "Rough Weather, No Problem",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Open Auto Transport | Affordable Car Shipping | CarShippers.ai</title>
        <meta
          name="description"
          content="Open auto carrier shipping is the easiest and most affordable method to ship any car, truck, or van across the United States. Secure and fully insured transport."
        />
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
                    Open <span className="text-primary">Auto Transport</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-6">
                    Open auto carrier shipping is the easiest and most affordable method to ship any car, truck, or van across the United States. Open car hauling is both secure and fully insured against all accidental damages.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">High Value Insurance</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                      <Truck className="w-4 h-4" />
                      <span className="text-sm font-medium">Rapid Transport</span>
                    </div>
                    <div className="flex items-center gap-2 bg-warning/10 text-warning-foreground px-4 py-2 rounded-full">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">A+ Service</span>
                    </div>
                  </div>

                  {/* Quick Points - Below left text */}
                  <div className="bg-card/50 backdrop-blur rounded-xl p-4 border">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        <span>Most affordable option</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        <span>Faster pickup availability</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        <span>Ideal for 95% of vehicles</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        <span>$100K+ insurance coverage</span>
                      </div>
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

          {/* What is Open Transport - Moved from hero */}
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
                  <h2 className="text-2xl font-bold mb-4">What is Open Transport?</h2>
                  <p className="text-muted-foreground mb-4">
                    Open auto transport is the most popular car shipping method in the United States. You may even have seen some of our auto transport carriers on the highway.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Multiple vehicles are secured on an open trailer, allowing an average open car carrier capacity of <strong>8-10 cars</strong>. Your car is exposed to the elements during open car shipping, yet it's rare to sustain even minor cosmetic damage.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Most affordable shipping option</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Faster pickup availability</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Ideal for 95% of vehicles</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Fully insured with $100K+ coverage</span>
                    </div>
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Open Auto Transport Specifics</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to know about our open carrier services
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Open Carrier Services?</h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-primary" />
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
                      <Shield className="w-7 h-7 text-success" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold">Is Open Auto Transport Safe?</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    We pride ourselves on our reputation for safe, secure, open transport services. Every open car transport carrier we work with adheres to all state and federal safety regulations for commercial transport. We vet all open auto carriers for driving history, equipment quality, customer service, and active insurance policies.
                  </p>
                  
                  <p className="text-muted-foreground mb-6">
                    The risks of an open car hauler are minimal. Open carrier car shipping does expose your car to external factors. However, we only work with the safest auto transport carriers in the nation with the experience necessary to navigate all transport challenges.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">4.3★</div>
                      <div className="text-sm text-muted-foreground">5,157 Reviews</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">4.6★</div>
                      <div className="text-sm text-muted-foreground">1,973 Reviews</div>
                    </div>
                    <div className="bg-muted/50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-primary mb-1">A+</div>
                      <div className="text-sm text-muted-foreground">BBB Rated</div>
                    </div>
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
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.title}
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
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-xl border border-border"
                  >
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
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
                  How much will my open auto transport cost?
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Get affordable prices for open auto transport from our moving experts.
                </p>
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={() => window.location.href = "/#quote-form"}
                >
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5" />
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