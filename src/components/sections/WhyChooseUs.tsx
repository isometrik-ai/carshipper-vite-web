import { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { getIcon } from "@/lib/icons";
import type { ComparisonSection } from "@/types/LandingPage.types";
import type { LucideIcon } from "lucide-react";

interface WhyChooseUsProps {
  data?: ComparisonSection;
}

const WhyChooseUs = ({ data }: WhyChooseUsProps) => {
  // Extract data with fallbacks
  const sectionData = useMemo(() => {
    return {
      sectionTitle: data?.section_title || "Why 10,000+ Customers Choose CarShippers.ai",
      sectionSubtitle: data?.section_subtitle || "We're not your typical car shipping broker",
      columns: data?.columns || [],
    };
  }, [data]);

  // If no columns from API, use default comparison data
  const comparisons = useMemo(() => {
    if (sectionData.columns.length > 0) {
      return sectionData.columns.map((column) => {
        // Use features if available, otherwise use bullet_points
        const featureItems = column.features && column.features.length > 0
          ? column.features.map((f) => ({
              text: f.text,
              subtext: f.subtext || null,
              positive: f.is_positive,
            }))
          : column.bullet_points.map((bp) => ({
              text: bp.text,
              subtext: null,
              positive: column.is_highlighted ? true : null,
            }));
        
        return {
          title: column.column_title,
          highlight: column.is_highlighted,
          icon: column.icon_name,
          features: featureItems,
        };
      });
    }
    
    // Fallback to default data
    return [
      {
        title: "CarShippers.ai",
        highlight: true,
        icon: "checkCircle",
        features: [
          { text: "30-Minute Quotes", subtext: "Expert-verified, accurate pricing", positive: true },
          { text: "No Hidden Fees", subtext: "What you see is what you pay", positive: true },
          { text: "Human + AI", subtext: "Real experts review every quote", positive: true },
          { text: "Real-Time Tracking", subtext: "GPS updates, text alerts", positive: true },
          { text: "Vetted Carriers Only", subtext: "4.5+ stars, $1M+ insurance", positive: true },
        ],
      },
      {
        title: "Traditional Brokers",
        highlight: false,
        icon: null,
        features: [
          { text: "2-4 Hour Quotes", subtext: "Wait for callback", positive: false },
          { text: "Hidden Fees", subtext: "Surprise charges at delivery", positive: false },
          { text: "Business Hours Only", subtext: "9-5pm weekdays", positive: false },
          { text: "Phone Tag", subtext: "Miss calls, no updates", positive: false },
          { text: "Inconsistent Quality", subtext: "Carriers not vetted", positive: false },
        ],
      },
      {
        title: "DIY Marketplaces",
        highlight: false,
        icon: null,
        features: [
          { text: "You Do the Work", subtext: "Compare 20+ bids yourself", positive: null },
          { text: "Quality Varies", subtext: "Unvetted carriers bid", positive: null },
          { text: "No Support", subtext: "You're on your own", positive: null },
          { text: "Slow Process", subtext: "Wait days for bids", positive: null },
          { text: "Risky", subtext: "Lowest bidder ≠ best quality", positive: null },
        ],
      },
    ];
  }, [sectionData.columns]);

  return (
    <section className="py-20 md:py-28 bg-muted/30" aria-labelledby="why-choose-us-heading">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 id="why-choose-us-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {sectionData.sectionTitle}
          </h2>
          {sectionData.sectionSubtitle ? (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {sectionData.sectionSubtitle}
            </p>
          ) : null}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8" role="list" aria-label="Comparison columns">
          {comparisons.map((column, columnIndex) => {
            const ColumnIcon = column.icon 
              ? (getIcon(column.icon) as LucideIcon)
              : null;
            
            return (
              <motion.div
                key={column.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: columnIndex * 0.1 }}
                className={`rounded-2xl p-6 md:p-8 ${
                  column.highlight
                    ? "bg-primary text-primary-foreground shadow-xl scale-[1.02]"
                    : "bg-card border border-border shadow-lg"
                }`}
                role="listitem"
              >
                <h3 className={`text-xl md:text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2 ${
                  column.highlight ? "text-primary-foreground" : "text-card-foreground"
                }`}>
                  {ColumnIcon ? <ColumnIcon className="w-6 h-6" aria-hidden="true" /> : null}
                  {column.title}
                </h3>

                <ul className="space-y-4" role="list">
                  {column.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3" role="listitem">
                      {feature.positive === true ? (
                        <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                      ) : feature.positive === false ? (
                        <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" aria-hidden="true" />
                      )}
                      <div>
                        <div className={`font-semibold ${
                          column.highlight ? "text-primary-foreground" : "text-card-foreground"
                        }`}>
                          {feature.text}
                        </div>
                        {"subtext" in feature && feature.subtext ? (
                          <div className={`text-sm ${
                            column.highlight ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}>
                            {feature.subtext}
                          </div>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
