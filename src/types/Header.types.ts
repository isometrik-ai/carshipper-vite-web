export interface NavigationLink {
  id: number;
  label: string;
  href: string;
  icon_name: string | null;
}

export interface HeaderData {
  id: number;
  documentId: string;
  logo_text: string;
  logo_highlight: string;
  logo_icon_name: string;
  phone_number: string;
  phone_href: string;
  cta_button_text: string;
  cta_button_link: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  navigation_links: NavigationLink[];
}

export interface HeaderResponse {
  data: HeaderData;
  meta: Record<string, unknown>;
}
