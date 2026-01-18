import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import type { ServiceList as ServiceListType } from "@/types/AutoAuctionShipping.types";

interface ServiceListProps {
  data?: ServiceListType;
}

/**
 * Service List Component
 * Displays a list of services with checkmark icons
 */
const ServiceList = ({ data }: ServiceListProps) => {
  const sectionData = useMemo(() => {
    return {
      sectionTitle: data?.section_title || null,
      services: data?.services || [],
    };
  }, [data]);

  return (
    <section className="py-16 bg-muted/30" aria-labelledby={sectionData.sectionTitle ? "service-list-heading" : undefined}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl shadow-lg p-8 border"
          >
            {sectionData.sectionTitle ? (
              <h3 id="service-list-heading" className="text-2xl font-semibold mb-6 text-center">
                {sectionData.sectionTitle}
              </h3>
            ) : null}
            {sectionData.services.length > 0 ? (
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4" role="list">
                {sectionData.services.map((service) => (
                  <div key={service.id || service.text} className="flex items-center gap-2 text-sm" role="listitem">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                    <span>{service.text}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceList;
