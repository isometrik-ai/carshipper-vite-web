'use client';

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHeader } from "@/api/header";
import { getIcon, DEFAULT_ICON } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";
import type { HeaderData, NavLink } from "@/types/Header.types";

const isInternalLink = (href: string | null | undefined) =>
  typeof href === "string" && href.startsWith("/") && !href.startsWith("//");

// Constants
const DEFAULT_LOGO_TEXT = "CarShippers";
const DEFAULT_LOGO_HIGHLIGHT = ".ai";
const DEFAULT_LOGO_ICON = "Truck";
const DEFAULT_PHONE = "(888) 555-1234";
const DEFAULT_PHONE_HREF = "tel:+18885551234";
const DEFAULT_CTA_TEXT = "Get Instant Quote";

const FALLBACK_NAV_LINKS: NavLink[] = [
  { id: 1, label: "How It Works", href: "/how-it-works", icon_name: null },
  { id: 2, label: "Pricing", href: "/pricing", icon_name: null },
  { id: 3, label: "About", href: "/about", icon_name: null },
  { id: 4, label: "FAQ", href: "/faq", icon_name: null },
  { id: 5, label: "Contact", href: "/contact", icon_name: null },
];

// Sub-components for better organization and performance
interface LogoProps {
  logoText: string;
  logoHighlight: string;
  logoIcon: LucideIcon;
}

const Logo = ({ logoText, logoHighlight, logoIcon: LogoIcon }: LogoProps) => (
  <Link
    href="/"
    className="flex items-center gap-2"
    aria-label={`${logoText}${logoHighlight} - Home`}
  >
    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
      <LogoIcon className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
    </div>
    <span className="text-xl font-bold text-foreground">
      {logoText}<span className="text-accent">{logoHighlight}</span>
    </span>
  </Link>
);

interface NavigationProps {
  links: NavLink[];
  onLinkClick?: () => void;
  isMobile?: boolean;
}

const Navigation = ({ links, onLinkClick, isMobile = false }: NavigationProps) => {
  const displayLinks = links.length > 0 ? links : FALLBACK_NAV_LINKS;
  const baseClassName = isMobile
    ? "text-foreground font-medium py-2"
    : "text-muted-foreground hover:text-foreground font-medium transition-colors";

  return (
    <>
      {displayLinks.map((link) =>
        isInternalLink(link.href) ? (
          <Link
            key={link.id || link.href}
            href={link.href}
            className={baseClassName}
            onClick={onLinkClick}
          >
            {link.label}
          </Link>
        ) : (
          <a
            key={link.id || link.href}
            href={link.href}
            className={baseClassName}
            onClick={onLinkClick}
          >
            {link.label}
          </a>
        )
      )}
    </>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  phoneNumber: string;
  phoneHref: string;
  ctaButtonText: string;
  ctaButtonLink: string | null;
}

const MobileMenu = ({
  isOpen,
  onClose,
  navLinks,
  phoneNumber,
  phoneHref,
  ctaButtonText,
  ctaButtonLink
}: MobileMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        id="mobile-menu"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className="md:hidden bg-background border-b border-border"
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            <Navigation links={navLinks} onLinkClick={onClose} isMobile />
            <hr className="border-border" aria-hidden="true" />
            <a
              href={phoneHref}
              className="flex items-center gap-2 text-foreground font-medium py-2"
              aria-label={`Call us at ${phoneNumber}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {phoneNumber}
            </a>
            {ctaButtonLink ? (
              <Button variant="hero" size="lg" className="w-full" asChild>
                {isInternalLink(ctaButtonLink) ? (
                  <Link href={ctaButtonLink}>{ctaButtonText}</Link>
                ) : (
                  <a href={ctaButtonLink}>{ctaButtonText}</a>
                )}
              </Button>
            ) : (
              <Button variant="hero" size="lg" className="w-full">
                {ctaButtonText}
              </Button>
            )}
          </nav>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data, isLoading } = useHeader();

  // Memoize header data extraction to avoid recalculation on every render
  const headerData = useMemo(() => {
    const rawData = data?.data;
    return {
      logoText: rawData?.logo_text || DEFAULT_LOGO_TEXT,
      logoHighlight: rawData?.logo_highlight || DEFAULT_LOGO_HIGHLIGHT,
      logoIconName: rawData?.logo_icon_name || DEFAULT_LOGO_ICON,
      phoneNumber: rawData?.phone_number || DEFAULT_PHONE,
      phoneHref: rawData?.phone_href || DEFAULT_PHONE_HREF,
      ctaButtonText: rawData?.cta_button_text || DEFAULT_CTA_TEXT,
      ctaButtonLink: rawData?.cta_button_link || null,
      navLinks: rawData?.navigation_links || [],
    };
  }, [data]);

  // Memoize icon component to avoid recalculation
  const LogoIcon = useMemo(
    () => getIcon(headerData.logoIconName),
    [headerData.logoIconName]
  );

  // Memoize event handlers to prevent unnecessary re-renders
  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Show minimal loading state - don't block the entire header
  if (isLoading && !data) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Logo
              logoText={DEFAULT_LOGO_TEXT}
              logoHighlight={DEFAULT_LOGO_HIGHLIGHT}
              logoIcon={DEFAULT_ICON}
            />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo
            logoText={headerData.logoText}
            logoHighlight={headerData.logoHighlight}
            logoIcon={LogoIcon}
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <Navigation links={headerData.navLinks} />
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={headerData.phoneHref}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Call us at ${headerData.phoneNumber}`}
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span className="font-medium">{headerData.phoneNumber}</span>
            </a>
            {headerData.ctaButtonLink ? (
              <Button variant="hero" size="default" asChild>
                {isInternalLink(headerData.ctaButtonLink) ? (
                  <Link href={headerData.ctaButtonLink}>{headerData.ctaButtonText}</Link>
                ) : (
                  <a href={headerData.ctaButtonLink}>{headerData.ctaButtonText}</a>
                )}
              </Button>
            ) : (
              <Button variant="hero" size="default">
                {headerData.ctaButtonText}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={handleMenuClose}
        navLinks={headerData.navLinks}
        phoneNumber={headerData.phoneNumber}
        phoneHref={headerData.phoneHref}
        ctaButtonText={headerData.ctaButtonText}
        ctaButtonLink={headerData.ctaButtonLink}
      />
    </header>
  );
};

export default Header;
