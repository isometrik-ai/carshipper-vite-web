import { DoorOpen, Shield, MapPin, BadgeCheck, MessageCircle, CreditCard } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/AnimationWrappers";

const features = [
  {
    icon: DoorOpen,
    title: "Door-to-Door Service",
    description:
      "We pick up from your exact address and deliver to your destination's doorstep. No terminal drop-offs—we handle everything.",
  },
  {
    icon: Shield,
    title: "Full Insurance Coverage",
    description:
      "Every carrier carries $100K-$1M cargo insurance. Your vehicle is fully protected from pickup to delivery.",
  },
  {
    icon: MapPin,
    title: "Real-Time GPS Tracking",
    description:
      "Track your car's location in real-time via our app. Get automatic text and email updates at every milestone.",
  },
  {
    icon: BadgeCheck,
    title: "Licensed & Vetted Carriers",
    description:
      "All carriers are DOT/MC licensed, insured, and rated 4.5+ stars. We verify credentials before every assignment.",
  },
  {
    icon: MessageCircle,
    title: "24/7 Customer Support",
    description:
      "Questions at 3am? Need help during pickup? Our team is available 24/7 by phone, text, or chat.",
  },
  {
    icon: CreditCard,
    title: "No Upfront Payment",
    description:
      "Book for free. You only pay once your car is picked up and on its way. No deposits, no credit card to reserve.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What's Included in Every Shipment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Regardless of which tier you choose, you always get our full service
            </p>
          </div>
        </FadeIn>

        {/* Features Grid */}
        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.1}
        >
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <div className="bg-card rounded-2xl p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
