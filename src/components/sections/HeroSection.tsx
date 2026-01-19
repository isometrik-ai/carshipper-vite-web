import { useMemo } from "react";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import { getIcon, DEFAULT_ICON } from "@/lib/icons";
import { getStrapiMediaUrl } from "@/lib/strapi";
import type { HeroSection as HeroSectionType } from "@/types/LandingPage.types";
import type { LucideIcon } from "lucide-react";

interface HeroSectionProps {
  data?: HeroSectionType;
  showQuoteForm?: boolean;
}

const HeroSection = ({ data, showQuoteForm = true }: HeroSectionProps) => {
  // Extract data with fallbacks
  const heroData = useMemo(() => {
    return {
      tagline: data?.tagline || "AI-Powered Car Shipping",
      mainHeadline: data?.main_headline || "Ship Your Car Anywhere in the US",
      highlightedText: data?.highlighted_text || "in 30 Minutes",
      description: data?.description || "Expert-verified quotes. Licensed carriers. Door-to-door service.",
      secondaryDescription: data?.secondary_description,
      taglineIcon: data?.tagline_icon || "Truck",
      trustIndicators: data?.trust_indicators || [
        { id: 1, text: "Licensed & Bonded (MC #123456)", icon_name: "checkCircle" },
        { id: 2, text: "Fully Insured Carriers", icon_name: "shield" },
        { id: 3, text: "4.9★ from 2,847 Customers", icon_name: "star" },
      ],
      statistics: data?.statistics || [
        { id: 1, value: "30m", label: "Expert Quotes" },
        { id: 2, value: "10K+", label: "Cars Shipped" },
        { id: 3, value: "$0", label: "Hidden Fees" },
      ],
      backgroundImage: data?.background_image,
    };
  }, [data]);

  // Get tagline icon
  const TaglineIcon = useMemo(
    () => getIcon(heroData.taglineIcon) as LucideIcon,
    [heroData.taglineIcon]
  );

  // Get background image URL
  const backgroundImageUrl = useMemo(() => {
    if (heroData.backgroundImage?.url) {
      return getStrapiMediaUrl(heroData.backgroundImage.url);
    }
    return null;
  }, [heroData.backgroundImage]);

  return (
    <section 
      className={`relative ${showQuoteForm ? "min-h-screen pt-20" : "py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background"}`}
      aria-label="Hero section"
    >
      {/* Background Image - Only show for quote form variant */}
      {showQuoteForm ? (
        <>
          {backgroundImageUrl ? (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backgroundImageUrl})` }}
              role="img"
              aria-label={heroData.backgroundImage?.alternativeText || "Car shipping background"}
            />
          ) : (
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(/hero-bg.jpg)` }}
              role="img"
              aria-label="Car shipping background"
            />
          )}
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" aria-hidden="true" />
          
          {/* Additional Accent Overlay */}
          <div className="absolute inset-0 opacity-30" aria-hidden="true">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-success rounded-full blur-3xl" />
          </div>
        </>
      ) : null}

      <div className={`container mx-auto px-4 ${showQuoteForm ? "py-12 md:py-20 relative z-10" : ""}`}>
        <div className={`grid ${showQuoteForm ? "lg:grid-cols-2" : ""} gap-12 lg:gap-16 items-center`}>
          {/* Left: Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${showQuoteForm ? "text-primary-foreground" : "max-w-3xl mx-auto text-center"}`}
          >
            {heroData.tagline ? (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
              >
                <TaglineIcon className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">{heroData.tagline}</span>
              </motion.div>
            ) : null}

            <h1 className={`${showQuoteForm ? "text-4xl md:text-5xl lg:text-6xl" : "text-4xl md:text-5xl"} font-bold mb-6 leading-tight`}>
              {heroData.mainHeadline}{" "}
              {heroData.highlightedText ? (
                <span className={showQuoteForm ? "text-gradient" : "text-primary"}>{heroData.highlightedText}</span>
              ) : null}
            </h1>

            <p className={`${showQuoteForm ? "text-xl md:text-2xl text-primary-foreground/80" : "text-lg md:text-xl text-muted-foreground"} ${showQuoteForm ? "mb-8" : "mb-8"} leading-relaxed`}>
              {heroData.description}
              {heroData.secondaryDescription ? (
                <>
                  <br className="hidden md:block" />
                  {heroData.secondaryDescription}
                </>
              ) : null}
            </p>

            {/* Trust Indicators - Only show for quote form variant */}
            {showQuoteForm && heroData.trustIndicators.length > 0 ? (
              <div className="flex flex-wrap gap-4 md:gap-6" role="list" aria-label="Trust indicators">
                {heroData.trustIndicators.map((indicator, index) => {
                  const IndicatorIcon = getIcon(indicator.icon_name) as LucideIcon;
                  return (
                    <motion.div
                      key={indicator.id || indicator.text}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2"
                      role="listitem"
                    >
                      <IndicatorIcon className="w-5 h-5 text-success" aria-hidden="true" />
                      <span className="text-sm md:text-base text-primary-foreground/90">
                        {indicator.text}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            ) : null}

            {/* Stats Preview - Only show for quote form variant */}
            {showQuoteForm && heroData.statistics.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/20"
                role="list"
                aria-label="Statistics"
              >
                {heroData.statistics.map((stat) => (
                  <div key={stat.id || stat.label} role="listitem">
                    <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                    <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            ) : null}
          </motion.div>

          {/* Right: Quote Form */}
          {showQuoteForm ? (
            <div className="lg:pl-8" aria-label="Quote form section">
              <QuoteForm />
            </div>
          ) : null}
        </div>
      </div>

      {/* Wave Divider - Only show for quote form variant */}
      {showQuoteForm ? (
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            aria-hidden="true"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      ) : null}
    </section>
  );
};

export default HeroSection;
