import { useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { getIcon, DEFAULT_ICON } from "@/lib/icons";
import type { ProcessSection } from "@/types/LandingPage.types";
import type { LucideIcon } from "lucide-react";

interface HowItWorksProps {
  data?: ProcessSection;
}

const HowItWorks = ({ data }: HowItWorksProps) => {
  // Extract data with fallbacks
  const sectionData = useMemo(() => {
    return {
      sectionTitle: data?.section_title || "Ship Your Car in 3 Easy Steps",
      sectionSubtitle: data?.section_subtitle || "No complicated forms. No endless phone calls. Just simple, fast shipping.",
      steps: data?.steps || [],
      ctaButton: data?.cta_button,
    };
  }, [data]);

  // Check if we should use vertical layout (when step numbers are present and features exist)
  const useVerticalLayout = useMemo(() => {
    return sectionData.steps.some(step => step.step_number && step.features && step.features.length > 0);
  }, [sectionData.steps]);

  return (
    <section className="py-16 md:py-24 bg-muted/30" aria-labelledby="how-it-works-heading">
      <div className="container mx-auto px-4">
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
        
        {sectionData.steps.length > 0 ? (
          useVerticalLayout ? (
            // Vertical layout with step numbers and features
            <div className="max-w-4xl mx-auto" role="list" aria-label="Process steps">
              {sectionData.steps.map((step, index) => {
                const StepIcon = step.icon_name 
                  ? (getIcon(step.icon_name) as LucideIcon)
                  : null;
                
                return (
                  <motion.div
                    key={step.id || step.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-6 mb-8 last:mb-0"
                    role="listitem"
                  >
                    {/* Step Number and Icon */}
                    <div className="flex-shrink-0 flex flex-col items-center">
                      {step.step_number ? (
                        <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-3">
                          {step.step_number}
                        </div>
                      ) : null}
                      {StepIcon ? (
                        <div className={`${step.icon_background || "bg-primary/10"} w-12 h-12 rounded-xl flex items-center justify-center`}
                          style={step.icon_color ? { color: step.icon_color } : undefined}
                        >
                          <StepIcon className={`w-6 h-6 ${step.icon_color ? "" : "text-primary"}`} aria-hidden="true" />
                        </div>
                      ) : null}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pb-8 border-b last:border-0">
                      <h3 className="text-xl font-semibold mb-2">
                        {step.title}
                      </h3>
                      {step.description ? (
                        <p className="text-muted-foreground mb-4">
                          {step.description}
                        </p>
                      ) : null}
                      {step.features && step.features.length > 0 ? (
                        <ul className="space-y-2" role="list">
                          {step.features.map((feature: any) => (
                            <li key={feature.id || feature.text} className="flex items-start gap-2 text-sm" role="listitem">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span className="text-muted-foreground">{feature.text}</span>
                            </li>
                          ))}
                        </ul>
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
