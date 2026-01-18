import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { FeatureListSection as FeatureListSectionType } from "@/types/AboutPage.types";

interface FeatureListSectionProps {
  data?: FeatureListSectionType;
}

/**
 * Feature List Section Component
 * Displays a section with title, intro text, bullet points, and closing text
 */
const FeatureListSection = ({ data }: FeatureListSectionProps) => {
  const sectionData = useMemo(() => {
    return {
      sectionTitle: data?.section_title || null,
      introText: data?.intro_text || null,
      bulletPoints: data?.bullet_points || [],
      closingText: data?.closing_text || null,
    };
  }, [data]);

  return (
    <section className="py-16 md:py-24" aria-labelledby={sectionData.sectionTitle ? "feature-list-heading" : undefined}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-secondary/50 rounded-3xl p-8 md:p-12"
          >
            {sectionData.sectionTitle ? (
              <h2 id="feature-list-heading" className="text-2xl md:text-3xl font-bold mb-6">
                {sectionData.sectionTitle}
              </h2>
            ) : null}

            {sectionData.introText ? (
              <p className="text-muted-foreground mb-6">
                {sectionData.introText}
              </p>
            ) : null}

            {sectionData.bulletPoints.length > 0 ? (
              <ul className="space-y-4" role="list">
                {sectionData.bulletPoints.map((point) => (
                  <li key={point.id || point.text} className="flex items-start gap-3" role="listitem">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span>{point.text}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {sectionData.closingText ? (
              <p className="text-muted-foreground mt-6">
                {sectionData.closingText}
              </p>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureListSection;
