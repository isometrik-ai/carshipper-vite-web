import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { Shield, Clock, Truck, Star, Phone, CheckCircle, DollarSign, Car, Calculator, TrendingUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Quote = () => {
  const benefits = [
    "Expert-verified quotes in 30 minutes",
    "No hidden fees or surprise charges",
    "Door-to-door service included",
    "$1M+ cargo insurance coverage",
    "Pay on delivery - no deposit required",
    "24/7 customer support"
  ];

  const stats = [
    { value: "50,000+", label: "Cars Shipped" },
    { value: "4.8★", label: "Average Rating" },
    { value: "30 min", label: "Quote Delivery" },
    { value: "A+", label: "BBB Rating" }
  ];

  const costByDistance = [
    { distance: "Less than 500 miles", openCost: "$450-$650", enclosedCost: "$700-$950" },
    { distance: "500-1,000 miles", openCost: "$600-$850", enclosedCost: "$900-$1,200" },
    { distance: "1,000-1,500 miles", openCost: "$750-$1,000", enclosedCost: "$1,100-$1,400" },
    { distance: "1,500-2,000 miles", openCost: "$900-$1,150", enclosedCost: "$1,300-$1,600" },
    { distance: "Over 2,000 miles", openCost: "$1,050-$1,400", enclosedCost: "$1,500-$1,900" },
  ];

  const costByVehicle = [
    { type: "Sedan/Coupe", short: "$425-$550", medium: "$725-$900", long: "$925-$1,150" },
    { type: "Compact SUV", short: "$455-$600", medium: "$775-$950", long: "$1,025-$1,250" },
    { type: "Full-Size SUV", short: "$505-$675", medium: "$825-$1,050", long: "$1,075-$1,350" },
    { type: "Pickup Truck", short: "$575-$750", medium: "$925-$1,150", long: "$1,275-$1,500" },
    { type: "Motorcycle", short: "$275-$400", medium: "$400-$550", long: "$550-$750" },
  ];

  const costFactors = [
    {
      icon: MapPin,
      title: "Distance",
      desc: "Longer routes cost more but have a lower per-mile rate. Coast-to-coast shipping is often more economical per mile than short hauls."
    },
    {
      icon: Car,
      title: "Vehicle Size & Type",
      desc: "Larger vehicles take up more carrier space and weight. SUVs and trucks cost 15-25% more than sedans."
    },
    {
      icon: Truck,
      title: "Carrier Type",
      desc: "Open transport is 30-40% cheaper than enclosed. Enclosed is recommended for luxury, classic, or exotic vehicles."
    },
    {
      icon: TrendingUp,
      title: "Seasonal Demand",
      desc: "Summer months and snowbird season (Jan-Mar) see higher demand and prices. Fall offers the best rates."
    },
    {
      icon: Clock,
      title: "Delivery Speed",
      desc: "Expedited shipping costs 15-30% more. Flexible pickup dates can save you money."
    },
    {
      icon: MapPin,
      title: "Location Accessibility",
      desc: "Rural areas or difficult access locations may incur additional fees. Major metro areas have the best rates."
    },
  ];

  return (
    <>
      <Helmet>
        <title>Car Shipping Cost Calculator | Auto Transport Quotes 2025 | CarShippers.ai</title>
        <meta name="description" content="Calculate your car shipping cost instantly. Get accurate auto transport quotes based on distance, vehicle type, and carrier. Average cost: $0.40-$2.00 per mile." />
        <link rel="canonical" href="https://carshippers.ai/quote" />
        <meta name="keywords" content="car shipping cost calculator, auto transport quote, vehicle shipping cost, car transport price, shipping car cost" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                    <Calculator className="w-4 h-4" />
                    <span className="text-sm font-medium">Car Shipping Cost Calculator</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Calculate Your <span className="text-primary">Shipping Cost</span>
                  </h1>
                  
                  <p className="text-lg text-muted-foreground mb-6">
                    Get an accurate car shipping quote in 30 minutes. Our experts verify every quote with 
                    real-time carrier availability and current market rates. Average cost: <strong>$0.40-$2.00 per mile</strong>.
                  </p>

                  {/* Benefits */}
                  <div className="space-y-3 mb-8">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Fully Insured</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">30-Min Quotes</span>
                    </div>
                    <div className="flex items-center gap-2 bg-warning/10 text-warning-foreground px-4 py-2 rounded-full">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">A+ BBB Rated</span>
                    </div>
                  </div>
                </motion.div>

                {/* Quote Form */}
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

          {/* Stats Section */}
          <section className="py-12 bg-muted/30">
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

          {/* How Much Does It Cost */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  How Much Does It Cost to Ship a Car?
                </h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  The average car shipping cost is around <strong>$650-$1,200</strong> depending on distance. 
                  Expect to pay between <strong>$0.40 to $2.00 per mile</strong> based on route, vehicle size, carrier type, and season.
                </p>
              </motion.div>

              {/* Cost by Distance Table */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4">Average Cost by Distance</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-background rounded-lg overflow-hidden shadow-sm border border-border">
                    <thead className="bg-primary text-primary-foreground">
                      <tr>
                        <th className="px-4 py-3 text-left">Route Distance</th>
                        <th className="px-4 py-3 text-left">Open Carrier</th>
                        <th className="px-4 py-3 text-left">Enclosed Carrier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costByDistance.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                          <td className="px-4 py-3 font-medium">{row.distance}</td>
                          <td className="px-4 py-3 text-primary">{row.openCost}</td>
                          <td className="px-4 py-3 text-primary">{row.enclosedCost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Cost by Vehicle Table */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Average Cost by Vehicle Type</h3>
                <div className="overflow-x-auto">
                  <table className="w-full bg-background rounded-lg overflow-hidden shadow-sm border border-border">
                    <thead className="bg-primary text-primary-foreground">
                      <tr>
                        <th className="px-4 py-3 text-left">Vehicle Type</th>
                        <th className="px-4 py-3 text-left">&lt;500 miles</th>
                        <th className="px-4 py-3 text-left">500-2,500 miles</th>
                        <th className="px-4 py-3 text-left">&gt;2,500 miles</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costByVehicle.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                          <td className="px-4 py-3 font-medium">{row.type}</td>
                          <td className="px-4 py-3 text-primary">{row.short}</td>
                          <td className="px-4 py-3 text-primary">{row.medium}</td>
                          <td className="px-4 py-3 text-primary">{row.long}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Cost Factors */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  6 Factors That Impact Car Shipping Cost
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Understanding these factors helps you get the best rate for your shipment.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {costFactors.map((factor, index) => (
                  <motion.div
                    key={factor.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background p-6 rounded-xl border border-border"
                  >
                    <factor.icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-semibold text-lg mb-2">{factor.title}</h3>
                    <p className="text-sm text-muted-foreground">{factor.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  How Our Quote Process Works
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Enter Your Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide pickup/delivery locations, vehicle info, and preferred dates. Takes about 2 minutes.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Expert Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team verifies real-time carrier availability and calculates accurate pricing.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Receive Your Quote</h3>
                  <p className="text-sm text-muted-foreground">
                    Get your verified quote via email and text within 30 minutes. Book instantly online.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Call CTA */}
          <section className="py-12 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                  Prefer to Talk to Someone?
                </h2>
                <p className="text-primary-foreground/80 mb-4">
                  Our shipping advisors are available 24/7 to help you get the best rate.
                </p>
                <a 
                  href="tel:+18885551234" 
                  className="inline-flex items-center gap-2 text-xl font-bold text-primary-foreground hover:underline"
                >
                  <Phone className="w-6 h-6" />
                  (888) 555-1234
                </a>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Quote;