import { TestimonialsSectionProps } from "@/types/landing-page.types";
import { motion } from "framer-motion";
import { Star, CheckCircle, Car, MapPin } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  vehicle: string;
  route: string;
  quote: string;
  verified: boolean;
}

const TestimonialCard = ({
  name,
  location,
  rating,
  vehicle,
  route,
  quote,
  verified,
}: TestimonialCardProps) => {
  return (
    <div className="bg-card rounded-xl shadow-lg p-6 border border-border/50 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">
            {name.charAt(0)}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-card-foreground">{name}</span>
            {verified && (
              <span className="inline-flex items-center gap-1 text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location}
          </div>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: rating }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-warning text-warning"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="bg-muted rounded-lg p-3 mb-4 flex items-center gap-2">
        <Car className="w-4 h-4 text-muted-foreground" />
        <div>
          <div className="font-semibold text-card-foreground text-sm">
            {vehicle}
          </div>
          <div className="text-muted-foreground text-xs">{route}</div>
        </div>
      </div>

      {/* Quote */}
      <blockquote className="text-muted-foreground italic leading-relaxed flex-1">
        "{quote}"
      </blockquote>
    </div>
  );
};

const TestimonialsSection = ({ title, subTitle, testimonials, reviewsInfo, testimonialsLink }: TestimonialsSectionProps) => {

  return (
    <section id="reviews" className="py-20 md:py-28 bg-muted/30">
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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>

        {/* More Reviews Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="flex items-center justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-warning text-warning" />
            ))}
            <span className="ml-2 text-lg font-semibold text-foreground">
              {reviewsInfo}
            </span>
          </div>
          <a
            href="/reviews"
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
          >
            {testimonialsLink}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
