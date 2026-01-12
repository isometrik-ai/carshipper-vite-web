import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MessageCircle } from "lucide-react";

import { FAQSectionProps } from "@/types/landing-page.types";

const FAQSection = ({ data }: FAQSectionProps) => {
  // Guard clause to prevent errors if data hasn't loaded yet
  if (!data) return null;

  // Destructuring the Strapi data object
  const { title, sub_title, FAQS, QuestionCTA } = data;

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
            {title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {sub_title}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.id || index}
                value={`item-${index}`}
                className="bg-card rounded-xl border border-border/50 px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-card-foreground hover:text-primary py-6 text-base md:text-lg">
                  {faq.questions}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 whitespace-pre-line">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* More Questions CTA Section - Now fully dynamic */}
        {QuestionCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12 bg-muted rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              {QuestionCTA.title}
            </h3>
            <p className="text-muted-foreground mb-6">
              {QuestionCTA.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {QuestionCTA.primary_button_text && (
                <Button variant="hero" size="lg">
                  <Phone className="w-4 h-4" />
                  {QuestionCTA.primary_button_text}
                </Button>
              )}
              {QuestionCTA.secondary_button_text && (
                <Button variant="outline" size="lg">
                  <MessageCircle className="w-4 h-4" />
                  {QuestionCTA.secondary_button_text}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;