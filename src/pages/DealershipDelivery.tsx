import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { Store, Shield, Clock, CheckCircle, Truck, Phone, ArrowRight, MessageSquare, MapPin, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DealershipDelivery = () => {
  const benefits = [
    "Single and multi-vehicle transport",
    "Nationwide pickup from any location",
    "Fast quote and response times",
    "Real-time inventory tracking",
    "Volume discount pricing",
    "Direct-to-buyer delivery options",
    "15+ years industry experience",
    "Damage-free delivery guarantee"
  ];

  const features = [
    {
      icon: Clock,
      title: "Quick Response Times",
      description: "Get quotes within hours, not days. We understand time is money for your dealership."
    },
    {
      icon: Truck,
      title: "Multiple Vehicle Capacity",
      description: "Transport several cars at once with coordinated pickup and delivery to your lot."
    },
    {
      icon: MapPin,
      title: "Nationwide Coverage",
      description: "Pick up vehicles from anywhere in the lower 48 states and deliver to your dealership."
    },
    {
      icon: BarChart3,
      title: "Inventory Tracking",
      description: "State-of-the-art tracking system keeps you informed on every vehicle's location."
    },
    {
      icon: Shield,
      title: "Fully Insured Transport",
      description: "Comprehensive insurance coverage protects your inventory throughout transit."
    },
    {
      icon: MessageSquare,
      title: "Dedicated Support",
      description: "One call gets you a transport expert who understands dealership operations."
    }
  ];

  const process = [
    {
      step: "1",
      title: "Request Quote",
      description: "Tell us about your vehicle purchases and pickup locations"
    },
    {
      step: "2",
      title: "Confirm Details",
      description: "We verify routes and provide competitive pricing"
    },
    {
      step: "3",
      title: "Schedule Pickup",
      description: "Coordinate pickup times that work with sellers"
    },
    {
      step: "4",
      title: "Track in Transit",
      description: "Monitor your vehicles with real-time updates"
    },
    {
      step: "5",
      title: "Lot Delivery",
      description: "Vehicles arrive ready for your sales floor"
    }
  ];

  const testimonials = [
    {
      quote: "I have been working with them for years and they are my first choice in automotive transport. The response time is fantastic and the rates are extremely competitive.",
      author: "Reed Auto Group",
      role: "General Manager"
    },
    {
      quote: "Professional team with a high level of communication. They understand dealership operations and deliver vehicles on time, every time.",
      author: "Metro Motors",
      role: "Inventory Manager"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dealership Auto Delivery | Vehicle Transport for Car Dealers</title>
        <meta name="description" content="Reliable auto transport for car dealerships. Fast quotes, nationwide pickup, multi-vehicle capacity, and direct lot delivery. Partner with us for your dealership logistics." />
        <meta name="keywords" content="dealership auto transport, car dealer delivery, dealer vehicle shipping, auto transport for dealers, car lot delivery service" />
        <link rel="canonical" href="/dealership-delivery" />
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
                  <Store className="w-4 h-4" />
                  Dealership Partner Program
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Dealership <span className="text-primary">Auto Delivery</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                  Let's get your cars on your lot. You focus on selling—we'll fill your dealership 
                  quickly and safely with reliable nationwide transport.
                </p>
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

        {/* Benefits - Moved from hero */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-card rounded-2xl shadow-lg p-8 border"
              >
                <h3 className="text-2xl font-semibold mb-6 text-center">Why Dealers Choose Us</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{benefit}</span>
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
                An Extension of Your Dealership Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your sales team is focused on selling—not traveling to pick up new cars. 
                Rely on us to handle vehicle transport while you grow your business.
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
                How We Work with Dealerships
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Once you've sourced your vehicles, let us handle the logistics to get them on your lot.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-6 shadow-lg border text-center w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(20%-1rem)]"
                >
                  <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Trusted by Dealerships Nationwide
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-primary-foreground/10 rounded-xl p-6 backdrop-blur-sm"
                >
                  <p className="text-primary-foreground/90 italic mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-primary-foreground/70 text-sm">{testimonial.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default DealershipDelivery;
