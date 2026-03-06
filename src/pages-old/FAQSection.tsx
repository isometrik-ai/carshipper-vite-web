import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = ({ category, index }: { category: any; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-12"
        >
            <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
            <Accordion type="single" collapsible className="space-y-4">
                {category.FAQS.map((faq: any) => (
                    <AccordionItem
                        key={faq.id}
                        value={`faq-${faq.id}`}
                        className="bg-card border border-border rounded-xl px-6"
                    >
                        {/* Mapping 'questions' and 'answer' from your JSON  */}
                        <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                            {faq.questions}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4 whitespace-pre-line">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </motion.div>
    );
};

export default FAQSection;