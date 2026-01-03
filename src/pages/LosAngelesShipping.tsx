import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { Shield, Clock, Truck, Star, CheckCircle, MapPin, Phone, Car, DollarSign, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const LosAngelesShipping = () => {
  const shippingFromLA = [
    { from: "Los Angeles", to: "New York", distance: "2,775 miles", time: "7-10 days", cost: "$1,350" },
    { from: "Los Angeles", to: "Chicago", distance: "2,015 miles", time: "5-7 days", cost: "$1,125" },
    { from: "Los Angeles", to: "Houston", distance: "1,545 miles", time: "4-6 days", cost: "$975" },
    { from: "Los Angeles", to: "Phoenix", distance: "370 miles", time: "2-3 days", cost: "$550" },
    { from: "Los Angeles", to: "Seattle", distance: "1,135 miles", time: "4-5 days", cost: "$925" },
    { from: "Los Angeles", to: "Miami", distance: "2,750 miles", time: "7-10 days", cost: "$1,400" },
    { from: "Los Angeles", to: "Las Vegas", distance: "270 miles", time: "1-2 days", cost: "$475" },
    { from: "Los Angeles", to: "Denver", distance: "1,020 miles", time: "3-5 days", cost: "$875" },
  ];

  const shippingToLA = [
    { from: "New York", to: "Los Angeles", distance: "2,775 miles", time: "7-10 days", cost: "$1,325" },
    { from: "Chicago", to: "Los Angeles", distance: "2,015 miles", time: "5-7 days", cost: "$1,100" },
    { from: "Dallas", to: "Los Angeles", distance: "1,435 miles", time: "4-6 days", cost: "$950" },
    { from: "Atlanta", to: "Los Angeles", distance: "2,175 miles", time: "6-8 days", cost: "$1,175" },
    { from: "Boston", to: "Los Angeles", distance: "2,985 miles", time: "8-10 days", cost: "$1,450" },
    { from: "Detroit", to: "Los Angeles", distance: "2,300 miles", time: "6-8 days", cost: "$1,225" },
  ];

  const neighborhoods = [
    "Downtown LA", "Hollywood", "Santa Monica", "Beverly Hills",
    "Pasadena", "Long Beach", "Burbank", "Glendale",
    "Culver City", "West Hollywood", "Malibu", "Venice"
  ];

  const faqs = [
    {
      q: "How much does it cost to ship a car to Los Angeles?",
      a: "Car shipping to Los Angeles typically ranges from $475 for nearby cities like Las Vegas to $1,450 for cross-country routes from Boston. The average cost for a sedan is around $1,100-$1,300 from major East Coast cities."
    },
    {
      q: "How long does car shipping to Los Angeles take?",
      a: "Delivery times to LA vary by origin: 1-2 days from Las Vegas, 2-3 days from Phoenix, 5-7 days from Chicago, and 7-10 days from New York or Miami."
    },
    {
      q: "Do you offer door-to-door service in Los Angeles?",
      a: "Yes, we provide door-to-door pickup and delivery throughout Los Angeles County, including all neighborhoods from Downtown LA to Malibu. Some areas may require nearby location pickup due to traffic or access restrictions."
    },
    {
      q: "What's the best time to ship a car to Los Angeles?",
      a: "Fall and winter months (October-February) typically offer the best rates for shipping to LA. Summer months see higher demand, which can increase prices by 15-25%."
    },
    {
      q: "Can you ship a car from the LA port?",
      a: "Yes, we offer port pickup services from the Port of Los Angeles and Port of Long Beach for imported vehicles. We can transport your car directly from the port to any destination."
    },
  ];

  return (
    <>
      <Helmet>
        <title>Los Angeles Car Shipping | LA Auto Transport Services | CarShippers.ai</title>
        <meta 
          name="description" 
          content="Professional Los Angeles car shipping services. Door-to-door auto transport in LA, Hollywood, Santa Monica & all LA County. Get your free quote in 30 minutes!" 
        />
        <link rel="canonical" href="https://carshippers.ai/los-angeles-car-shipping" />
        <meta name="keywords" content="Los Angeles car shipping, LA auto transport, ship car to Los Angeles, car transport Hollywood, Santa Monica vehicle shipping" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "CarShippers.ai - Los Angeles Auto Transport",
            "description": "Professional car shipping services in Los Angeles, California",
            "areaServed": {
              "@type": "City",
              "name": "Los Angeles",
              "containedIn": {
                "@type": "State",
                "name": "California"
              }
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Los Angeles",
              "addressRegion": "CA",
              "postalCode": "90001",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "34.0522",
              "longitude": "-118.2437"
            },
            "url": "https://carshippers.ai/los-angeles-car-shipping",
            "telephone": "+1-888-555-1234",
            "priceRange": "$475-$1,450",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "00:00",
              "closes": "23:59"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "5000"
            }
          })}
        </script>
        
        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/20 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                    <Building2 className="w-4 h-4" />
                    <span className="text-sm font-medium">Los Angeles Auto Transport</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Los Angeles Car Shipping <span className="text-primary">Services</span>
                  </h1>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    Professional auto transport to and from Los Angeles. From Hollywood to Santa Monica, 
                    Downtown LA to Long Beach, we provide reliable door-to-door car shipping throughout LA County.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-success" />
                      <span className="text-sm">$1M+ Insurance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-sm">30-Min Quotes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-warning" />
                      <span className="text-sm">Door-to-Door LA</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-success" />
                      <span className="text-sm">4.8★ Rating</span>
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

          {/* Trust Badges */}
          <section className="py-8 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15,000+</div>
                  <div className="text-sm text-muted-foreground">LA Cars Shipped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">4.8★</div>
                  <div className="text-sm text-muted-foreground">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">A+</div>
                  <div className="text-sm text-muted-foreground">BBB Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">LA Support</div>
                </div>
              </div>
            </div>
          </section>

          {/* LA Service Areas */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Car Shipping Throughout Los Angeles
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We provide door-to-door auto transport to all neighborhoods and areas in Los Angeles County.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 max-w-4xl mx-auto">
                {neighborhoods.map((area) => (
                  <motion.div
                    key={area}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm"
                  >
                    <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                    <span>{area}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Shipping From LA Table */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Shipping Your Car FROM Los Angeles - Cost & Delivery Estimates
                </h2>
                <p className="text-muted-foreground">
                  Popular routes and estimated costs for shipping from Los Angeles.
                </p>
              </motion.div>

              <div className="overflow-x-auto">
                <table className="w-full bg-background rounded-lg overflow-hidden shadow-sm">
                  <thead className="bg-primary text-primary-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left">From</th>
                      <th className="px-4 py-3 text-left">To</th>
                      <th className="px-4 py-3 text-left">Distance</th>
                      <th className="px-4 py-3 text-left">Est. Time</th>
                      <th className="px-4 py-3 text-left">Est. Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingFromLA.map((route, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="px-4 py-3">{route.from}</td>
                        <td className="px-4 py-3">{route.to}</td>
                        <td className="px-4 py-3">{route.distance}</td>
                        <td className="px-4 py-3">{route.time}</td>
                        <td className="px-4 py-3 font-semibold text-primary">{route.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Shipping To LA Table */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Shipping Your Car TO Los Angeles - Cost & Delivery Estimates
                </h2>
                <p className="text-muted-foreground">
                  Popular routes and estimated costs for shipping to Los Angeles.
                </p>
              </motion.div>

              <div className="overflow-x-auto">
                <table className="w-full bg-background rounded-lg overflow-hidden shadow-sm border border-border">
                  <thead className="bg-primary text-primary-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left">From</th>
                      <th className="px-4 py-3 text-left">To</th>
                      <th className="px-4 py-3 text-left">Distance</th>
                      <th className="px-4 py-3 text-left">Est. Time</th>
                      <th className="px-4 py-3 text-left">Est. Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingToLA.map((route, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                        <td className="px-4 py-3">{route.from}</td>
                        <td className="px-4 py-3">{route.to}</td>
                        <td className="px-4 py-3">{route.distance}</td>
                        <td className="px-4 py-3">{route.time}</td>
                        <td className="px-4 py-3 font-semibold text-primary">{route.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Why Choose Us for LA */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Why Choose Us for Los Angeles Car Shipping?
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    icon: MapPin,
                    title: "LA Traffic Experts",
                    desc: "Our drivers know LA's streets, traffic patterns, and best pickup/delivery times to ensure efficient service."
                  },
                  {
                    icon: Shield,
                    title: "$1M+ Insurance Coverage",
                    desc: "Full cargo insurance on every LA shipment protects your vehicle from pickup to delivery."
                  },
                  {
                    icon: Building2,
                    title: "All LA Neighborhoods",
                    desc: "From Beverly Hills to Long Beach, we serve every neighborhood in Los Angeles County."
                  },
                  {
                    icon: Truck,
                    title: "Port Services Available",
                    desc: "We offer pickup from Port of Los Angeles and Port of Long Beach for imported vehicles."
                  },
                  {
                    icon: Car,
                    title: "Luxury & Exotic Specialists",
                    desc: "Enclosed transport available for high-value vehicles - perfect for LA's luxury car market."
                  },
                  {
                    icon: Clock,
                    title: "Flexible LA Scheduling",
                    desc: "We work around your schedule with flexible pickup windows throughout Los Angeles."
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 rounded-xl bg-background border border-border"
                  >
                    <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Los Angeles Car Shipping FAQs
                </h2>
              </motion.div>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-muted/30 rounded-lg p-6 border border-border"
                  >
                    <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Related Pages */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/california-car-shipping" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:border-primary transition-colors"
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  California Shipping
                </Link>
                <Link 
                  to="/open-transport" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:border-primary transition-colors"
                >
                  <Truck className="w-4 h-4 text-primary" />
                  Open Transport
                </Link>
                <Link 
                  to="/enclosed-transport" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg hover:border-primary transition-colors"
                >
                  <Shield className="w-4 h-4 text-primary" />
                  Enclosed Transport
                </Link>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Ship Your Car to or from Los Angeles Today
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Get your free LA car shipping quote in 30 minutes or less.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="text-lg px-8"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Get Your LA Quote
                  </Button>
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

export default LosAngelesShipping;
