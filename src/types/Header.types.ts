export interface HeaderResponse {
  data: HeaderData;
}

export interface NavLink {
  id: number;
  label: string;
  href?: string;
  url?: string;
  icon_name?: string | null;
}

export interface HeaderData {
  logo_text: string;
  logo_highlight: string;
  logo_icon_name: string;
  phone_number: string;
  phone_href: string;
  cta_button_text: string;
  cta_button_link: string;
  navigation_links: { id: number; label: string; href: any; icon_name: any; }[];
  brandName: string;
  brandAccent: string;
  phoneNumberLabel: string;
  ctaText: string;
  ctaLink: string;
  navLinks: NavLink[];
}

export interface HeaderProps {
  header: HeaderData;
}