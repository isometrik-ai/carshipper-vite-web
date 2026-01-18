import { useMemo } from "react";
import { Phone, Mail } from "lucide-react";
import { useFooter } from "@/api/footer";
import { getIcon, getSocialIcon, DEFAULT_ICON } from "@/lib/icons";
import type { LucideIcon } from "lucide-react";

// Constants
const DEFAULT_LOGO_TEXT = "CarShippers";
const DEFAULT_LOGO_HIGHLIGHT = ".ai";
const DEFAULT_LOGO_ICON = "Truck";
const DEFAULT_DESCRIPTION = "AI-powered car shipping. Get instant quotes, transparent pricing, and door-to-door service from licensed carriers.";
const DEFAULT_PHONE = "(888) 555-1234";
const DEFAULT_PHONE_HREF = "tel:+18885551234";
const DEFAULT_EMAIL = "info@carshippers.ai";
const DEFAULT_EMAIL_HREF = "mailto:info@carshippers.ai";
const DEFAULT_AVAILABILITY = "Available 24/7";
const DEFAULT_SOCIAL_LABEL = "Follow us:";
const DEFAULT_COPYRIGHT = "CarShippers.ai. All rights reserved.";
const DEFAULT_MC_NUMBER = "MC #XXXXXX";
const DEFAULT_DOT_NUMBER = "DOT #XXXXXX";

// Sub-components for better organization
interface LogoProps {
  logoText: string;
  logoHighlight: string;
  logoIcon: LucideIcon;
}

const Logo = ({ logoText, logoHighlight, logoIcon: LogoIcon }: LogoProps) => (
  <a href="/" className="flex items-center gap-2 mb-6" aria-label={`${logoText}${logoHighlight} - Home`}>
    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
      <LogoIcon className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
    </div>
    <span className="text-xl font-bold">
      {logoText}<span className="text-accent">{logoHighlight}</span>
    </span>
  </a>
);

interface SocialLinkItem {
  icon: LucideIcon | null;
  url: string;
  label: string;
}

interface SocialLinksProps {
  label: string;
  links: SocialLinkItem[];
}

