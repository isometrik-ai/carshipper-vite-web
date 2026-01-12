import { CheckCircle, LucideIcon, Shield, Star, Truck } from "lucide-react";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { HeroSectionData } from "@/types/landing-page.types";


const iconMap: Record<string, LucideIcon> = {
  CheckCircle,
  Star,
  Shield
};

const HeroSection = ({ heroSectionData }: { heroSectionData: HeroSectionData | undefined }) => {
  const { hero_title, hero_title_highlight, description, secondary_description, hero_section_tagline, Stats } = heroSectionData as HeroSectionData;

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />

      {/* Additional Accent Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary-foreground"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <Truck className="w-4 h-4" />
              <span className="text-sm font-medium">{hero_section_tagline}</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {hero_title}
              <span className="text-gradient">{hero_title_highlight}</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/80 leading-relaxed">
              {description}
              <br className="hidden md:block" />
              {secondary_description}
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 md:gap-6">
              {Stats.map((indicator, index) => {
                const IconComponent = iconMap[indicator.icon_name];
                return <motion.div
                  key={indicator.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="w-5 h-5 text-success" />
                  <span className="text-sm md:text-base text-primary-foreground/90">
                    {indicator.label}
                  </span>
                </motion.div>
              })}
            </div>

            {/* Stats Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/20"
            >
              <div>
                <div className="text-3xl md:text-4xl font-bold">30m</div>
                <div className="text-sm text-primary-foreground/70">Expert Quotes</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">10K+</div>
                <div className="text-sm text-primary-foreground/70">Cars Shipped</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">$0</div>
                <div className="text-sm text-primary-foreground/70">Hidden Fees</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Quote Form */}
          <div className="lg:pl-8">
            <QuoteForm />
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
