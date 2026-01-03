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
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const OEMTransport = () => {
  const capabilities = [
    "Factory to dealer delivery",
    "Marshalling yard transport",
    "Railhead pickup & delivery",
    "Port vehicle transport",
    "Electric vehicle specialists",
    "Spot moves & overflow",
    "Distribution center delivery",
    "Direct customer delivery"
  ];

  const stats = [
    { value: "15,000+", label: "Nationwide Carrier Network" },
    { value: "16+", label: "Years of Experience" },
    { value: "1.9", label: "Day Average Pickup" },
    { value: "Lowest", label: "Claims Rate in Industry" }
  ];

  const benefits = [
    {
      icon: Truck,
      title: "Extensive Carrier Network",
      description: "30,000+ carriers with coast-to-coast coverage. Access to drivers with skills and equipment to handle vehicles of all sizes."
    },
    {
      icon: Clock,
      title: "Fast Pickup & Safe Handling",
      description: "Average 1.9-day pickup with experienced dispatchers skilled in optimization strategies and direct carrier coordination."
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description: "Tech-driven instant quote calculator with highly accurate spot quotes or customized set pricing for your operations."
    },
    {
      icon: Shield,
      title: "OEM-Grade Insurance",
      description: "Additional insurance policy strictly for auto manufacturers. Full coverage from factory to final destination."
    }
  ];

  const features = [
    {
      icon: Factory,
      title: "Finished Vehicle Logistics",
      description: "Specialized FVL services meeting high OEM standards for new vehicle transport."
    },
    {
      icon: Zap,
      title: "EV Transport Expertise",
      description: "Accommodating weight, dimensions, and special requirements of electric vehicles."
    },
    {
      icon: BarChart,
      title: "Real-Time Tracking",
      description: "Status updates and ETAs with comprehensive shipment monitoring throughout transit."
    },
    {
      icon: Award,
      title: "A+ BBB Rating",
      description: "Industry-leading Net Promoter Score of 78 vs industry average of 41."
    }
  ];

  const faqs = [
    {
      question: "What types of OEM transport do you handle?",
      answer: "We handle all finished vehicle logistics including factory pickups, marshalling yards, railheads, and port locations. Delivery to dealers, distribution centers, or direct to customers."
    },
    {
      question: "Do you specialize in electric vehicle transport?",
      answer: "Yes, we work with high-profile electric vehicle manufacturers and can accommodate the weight, dimensions, and other special requirements of EV transport."
    },
    {
      question: "How do you ensure carrier quality for OEM shipments?",
      answer: "Our carrier relations team screens, monitors, and evaluates each carrier regularly to ensure they meet strict OEM requirements for finished vehicle logistics. All carriers pass a rigorous 20-point verification."
    },
    {
      question: "What insurance coverage is included?",
      answer: "We carry an additional insurance policy strictly for auto manufacturers. Full cargo coverage from pickup to delivery with comprehensive claims support."
    }
  ];

  return (
    <>
      <Helmet>
        <title>OEM Auto Transport | Finished Vehicle Logistics | CarShippers.ai</title>
        <meta name="description" content="OEM auto transport and finished vehicle logistics. Supporting manufacturers with flexibility, speed, and professional service. 15,000+ carrier network." />
        <meta name="keywords" content="OEM auto transport, finished vehicle logistics, FVL, manufacturer transport, factory delivery, EV transport" />
        <link rel="canonical" href="https://carshippers.ai/oem-transport" />
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
                    <Factory className="w-4 h-4" />
                    Manufacturer Solutions
                  </span>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    OEM <span className="text-primary">Auto Transport</span>
                  </h1>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    Proven OEM auto transport services. Supporting manufacturers with flexibility, 
                    speed, and professional service for finished vehicle logistics.
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">OEM Insurance</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">1.9-Day Pickup</span>
                    </div>
                    <div className="flex items-center gap-2 bg-warning/10 text-warning-foreground px-4 py-2 rounded-full">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">A+ BBB Rated</span>
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

          {/* Capabilities List */}
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
                  <h2 className="text-2xl font-bold mb-6 text-center">Finished Vehicle Logistics Capabilities</h2>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {capabilities.map((capability) => (
                      <div key={capability} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{capability}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Why Manufacturers Choose Us
                </h2>
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
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  OEM-Grade Transport Standards
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
          <section className="py-20 bg-muted/30">
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
                  Partner With Us for OEM Logistics
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Get a custom quote for your finished vehicle logistics needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="secondary" size="lg" onClick={() => window.location.href = "/quote"}>
                    Get OEM Quote
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

export default OEMTransport;