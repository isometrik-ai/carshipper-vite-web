import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Truck, ArrowRight } from "lucide-react";
import { useHowItWorks } from "@/hooks/useHowItWorks";
import { RichTextBlock } from "@/types/how-it-works.types";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  CheckCircle,
  Truck,
};

const iconBgMap: Record<string, string> = {
  FileText: "bg-primary/10",
  CheckCircle: "bg-success/10",
  Truck: "bg-warning/10",
};

const iconColorMap: Record<string, string> = {
  FileText: "text-primary",
  CheckCircle: "text-success",
  Truck: "text-warning",
};

const HowItWorks = () => {
  const { howItWorks, loading } = useHowItWorks();

  if (loading || !howItWorks?.data?.[0]) return null;

  const sectionData = howItWorks.data[0];
  const steps = sectionData.steps.filter((s) => s.stepNumber && s.title);
  const title = sectionData.title;
  const subTitle = sectionData.subTitle;
  const buttonLabel = sectionData.buttonLabel;

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {subTitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon ? iconMap[step.icon] : FileText;
            const bgClass = step.icon ? iconBgMap[step.icon] : "bg-primary/10";
            const colorClass = step.icon ? iconColorMap[step.icon] : "text-primary";

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-border" />
                )}

                {/* Icon */}
                <div className={`${bgClass} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative`}>
                  <IconComponent className={`w-10 h-10 ${colorClass}`} />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.stepNumber}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {step.description?.map((block: RichTextBlock, idx: number) => (
                    <span key={idx}>
                      {block.children?.map((child, cidx) => (
                        <span key={cidx}>
                          {child.text}
                        </span>
                      ))}
                      {idx < step.description!.length - 1 && <br />}
                    </span>
                  ))}
                </p>

                {/* Features list - Optional placeholder for future enhancement */}
                {/* If you want to add features from the step object, add them here */}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button variant="hero" size="xl">
            {buttonLabel}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
