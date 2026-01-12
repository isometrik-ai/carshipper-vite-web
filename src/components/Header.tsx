import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Truck, LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHeader } from "@/hooks/api/useHeader";

// Helper to map string icon names from Strapi to Lucide components 
const IconMap: Record<string, LucideIcon> = {
  Truck: Truck,
  Phone: Phone,
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: headerResponse, isLoading, error } = useHeader();

  if (isLoading || error || !headerResponse?.data) return null;

  const data = headerResponse.data;

  // Destructure for cleaner access based on JSON structure 
  const { logoText, logoHighlight, logoIconName, navLinks, headerCTA } = data;
  const LogoIcon = IconMap[logoIconName] || Truck;
  const CTAIcon = IconMap[headerCTA.iconName] || Phone;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo Section  */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <LogoIcon className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              {logoText}<span className="text-accent">{logoHighlight}</span>
            </span>
          </a>

          {/* Desktop Navigation  */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link: any) => (
              <a
                key={link.id}
                href={link.href}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Area  */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={headerCTA.phoneHref}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <CTAIcon className="w-4 h-4" />
              <span className="font-medium">{headerCTA.phoneText}</span>
            </a>
            <Button variant="hero" size="default">
              {headerCTA.buttonLabel}
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

      {/* Mobile Menu  */}
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
                {navLinks.map((link: any) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="text-foreground font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="border-border" />
                <a
                  href={headerCTA.phoneHref}
                  className="flex items-center gap-2 text-foreground font-medium py-2"
                >
                  <CTAIcon className="w-4 h-4" />
                  {headerCTA.phoneText}
                </a>
                <Button variant="hero" size="lg" className="w-full">
                  {headerCTA.buttonLabel}
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