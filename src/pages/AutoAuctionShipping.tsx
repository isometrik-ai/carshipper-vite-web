import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { Gavel, Shield, Clock, CheckCircle, Truck, Phone, ArrowRight, MapPin, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const AutoAuctionShipping = () => {
  const auctionServices = [
    "Copart vehicle shipping",
    "Manheim auction transport",
    "IAAI car delivery",
    "Dealer-only auction pickup",
    "Multi-vehicle auction buys",
    "Salvage vehicle transport",
    "Classic car auction delivery",
    "Cross-country auction shipping"
  ];

  const features = [
    {
      icon: Zap,
      title: "Fast Pickup",
      description: "Quick response to auction deadlines—we understand storage fees add up fast"
    },
    {
      icon: MapPin,
      title: "All Major Auctions",
      description: "We pick up from Copart, Manheim, IAAI, and hundreds of regional auctions"
    },
    {
      icon: Truck,
      title: "Multi-Vehicle Capacity",
      description: "Won multiple vehicles? We coordinate pickup for all your auction purchases"
    },
    {
      icon: Shield,
      title: "Full Insurance",
      description: "Comprehensive coverage including salvage and non-running vehicles"
    },
    {
      icon: Clock,
      title: "Real-Time Tracking",
      description: "Know exactly where your auction purchase is from pickup to delivery"
    },
    {
      icon: Users,
      title: "Auction Expertise",
      description: "We know auction procedures, title requirements, and pickup protocols"
    }
  ];

  const services = [
    {
      title: "Purchases FROM Your Auction",
      description: "Deliver vehicles from your auto auction to buyers across the country. Keep your customers happy with reliable, tracked transport.",
      icon: ArrowRight
    },
    {
      title: "Purchases TO Your Auction",
      description: "Once you've sold your lot and sourced your next vehicles, we'll handle transport to refill your auction inventory.",
      icon: ArrowRight
    }
  ];

  const process = [
    {
      step: "1",
      title: "Win Your Bid",
      description: "Successfully bid on vehicles at any major auction"
    },
    {
      step: "2",
      title: "Request Pickup",
      description: "Contact us with auction location and vehicle details"
    },
    {
      step: "3",
      title: "We Collect",
      description: "Our team picks up directly from the auction facility"
    },
    {
      step: "4",
      title: "Track Delivery",
      description: "Monitor transport progress in real-time"
    },
    {
      step: "5",
      title: "Receive Vehicle",
      description: "Your auction win arrives at your door or lot"
    }
  ];

  const testimonials = [
    {
      quote: "Customers want answers about when they can expect their vehicle delivered ASAP. I can rely on fast response time and trust to get vehicles picked up in a timely manner. The best customer service—very professional.",
      author: "Auto Auction Transportation Manager"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Auto Auction Shipping | Copart, Manheim & IAAI Transport</title>
        <meta name="description" content="Fast auto auction shipping from Copart, Manheim, IAAI and more. Quick pickup to avoid storage fees, multi-vehicle capacity, and nationwide delivery for auction purchases." />
        <meta name="keywords" content="auto auction shipping, Copart transport, Manheim car shipping, IAAI vehicle delivery, auction car transport, salvage vehicle shipping" />
        <link rel="canonical" href="/auto-auction-shipping" />
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
                  <Gavel className="w-4 h-4" />
                  Auction Transport Specialists
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Auto Auction <span className="text-primary">Shipping</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                  Won the bid? Let's get your vehicle moving. We specialize in fast pickup from all major 
                  auctions to avoid storage fees and get your purchase delivered quickly.
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

        {/* Auction Services - Moved from hero */}
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
                <h3 className="text-2xl font-semibold mb-6 text-center">Auction Services</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {auctionServices.map((service) => (
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

        {/* Two-Way Service */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                We Work with Auto Auctions Two Ways
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Whether you're buying vehicles at auction or running an auction facility, we've got you covered.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-8 shadow-lg border"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
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
                Why Auction Buyers Trust Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We understand the urgency of auction purchases and the unique requirements of transporting auction vehicles.
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
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              From Winning Bid to Delivery
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(20%-1rem)]"
                >
                  <div className="w-10 h-10 bg-primary-foreground text-primary rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/80 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xl italic text-muted-foreground mb-6">"{testimonial.quote}"</p>
                  <p className="font-semibold">— {testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Storage Fee Warning */}
        <section className="py-12 bg-accent/10">
          <div className="container mx-auto px-4">
            <div className="flex items-start gap-4 max-w-4xl mx-auto">
              <Clock className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Avoid Auction Storage Fees</h3>
                <p className="text-muted-foreground">
                  Most auctions charge daily storage fees after your free period ends. 
                  Contact us immediately after winning your bid to schedule fast pickup and avoid unnecessary costs.
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

export default AutoAuctionShipping;
