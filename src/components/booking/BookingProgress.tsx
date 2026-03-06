import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
  shortName: string;
}

interface BookingProgressProps {
  steps: Step[];
  currentStep: number;
}

export function BookingProgress({ steps, currentStep }: BookingProgressProps) {
  return (
    <div className="bg-card rounded-2xl p-4 md:p-6 shadow-card overflow-x-auto">
      <div className="flex items-center min-w-max">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 shrink-0",
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isCurrent
                      ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : String(step.id).padStart(2, "0")}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors whitespace-nowrap",
                    isCurrent ? "text-primary" : isCompleted ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <span className="hidden md:inline">{step.name}</span>
                  <span className="md:hidden">{step.shortName}</span>
                </span>
              </div>

              {/* Chevron Separator */}
              {!isLast && (
                <ChevronRight className="w-5 h-5 text-muted-foreground/50 mx-4 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
