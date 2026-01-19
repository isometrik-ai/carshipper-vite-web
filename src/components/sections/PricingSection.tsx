import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import type { PricingDisplay, RouteCard } from "@/types/LandingPage.types";

interface RouteCardProps {
  route: RouteCard;
}

const RouteCardComponent = ({ route }: RouteCardProps) => {
  return (
    <article className="relative bg-card rounded-xl shadow-lg p-6 hover:shadow-card-hover transition-all duration-300 border border-border/50 group hover:-translate-y-1">
      {route.is_popular ? (
        <div className="absolute -top-3 right-4 flex items-center gap-1 bg-warning text-warning-foreground px-3 py-1 rounded-full text-sm font-semibold">
          <Flame className="w-3 h-3" aria-hidden="true" />
          Popular
        </div>
      ) : null}

      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-1">From:</div>
        <div className="text-lg font-bold text-card-foreground">{route.origin_city}</div>

        <div className="text-2xl text-muted-foreground/50 my-2 text-center" aria-hidden="true">↓</div>

        <div className="text-sm text-muted-foreground mb-1">To:</div>
        <div className="text-lg font-bold text-card-foreground">{route.destination_city}</div>
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Distance:</span>
          <span className="font-semibold text-card-foreground">{route.distance}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Timeline:</span>
          <span className="font-semibold text-card-foreground">{route.timeline}</span>
        </div>
      </div>

      <div className="border-t border-border pt-4 mt-4 text-center">
        <div className="text-sm text-muted-foreground mb-1">Starting at:</div>
        <div className="text-4xl font-bold text-primary">{route.price}</div>
        <div className="text-xs text-muted-foreground mt-1">Open transport, door-to-door</div>
      </div>

      <Button variant="outline" className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        Get Exact Quote
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Button>
    </article>
  );
};

interface PricingSectionProps {
  data?: PricingDisplay;
}

const PricingSection = ({ data }: PricingSectionProps) => {
  // Extract data with fallbacks
  const sectionData = useMemo(() => {
    return {
      sectionTitle: data?.section_title || "Transparent Pricing, No Surprises",
      sectionSubtitle: data?.section_subtitle || "See what real customers pay for popular routes",
      footerText: data?.footer_text || "Your route not listed? Get your custom quote in 30 seconds.",
      routes: data?.routes || [],
      ctaButton: data?.cta_button,
    };
  }, [data]);

  return (
    <section id="pricing" className="py-20 md:py-28 bg-background" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 id="pricing-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {sectionData.sectionTitle}
          </h2>
          {sectionData.sectionSubtitle ? (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {sectionData.sectionSubtitle}
            </p>
          ) : null}
        </motion.div>

        {sectionData.routes.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list" aria-label="Pricing routes">
            {sectionData.routes.map((route, index) => (
              <motion.div
                key={route.id || `${route.origin_city}-${route.destination_city}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                role="listitem"
              >
                <RouteCardComponent route={route} />
              </motion.div>
            ))}
          </div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          {sectionData.footerText ? (
            <p className="text-muted-foreground mb-6">
              {sectionData.footerText}
            </p>
          ) : null}
          {sectionData.ctaButton ? (
            sectionData.ctaButton.button_link ? (
              <Button variant="hero" size="xl" asChild>
                <a href={sectionData.ctaButton.button_link}>
                  {sectionData.ctaButton.button_text}
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </a>
              </Button>
            ) : (
              <Button variant="hero" size="xl">
                {sectionData.ctaButton.button_text}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
            )
          ) : null}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
