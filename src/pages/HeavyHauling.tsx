import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { Truck, Shield, Clock, CheckCircle, FileText, Route, Weight, AlertTriangle, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeavyHauling = () => {
  const equipmentTypes = [
    "Excavators & Bulldozers",
    "Cranes & Forklifts",
    "Agricultural Equipment",
    "Construction Machinery",
    "Industrial Equipment",
    "Mining Equipment",
    "Transformers & Generators",
    "Oversized Vehicles"
  ];

  const features = [
    {
      icon: Weight,
      title: "Specialized Trailers",
      description: "Lowboys, flatbeds, step decks, and RGN trailers for any load size"
    },
    {
      icon: FileText,
      title: "Permit Management",
      description: "We handle all oversize/overweight permits and regulatory compliance"
    },
    {
      icon: Route,
      title: "Route Planning",
      description: "Strategic route analysis considering weight limits and bridge clearances"
    },
    {
      icon: Shield,
      title: "Full Insurance",
      description: "Comprehensive cargo insurance for your valuable equipment"
    },
    {
      icon: Clock,
      title: "Pilot Car Services",
      description: "Escort vehicles for oversized loads ensuring safe transport"
    },
    {
      icon: Truck,
      title: "Experienced Drivers",
      description: "CDL-certified operators specialized in heavy haul transport"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Equipment Assessment",
      description: "We evaluate dimensions, weight, and special requirements of your equipment"
    },
    {
      step: "2",
      title: "Permit & Route Planning",
      description: "Obtain necessary permits and plan the safest, most efficient route"
    },
    {
      step: "3",
      title: "Secure Loading",
      description: "Professional loading with proper tie-downs and weight distribution"
    },
    {
      step: "4",
      title: "Monitored Transport",
      description: "Real-time tracking and escort vehicles for oversized loads"
    },
    {
      step: "5",
      title: "Safe Delivery",
      description: "Careful unloading and delivery confirmation at destination"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Heavy Hauling & Equipment Transport | Oversized Load Shipping</title>
        <meta name="description" content="Professional heavy hauling services for construction equipment, industrial machinery, and oversized loads. Specialized trailers, permit management, and nationwide transport." />
        <meta name="keywords" content="heavy hauling, equipment transport, oversized load shipping, construction equipment transport, heavy equipment shipping, lowboy trailer" />
        <link rel="canonical" href="/heavy-hauling" />
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
                  <Weight className="w-4 h-4" />
                  Heavy Equipment Specialists
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Heavy Hauling & <span className="text-primary">Equipment Transport</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-6 max-w-xl">
                  Move your heaviest machinery safely and efficiently. From excavators to industrial equipment, 
                  we have the specialized trailers and expertise to transport oversized loads nationwide.
                </p>

                {/* Equipment Types - Below left text */}
                <div className="bg-card/50 backdrop-blur rounded-xl p-4 border">
                  <h3 className="text-sm font-semibold mb-3">Equipment We Transport</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {equipmentTypes.slice(0, 6).map((type) => (
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

        {/* Additional Equipment Types */}
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
                <h3 className="text-2xl font-semibold mb-6 text-center">Equipment We Transport</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {equipmentTypes.map((type) => (
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

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Our Heavy Hauling Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Transporting heavy equipment requires specialized knowledge, equipment, and regulatory compliance. 
                We handle every detail so you can focus on your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Our Heavy Haul Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From assessment to delivery, we ensure your equipment arrives safely and on schedule.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 mb-8"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1 pb-8 border-b last:border-0">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trailer Types */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Specialized Trailer Options
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: "Lowboy Trailers", desc: "For tall equipment with low ground clearance needs" },
                { name: "Step Deck Trailers", desc: "Two-level design for varying height equipment" },
                { name: "RGN Trailers", desc: "Detachable gooseneck for self-loading equipment" },
                { name: "Flatbed Trailers", desc: "Versatile option for standard heavy loads" }
              ].map((trailer) => (
                <div key={trailer.name} className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-2">{trailer.name}</h3>
                  <p className="text-primary-foreground/80 text-sm">{trailer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Safety Notice */}
        <section className="py-12 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-4 max-w-4xl mx-auto">
              <AlertTriangle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Federal & State Compliance</h3>
                <p className="text-muted-foreground">
                  All heavy haul shipments comply with DOT regulations, weight restrictions, and state-specific requirements. 
                  We obtain all necessary oversize/overweight permits and coordinate with local authorities when required.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default HeavyHauling;
