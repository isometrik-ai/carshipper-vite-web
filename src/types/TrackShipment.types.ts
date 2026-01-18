import type { SeoMetadata } from "./LandingPage.types";

/**
 * Tracking Form Component
 * Form for tracking shipments by tracking number or VIN
 */
export interface TrackingForm {
  __component: "shared.tracking-form";
  id: number;
  tracking_tab_label: string | null;
  vin_tab_label: string | null;
  tracking_label: string | null;
  tracking_placeholder: string | null;
  tracking_helper_text: string | null;
  tracking_button_text: string | null;
  tracking_searching_text: string | null;
  vin_label: string | null;
  vin_placeholder: string | null;
  vin_helper_text: string | null;
  vin_button_text: string | null;
  vin_searching_text: string | null;
  error_title: string | null;
  error_message: string | null;
  error_phone_number: string | null;
}

/**
 * Tracking Step Component
 * Individual step in the tracking process
 */
export interface TrackingStep {
  id: number;
  label: string;
  icon_name: string | null;
  status: "complete" | "current" | "pending";
}

/**
 * Tracking Steps Section Component
 * Section displaying the tracking process steps
 */
export interface TrackingStepsSection {
  __component: "shared.tracking-steps-section";
  id: number;
  section_title: string | null;
  section_description: string | null;
  steps: TrackingStep[];
}

/**
 * Re-export types from LandingPage for reuse
 */
export type {
  HeroSection,
  ServiceCards,
  CallToAction,
} from "./LandingPage.types";

/**
 * Track Shipment Page Content Component Types
 */
export type TrackShipmentContentComponent =
  | import("./LandingPage.types").HeroSection
  | TrackingForm
  | TrackingStepsSection
  | import("./LandingPage.types").ServiceCards
  | import("./LandingPage.types").CallToAction;

/**
 * Track Shipment Page Data Structure
 */
export interface TrackShipmentData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: TrackShipmentContentComponent[];
}

/**
 * Track Shipment Page API Response
 */
export interface TrackShipmentResponse {
  data: TrackShipmentData;
  meta: Record<string, unknown>;
}
