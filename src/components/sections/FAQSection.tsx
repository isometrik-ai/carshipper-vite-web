import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MessageCircle } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How much does it cost to ship a car?",
      answer: `Car shipping costs vary based on distance, vehicle type, and transport method. Average prices:
      
• **Short distance (< 500 miles):** $400-$800
• **Medium distance (500-1,500 miles):** $800-$1,200
• **Cross-country (1,500+ miles):** $1,200-$1,800

Get your expert-verified quote in 30 minutes—accurate pricing, no guessing.`,
    },
    {
      question: "How long does car shipping take?",
      answer: `Typical timelines:

• **Pickup:** 1-3 days after booking
• **Transit (< 500 miles):** 1-3 days
• **Transit (500-1,500 miles):** 3-5 days
• **Transit (1,500+ miles):** 5-10 days

Need it faster? Ask about expedited shipping when you get your quote.`,
    },
    {
      question: "Is my car insured during transport?",
      answer: `Yes! Every carrier in our network carries:

• **Cargo insurance:** $100,000-$1,000,000 per vehicle
• **Liability insurance:** $750,000-$1,000,000
• **Contingent coverage:** We provide backup insurance

Your car is protected from pickup to delivery. We verify every carrier's insurance before they haul your vehicle.`,
    },
    {
      question: "What's the difference between open and enclosed transport?",
      answer: `**Open Transport (90% of customers)**
• Car exposed to weather
• Most affordable option
• Same carriers dealerships use
• Perfect for everyday vehicles
• Cost: $800-1,500 (cross-country)

**Enclosed Transport (10% of customers)**
• Car fully protected inside trailer
• Premium service
• Best for luxury/exotic/classic cars
• Weather & road debris protection
• Cost: $1,500-2,500 (cross-country)`,
    },
    {
      question: "Can I ship personal items in my car?",
      answer: `You can ship up to 100 lbs of personal items in the trunk/cargo area.

**Important Rules:**
• Items must be below window line (not visible)
• Nothing valuable (not covered by insurance)
• No hazardous materials
• Driver may refuse overweight/visible items

**Pro tip:** Ship a few boxes, not your entire apartment. For big moves, use a moving company.`,
    },
    {
      question: "Do I need to be present for pickup and delivery?",
      answer: `Yes, you (or someone you designate) must be present for:

• **Pickup:** Give keys, sign Bill of Lading (BOL), inspect car with driver
• **Delivery:** Receive keys, sign BOL, inspect car for damage

Can't be there? You can designate a friend, family member, or neighbor to handle it for you.`,
    },
    {
      question: "When do I pay?",
      answer: `**For consumers:**
• No deposit required (book for free)
• Pay when your car is delivered
• Accept cash, Zelle, Venmo, credit card

**For dealerships:**
• NET 30 payment terms (ship now, pay end of month)
• Volume discounts (10-25% off)
• Monthly invoicing`,
    },
    {
      question: "What if my car gets damaged during shipping?",
      answer: `Damage is rare (< 1% of shipments), but if it happens:

1. **Note damage on delivery BOL** - Don't sign as "clean" if you see new damage
2. **Take photos** - Document damage immediately
3. **Contact us within 24 hours** - We help you file claim
4. **Carrier's insurance pays** - Usually within 30 days
5. **Our backup coverage** - If carrier denies, we cover it

**Our guarantee:** We make it right. You won't be left dealing with insurance companies alone.`,
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about shipping your car
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/50 px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary py-6 text-base md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* More Questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12 bg-muted rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-6">
            Talk to a shipping expert. We're here 24/7.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg">
              <Phone className="w-4 h-4" />
              Call (888) 555-1234
            </Button>
            <Button variant="outline" size="lg">
              <MessageCircle className="w-4 h-4" />
              Live Chat
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
