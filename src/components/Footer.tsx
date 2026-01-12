import { Truck, Phone, Mail, Facebook, Twitter, Instagram, LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { FOOTER_ENDPOINT } from "@/constants/apiConstants";

// Helper to map string icon names to Lucide components
const IconMap: Record<string, LucideIcon> = {
  Truck: Truck,
  Phone: Phone,
  Mail: Mail,
  Facebook: Facebook,
  Twitter: Twitter,
  Instagram: Instagram,
};

const Footer = () => {
  const [data, setData] = useState<any>(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        // Deep populate for all nested links and columns [cite: 3, 4, 5]
        const response = await axios.get(FOOTER_ENDPOINT);
        if (response.data?.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchFooter();
  }, []);

  if (!data) return null;

  const LogoIcon = IconMap[data.logo_icon_name] || Truck;

  return (
    <footer className="bg-foreground text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <LogoIcon className="w-6 h-6 text-primary-foreground" />
              </div>

              <span className="text-xl font-bold">
                {data.logoText}<span className="text-accent">{data.logo_highlight_text}</span>
              </span>
            </a>

            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              {data.description}
            </p>


            {/* Contact Info */}
            <div className="space-y-3">
              {data.feature_items?.map((item: any) => {
                const ItemIcon = IconMap[item.icon_name] || Phone;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    <ItemIcon className="w-5 h-5" />
                    {item.text}
                  </a>
                );
              })}
              <p className="text-primary-foreground/70 text-sm">
                {data.availabilityNote}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-primary-foreground/70 text-sm">{data.contact_link_text}</span>
              {data.socialLinks?.map((social: any) => {
                const SocialIcon = IconMap[social.platform] || Facebook;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                    aria-label={social.platform}
                  >
                    <SocialIcon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Dynamic Navigation Columns (Company, Services, Resources) */}
          {data.footerColumn?.map((column: any) => (
            <div key={column.id}>
              <h4 className="font-semibold mb-4">{column.heading}</h4>
              <ul className="space-y-3">
                {column.links?.map((link: any) => (
                  <li key={link.id}>
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
          ))}
        </div>
      </div>

      {/* SEO Links Section (Horizontal Groups) */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {data.horizontalGroups?.map((group: any) => (
              <div key={group.id}>
                {group.groupTitle && (
                  <h5 className="text-sm font-semibold mb-3 text-primary-foreground/80">{group.groupTitle} </h5>
                )}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  {group.links?.map((link: any, index: number) => (
                    <span key={link.id} className="flex items-center">
                      <a
                        href={link.href}
                        className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                      {index < group.links.length - 1 && (
                        <span className="text-primary-foreground/30 ml-2">|</span>
                      )}
                    </span>
                  ))}
                  {group.viewAllLabel && (
                    <>
                      <span className="text-primary-foreground/30">|</span>
                      <a href={group.viewAllHref} className="text-accent hover:text-accent/80 transition-colors">
                        {group.viewAllLabel} →
                      </a>
                    </>
                  )}
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
              © {currentYear} {data.logoText}{data.logo_highlight_text}. All rights reserved. | MC #XXXXXX | DOT #XXXXXX
            </p>

            <div className="flex items-center gap-4">
              {data.bottom_bar?.map((link: any) => (
                <a key={link.id} href={link.href} className="hover:text-primary-foreground transition-colors">
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