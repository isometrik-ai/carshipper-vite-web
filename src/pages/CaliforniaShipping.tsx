import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { Shield, Clock, Truck, Star, CheckCircle, MapPin, Phone, Car, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CaliforniaShipping = () => {
  const shippingFromCA = [
    { from: "California", to: "Texas", distance: "1,200 miles", time: "4-6 days", cost: "$950" },
    { from: "California", to: "Florida", distance: "2,700 miles", time: "7-10 days", cost: "$1,350" },
    { from: "California", to: "New York", distance: "2,800 miles", time: "7-10 days", cost: "$1,400" },
    { from: "California", to: "Arizona", distance: "400 miles", time: "2-3 days", cost: "$575" },
    { from: "California", to: "Nevada", distance: "270 miles", time: "1-2 days", cost: "$495" },
    { from: "California", to: "Washington", distance: "950 miles", time: "4-5 days", cost: "$875" },
  ];

  const shippingToCA = [
    { from: "Texas", to: "California", distance: "1,200 miles", time: "4-6 days", cost: "$925" },
    { from: "Florida", to: "California", distance: "2,700 miles", time: "7-10 days", cost: "$1,325" },
    { from: "New York", to: "California", distance: "2,800 miles", time: "7-10 days", cost: "$1,375" },
    { from: "Illinois", to: "California", distance: "2,000 miles", time: "5-7 days", cost: "$1,150" },
    { from: "Georgia", to: "California", distance: "2,200 miles", time: "6-8 days", cost: "$1,225" },
    { from: "Ohio", to: "California", distance: "2,300 miles", time: "6-8 days", cost: "$1,275" },
  ];

  const popularCities = [
    { name: "Los Angeles", link: "/los-angeles-car-shipping" },
    { name: "San Francisco", link: "/san-francisco-car-shipping" },
    { name: "San Diego", link: "/san-diego-car-shipping" },
    { name: "Sacramento", link: "/sacramento-car-shipping" },
    { name: "San Jose", link: "/san-jose-car-shipping" },
    { name: "Fresno", link: "/fresno-car-shipping" },
    { name: "Oakland", link: "/oakland-car-shipping" },
    { name: "Long Beach", link: "/long-beach-car-shipping" },
  ];

  const faqs = [
    {
      q: "How much does it cost to ship a car from California?",
      a: "Car shipping from California typically costs between $495-$1,400 depending on destination. Short routes like CA to Nevada start around $495, while cross-country shipments to Florida or New York range from $1,300-$1,400."
    },
    {
      q: "How long does it take to ship a car from California?",
      a: "Delivery times vary by distance: 1-2 days for neighboring states (NV, AZ), 4-6 days for mid-range destinations (TX, WA), and 7-10 days for cross-country shipments (FL, NY)."
    },
    {
      q: "What's the cheapest way to ship a car in California?",
      a: "Open transport is the most affordable option, costing 30-40% less than enclosed transport. Flexible pickup dates and terminal-to-terminal shipping can also reduce costs."
    },
    {
      q: "Is my car insured during transport in California?",
      a: "Yes, all our carriers are fully licensed and insured with minimum $1M cargo insurance. We also offer additional coverage options for high-value vehicles."
    },
    {
      q: "Do you offer door-to-door service in California?",
      a: "Yes, we provide door-to-door pickup and delivery throughout California, including residential areas. If access is restricted, we'll arrange the nearest safe location."
    },
  ];

  return (
    <>
      <Helmet>
        <title>California Car Shipping Services | CA Auto Transport | CarShippers.ai</title>
        <meta 
          name="description" 
          content="Professional California car shipping services. Get instant quotes for auto transport to and from CA. Door-to-door service, fully insured carriers. Ship your car today!" 
        />
        <link rel="canonical" href="https://carshippers.ai/california-car-shipping" />
        <meta name="keywords" content="California car shipping, CA auto transport, ship car California, car transport Los Angeles, San Francisco auto shipping" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            "name": "CarShippers.ai - California Auto Transport",
            "description": "Professional car shipping services in California",
            "areaServed": {
              "@type": "State",
              "name": "California"
            },
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "CA",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "36.7783",
              "longitude": "-119.4179"
            },
            "url": "https://carshippers.ai/california-car-shipping",
            "telephone": "+1-888-555-1234",
            "priceRange": "$495-$1,400"
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
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">California Auto Transport</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    California Car Shipping <span className="text-primary">Services</span>
                  </h1>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    Safe, reliable auto transport to and from California. Whether you're relocating to the Golden State 
                    or shipping a car across the country, our expert team ensures your vehicle arrives safely.
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
                      <span className="text-sm">Door-to-Door</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-success" />
                      <span className="text-sm">A+ BBB Rated</span>
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
                  <div className="text-2xl font-bold text-primary">50,000+</div>
                  <div className="text-sm text-muted-foreground">Cars Shipped</div>
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
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How California Auto Transport Works
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Shipping your car to or from California is simple with our streamlined 3-step process.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { step: "1", title: "Get Your Quote", desc: "Enter your California pickup or delivery location and vehicle details for an instant estimate." },
                  { step: "2", title: "Schedule Pickup", desc: "Choose your preferred pickup date. Our carrier will coordinate directly with you." },
                  { step: "3", title: "Track & Receive", desc: "Monitor your shipment in real-time and receive your vehicle at your California destination." },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Shipping From CA Table */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Shipping Your Car FROM California - Cost & Delivery Estimates
                </h2>
                <p className="text-muted-foreground">
                  Popular routes and estimated costs for shipping from California.
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
                    {shippingFromCA.map((route, index) => (
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

          {/* Shipping To CA Table */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Shipping Your Car TO California - Cost & Delivery Estimates
                </h2>
                <p className="text-muted-foreground">
                  Popular routes and estimated costs for shipping to California.
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
                    {shippingToCA.map((route, index) => (
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

          {/* Popular California Cities */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Car Shipping to California Cities
                </h2>
                <p className="text-muted-foreground">
                  We provide auto transport services to all major cities in California.
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {popularCities.map((city) => (
                  <Link
                    key={city.name}
                    to={city.link}
                    className="flex items-center gap-2 p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all"
                  >
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium">{city.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Why Choose Us for California Car Shipping?
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    icon: Shield,
                    title: "Fully Insured Carriers",
                    desc: "Every carrier in our network carries $1M+ cargo insurance, protecting your vehicle from pickup to delivery."
                  },
                  {
                    icon: DollarSign,
                    title: "Competitive California Rates",
                    desc: "We work with 15,000+ carriers to find you the best rates for California auto transport."
                  },
                  {
                    icon: Clock,
                    title: "On-Time Delivery",
                    desc: "Our California shipping network ensures reliable pickup and delivery within your schedule."
                  },
                  {
                    icon: Car,
                    title: "All Vehicle Types",
                    desc: "From sedans to SUVs, motorcycles to classic cars, we ship all vehicle types across California."
                  },
                  {
                    icon: Truck,
                    title: "Open & Enclosed Options",
                    desc: "Choose between affordable open transport or premium enclosed shipping for high-value vehicles."
                  },
                  {
                    icon: Star,
                    title: "5-Star Customer Service",
                    desc: "Our dedicated California shipping specialists are available 24/7 to assist you."
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
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
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  California Car Shipping FAQs
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
                    className="bg-background rounded-lg p-6 border border-border"
                  >
                    <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </motion.div>
                ))}
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
                  Ready to Ship Your Car in California?
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Get your free, expert-verified quote in 30 minutes or less.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="text-lg px-8"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  >
                    Get Your California Quote
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

export default CaliforniaShipping;
