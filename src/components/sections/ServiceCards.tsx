import { useMemo } from "react";
import { motion } from "framer-motion";
import { getIcon, DEFAULT_ICON } from "@/lib/icons";
import type { ServiceCards as ServiceCardsType } from "@/types/AutoAuctionShipping.types";
import type { LucideIcon } from "lucide-react";

interface ServiceCardsProps {
  data?: ServiceCardsType;
}

/**
 * Service Cards Component
 * Displays a section with title, subtitle, and service cards
 */
const ServiceCards = ({ data }: ServiceCardsProps) => {
  const sectionData = useMemo(() => {
    return {
      sectionTitle: data?.section_title || null,
      sectionSubtitle: data?.section_subtitle || null,
      serviceCards: data?.service_cards || [],
    };
  }, [data]);

  return (
    <section className="py-20 bg-muted/30" aria-labelledby={sectionData.sectionTitle ? "service-cards-heading" : undefined}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {sectionData.sectionTitle ? (
            <h2 id="service-cards-heading" className="text-3xl md:text-4xl font-bold mb-4">
              {sectionData.sectionTitle}
            </h2>
          ) : null}
          {sectionData.sectionSubtitle ? (
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {sectionData.sectionSubtitle}
            </p>
          ) : null}
        </div>

        {sectionData.serviceCards.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto" role="list">
            {sectionData.serviceCards.map((service, index) => {
              const ServiceIcon = service.icon_name
                ? (getIcon(service.icon_name) as LucideIcon)
                : DEFAULT_ICON;

              return (
                <motion.div
                  key={service.id || service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-xl p-8 shadow-lg border"
                  role="listitem"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <ServiceIcon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default ServiceCards;
