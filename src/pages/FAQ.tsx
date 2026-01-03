import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Pricing & Payment",
      faqs: [
        {
          question: "How much does it cost to ship a car?",
          answer: "Car shipping typically costs $800-2,500 depending on distance, vehicle size, and transport type. Short routes (under 500 miles) start at $400-700. Cross-country routes (2,500+ miles) range from $1,200-1,800. Get your exact price with our 30-minute quote.",
        },
        {
          question: "Are there any hidden fees?",
          answer: "No. The price in your quote is the price you pay. We include all costs upfront: transport, insurance, and door-to-door service. No surprises, no hidden charges.",
        },
        {
          question: "When do I pay?",
          answer: "You pay on delivery. No deposit required. Once your car arrives safely, you pay the driver directly via cash, credit card, Zelle, or Venmo.",
        },
        {
          question: "Do you offer price matching?",
          answer: "We provide competitive, market-rate pricing verified by our experts. If you receive a significantly lower quote elsewhere, let us know—but be wary of quotes that seem too good to be true, as they often increase later.",
        },
      ],
    },
    {
      title: "Booking & Quotes",
      faqs: [
        {
          question: "Why does your quote take 30 minutes instead of being instant?",
          answer: "Our shipping experts use AI tools to verify actual carrier availability, check current market rates, and ensure your quote is accurate—not a generic estimate. The extra 29 minutes and 30 seconds? Worth it for a quote you can trust.",
        },
        {
          question: "How do I book my shipment?",
          answer: "After receiving your quote via email/text, click 'Book Now' to complete your booking online in 2 minutes. No deposit required. You'll receive confirmation immediately.",
        },
        {
          question: "Can I cancel my booking?",
          answer: "Yes, you can cancel anytime before a carrier is dispatched at no cost. Once a carrier is assigned and en route to pickup, a cancellation fee may apply.",
        },
        {
          question: "How far in advance should I book?",
          answer: "We recommend booking 1-2 weeks in advance for the best carrier selection and pricing. Rush bookings (24-48 hours) are available but may cost more.",
        },
      ],
    },
    {
      title: "Pickup & Delivery",
      faqs: [
        {
          question: "How long does shipping take?",
          answer: "Transit time depends on distance: 500 miles = 2-3 days, 1,000 miles = 3-5 days, 2,500+ miles = 7-10 days. Add 1-3 days for carrier pickup scheduling.",
        },
        {
          question: "Is it door-to-door service?",
          answer: "Yes, our standard service is door-to-door. The carrier picks up from your location and delivers directly to your destination. If a large truck can't access your street, we'll arrange the nearest safe location.",
        },
        {
          question: "Do I need to be present for pickup/delivery?",
          answer: "Someone 18+ must be present to sign paperwork and inspect the vehicle at both pickup and delivery. This can be you or an authorized representative.",
        },
        {
          question: "What happens if I'm not available at the scheduled time?",
          answer: "Communicate with your driver directly to reschedule within a reasonable window. Extended delays may result in additional fees.",
        },
      ],
    },
    {
      title: "Vehicle Preparation",
      faqs: [
        {
          question: "How should I prepare my car for shipping?",
          answer: "Remove personal items (up to 100 lbs allowed in trunk), wash your car so we can document condition, ensure 1/4 tank of gas, disable alarms, and secure loose parts. Remove or fold mirrors if possible.",
        },
        {
          question: "Can I ship personal items in my car?",
          answer: "Yes, up to 100 lbs of personal items in the trunk/cargo area, below window line. Items are not insured by the carrier—don't ship valuables. Additional items may affect pricing.",
        },
        {
          question: "Does my car need to run?",
          answer: "Running vehicles are preferred and cheaper to ship. Non-running vehicles can be shipped with a winch-equipped carrier at an additional $100-200.",
        },
        {
          question: "Can you ship modified or lowered vehicles?",
          answer: "Yes! Let us know about modifications when requesting your quote. Lowered vehicles may need special ramps (+$100-200) or enclosed transport.",
        },
      ],
    },
    {
      title: "Insurance & Safety",
      faqs: [
        {
          question: "Is my car insured during transport?",
          answer: "Yes, all carriers in our network carry $1M+ cargo insurance. Your vehicle is fully covered from pickup to delivery. We provide insurance documentation before pickup.",
        },
        {
          question: "What if my car is damaged during shipping?",
          answer: "Damage is rare (<1% of shipments), but if it occurs: document with photos, note on the Bill of Lading at delivery, and contact us immediately. The carrier's insurance covers repairs.",
        },
        {
          question: "Are your carriers licensed?",
          answer: "Yes, we only work with carriers who are FMCSA licensed, DOT registered, and carry proper insurance. We verify credentials before any assignment.",
        },
        {
          question: "How do I track my shipment?",
          answer: "You'll receive real-time GPS tracking via text and email. Plus, you'll have direct contact with your driver throughout the journey.",
        },
      ],
    },
    {
      title: "Open Transport",
      faqs: [
        {
          question: "What is open transport?",
          answer: "Open transport is the most common and affordable car shipping method. Your vehicle is secured on an open trailer alongside 5-10 other vehicles, exposed to weather but fully insured.",
        },
        {
          question: "Is open transport safe for my car?",
          answer: "Yes! Open transport is safe for 95% of vehicles. Damage is rare, and all shipments are fully insured. New cars are regularly delivered this way from factories.",
        },
        {
          question: "How many vehicles fit on an open carrier?",
          answer: "Open carriers typically hold 8-10 vehicles. Sometimes these are multi-car shipments from one customer, other times they service multiple customers on the same route.",
        },
        {
          question: "What are the risks of open transport?",
          answer: "The risks are minimal. While your car is exposed to elements and road debris, actual damage is very rare. Comprehensive cargo insurance covers any incidents.",
        },
      ],
    },
    {
      title: "Enclosed Transport",
      faqs: [
        {
          question: "When should I choose enclosed transport?",
          answer: "Enclosed transport is recommended for exotic, luxury, classic, or high-value vehicles. If a minor ding could cost hundreds to repair, enclosed provides peace of mind.",
        },
        {
          question: "How much more does enclosed transport cost?",
          answer: "Enclosed transport typically costs 40-60% more than open transport due to lower carrier capacity (2-4 vehicles vs 8-10) and specialized handling.",
        },
        {
          question: "What's the difference between open and enclosed?",
          answer: "Enclosed trailers provide complete protection from weather, road debris, and visibility. They hold fewer vehicles and drivers are specially trained for high-value cargo.",
        },
        {
          question: "Can I ship multiple cars enclosed?",
          answer: "Yes! Enclosed trailers come in 1, 2, 3, and 4-car configurations. This is ideal for collections or dealers shipping multiple high-end vehicles.",
        },
      ],
    },
    {
      title: "Flatbed Transport",
      faqs: [
        {
          question: "When do I need a flatbed carrier?",
          answer: "Flatbed transport is required for vehicles too tall, heavy, or modified for standard carriers—lifted trucks, oversized vehicles, inoperable cars without rolling capability.",
        },
        {
          question: "How much does flatbed transport cost?",
          answer: "Flatbed transport costs 30-50% more than open transport due to limited availability and specialized equipment. Prices vary by vehicle dimensions and weight.",
        },
        {
          question: "What vehicles need flatbed shipping?",
          answer: "Lifted trucks, F-350 Dually pickups, Sprinter vans, small RVs, heavy construction equipment, vehicles with low ground clearance, or inoperable vehicles.",
        },
        {
          question: "How long does flatbed scheduling take?",
          answer: "Due to lower availability, expect 7-14 days for pickup scheduling. Transit times are similar to other methods once pickup is scheduled.",
        },
      ],
    },
    {
      title: "Heavy Hauling",
      faqs: [
        {
          question: "What equipment do you transport?",
          answer: "We transport excavators, bulldozers, cranes, forklifts, agricultural equipment, industrial machinery, generators, and any oversized or overweight vehicles.",
        },
        {
          question: "Do you handle permits for oversized loads?",
          answer: "Yes, we manage all oversize/overweight permits and regulatory compliance. Our team handles route planning considering weight limits and bridge clearances.",
        },
        {
          question: "What trailer types are available for heavy haul?",
          answer: "We offer lowboy, step deck, RGN (Removable Gooseneck), and flatbed trailers depending on your equipment's dimensions, weight, and loading requirements.",
        },
        {
          question: "Do you provide pilot car services?",
          answer: "Yes, escort/pilot vehicles are included for oversized loads as required by regulations. This ensures safe transport through traffic and around obstacles.",
        },
      ],
    },
    {
      title: "Fleet & Dealership Transport",
      faqs: [
        {
          question: "Do you offer volume discounts for fleet transport?",
          answer: "Yes! We provide competitive volume pricing for fleet customers. The more vehicles you ship, the better per-unit rate you receive.",
        },
        {
          question: "Can you handle multi-location fleet moves?",
          answer: "Absolutely. We coordinate pickups and deliveries across multiple facilities with centralized tracking and a dedicated account manager.",
        },
        {
          question: "How fast can you pick up from auto auctions?",
          answer: "We understand auction storage fees add up fast. We prioritize quick pickup scheduling to get your vehicles moving before additional fees accumulate.",
        },
        {
          question: "Do you work with dealerships?",
          answer: "Yes! We're a preferred transport partner for dealerships nationwide. We handle dealer-to-dealer, auction pickups, and direct-to-customer deliveries.",
        },
      ],
    },
    {
      title: "Business & OEM Services",
      faqs: [
        {
          question: "Do you handle rental car fleet logistics?",
          answer: "Yes, we work with Enterprise, Avis, Hertz, and other rental companies. Our team has 15+ years of rental industry experience and understands your velocity needs.",
        },
        {
          question: "What OEM transport services do you offer?",
          answer: "We provide finished vehicle logistics including factory-to-dealer, marshalling yards, railheads, and port pickups. Special insurance policies for manufacturers included.",
        },
        {
          question: "Can you handle EV transport for manufacturers?",
          answer: "Yes, we work with high-profile EV manufacturers and can accommodate the special weight, dimensions, and handling requirements of electric vehicles.",
        },
        {
          question: "What reporting do you provide for business accounts?",
          answer: "Business accounts receive custom progress reports, VIN tracking, daily communication, and real-time status updates for all vehicles in transit.",
        },
      ],
    },
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.faqs.length > 0);

  return (
    <>
      <Helmet>
        <title>Car Shipping FAQ | Common Questions Answered | CarShippers.ai</title>
        <meta
          name="description"
          content="Get answers to common car shipping questions: pricing, timelines, insurance, open transport, enclosed transport, heavy hauling, and more. Expert answers from CarShippers.ai."
        />
        <link rel="canonical" href="https://carshippers.ai/faq" />
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
                  Frequently Asked <span className="text-primary">Questions</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Everything you need to know about shipping your car.
                </p>
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search questions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-lg"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* FAQ Categories */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                {filteredCategories.map((category, categoryIndex) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                    className="mb-12"
                  >
                    <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`${category.title}-${index}`}
                          className="bg-card border border-border rounded-xl px-6"
                        >
                          <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                ))}

                {filteredCategories.length === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      No questions found matching "{searchQuery}"
                    </p>
                    <Button variant="outline" onClick={() => setSearchQuery("")}>
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Still Have Questions */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Still Have Questions?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Our shipping experts are available 24/7 to answer any questions.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="hero" size="lg" onClick={() => window.location.href = "/contact"}>
                    Contact Us
                  </Button>
                  <a 
                    href="tel:+18885551234" 
                    className="text-primary hover:underline font-medium"
                  >
                    Or call (888) 555-1234
                  </a>
                </div>
              </motion.div>
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
                  Ready to Ship Your Car?
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Get your expert-verified quote in 30 minutes or less.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => window.location.href = "/quote"}
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

export default FAQ;