import { useMemo } from "react";
import { motion } from "framer-motion";
import type { StatsBar } from "@/types/LandingPage.types";

interface TrustBarProps {
  data?: StatsBar;
}

const TrustBar = ({ data }: TrustBarProps) => {
  // Extract data with fallbacks
  const stats = useMemo(() => {
    return data?.statistics || [
      { id: 1, value: "30min", label: "Expert-Verified Quotes" },
      { id: 2, value: "10,000+", label: "Cars Shipped" },
      { id: 3, value: "4.9★", label: "Customer Rating" },
      { id: 4, value: "$0", label: "Hidden Fees" },
    ];
  }, [data]);

  return (
    <section className="py-12 bg-muted/30" aria-label="Trust statistics">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8" role="list">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id || stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
              role="listitem"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2" aria-label={`${stat.value} ${stat.label}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
