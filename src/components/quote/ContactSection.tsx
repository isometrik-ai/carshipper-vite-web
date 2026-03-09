import { Phone, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/AnimationWrappers";
import { motion } from "framer-motion";

export function ContactSection() {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Questions About Your Quote?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our team is here 24/7 to help
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="gap-2">
                  <a href="tel:8005531828">
                    <Phone className="w-5 h-5" />
                    Call Us
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" variant="outline" className="gap-2 border-success text-success hover:bg-success hover:text-success-foreground">
                  <a href="sms:8005531828">
                    <MessageCircle className="w-5 h-5" />
                    Text Us
                  </a>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <a href="mailto:support@carshippers.ai">
                    <Mail className="w-5 h-5" />
                    Email
                  </a>
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
