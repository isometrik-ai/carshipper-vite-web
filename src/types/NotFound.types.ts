import type { SeoMetadata } from "./LandingPage.types";

export interface HomeLink {
  id: number;
  label: string;
  href: string;
}

export interface NotFoundData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status_code: string;
  status_message: string | null;
  home_link: HomeLink;
  seo_metadata: SeoMetadata | null;
}

export interface NotFoundResponse {
  data: NotFoundData;
  meta: Record<string, unknown>;
}
