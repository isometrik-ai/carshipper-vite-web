import { Truck, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Reviews", href: "/#reviews" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Open Transport", href: "/open-transport" },
      { label: "Enclosed Transport", href: "/enclosed-transport" },
      { label: "Flatbed Transport", href: "/flatbed-transport" },
      { label: "Heavy Hauling", href: "/heavy-hauling" },
      { label: "Fleet Transport", href: "/fleet-transport" },
      { label: "Dealership Delivery", href: "/dealership-delivery" },
      { label: "Auto Auction Shipping", href: "/auto-auction-shipping" },
      { label: "Rental Car Logistics", href: "/rental-car-logistics" },
      { label: "OEM Transport", href: "/oem-transport" },
    ],
    resources: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Get a Quote", href: "/quote" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
      { label: "Track Shipment", href: "/track" },
    ],
  };

  const seoLinks = {
    states: [
      { label: "California", href: "/california-car-shipping" },
      { label: "Texas", href: "/texas-car-shipping" },
      { label: "Florida", href: "/florida-car-shipping" },
      { label: "New York", href: "/new-york-car-shipping" },
      { label: "Illinois", href: "/illinois-car-shipping" },
      { label: "Pennsylvania", href: "/pennsylvania-car-shipping" },
      { label: "Ohio", href: "/ohio-car-shipping" },
      { label: "Georgia", href: "/georgia-car-shipping" },
    ],
    cities: [
      { label: "Los Angeles", href: "/los-angeles-car-shipping" },
      { label: "New York City", href: "/new-york-city-car-shipping" },
      { label: "Chicago", href: "/chicago-car-shipping" },
      { label: "Houston", href: "/houston-car-shipping" },
      { label: "Phoenix", href: "/phoenix-car-shipping" },
      { label: "Miami", href: "/miami-car-shipping" },
      { label: "Dallas", href: "/dallas-car-shipping" },
      { label: "San Francisco", href: "/san-francisco-car-shipping" },
    ],
    makes: [
      { label: "Honda", href: "/ship-honda" },
      { label: "Toyota", href: "/ship-toyota" },
      { label: "Ford", href: "/ship-ford" },
      { label: "Chevrolet", href: "/ship-chevrolet" },
      { label: "Nissan", href: "/ship-nissan" },
      { label: "Tesla", href: "/ship-tesla" },
      { label: "BMW", href: "/ship-bmw" },
      { label: "Mercedes", href: "/ship-mercedes" },
    ],
  };

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
                CarShippers<span className="text-accent">.ai</span>
              </span>
            </a>
            <p className="text-primary-foreground/70 mb-6 max-w-sm">
              AI-powered car shipping. Get instant quotes, transparent pricing, and 
              door-to-door service from licensed carriers.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="tel:+18885551234" 
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Phone className="w-5 h-5" />
                (888) 555-1234
              </a>
              <a 
                href="mailto:info@carshippers.ai" 
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@carshippers.ai
              </a>
              <p className="text-primary-foreground/70 text-sm">
                Available 24/7
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-primary-foreground/70 text-sm">Follow us:</span>
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

          {/* Company Column */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
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

          {/* Services Column */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
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

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
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
        </div>
      </div>

      {/* SEO Links Section */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {/* States */}
            <div>
              <h5 className="text-sm font-semibold mb-3 text-primary-foreground/80">Ship Cars by State</h5>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                {seoLinks.states.map((link, index) => (
                  <span key={link.label} className="flex items-center">
                    <a 
                      href={link.href}
                      className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                    {index < seoLinks.states.length - 1 && (
                      <span className="text-primary-foreground/30 ml-2">|</span>
                    )}
                  </span>
                ))}
                <span className="text-primary-foreground/30">|</span>
                <a href="/states" className="text-accent hover:text-accent/80 transition-colors">
                  View All States →
                </a>
              </div>
            </div>

            {/* Cities */}
            <div>
              <h5 className="text-sm font-semibold mb-3 text-primary-foreground/80">Ship Cars by City</h5>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                {seoLinks.cities.map((link, index) => (
                  <span key={link.label} className="flex items-center">
                    <a 
                      href={link.href}
                      className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                    {index < seoLinks.cities.length - 1 && (
                      <span className="text-primary-foreground/30 ml-2">|</span>
                    )}
                  </span>
                ))}
                <span className="text-primary-foreground/30">|</span>
                <a href="/cities" className="text-accent hover:text-accent/80 transition-colors">
                  View All Cities →
                </a>
              </div>
            </div>

            {/* Car Makes */}
            <div>
              <h5 className="text-sm font-semibold mb-3 text-primary-foreground/80">Ship Cars by Brand</h5>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                {seoLinks.makes.map((link, index) => (
                  <span key={link.label} className="flex items-center">
                    <a 
                      href={link.href}
                      className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                    {index < seoLinks.makes.length - 1 && (
                      <span className="text-primary-foreground/30 ml-2">|</span>
                    )}
                  </span>
                ))}
                <span className="text-primary-foreground/30">|</span>
                <a href="/makes" className="text-accent hover:text-accent/80 transition-colors">
                  View All Makes →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>
              © {currentYear} CarShippers.ai. All rights reserved. | MC #XXXXXX | DOT #XXXXXX
            </p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary-foreground transition-colors">
                Terms of Service
              </a>
              <a href="/sitemap.xml" className="hover:text-primary-foreground transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
