import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";

interface RouteCardProps {
  from: string;
  to: string;
  price: string;
  timeline: string;
  distance: string;
  popular?: boolean;
}

const RouteCard = ({ from, to, price, timeline, distance, popular }: RouteCardProps) => {
  return (
    <div className="relative bg-card rounded-xl shadow-lg p-6 hover:shadow-card-hover transition-all duration-300 border border-border/50 group hover:-translate-y-1">
      {popular && (
        <div className="absolute -top-3 right-4 flex items-center gap-1 bg-warning text-warning-foreground px-3 py-1 rounded-full text-sm font-semibold">
          <Flame className="w-3 h-3" />
          Popular
        </div>
      )}

      <div className="mb-4">
        <div className="text-sm text-muted-foreground mb-1">From:</div>
        <div className="text-lg font-bold text-card-foreground">{from}</div>

        <div className="text-2xl text-muted-foreground/50 my-2 text-center">↓</div>

        <div className="text-sm text-muted-foreground mb-1">To:</div>
        <div className="text-lg font-bold text-card-foreground">{to}</div>
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Distance:</span>
          <span className="font-semibold text-card-foreground">{distance}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Timeline:</span>
          <span className="font-semibold text-card-foreground">{timeline}</span>
        </div>
      </div>

      <div className="border-t border-border pt-4 mt-4 text-center">
        <div className="text-sm text-muted-foreground mb-1">Starting at:</div>
        <div className="text-4xl font-bold text-primary">{price}</div>
        <div className="text-xs text-muted-foreground mt-1">Open transport, door-to-door</div>
      </div>

      <Button variant="outline" className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        Get Exact Quote
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

const PricingSection = () => {
  const routes = [
    {
      from: "Los Angeles, CA",
      to: "New York, NY",
      distance: "2,790 miles",
      price: "$1,450",
      timeline: "7-10 days",
      popular: true,
    },
    {
      from: "Miami, FL",
      to: "Chicago, IL",
      distance: "1,380 miles",
      price: "$950",
      timeline: "5-7 days",
    },
    {
      from: "Austin, TX",
      to: "Seattle, WA",
      distance: "2,140 miles",
      price: "$1,280",
      timeline: "6-9 days",
      popular: true,
    },
    {
      from: "Phoenix, AZ",
      to: "Boston, MA",
      distance: "2,660 miles",
      price: "$1,380",
      timeline: "7-10 days",
    },
    {
      from: "Denver, CO",
      to: "Atlanta, GA",
      distance: "1,420 miles",
      price: "$980",
      timeline: "5-7 days",
    },
    {
      from: "San Francisco, CA",
      to: "Dallas, TX",
      distance: "1,730 miles",
      price: "$1,150",
      timeline: "5-8 days",
      popular: true,
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Transparent Pricing, No Surprises
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            See what real customers pay for popular routes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {routes.map((route, index) => (
            <motion.div
              key={`${route.from}-${route.to}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <RouteCard {...route} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Your route not listed? Get your custom quote in 30 seconds.
          </p>
          <Button variant="hero" size="xl">
            Calculate My Custom Price
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
