import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHeader } from "@/hooks/useHeader";

const Header = () => {
  const header = useHeader();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!header) {
    return (
      <header className="h-16 md:h-20 flex items-center px-4">
        <span className="text-muted-foreground">Loading...</span>
      </header>
    );
  }

  const {
    brandName,
    brandAccent,
    phoneNumberLabel,
    ctaText,
    ctaLink,
    navLinks,
  } = header;


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              {brandName}
              <span className="text-accent">{brandAccent}</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks?.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${phoneNumberLabel}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{phoneNumberLabel}</span>
            </a>

            <Button variant="hero" size="default" asChild>
              <a href={ctaLink}>{ctaText}</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-4">
                {navLinks?.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    className="text-foreground font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}

                <hr className="border-border" />

                <a
                  href={`tel:${phoneNumberLabel}`}
                  className="flex items-center gap-2 text-foreground font-medium py-2"
                >
                  <Phone className="w-4 h-4" />
                  {phoneNumberLabel}
                </a>

                <Button variant="hero" size="lg" className="w-full" asChild>
                  <a href={ctaLink}>{ctaText}</a>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