const SocialLinks = ({ label, links }: SocialLinksProps) => {
  const validLinks = links.filter((link) => link.icon !== null);

  if (validLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-3 mt-6">
      <span className="text-primary-foreground/70 text-sm">{label}</span>
      {validLinks.map((social) => {
        const SocialIcon = social.icon;
        if (!SocialIcon) return null;

        return (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
            aria-label={social.label}
          >
            <SocialIcon className="w-4 h-4" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
};

interface LinkGroupProps {
  heading: string;
  links: Array<{ id: number; label: string; href: string }>;
}

const LinkGroup = ({ heading, links }: LinkGroupProps) => (
  <div>
    <h4 className="font-semibold mb-4">{heading}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.id || link.label}>
          <a 
            href={link.href}
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

interface SeoLinkGroupProps {
  groupTitle: string;
  viewAllLabel: string;
  viewAllHref: string;
  links: Array<{ id: number; label: string; href: string }>;
}

const SeoLinkGroup = ({ groupTitle, viewAllLabel, viewAllHref, links }: SeoLinkGroupProps) => (
  <div>
    <h5 className="text-sm font-semibold mb-3 text-primary-foreground/80">{groupTitle}</h5>
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      {links.map((link, index) => (
        <span key={link.id || link.label} className="flex items-center">
          <a 
            href={link.href}
            className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
          >
            {link.label}
          </a>
          {index < links.length - 1 && (
            <span className="text-primary-foreground/30 ml-2" aria-hidden="true">|</span>
          )}
        </span>
      ))}
      <span className="text-primary-foreground/30" aria-hidden="true">|</span>
      <a href={viewAllHref} className="text-accent hover:text-accent/80 transition-colors">
        {viewAllLabel}
      </a>
    </div>
  </div>
);

const Footer = () => {
  const { data, isLoading } = useFooter();
  const currentYear = new Date().getFullYear();

  // Memoize footer data extraction
  const footerData = useMemo(() => {
    const rawData = data?.data;
    return {
      logoText: rawData?.logo_text || DEFAULT_LOGO_TEXT,
      logoHighlight: rawData?.logo_highlight || DEFAULT_LOGO_HIGHLIGHT,
      logoIconName: rawData?.logo_icon_name || DEFAULT_LOGO_ICON,
      description: rawData?.description || DEFAULT_DESCRIPTION,
      phoneNumber: rawData?.phone_number || DEFAULT_PHONE,
      phoneHref: rawData?.phone_href || DEFAULT_PHONE_HREF,
      email: rawData?.email || DEFAULT_EMAIL,
      emailHref: rawData?.email_href || DEFAULT_EMAIL_HREF,
      availabilityNote: rawData?.availability_note || DEFAULT_AVAILABILITY,
      socialLinksLabel: rawData?.social_links_label || DEFAULT_SOCIAL_LABEL,
      copyrightText: rawData?.copyright_text || DEFAULT_COPYRIGHT,
      mcNumber: rawData?.mc_number || DEFAULT_MC_NUMBER,
      dotNumber: rawData?.dot_number || DEFAULT_DOT_NUMBER,
      socialLinks: rawData?.social_links || [],
      linkGroups: rawData?.link_groups || [],
      seoLinkGroups: rawData?.seo_link_groups || [],
      bottomLinks: rawData?.bottom_links || [],
    };
  }, [data]);

  // Memoize logo icon
  const LogoIcon = useMemo(
    () => getIcon(footerData.logoIconName),
    [footerData.logoIconName]
  );

  // Memoize social links with icons
  const socialLinksWithIcons = useMemo(() => {
    return footerData.socialLinks.map((social) => ({
      icon: getSocialIcon(social.icon_name),
      url: social.url,
      label: social.label || social.icon_name || "Social Link",
    }));
  }, [footerData.socialLinks]);

  // Format copyright text with current year
  const copyrightText = useMemo(() => {
    const year = currentYear.toString();
    // Replace year placeholder if exists, otherwise prepend year
    if (footerData.copyrightText.includes(year)) {
      return footerData.copyrightText;
    }
    // If copyright text already has a year pattern, use it as-is
    if (/\d{4}/.test(footerData.copyrightText)) {
      return footerData.copyrightText;
    }
    return `© ${year} ${footerData.copyrightText}`;
  }, [footerData.copyrightText, currentYear]);

  // Show minimal loading state
  if (isLoading && !data) {
    return (
      <footer className="bg-foreground text-primary-foreground">
        <div className="container mx-auto px-4 py-16">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <DEFAULT_ICON className="w-6 h-6 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold">
              {DEFAULT_LOGO_TEXT}<span className="text-accent">{DEFAULT_LOGO_HIGHLIGHT}</span>
            </span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo
              logoText={footerData.logoText}
              logoHighlight={footerData.logoHighlight}
              logoIcon={LogoIcon}
            />
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              {footerData.description}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href={footerData.phoneHref} 
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label={`Call us at ${footerData.phoneNumber}`}
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                {footerData.phoneNumber}
              </a>
              <a 
                href={footerData.emailHref} 
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label={`Email us at ${footerData.email}`}
              >
                <Mail className="w-5 h-5" aria-hidden="true" />
                {footerData.email}
              </a>
              {footerData.availabilityNote && (
                <p className="text-primary-foreground/70 text-sm">
                  {footerData.availabilityNote}
                </p>
              )}
            </div>

            {/* Social Links */}
            <SocialLinks 
              label={footerData.socialLinksLabel} 
              links={socialLinksWithIcons}
            />
          </div>

          {/* Link Groups */}
          {footerData.linkGroups.map((group) => (
            <LinkGroup
              key={group.id || group.heading}
              heading={group.heading}
              links={group.links}
            />
          ))}
        </div>
      </div>

      {/* SEO Links Section */}
      {footerData.seoLinkGroups.length > 0 && (
        <div className="border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-6">
              {footerData.seoLinkGroups.map((seoGroup) => (
                <SeoLinkGroup
                  key={seoGroup.id || seoGroup.group_title}
                  groupTitle={seoGroup.group_title}
                  viewAllLabel={seoGroup.view_all_label}
                  viewAllHref={seoGroup.view_all_href}
                  links={seoGroup.links}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>
              {copyrightText} | {footerData.mcNumber} | {footerData.dotNumber}
            </p>
            {footerData.bottomLinks.length > 0 && (
              <nav aria-label="Footer bottom links">
                <div className="flex items-center gap-4">
                  {footerData.bottomLinks.map((link) => (
                    <a 
                      key={link.id || link.label}
                      href={link.href} 
                      className="hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
