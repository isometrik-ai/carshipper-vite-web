import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { Truck, Shield, DollarSign, CheckCircle, Scale, ArrowRight, Phone, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FlatbedTransport = () => {
  const vehicleTypes = [
    "Lifted trucks & modified vehicles",
    "Large pickup trucks (F-350 Dually)",
    "Extended cargo vans (Sprinter)",
    "Small motorhomes & RVs",
    "Heavy construction equipment",
    "Inoperable vehicles",
    "Custom or lowered vehicles",
    "Oversized stock vehicles"
  ];

  const benefits = [
    {
      icon: Truck,
      title: "Easy Loading",
      description: "Hydraulic ramps allow for simple loading of vehicles that can't use standard carriers"
    },
    {
      icon: Shield,
      title: "No Height Restrictions",
      description: "No overhead clearance issues for lifted trucks or tall vehicles"
    },
    {
      icon: Scale,
      title: "Heavy Capacity",
      description: "Handles heavier vehicles that exceed standard carrier weight limits"
    },
    {
      icon: CheckCircle,
      title: "Versatile Transport",
      description: "Accommodates inoperable vehicles and non-standard dimensions"
    }
  ];

  const comparisonData = [
    { feature: "Cost", open: "Lowest", enclosed: "Higher", flatbed: "Highest" },
    { feature: "Availability", open: "Most Common", enclosed: "Less Common", flatbed: "Limited" },
    { feature: "Weather Protection", open: "None", enclosed: "Full", flatbed: "None" },
    { feature: "Oversized Vehicles", open: "Limited", enclosed: "Limited", flatbed: "Best" },
    { feature: "Inoperable Vehicles", open: "Possible", enclosed: "Possible", flatbed: "Best" }
  ];

  const faqs = [
    {
      question: "How much does flatbed auto transport cost?",
      answer: "Flatbed transport typically costs 30-50% more than open transport due to limited availability and specialized equipment. Prices vary based on distance, vehicle size, and current demand. Get a custom quote for accurate pricing."
    },
    {
      question: "When do I need a flatbed carrier?",
      answer: "You need a flatbed when your vehicle is too tall, too heavy, has low ground clearance, is inoperable without rolling capability, or has modifications that prevent loading on standard carriers."
    },
    {
      question: "How long does flatbed transport take?",
      answer: "Due to lower availability, flatbed transport may take longer to schedule. Expect 7-14 days for pickup scheduling, with transit times similar to other methods based on distance."
    },
    {
      question: "Is my vehicle protected on a flatbed?",
      answer: "Vehicles are professionally secured with straps and wheel ties. While not enclosed, flatbeds provide stable transport. We recommend enclosed flatbed options for valuable or classic vehicles."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Flatbed Auto Transport | Oversized Vehicle Shipping Services</title>
        <meta name="description" content="Flatbed auto transport for lifted trucks, oversized vehicles, and inoperable cars. Specialized flatbed carriers handle vehicles that won't fit standard trailers." />
        <meta name="keywords" content="flatbed auto transport, flatbed car shipping, oversized vehicle transport, lifted truck shipping, inoperable vehicle transport" />
        <link rel="canonical" href="/flatbed-transport" />
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section with Quote Form */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Truck className="w-4 h-4" />
                  Specialized Flatbed Service
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Flatbed <span className="text-primary">Auto Transport</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6 max-w-xl">
                  For vehicles that don't fit on standard carriers. Our flatbed transport service handles 
                  lifted trucks, oversized vehicles, and inoperable cars with ease.
                </p>

                {/* Vehicle Types - Below left text */}
                <div className="bg-card/50 backdrop-blur rounded-xl p-4 border">
                  <h3 className="text-sm font-semibold mb-3">Do You Need a Flatbed?</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {vehicleTypes.slice(0, 6).map((type) => (
                      <div key={type} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                        <span>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
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

        {/* Additional Vehicle Types */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-2xl shadow-lg p-8 border"
              >
                <h3 className="text-2xl font-semibold mb-6 text-center">Do You Need a Flatbed?</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {vehicleTypes.map((type) => (
                    <div key={type} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{type}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Benefits of Flatbed Transport
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                When standard carriers won't work, flatbed transport provides the solution for your unique vehicle needs.
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

        {/* Comparison Table */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Flatbed vs Other Transport Options
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Understanding when flatbed is the right choice for your vehicle.
              </p>
            </div>

            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4">Feature</th>
                    <th className="text-center py-4 px-4">Open Transport</th>
                    <th className="text-center py-4 px-4">Enclosed Transport</th>
                    <th className="text-center py-4 px-4 bg-primary/10">Flatbed Transport</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr key={row.feature} className="border-b">
                      <td className="py-4 px-4 font-medium">{row.feature}</td>
                      <td className="text-center py-4 px-4">{row.open}</td>
                      <td className="text-center py-4 px-4">{row.enclosed}</td>
                      <td className="text-center py-4 px-4 bg-primary/10 font-medium">{row.flatbed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing Info */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-6">
                <DollarSign className="w-12 h-12 flex-shrink-0" />
                <div>
                  <h2 className="text-3xl font-bold mb-4">Flatbed Transport Pricing</h2>
                  <p className="text-primary-foreground/90 mb-4">
                    Flatbed carriers are less common than open or enclosed options, which affects pricing and availability:
                  </p>
                  <ul className="space-y-2 text-primary-foreground/90">
                    <li>• Typically 30-50% more than open transport</li>
                    <li>• Limited carrier availability may extend scheduling time</li>
                    <li>• Price includes specialized loading equipment</li>
                    <li>• Custom quotes based on vehicle dimensions and weight</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <HelpCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Flatbed Transport FAQs
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

      </main>

      <Footer />
    </>
  );
};

export default FlatbedTransport;
