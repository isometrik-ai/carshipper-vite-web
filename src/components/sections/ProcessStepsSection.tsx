import { motion } from "framer-motion";
import { getIcon } from "@/lib/icons";
import type { ProcessStep } from "@/types/LandingPage.types";
import type { LucideIcon } from "lucide-react";

interface ProcessStepsSectionProps {
  sectionTitle?: string;
  sectionSubtitle?: string;
  steps: ProcessStep[];
}

const ProcessStepsSection = ({ sectionTitle, sectionSubtitle, steps }: ProcessStepsSectionProps) => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
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

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const StepIcon = step.icon_name
              ? (getIcon(step.icon_name) as LucideIcon)
              : null;

            return (
              <motion.div
                key={step.id || step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex gap-6 md:gap-8 ${index !== steps.length - 1 ? "mb-12 pb-12 border-b border-border" : ""}`}
              >
                {/* Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-2xl flex items-center justify-center relative">
                    {StepIcon ? (
                      <StepIcon className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                    ) : null}
                    {step.step_number ? (
                      <span className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center text-sm font-bold text-success-foreground">
                        {step.step_number}
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
                    {step.time_badge ? (
                      <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                        {step.time_badge}
                      </span>
                    ) : null}
                  </div>
                  {step.description ? (
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                  ) : null}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessStepsSection;
