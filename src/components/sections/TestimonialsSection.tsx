import { useMemo } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle, Car, MapPin } from "lucide-react";
import type { TestimonialsDisplay, Testimonial } from "@/types/LandingPage.types";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <article className="bg-card rounded-xl shadow-lg p-6 border border-border/50 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center" aria-hidden="true">
          <span className="text-2xl font-bold text-primary">
            {testimonial.customer_name.charAt(0)}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-card-foreground">{testimonial.customer_name}</span>
            {testimonial.is_verified ? (
              <span className="inline-flex items-center gap-1 text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3" aria-hidden="true" />
                Verified
              </span>
            ) : null}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" aria-hidden="true" />
            {testimonial.location}
          </div>
          <div className="flex items-center gap-1 mt-1" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-warning text-warning"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="bg-muted rounded-lg p-3 mb-4 flex items-center gap-2">
        <Car className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
        <div>
          <div className="font-semibold text-card-foreground text-sm">
            {testimonial.vehicle_info}
          </div>
          <div className="text-muted-foreground text-xs">{testimonial.route_info}</div>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-muted-foreground italic leading-relaxed flex-1">
        "{testimonial.quote_text}"
      </blockquote>
    </article>
  );
};

interface TestimonialsSectionProps {
  data?: TestimonialsDisplay;
}

const TestimonialsSection = ({ data }: TestimonialsSectionProps) => {
  // Extract data with fallbacks
  const sectionData = useMemo(() => {
    return {
      sectionTitle: data?.section_title || "What Our Customers Say",
      sectionSubtitle: data?.section_subtitle || "Real reviews from real customers",
      ratingSummary: data?.rating_summary || "4.9/5 from 2,847 reviews",
      viewAllLink: data?.view_all_link || "/reviews",
      testimonials: data?.testimonials || [],
    };
  }, [data]);

  return (
    <section id="reviews" className="py-20 md:py-28 bg-muted/30" aria-labelledby="testimonials-heading">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {sectionData.sectionTitle}
          </h2>
          {sectionData.sectionSubtitle ? (
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {sectionData.sectionSubtitle}
            </p>
          ) : null}
        </motion.div>

        {sectionData.testimonials.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Customer testimonials">
            {sectionData.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id || testimonial.customer_name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                role="listitem"
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        ) : null}

        {/* More Reviews Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center gap-1 mb-4" role="img" aria-label={sectionData.ratingSummary}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-warning text-warning" aria-hidden="true" />
            ))}
            <span className="ml-2 text-lg font-semibold text-foreground">
              {sectionData.ratingSummary}
            </span>
          </div>
          <a
            href={sectionData.viewAllLink}
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
            aria-label="View all customer reviews"
          >
            Read All Reviews →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
