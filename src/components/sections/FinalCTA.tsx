import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import type { CallToAction } from "@/types/LandingPage.types";

interface FinalCTAProps {
  data?: CallToAction;
}

const FinalCTA = ({ data }: FinalCTAProps) => {
  // Extract data with fallbacks
  const ctaData = useMemo(() => {
    return {
      headline: data?.headline || "Ready to Ship Your Car?",
      description: data?.description || "Join 10,000+ customers who chose the smarter way to ship",
      trustBadges: data?.trust_badges && Array.isArray(data.trust_badges) && data.trust_badges.length > 0
        ? data.trust_badges
        : [],
      primaryButton: data?.primary_button,
      secondaryButton: data?.secondary_button,
      phoneNumber: data?.phone_number,
      phoneHref: data?.phone_href,
    };
  }, [data]);

  return (
    <section className="py-16 md:py-24 bg-primary" aria-labelledby="final-cta-heading">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Truck className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 id="final-cta-heading" className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {ctaData.headline}
          </h2>

          {ctaData.description ? (
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {ctaData.description}
            </p>
          ) : null}

          {ctaData.primaryButton ? (
            ctaData.primaryButton.button_link ? (
              <Button variant="secondary" size="lg" className="text-lg px-8" asChild>
                <a href={ctaData.primaryButton.button_link}>
                  {ctaData.primaryButton.button_text}
                </a>
              </Button>
            ) : (
              <Button variant="secondary" size="lg" className="text-lg px-8">
                {ctaData.primaryButton.button_text}
              </Button>
            )
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
