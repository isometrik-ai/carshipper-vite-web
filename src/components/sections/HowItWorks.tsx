import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { getIcon, DEFAULT_ICON } from "@/lib/icons";
import type { ProcessSection, HeroSection } from "@/types/LandingPage.types";
import type { LucideIcon } from "lucide-react";

interface HowItWorksProps {
  data?: ProcessSection;
  heroData?: HeroSection;
}

const HowItWorks = ({ data, heroData }: HowItWorksProps) => {
  // Extract data with fallbacks
  const sectionData = useMemo(() => {
    return {
      sectionTitle: data?.section_title || "Ship Your Car in 3 Easy Steps",
      sectionSubtitle: data?.section_subtitle || "No complicated forms. No endless phone calls. Just simple, fast shipping.",
      steps: data?.steps || [],
      ctaButton: data?.cta_button,
    };
  }, [data]);

  // Check if we should use vertical layout (when step numbers are present)
  const useVerticalLayout = useMemo(() => {
    return sectionData.steps.some(step => step.step_number);
  }, [sectionData.steps]);

  return (
    <section className="py-16 md:py-24" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4">
        {heroData ? (
          // Hero-style header using hero section JSON data
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              id="how-it-works-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {heroData.main_headline ? heroData.main_headline.trim() : sectionData.sectionTitle}{" "}
              {heroData.highlighted_text ? (
                <span className="text-primary">{heroData.highlighted_text}</span>
              ) : null}
            </h2>
            {heroData.description ? (
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                {heroData.description}
              </p>
            ) : sectionData.sectionSubtitle ? (
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                {sectionData.sectionSubtitle}
              </p>
            ) : null}
            {heroData.trust_indicators && Array.isArray(heroData.trust_indicators) && heroData.trust_indicators.length > 0 ? (
              <div className="flex flex-wrap gap-4 justify-center mb-6">
                {heroData.trust_indicators.map((indicator) => {
                  const IndicatorIcon = indicator.icon_name
                    ? (getIcon(indicator.icon_name) as LucideIcon)
                    : null;
                  return (
                    <div key={indicator.id || indicator.text} className="flex items-center gap-2 text-sm bg-muted/50 px-4 py-2 rounded-full">
                      {IndicatorIcon ? (
                        <IndicatorIcon className="w-4 h-4 text-primary" aria-hidden="true" />
                      ) : null}
                      <span>{indicator.text}</span>
                    </div>
                  );
                })}
              </div>
            ) : null}
            {heroData.phone_number ? (
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  href={`tel:${heroData.phone_number.replace(/\D/g, '')}`} 
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                  <Phone className="w-5 h-5" />
                  {heroData.phone_number}
                </a>
              </div>
            ) : null}
          </motion.div>
        ) : (
          // Default header
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              id="how-it-works-heading"
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              {sectionData.sectionTitle}
            </h2>
            {sectionData.sectionSubtitle ? (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {sectionData.sectionSubtitle}
              </p>
            ) : null}
          </motion.div>
        )}

        {sectionData.steps.length > 0 ? (
          useVerticalLayout ? (
            // Vertical layout with connecting line - matching image design
            <div className="relative max-w-3xl mx-auto pl-6" role="list" aria-label="Process steps">
              {/* Vertical connecting line */}
              <div className="absolute left-[30px] top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>

              {sectionData.steps.map((step, index) => {
                const StepIcon = step.icon_name
                  ? (getIcon(step.icon_name) as LucideIcon)
                  : null;

                return (
                  <motion.div
                    key={step.id || step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-4 mb-10 relative z-10 bg-white"
                    role="listitem"
                  >
                    {/* Icon and Step Number Block */}
                    <div className="relative flex-shrink-0 w-12 h-12">
                      {/* Blue Icon container */}
                      <div className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center rounded-xl bg-blue-600 shadow-md z-20">
                        {StepIcon ? (
                          <StepIcon className="w-6 h-6 text-white" aria-hidden="true" />
                        ) : null}
                      </div>
                      {/* Green Step Number Badge - positioned to overlap the blue icon */}
                      {step.step_number ? (
                        <span className="absolute -top-2 left-8 w-7 h-7 flex items-center justify-center rounded-full border-2 border-white bg-green-500 text-xs font-bold text-white z-30">
                          {step.step_number}
                        </span>
                      ) : null}
                    </div>

                    {/* Main Content Block (Title, Time Badge, Description) */}
                    <div className="flex-1 pt-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {/* Step Title */}
                        <h3 className="text-xl font-bold">
                          {step.title}
                        </h3>
                        {/* Time Badge */}
                        {step.time_badge ? (
                          <span className="text-sm text-gray-500">
                            {step.time_badge}
                          </span>
                        ) : null}
                      </div>
                      {/* Step Description */}
                      {step.description ? (
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      ) : null}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            // Grid layout (original layout for simple steps)
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list" aria-label="Process steps">
              {sectionData.steps.map((step, index) => {
                const StepIcon = step.icon_name
                  ? (getIcon(step.icon_name) as LucideIcon)
                  : DEFAULT_ICON;

                return (
                  <motion.div
                    key={step.id || step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border"
                    role="listitem"
                  >
                    {/* Icon */}
                    <div
                      className={`${step.icon_background || "bg-primary/10"} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                      style={step.icon_color ? { color: step.icon_color } : undefined}
                    >
                      <StepIcon className={`w-6 h-6 ${step.icon_color ? "" : "text-primary"}`} aria-hidden="true" />
                    </div>

                    <h3 className="text-xl font-semibold mb-2">
                      {step.title}
                    </h3>

                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          )
        ) : null}

        {sectionData.ctaButton ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-16"
          >
            {sectionData.ctaButton.button_link ? (
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
            )}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default HowItWorks;
