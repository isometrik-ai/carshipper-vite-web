export interface NavigationLink {
  id: number;
  label: string;
  href: string;
  icon_name: string | null;
}

export interface SocialLink {
  id: number;
  platform: string | null;
  url: string;
  icon_name: string;
  label: string;
}

export interface LinkGroup {
  id: number;
  heading: string;
  links: NavigationLink[];
}

export interface SeoLinkGroup {
  id: number;
  group_title: string;
  view_all_label: string;
  view_all_href: string;
  links: NavigationLink[];
}

export interface FooterData {
  id: number;
  documentId: string;
  logo_text: string;
  logo_highlight: string;
  logo_icon_name: string;
  description: string;
  phone_number: string;
  phone_href: string;
  email: string;
  email_href: string;
  availability_note: string;
  social_links_label: string;
  copyright_text: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  mc_number: string | null;
  dot_number: string | null;
  social_links: SocialLink[];
  link_groups: LinkGroup[];
  seo_link_groups: SeoLinkGroup[];
  bottom_links: NavigationLink[];
}

export interface FooterResponse {
  data: FooterData;
  meta: Record<string, unknown>;
}
