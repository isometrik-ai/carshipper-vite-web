import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Truck, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      number: "1",
      title: "Request Your Quote",
      description: "Enter your vehicle details. Our shipping experts verify routes and carrier availability—quote in 30 minutes.",
      features: [
        "No hidden fees",
        "No credit card required",
        "Expert-verified pricing",
      ],
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: CheckCircle,
      number: "2",
      title: "Book Online",
      description: "Love your quote? Book in 2 minutes. We assign a licensed, insured carrier from our vetted network.",
      features: [
        "Vetted carriers only",
        "$1M+ insurance",
        "4.5+ star ratings",
      ],
      iconBg: "bg-success/10",
      iconColor: "text-success",
    },
    {
      icon: Truck,
      number: "3",
      title: "Track & Receive",
      description: "Relax while we handle the rest. Track your car in real-time. Delivered door-to-door in 5-7 days.",
      features: [
        "Real-time GPS tracking",
        "Text/email updates",
        "Door-to-door delivery",
      ],
      iconBg: "bg-warning/10",
      iconColor: "text-warning",
    },
  ];

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
            Ship Your Car in 3 Easy Steps
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            No complicated forms. No endless phone calls. Just simple, fast shipping.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
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
              <div className={`${step.iconBg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative`}>
                <step.icon className={`w-10 h-10 ${step.iconColor}`} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                {step.title}
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {step.description}
              </p>

              <ul className="space-y-2 text-left max-w-xs mx-auto">
                {step.features.map((feature) => (
                  <li 
                    key={feature} 
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button variant="hero" size="xl">
            Get My Quote (30 Min)
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
