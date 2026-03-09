import { ClipboardCheck, Truck, Navigation, PartyPopper } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/AnimationWrappers";

const steps = [
  {
    icon: ClipboardCheck,
    color: "bg-primary",
    number: "STEP 1",
    title: "Select Your Service & Book",
    description:
      "Choose Saver, Priority, or Rush. We securely capture your card to reserve your spot—no charge until a carrier is assigned.",
  },
  {
    icon: Truck,
    color: "bg-success",
    number: "STEP 2",
    title: "We Assign Your Carrier",
    description:
      "Within 24-72 hours of your earliest pickup date, we match you with a licensed, insured carrier. Your card is charged only at this point.",
  },
  {
    icon: Navigation,
    color: "bg-warning",
    number: "STEP 3",
    title: "Track Your Vehicle",
    description:
      "Once picked up, track your car in real-time. Receive automatic updates at every milestone via text and email.",
  },
  {
    icon: PartyPopper,
    color: "bg-rush",
    number: "STEP 4",
    title: "Delivery & Inspection",
    description:
      "Your car arrives at your destination. Inspect and sign off—that's it. Payment was already processed when the carrier was assigned.",
  },
];

export function TimelineSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Happens After You Book
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent process from booking to delivery
            </p>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          <StaggerContainer staggerDelay={0.2}>
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <StaggerItem key={index}>
                  <div
                    className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 mb-12 last:mb-0 ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                      <span className="inline-block text-sm font-semibold text-primary mb-2">
                        {step.number}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Icon */}
                    <div
                      className={`relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full ${step.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <step.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
