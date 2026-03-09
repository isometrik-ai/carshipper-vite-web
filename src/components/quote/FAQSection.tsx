import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/animations/AnimationWrappers";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "When do I pay?",
    answer:
      "No payment now. You only pay after your car is picked up and en route to delivery. We accept all major credit cards, debit cards, and cash on delivery.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Transit time depends on distance. Cross-country routes (coast-to-coast) typically take 7-10 days. Regional routes (under 500 miles) usually take 2-4 days. Pickup typically occurs within 1-5 days of your earliest available date.",
  },
  {
    question: "Can I track my car?",
    answer:
      "Yes! You'll receive real-time GPS tracking updates via text and email. Track your vehicle's location and estimated arrival time through our online portal.",
  },
  {
    question: "Is my car insured during transport?",
    answer:
      "Absolutely. Every carrier in our network carries $100,000 to $1,000,000 in cargo insurance. Your vehicle is fully protected from pickup to delivery.",
  },
  {
    question: "What if I need to cancel or reschedule?",
    answer:
      "No problem! You can cancel or reschedule anytime before a carrier is assigned at no charge. After carrier assignment, we'll work with you to find the best solution.",
  },
  {
    question: "Can I put personal items in my car?",
    answer:
      "Yes, you can include up to 100 lbs of personal items in your trunk. Items should be under the window line and secured. Note: personal items aren't covered by carrier insurance.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about shipping your car
              </p>
            </div>
          </FadeIn>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-card rounded-xl border border-border px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          {/* More Questions CTA */}
          <FadeIn delay={0.5}>
            <div className="text-center mt-10">
              <a
                href="/faq"
                className="text-primary font-semibold hover:underline"
              >
                View All FAQs →
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
