import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MessageCircle } from "lucide-react";
import type { FAQDisplay } from "@/types/LandingPage.types";

interface FAQSectionProps {
  data?: FAQDisplay;
}

const FAQSection = ({ data }: FAQSectionProps) => {
  // Extract data with fallbacks
  const sectionData = useMemo(() => {
    return {
      sectionTitle: data?.section_title || "Frequently Asked Questions",
      sectionSubtitle: data?.section_subtitle || "Everything you need to know about shipping your car",
      faqItems: data?.faq_items || [],
      contactCta: data?.contact_cta,
    };
  }, [data]);

  return (
    <section id="faq" className="py-20 md:py-28 bg-background" aria-labelledby="faq-heading">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 id="faq-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {sectionData.sectionTitle}
          </h2>
          {sectionData.sectionSubtitle ? (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {sectionData.sectionSubtitle}
            </p>
          ) : null}
        </motion.div>

        {sectionData.faqItems.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {sectionData.faqItems.map((faq, index) => (
                <AccordionItem
                  key={faq.id || faq.question}
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
        ) : null}

        {/* More Questions CTA */}
        {sectionData.contactCta ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12 bg-muted rounded-2xl p-8"
          >
            <p className="text-2xl font-bold text-foreground mb-4">
              {sectionData.contactCta.title}
            </p>
            {sectionData.contactCta.description ? (
              <p className="text-muted-foreground mb-6">
                {sectionData.contactCta.description}
              </p>
            ) : null}
            <div className="flex flex-wrap gap-4 justify-center">
              {sectionData.contactCta.phone_number ? (
                <Button variant="hero" size="lg" asChild>
                  <a href={`tel:${sectionData.contactCta.phone_number}`}>
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    {sectionData.contactCta.phone_label || sectionData.contactCta.phone_number}
                  </a>
                </Button>
              ) : null}
              <Button variant="outline" size="lg">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Live Chat
              </Button>
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default FAQSection;
