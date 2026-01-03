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
  Users, 
  BarChart,
  MapPin,
  Phone,
  Star,
  Headphones,
  RefreshCw,
  Building
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const RentalCarLogistics = () => {
  const services = [
    "Seasonal fleet repositioning",
    "Rental inventory redistribution",
    "Large volume blank loads",
    "Cross-country fleet transfers",
    "Airport location restocking",
    "Vehicle return logistics",
    "Peak season surge support",
    "Multi-location distribution"
  ];

  const benefits = [
    {
      icon: Truck,
      title: "15,000+ Carrier Network",
      description: "Whether you have a single unit or 10,000 to move, our nationwide carrier network delivers the capacity you need."
    },
    {
      icon: RefreshCw,
      title: "High Velocity Execution",
      description: "Fast and efficient service to support rental car velocity. Move 500, 1,000 or 10,000 units with strict industry guidelines."
    },
    {
      icon: BarChart,
      title: "Custom Progress Reports",
      description: "Daily communication with VIN tracking. Know where your units are during transit and when they're grounded."
    },
    {
      icon: Users,
      title: "Dedicated Account Team",
      description: "Each client has a dedicated account team and single point of contact to streamline communication."
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "1.9-Day Average Pickup",
      description: "Industry-leading pickup times to keep your inventory moving and available for customers."
    },
    {
      icon: Shield,
      title: "Lowest Claims Rate",
      description: "Our vetted carrier network maintains the lowest claims rate in the industry."
    },
    {
      icon: Building,
      title: "Rental Industry Expertise",
      description: "Team members with 15+ years at leading rental companies like Enterprise, Avis, and Hertz."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock support from people who understand the rental car business."
    }
  ];

  const faqs = [
    {
      question: "How quickly can you handle large volume moves?",
      answer: "We can dispatch multiple carriers immediately. 'How many trucks can you send now?' is a common question—our answer is 'as many as you need.' Our 15,000+ carrier network ensures capacity for any volume."
    },
    {
      question: "Do you work with major rental companies?",
      answer: "Yes, we work with Enterprise, Avis, Hertz, and small to medium-sized rental car companies. Our team has direct experience working at leading rental companies."
    },
    {
      question: "How do you handle blank loads?",
      answer: "Large volumes of blank loads are our specialty. Once units are picked up, we provide VINs for tracking with custom progress reports and daily communication."
    },
    {
      question: "Can you work around our hours of operation?",
      answer: "Absolutely. We follow strict industry guidelines and work around your hours of operation for pickups and deliveries at your locations."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Rental Car Fleet Logistics | Car Rental Transport Services | CarShippers.ai</title>
        <meta name="description" content="Rental car fleet logistics and transport services. Fast execution, 15,000+ carrier network, and dedicated account teams for Enterprise, Avis, Hertz, and more." />
        <meta name="keywords" content="rental car logistics, fleet transport, car rental delivery, enterprise car transport, rental fleet management" />
        <link rel="canonical" href="https://carshippers.ai/rental-car-logistics" />
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
                  <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <Building className="w-4 h-4" />
                    Business Solutions
                  </span>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Rental Car <span className="text-primary">Fleet Logistics</span>
                  </h1>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    Fast execution and service to support rental car velocity. Our 15,000+ carrier 
                    network and industry expertise delivers the capacity and service you need now.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Full Insurance</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">1.9-Day Pickup</span>
                    </div>
                    <div className="flex items-center gap-2 bg-warning/10 text-warning-foreground px-4 py-2 rounded-full">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">Industry Experts</span>
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

          {/* Services List */}
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
                  <h2 className="text-2xl font-bold mb-6 text-center">Comprehensive Rental Car Logistics</h2>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map((service) => (
                      <div key={service} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Value-Driven Logistics Solutions
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Supporting rental car companies with flexibility, speed, and professional service.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-xl p-6 shadow-lg border text-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Proven Rental Industry Experience
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg border px-6">
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
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

          {/* CTA Section */}
          <section className="py-20 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to Streamline Your Fleet Logistics?
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Get a custom quote for your rental car logistics needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="secondary" size="lg" onClick={() => window.location.href = "/quote"}>
                    Get Fleet Quote
                  </Button>
                  <a href="tel:+18885551234" className="flex items-center gap-2 text-primary-foreground hover:underline">
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

export default RentalCarLogistics;