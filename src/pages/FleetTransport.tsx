import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { Car, Shield, Clock, CheckCircle, BarChart3, MapPin, Users, Phone, ArrowRight, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const FleetTransport = () => {
  const industries = [
    "Rental car companies",
    "Corporate fleets",
    "Leasing companies",
    "Government agencies",
    "Ride-share services",
    "Utility companies",
    "Construction firms",
    "Healthcare organizations"
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Volume Capacity",
      description: "Handle single vehicles or hundreds at once with our scalable logistics network"
    },
    {
      icon: MapPin,
      title: "Nationwide Coverage",
      description: "Service to all 48 continental states with strategic pickup and delivery routes"
    },
    {
      icon: Clock,
      title: "Inventory Tracking",
      description: "Real-time GPS tracking and status updates for every vehicle in transit"
    },
    {
      icon: Shield,
      title: "Damage-Free Guarantee",
      description: "Comprehensive insurance and professional handling for your fleet assets"
    },
    {
      icon: Users,
      title: "Dedicated Account Manager",
      description: "Single point of contact for all your fleet transportation needs"
    },
    {
      icon: Building2,
      title: "Flexible Scheduling",
      description: "Work around your business operations with adaptable pickup times"
    }
  ];

  const solutions = [
    {
      title: "Fleet Rotation",
      description: "Keep your fleet fresh by efficiently moving vehicles between locations as leases end or inventory needs change.",
      items: ["Lease-end vehicle returns", "Location rebalancing", "Seasonal fleet adjustments"]
    },
    {
      title: "Multi-Location Logistics",
      description: "Coordinate vehicle movements across multiple facilities with centralized management and tracking.",
      items: ["Hub-to-hub transport", "Cross-country relocations", "Regional distribution"]
    },
    {
      title: "New Vehicle Delivery",
      description: "Get new fleet additions from manufacturers or dealers to your locations quickly and safely.",
      items: ["Dealer-to-facility transport", "Factory pickup services", "Bulk vehicle deliveries"]
    }
  ];

  const stats = [
    { value: "50,000+", label: "Fleet Vehicles Transported Annually" },
    { value: "48", label: "States Covered" },
    { value: "99.8%", label: "On-Time Delivery Rate" },
    { value: "24/7", label: "Support & Tracking" }
  ];

  return (
    <>
      <Helmet>
        <title>Fleet Transport & Corporate Vehicle Shipping | Volume Car Shipping</title>
        <meta name="description" content="Professional fleet transport services for rental companies, corporate fleets, and leasing organizations. Volume discounts, nationwide coverage, and dedicated account management." />
        <meta name="keywords" content="fleet transport, corporate vehicle shipping, fleet car shipping, volume auto transport, rental car transport, fleet management logistics" />
        <link rel="canonical" href="/fleet-transport" />
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
                  <Car className="w-4 h-4" />
                  Commercial Fleet Solutions
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Fleet <span className="text-primary">Transport Services</span>
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                  Keep your fleet running at full speed. Partner with us for reliable, scalable vehicle 
                  transport that meets your business volume and scheduling needs.
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

        {/* Industries - Moved from hero */}
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
                <h3 className="text-2xl font-semibold mb-6 text-center">Industries We Serve</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {industries.map((industry) => (
                    <div key={industry} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{industry}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Fleet Managers Choose Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We understand the unique challenges of fleet logistics and provide solutions that keep your operations running smoothly.
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

        {/* Solutions Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Fleet Transport Solutions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tailored services for every fleet management need.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-8 shadow-lg border"
                >
                  <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                  <p className="text-muted-foreground mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Streamline Your Fleet Logistics?
              </h2>
              <p className="text-primary-foreground/90 mb-8 text-lg">
                Join hundreds of fleet managers who trust us with their vehicle transport needs. 
                Get volume discounts and dedicated support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="gap-2">
                  Request Fleet Consultation <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 gap-2">
                  <Phone className="w-4 h-4" /> Speak to Fleet Specialist
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default FleetTransport;
