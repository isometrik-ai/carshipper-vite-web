export interface HeaderResponse {
  data: {
    id: number;
    header: HeaderData;
  };
}

export interface NavLink {
  id: number;
  label: string;
  url: string;
}

export interface HeaderData {
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