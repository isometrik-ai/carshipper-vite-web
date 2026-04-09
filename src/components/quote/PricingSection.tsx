import { PricingCard } from "@/components/quote/PricingCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/AnimationWrappers";


interface PricingSectionProps {
  quoteId: string;
  prices: {
    saver: number;
    priority: number;
    rush: number;
    saverRatingEstimatedPickupDays: string;
    priorityRatingEstimatedPickupDays: string;
    rushRatingEstimatedPickupDays: string;
  };
}

const pricingTiers = [
  {
    tier: "saver" as const,
    name: "Saver Rate",
    badge: "BUDGET FRIENDLY",
    tagline: "Lowest cost option",
    features: [
      "Flexible pickup schedule — Best for customers with time to spare",
      "Fill last-minute slots — You get the lowest price by filling carrier cancellations",
      "Still fully insured — Same insurance and carrier quality",
      "Pickup within 1-5 days — Slightly longer pickup window",
    ],
  },
  {
    tier: "priority" as const,
    name: "Priority Rate",
    badge: "BEST VALUE",
    tagline: "Locked-in guaranteed price",
    isPopular: true,
    features: [
      "Standard 3-day pickup window — Most balanced option for timing",
      "Guaranteed locked-in rate — Price won't change after booking",
      "Enterprise carrier network — Access to our top-rated carriers",
      "Peace of mind — Our most selected option for good reason",
    ],
  },
  {
    tier: "rush" as const,
    name: "Rush Service",
    badge: "FASTEST PICKUP",
    tagline: "Fastest available",
    features: [
      "Often next-day pickup — Perfect for urgent moves",
      "Priority carrier assignment — Jump to the front of the line",
      "Dedicated support — Personal attention throughout",
      "Best for tight schedules — When you need it ASAP",
    ],
  },
];

export function PricingSection({ quoteId, prices }: PricingSectionProps) {

  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Service Level
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All options include door-to-door service, full insurance, and real-time tracking
            </p>
          </div>
        </FadeIn>

        {/* Pricing Cards */}
        <StaggerContainer
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start"
          staggerDelay={0.15}
        >
          {pricingTiers.map((tierData) => (
            <StaggerItem key={tierData.tier}>
              <PricingCard
                {...tierData}
                price={prices[tierData.tier]}
                quoteId={quoteId}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Comparison Table - Desktop Only */}
        <FadeIn delay={0.4}>
          <div className="hidden lg:block mt-16 max-w-4xl mx-auto">
            <div className="bg-muted rounded-2xl p-8">
              <h3 className="text-xl font-bold text-foreground text-center mb-8">
                Compare All Options
              </h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-success">Saver</th>
                    <th className="text-center py-4 px-4 font-semibold text-primary">Priority</th>
                    <th className="text-center py-4 px-4 font-semibold text-rush">Rush</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Pickup Window", 
                      prices.saverRatingEstimatedPickupDays ?? "1-5 days",
                      prices?.priorityRatingEstimatedPickupDays ?? "1-3 days",
                      prices.rushRatingEstimatedPickupDays ?? "Often next-day"],
                    ["Price Lock Guarantee", "—", "✓", "✓"],
                    ["Carrier Quality", "Good (4.0+★)", "Excellent (4.5+★)", "Premium (4.8+★)"],
                    ["Insurance Coverage", "✓ Included", "✓ Included", "✓ Included"],
                    ["Real-Time Tracking", "✓ Included", "✓ Included", "✓ Enhanced"],
                    ["24/7 Support", "✓ Standard", "✓ Priority", "✓ Dedicated"],
                  ].map(([feature, saver, priority, rush], index) => (
                    <tr key={index} className="border-b border-border">
                      <td className="py-4 px-4 text-muted-foreground">{feature}</td>
                      <td className="text-center py-4 px-4">{saver}</td>
                      <td className="text-center py-4 px-4 bg-primary/5">{priority}</td>
                      <td className="text-center py-4 px-4">{rush}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
