import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Eye, 
  Award,
  CheckCircle,
  ArrowRight,
  Star,
  Car,
  BadgeCheck,
  Locate
} from "lucide-react";

const EnclosedTransport = () => {
  const features = [
    {
      icon: Shield,
      title: "Fully Protected",
      description: "Our enclosed car transporter service guarantees that your vehicle is fully protected from any damaging elements, and handled with maximum care. Fully insured from point A to point B.",
    },
    {
      icon: Award,
      title: "Qualified Drivers",
      description: "For our enclosed car transporter services, we hand-picked only the best and most qualified professional drivers. Not only do they have extensive professional experience, but our drivers are specifically trained to handle exclusive cars.",
    },
    {
      icon: BadgeCheck,
      title: "Proof of Qualification",
      description: "All drivers come with certificates and proof of qualification. Your precious treasure will arrive in the same immaculate condition as it was shipped.",
    },
    {
      icon: Locate,
      title: "Accurate Load Tracking",
      description: "We offer 24/7 accurate vehicle tracking through our website. Simply enter your order number or name and email address to find up-to-date information about your car's location.",
    },
  ];

  const vehicleTypes = [
    "Exotic & Luxury Cars",
    "Classic & Antique Vehicles",
    "Custom & Modified Cars",
    "Racing Vehicles",
    "High-End Sports Cars",
    "Collectible Automobiles",
  ];

  const comparisonData = {
    enclosed: [
      "Full protection from elements",
      "Reduces risk of exterior damage",
      "Security against theft",
      "Premium handling & care",
      "2-3 vehicles per carrier",
    ],
    open: [
      "No protection from debris",
      "Exposed to weather",
      "Less security",
      "Standard handling",
      "8-10 vehicles per carrier",
    ],
  };

  const trailerTypes = [
    {
      type: "Single Car Trailer",
      capacity: "1 Car",
      description: "Perfect for individual high-value vehicle transport",
    },
    {
      type: "Two Car Trailer",
      capacity: "2 Cars or 2 SUVs",
      description: "Great for couples or small collections",
    },
    {
      type: "Three Car Trailer",
      capacity: "Multiple Cars",
      description: "Ideal for small fleet transport",
    },
    {
      type: "Four Car Trailer",
      capacity: "1 Car + 3 SUVs",
      description: "Maximum capacity enclosed option",
    },
  ];

  const faqs = [
    {
      question: "What is the difference between open transport and enclosed shipping?",
      answer: "Open car transport and enclosed transport differ based on the types of haulers and trailers used, as well as the levels of protection each provides. Open car shipping is ideal for 95% of vehicles, but it does expose them to potential road hazards. Enclosed car transport costs more than open, but it provides premium protection from hazards and the elements.",
    },
    {
      question: "When should you ship a car in an enclosed trailer?",
      answer: "Enclosed transport is recommended for exotic, classic, custom, or high-end vehicles. If your vehicle is exceptionally fragile, and a minor dent or ding could end up costing hundreds if not thousands of dollars, enclosed is the right choice.",
    },
    {
      question: "Does enclosed car transport cost more?",
      answer: "Yes, enclosed transport typically costs more than open transport due to lower carrier capacity and premium handling. However, the advantages far surpass the cost for valuable vehicles. If you consider both the amount of money invested and the time and effort put into a classic or custom vehicle, enclosed transport is a sound investment.",
    },
    {
      question: "Can you ship multiple cars via enclosed shipping?",
      answer: "Yes! Enclosed trailers come in single, two, three, and four-car configurations. This allows you to transport multiple vehicles while maintaining the premium protection of enclosed shipping.",
    },
  ];

  const testimonials = [
    {
      text: "Nexus responded quickly to my request and even though I gave them less than a week's notice, they were able to schedule my auto transport. Communication was open and the process was smooth.",
      title: "Quick Response, Smooth Process",
    },
    {
      text: "The communication was excellent, they made sure the vehicles were delivered quickly and they also coordinated with the pick up location. Driver was friendly and put vehicles right where we wanted them.",
      title: "Excellent, Friendly Service",
    },
    {
      text: "Process was very smooth, even with a small hiccup with the driver. The driver worked with the whole process. Professional and amazing price!",
      title: "Professional, Amazing Price",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Enclosed Auto Transport | Premium Car Shipping | CarShippers.ai</title>
        <meta
          name="description"
          content="Enclosed auto carrier provides ultimate protection for your exotic, classic, or luxury vehicle. Fully insured premium car shipping with qualified drivers."
        />
        <link rel="canonical" href="https://carshippers.ai/enclosed-transport" />
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
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Enclosed <span className="text-primary">Auto Transport</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-6">
                    Are you shipping an antique car which needs special care? Are you worried about potential damages to your classic or muscle car? An enclosed auto carrier is the car transport service for you!
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Premium Protection</span>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm font-medium">Secure & Private</span>
                    </div>
                    <div className="flex items-center gap-2 bg-warning/10 text-warning-foreground px-4 py-2 rounded-full">
                      <Star className="w-4 h-4" />
                      <span className="text-sm font-medium">A+ Service</span>
                    </div>
                  </div>

                  {/* Quick Points - Below left text */}
                  <div className="bg-card/50 backdrop-blur rounded-xl p-4 border">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        <span>Complete weather protection</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        <span>Shield from road debris</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        <span>Privacy & security</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-success flex-shrink-0" />
                        <span>Expert handling</span>
                      </div>
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

          {/* What is Enclosed Transport - Moved from hero */}
          <section className="py-16 md:py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl p-8 border border-border shadow-lg"
                >
                  <h2 className="text-2xl font-bold mb-4">What is Enclosed Auto Transport?</h2>
                  <p className="text-muted-foreground mb-4">
                    Enclosed car carriers are the right choice if you want the safety of your vehicle guaranteed. Although it often requires a bit more of an investment, enclosed automobile carriers provide the ultimate protection for your precious cargo.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Completely enclosed, your vehicle will be safe from the elements and environmental hazards such as flying rocks or debris.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Complete weather protection</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Shield from road debris & hazards</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Privacy & security from theft</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                      <span>Specialized handling by experts</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Ideal For Section */}
          <section className="py-16 md:py-24 bg-primary">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Ideal For Special Vehicles
                </h2>
                <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                  Enclosed transport is recommended for vehicles where protection is paramount
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                {vehicleTypes.map((type, index) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4 text-center"
                  >
                    <Car className="w-6 h-6 text-primary-foreground mx-auto mb-2" />
                    <span className="text-primary-foreground font-medium">{type}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Enclosed Car Hauler Services</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We understand that your unique automobile is your treasure
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Comparison Section */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Enclosed vs. Open Transport</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Understanding the differences to make the right choice
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card p-6 rounded-2xl border-2 border-primary shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                      <Lock className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Enclosed Transport</h3>
                  </div>
                  <ul className="space-y-3">
                    {comparisonData.enclosed.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card p-6 rounded-2xl border border-border"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold">Open Transport</h3>
                  </div>
                  <ul className="space-y-3">
                    {comparisonData.open.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center mt-0.5 flex-shrink-0 text-xs">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Trailer Types */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Trailer Options</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Select the perfect trailer for your hauling needs
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trailerTypes.map((trailer, index) => (
                  <motion.div
                    key={trailer.type}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border text-center"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Car className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{trailer.type}</h3>
                    <div className="text-primary font-bold mb-2">{trailer.capacity}</div>
                    <p className="text-sm text-muted-foreground">{trailer.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">A Trusted Car Shipping Company</h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{testimonial.title}</h3>
                    <p className="text-muted-foreground text-sm">{testimonial.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center gap-8 mt-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">4.3★</div>
                  <div className="text-sm text-muted-foreground">5,157 Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">4.6★</div>
                  <div className="text-sm text-muted-foreground">1,973 Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground mb-1">A+</div>
                  <div className="text-sm text-muted-foreground">BBB Rated</div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              </motion.div>

              <div className="max-w-3xl mx-auto space-y-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-xl border border-border"
                  >
                    <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                ))}
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
                  How much will my enclosed auto shipping cost?
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Get affordable prices for enclosed auto shipping from our moving experts.
                </p>
                <Button
                  variant="secondary"
                  size="xl"
                  onClick={() => window.location.href = "/#quote-form"}
                >
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5" />
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

export default EnclosedTransport;