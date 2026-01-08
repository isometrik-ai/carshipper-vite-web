import { useFooter } from "@/hooks/useFooter";
import { Truck, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const footer = useFooter();
  const currentYear = new Date().getFullYear();

  if (!footer) return null;

  const {
    brandName,
    brandAccent,
    description,
    phoneNumber,
    email,
    availabilityNote,
    followUpNote,
    footerNavigationGroup,
    footerLinkGroups,
    bottomLinks,
    copyrightsText,
    mcNumber,
    dotNumber,
  } = footer;

  // Extract rich text description
  const descriptionText =
    description?.[0]?.children?.map((c) => c.text).join("") || "";

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>

              <span className="text-xl font-bold">
                {brandName}
                <span className="text-accent">.{brandAccent}</span>
              </span>
            </a>

            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              {descriptionText}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
                {phoneNumber}
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
                {email}
              </a>

              <p className="text-primary-foreground/70 text-sm">
                {availabilityNote}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-primary-foreground/70 text-sm">
                {followUpNote}:
              </span>

              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Navigation Groups */}
          {footerNavigationGroup?.map((group) => (
            <div key={group.id}>
              <h4 className="font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.footerNavLinks?.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* SEO Link Groups */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {footerLinkGroups?.map((group) => (
              <div key={group.id}>
                <h5 className="text-sm font-semibold mb-3 text-primary-foreground/80">
                  {group.groupTitle}
                </h5>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  {group.footerNavLinks?.map((link, idx) => (
                    <span key={link.id} className="flex items-center">
                      <a
                        href={link.url}
                        className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </a>

                      {idx < group.footerNavLinks.length - 1 && (
                        <span className="text-primary-foreground/30 ml-2">|</span>
                      )}
                    </span>
                  ))}

                  <span className="text-primary-foreground/30">|</span>

                  <a
                    href={group.viewAllUrl}
                    className="text-accent hover:text-accent/80 transition-colors"
                  >
                    {group.viewAllLabel}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">

            <p>
              © {currentYear} {copyrightsText} | {mcNumber} | {dotNumber}
            </p>

            <div className="flex items-center gap-4">
              {bottomLinks?.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
