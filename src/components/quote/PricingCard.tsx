import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type TierType = "saver" | "priority" | "rush";

interface PricingCardProps {
  tier: TierType;
  name: string;
  price: number;
  tagline: string;
  badge?: string;
  features: string[];
  isPopular?: boolean;
  quoteId: string;
}

const tierStyles: Record<TierType, {
  badgeBg: string;
  badgeText: string;
  priceColor: string;
  buttonBg: string;
  buttonText: string;
  buttonHover: string;
  icon: React.ReactNode;
}> = {
  saver: {
    badgeBg: "bg-muted",
    badgeText: "text-muted-foreground",
    priceColor: "text-success",
    buttonBg: "bg-success",
    buttonText: "text-success-foreground",
    buttonHover: "hover:bg-success/90",
    icon: <Check className="w-5 h-5" />,
  },
  priority: {
    badgeBg: "bg-primary-foreground/20",
    badgeText: "text-primary-foreground",
    priceColor: "text-primary-foreground",
    buttonBg: "bg-primary-foreground",
    buttonText: "text-primary",
    buttonHover: "hover:bg-primary-foreground/90",
    icon: <Check className="w-5 h-5" />,
  },
  rush: {
    badgeBg: "bg-rush/10",
    badgeText: "text-rush",
    priceColor: "text-rush",
    buttonBg: "bg-rush",
    buttonText: "text-rush-foreground",
    buttonHover: "hover:bg-rush/90",
    icon: <Zap className="w-5 h-5" />,
  },
};

export function PricingCard({
  tier,
  name,
  price,
  tagline,
  badge,
  features,
  isPopular,
  quoteId,
}: PricingCardProps) {
  const styles = tierStyles[tier];
  const isPriority = tier === "priority";

  return (
    <motion.div
      whileHover={!isPriority ? { y: -8, scale: 1.02 } : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl p-8 transition-shadow duration-300 h-full",
        isPriority
          ? "bg-primary text-primary-foreground scale-105 shadow-featured z-10"
          : "bg-card text-card-foreground border-2 border-border hover:shadow-card-hover"
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-warning text-warning-foreground rounded-full text-sm font-bold shadow-lg"
        >
          🔥 MOST POPULAR
        </motion.div>
      )}

      {/* Tier Badge */}
      <div
        className={cn(
          "inline-block px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide mb-4",
          styles.badgeBg,
          styles.badgeText
        )}
      >
        {badge}
      </div>

      {/* Name & Price */}
      <h3 className="text-2xl font-bold mb-2">{name}</h3>
      <div className="flex items-baseline gap-1 mb-2">
        <span className={cn("text-3xl", isPriority ? "text-primary-foreground/80" : "text-muted-foreground")}>$</span>
        <span className={cn("text-5xl font-bold", styles.priceColor)}>{price.toLocaleString()}</span>
      </div>
      <p className={cn("text-sm mb-6", isPriority ? "text-primary-foreground/80" : "text-muted-foreground")}>
        {tagline}
      </p>

      <div className={cn("h-px my-6", isPriority ? "bg-primary-foreground/20" : "bg-border")} />

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <span className={cn("flex-shrink-0 mt-0.5", tier === "rush" ? "text-rush" : "text-success")}>
              {styles.icon}
            </span>
            <span className={cn("text-sm leading-relaxed", isPriority ? "text-primary-foreground/90" : "text-muted-foreground")}>
              {feature}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Button
          asChild
          className={cn(
            "w-full py-6 text-lg font-semibold transition-all",
            styles.buttonBg,
            styles.buttonText,
            styles.buttonHover
          )}
        >
          <a href={`/book/${quoteId}?tier=${tier}`}>
            Select {name} →
          </a>
        </Button>
      </motion.div>
    </motion.div>
  );
}
