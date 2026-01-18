import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { TextSection as TextSectionType } from "@/types/AboutPage.types";

interface TextSectionProps {
  data?: TextSectionType;
}

/**
 * Text Section Component
 * Displays a section with title, paragraphs, and optional bullet points
 */
const TextSection = ({ data }: TextSectionProps) => {
  const sectionData = useMemo(() => {
    return {
      sectionTitle: data?.section_title || null,
      paragraphs: data?.paragraphs || null,
      bulletPoints: data?.bullet_points || [],
    };
  }, [data]);

  // Parse paragraphs (richtext from Strapi may contain newlines)
  const parsedParagraphs = useMemo(() => {
    if (!sectionData.paragraphs) return [];

    // Split by double newlines to get paragraphs
    return sectionData.paragraphs
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  }, [sectionData.paragraphs]);

  return (
    <section className="py-16 md:py-24" aria-labelledby={sectionData.sectionTitle ? "text-section-heading" : undefined}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {sectionData.sectionTitle ? (
              <h2 id="text-section-heading" className="text-3xl md:text-4xl font-bold mb-6 text-center">
                {sectionData.sectionTitle}
              </h2>
            ) : null}

            {parsedParagraphs.length > 0 ? (
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {parsedParagraphs.map((paragraph, index) => (
                  <p key={index} className={index < parsedParagraphs.length - 1 ? "mb-4" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            {sectionData.bulletPoints.length > 0 ? (
              <ul className="space-y-4 mt-6" role="list">
                {sectionData.bulletPoints.map((point) => (
                  <li key={point.id || point.text} className="flex items-start gap-3" role="listitem">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TextSection;
