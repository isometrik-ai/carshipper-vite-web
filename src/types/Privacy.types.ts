import type { SeoMetadata } from "./LandingPage.types";

/**
 * Privacy Section Bullet Point
 */
export interface PrivacyBulletPoint {
  id: number;
  text: string;
}

/**
 * Privacy Policy Section
 */
export interface PrivacySection {
  id: number;
  section_heading: string;
  section_number: string | null;
  paragraphs: string;
  bullet_points: PrivacyBulletPoint[];
}

/**
 * Privacy Policy Page Data Structure
 */
export interface PrivacyData {
  id: number;
  documentId: string;
  page_title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  last_updated: string;
  seo_metadata: SeoMetadata;
  sections: PrivacySection[];
}

/**
 * Privacy Policy Page API Response
 */
export interface PrivacyResponse {
  data: PrivacyData;
  meta: Record<string, unknown>;
}
