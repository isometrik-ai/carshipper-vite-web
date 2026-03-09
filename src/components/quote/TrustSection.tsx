import { Shield, Award, Star, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
  {
    icon: Shield,
    label: "Fully Insured",
  },
  {
    icon: Award,
    label: "Licensed & Bonded",
  },
  {
    icon: Star,
    label: "4.9/5 Rating",
  },
  {
    icon: CreditCard,
    label: "$0 Due Now",
  },
];

export function TrustSection() {
  return (
    <section className="py-8 bg-muted border-y border-border overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="flex flex-col items-center text-center gap-2"
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <item.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="text-sm font-semibold text-foreground">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
