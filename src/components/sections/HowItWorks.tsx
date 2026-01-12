import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle, Truck, ArrowRight, UserCheck, ClipboardCheck, CreditCard, MapPin } from "lucide-react";
import { RichTextBlock } from "@/types/how-it-works.types";
import type { LucideIcon } from "lucide-react";
import { HOW_IT_WORKS_ENDPOINT } from "@/constants/apiConstants";

// Expanded icon map to match the icons used in your shipping process JSON
const iconMap: Record<string, LucideIcon> = {
  FileText,
  CheckCircle,
  Truck,
  UserCheck,
  ClipboardCheck,
  CreditCard,
  MapPin,
};

const HowItWorks = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHowItWorks = async () => {
      try {
        // Fetching data from your optimized endpoint
        const response = await axios.get(HOW_IT_WORKS_ENDPOINT);
        if (response.data?.data) {
          // Strapi v5 returns data directly in response.data.data
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching How It Works data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHowItWorks();
  }, []);

  // Skeleton/Loading state
  if (loading) return null;

  // Destructure based on your Strapi JSON structure
  const shipping = data?.shipping;
  if (!shipping) return null;

  const title = shipping.title;
  const subTitle = shipping.descrption; // Matching your JSON's typo "descrption"
  const steps = shipping.shipping_process || [];

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
            {title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {subTitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            // Map the string icon_name from Strapi to the Lucide Component
            const IconComponent = step.icon_name ? iconMap[step.icon_name] : FileText;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Connector Line - Only show between items in 3-column grid */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-border" />
                )}

                {/* Icon Container */}
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <IconComponent className="w-10 h-10 text-primary" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.serial_no}
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                  {step.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Est. Time: {step.time}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button variant="hero" size="xl">
            Get Your Free Quote
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;