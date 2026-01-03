import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const trustBadges = [
    "No credit card required",
    "Licensed & bonded",
    "4.9★ rated",
  ];

  return (
    <section className="py-20 md:py-28 bg-hero-gradient relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-success rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Ship Your Car?
          </h2>

          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/80">
            Join 10,000+ customers who chose the smarter way to ship
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button variant="hero" size="xl">
              Get Expert Quote (30 Minutes)
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline-white" size="xl">
              <Phone className="w-5 h-5" />
              Call (888) 555-1234
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 md:gap-8 justify-center text-sm text-primary-foreground/90">
            {trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
