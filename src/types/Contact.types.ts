import type { SeoMetadata } from "./LandingPage.types";

/**
 * Contact Method Component
 * Individual contact method item
 */
export interface ContactMethod {
  id: number;
  icon_name: string | null;
  title: string;
  value: string;
  description: string;
  href: string;
}

/**
 * Contact Methods Component
 * Section displaying contact methods
 */
export interface ContactMethods {
  __component: "shared.contact-methods";
  id: number;
  methods: ContactMethod[];
}

/**
 * Contact Form Component
 * Contact form configuration
 */
export interface ContactForm {
  __component: "shared.contact-form";
  id: number;
  form_title: string;
  name_label: string;
  name_placeholder: string;
  name_required: boolean;
  email_label: string;
  email_placeholder: string;
  email_required: boolean;
  phone_label: string;
  phone_placeholder: string;
  phone_required: boolean;
  subject_label: string;
  subject_placeholder: string;
  subject_required: boolean;
  message_label: string;
  message_placeholder: string;
  message_required: boolean;
  submit_button_text: string;
  success_message_title: string;
  success_message_description: string;
}

/**
 * Business Info Item Component
 * Individual business info item
 */
export interface BusinessInfoItem {
  id: number;
  icon_name: string | null;
  text: string;
}

/**
 * Business Info Component
 * Business information section
 */
export interface BusinessInfo {
  __component: "shared.business-info";
  id: number;
  section_title: string;
  license_info: string;
  info_items: BusinessInfoItem[];
}

/**
 * Re-export types from LandingPage for reuse
 */
export type {
  HeroSection,
} from "./LandingPage.types";

/**
 * Contact Page Content Component Types
 */
export type ContactContentComponent =
  | import("./LandingPage.types").HeroSection
  | ContactMethods
  | ContactForm
  | BusinessInfo;

/**
 * Contact Page Data Structure
 */
export interface ContactData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: ContactContentComponent[];
}

/**
 * Contact Page API Response
 */
export interface ContactResponse {
  data: ContactData;
  meta: Record<string, unknown>;
}
