import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/types/LandingPage.types";
import type { LucideIcon } from "lucide-react";

interface ProcessStepsSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  steps: ProcessStep[];
  ctaButton?: {
    id: number;
    button_text: string;
    button_link: string | null;
    icon_name: string | null;
    variant: string;
  } | null;
}

const ProcessStepsSection = ({ sectionTitle, sectionSubtitle, steps, ctaButton }: ProcessStepsSectionProps) => {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (ctaButton?.button_link) {
      const link = ctaButton.button_link;
      if (link.startsWith("http") || link.startsWith("tel:") || link.startsWith("mailto:")) {
        window.location.href = link;
      } else {
        navigate(link);
      }
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {(sectionTitle || sectionSubtitle) ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {sectionTitle ? (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {sectionTitle}
              </h2>
            ) : null}
            {sectionSubtitle ? (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {sectionSubtitle}
              </p>
            ) : null}
          </motion.div>
        ) : null}

        {steps && steps.length > 0 ? (
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => {
              const StepIcon = step.icon_name
                ? (getIcon(step.icon_name) as LucideIcon)
                : null;

              // Use dynamic icon background and color if provided, otherwise use defaults
              const iconBgClass = step.icon_background || "bg-primary";
              const iconColorClass = step.icon_color || "text-primary-foreground";

              return (
                <motion.div
                  key={step.id || step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn("flex gap-6 md:gap-8", index !== steps.length - 1 && "mb-12 pb-12 border-b border-border")}
                >
                  {/* Number & Icon */}
                  {(StepIcon || step.step_number) ? (
                    <div className="flex-shrink-0">
                      <div className={cn("w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center relative", iconBgClass)}>
                        {StepIcon ? (
                          <StepIcon className={cn("w-8 h-8 md:w-10 md:h-10", iconColorClass)} />
                        ) : null}
                        {step.step_number ? (
                          <span className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center text-sm font-bold text-success-foreground">
                            {step.step_number}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {/* Content */}
                  <div className="flex-1">
                    {(step.title || step.time_badge) ? (
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        {step.title ? (
                          <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
                        ) : null}
                        {step.time_badge ? (
                          <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                            {step.time_badge}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                    {step.description ? (
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                    ) : null}
                    {step.features && step.features.length > 0 ? (
                      <ul className="space-y-2 mb-4">
                        {step.features.map((feature) => (
                          <li key={feature.id || feature.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full" aria-hidden="true" />
                            <span>{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : null}

        {/* CTA Button */}
        {ctaButton ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            {ctaButton.button_text ? (
              <Button
                variant={ctaButton.variant === "primary" ? "hero" : "default"}
                size="lg"
                onClick={handleCtaClick}
                className="text-lg px-8"
              >
                {ctaButton.button_text}
              </Button>
            ) : null}
          </motion.div>
        ) : null}
      </div>
    </section>
  );
};

export default ProcessStepsSection;
