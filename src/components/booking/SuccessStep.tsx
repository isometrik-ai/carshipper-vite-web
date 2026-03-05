import { motion } from "framer-motion";
import { CheckCircle, Calendar, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookingFormData } from "@/containers/BookingPage";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface SuccessStepProps {
  formData: BookingFormData;
  quoteId: string;
  tier: "saver" | "priority" | "rush";
  price: number;
  vehicle: { year: number; make: string; model: string };
}

const tierNames = {
  saver: "Saver Rate",
  priority: "Priority Rate",
  rush: "Rush Service",
};

export function SuccessStep({ formData, quoteId, tier, price, vehicle }: SuccessStepProps) {
  useEffect(() => {
    // Trigger confetti on mount
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#10B981", "#3B82F6", "#F59E0B"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#10B981", "#3B82F6", "#F59E0B"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-card text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-success" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            Booking Confirmed! 🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground mb-8"
          >
            Your reservation has been submitted successfully. We're on it!
          </motion.p>

          {/* Confirmation Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-muted rounded-xl p-6 mb-8 text-left"
          >
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Confirmation #</span>
                <p className="font-bold text-lg text-primary">CS-{quoteId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Service</span>
                <p className="font-semibold">{tierNames[tier]}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Vehicle</span>
                <p className="font-semibold">{vehicle.year} {vehicle.make} {vehicle.model}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Total Price</span>
                <p className="font-bold text-lg text-success">${price.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-left mb-8"
          >
            <h3 className="font-semibold text-foreground mb-4">What Happens Next?</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Check Your Email</p>
                  <p className="text-sm text-muted-foreground">
                    We've sent a confirmation to {formData.email}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Carrier Assignment</p>
                  <p className="text-sm text-muted-foreground">
                    We'll match you with a carrier 24-72 hours before your pickup date
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Stay Connected</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive SMS updates at {formData.phone}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                Back to Home
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={`mailto:support@carshippers.ai?subject=Booking%20CS-${quoteId}`}>
                Contact Support
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Contact Info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
        Questions? Call us 24/7 at{" "}
          <a href="tel:8005531828" className="text-primary font-medium hover:underline">
            (800) 553-1828
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}
