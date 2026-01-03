import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Info, ArrowRight } from "lucide-react";

const Pricing = () => {
  const pricingFactors = [
    { factor: "Distance", description: "Longer routes cost more, but per-mile rate decreases" },
    { factor: "Vehicle Size", description: "SUVs, trucks cost $50-200 more than sedans" },
    { factor: "Transport Type", description: "Enclosed transport costs $300-500 more" },
    { factor: "Season", description: "Summer and snowbird season (winter) cost 10-20% more" },
    { factor: "Pickup Speed", description: "Expedited (1-2 days) costs $100-300 more" },
    { factor: "Location", description: "Rural areas may cost $50-150 more" },
  ];

  const popularRoutes = [
    { from: "Los Angeles", to: "New York", distance: "2,790 mi", price: "$1,400-1,600", days: "7-10" },
    { from: "Los Angeles", to: "Chicago", distance: "2,015 mi", price: "$1,200-1,400", days: "6-8" },
    { from: "Los Angeles", to: "Miami", distance: "2,750 mi", price: "$1,500-1,700", days: "7-10" },
    { from: "New York", to: "Miami", distance: "1,280 mi", price: "$900-1,100", days: "4-6" },
    { from: "Houston", to: "Los Angeles", distance: "1,550 mi", price: "$1,000-1,200", days: "5-7" },
    { from: "Phoenix", to: "Chicago", distance: "1,750 mi", price: "$1,100-1,300", days: "5-7" },
    { from: "Seattle", to: "Denver", distance: "1,320 mi", price: "$950-1,150", days: "4-6" },
    { from: "Atlanta", to: "Dallas", distance: "780 mi", price: "$700-900", days: "3-4" },
  ];

  const serviceTypes = [
    {
      name: "Open Transport",
      price: "$800-1,400",
      description: "Most popular option. Your car is shipped on an open carrier with 7-10 other vehicles.",
      features: [
        "90% of customers choose this",
        "Best value for standard vehicles",
        "Safe and reliable",
        "Fully insured",
      ],
      recommended: true,
    },
    {
      name: "Enclosed Transport",
      price: "$1,500-2,500",
      description: "Premium protection. Your car is shipped in a fully enclosed trailer.",
      features: [
        "Maximum protection from elements",
        "Ideal for luxury & exotic cars",
        "Classic and collectible vehicles",
        "Lowered or modified cars",
      ],
      recommended: false,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Car Shipping Prices | Cost Calculator | CarShippers.ai</title>
        <meta
          name="description"
          content="Car shipping costs $800-2,500 depending on distance, vehicle size, and transport type. Get your exact price in 30 minutes. No hidden fees."
        />
        <link rel="canonical" href="https://carshippers.ai/pricing" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-20">
          {/* Hero */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Transparent <span className="text-primary">Pricing</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  No hidden fees. No surprises. Get your exact price in 30 minutes.
                </p>
                <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Price you see = Price you pay
                </div>
              </motion.div>
            </div>
          </section>

          {/* Service Types */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center mb-12"
              >
                Transport Options
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {serviceTypes.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative bg-card rounded-2xl border p-6 ${
                      service.recommended ? "border-primary shadow-lg" : "border-border"
                    }`}
                  >
                    {service.recommended && (
                      <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-3xl font-bold text-primary mb-4">{service.price}</p>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Popular Routes */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center mb-4"
              >
                Popular Route Pricing
              </motion.h2>
              <p className="text-center text-muted-foreground mb-12">
                Average prices for open transport. Get your exact quote in 30 minutes.
              </p>
              <div className="max-w-5xl mx-auto overflow-x-auto">
                <table className="w-full bg-card rounded-2xl border border-border overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-semibold">Route</th>
                      <th className="text-left p-4 font-semibold">Distance</th>
                      <th className="text-left p-4 font-semibold">Price Range</th>
                      <th className="text-left p-4 font-semibold">Transit Time</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {popularRoutes.map((route, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-t border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <span className="font-medium">{route.from}</span>
                          <span className="text-muted-foreground mx-2">→</span>
                          <span className="font-medium">{route.to}</span>
                        </td>
                        <td className="p-4 text-muted-foreground">{route.distance}</td>
                        <td className="p-4 font-semibold text-primary">{route.price}</td>
                        <td className="p-4 text-muted-foreground">{route.days} days</td>
                        <td className="p-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-primary"
                            onClick={() => window.location.href = "/#quote-form"}
                          >
                            Quote <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Pricing Factors */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-center mb-4"
                >
                  What Affects Your Price?
                </motion.h2>
                <p className="text-center text-muted-foreground mb-12">
                  Understanding the factors that determine your shipping cost.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {pricingFactors.map((item, index) => (
                    <motion.div
                      key={item.factor}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
                    >
                      <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">{item.factor}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold mb-8"
                >
                  Every Quote Includes
                </motion.h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Door-to-door service",
                    "Full insurance coverage",
                    "Real-time tracking",
                    "No hidden fees",
                    "Licensed carriers only",
                    "24/7 support",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center justify-center gap-2 bg-card p-4 rounded-xl border border-border"
                    >
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
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
                  Get Your Exact Price
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Expert-verified quote delivered in 30 minutes. No obligation.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => window.location.href = "/#quote-form"}
                >
                  Get Your Quote
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

export default Pricing;
