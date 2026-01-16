import { StrapiResponseWrapper } from "./api.types";

export interface TrackingStep {
  label: string;
  icon: string;
  status: "complete" | "current" | "pending";
}

export interface WhatYouGetItem {
  id: number;
  text: string;
  icon_name: string | null;
  href: string | null;
  description: string | null;
}

export interface TrackForm {
  id: number;
  tab_title: string[];
  tracking_no_title: string;
  vin_no_title: string;
  loading_title: string;
  tracking_number_label: string;
  vehicle_vin_label: string;
  search_icon: string;
  tracking_no_placeholder: string;
  vehicle_vin_placeholder: string;
  tracking_number_msg: string;
  vin_number_msg: string;
}

export interface TrackShipmentCTA {
  id: number;
  title: string;
  description: string;
  primary_button_text: string | null;
  primary_button_link: string | null;
  secondary_button_text: string | null;
  secondary_button_link: string | null;
  show_phone: boolean | null;
  icon_name: string | null;
  trustBadges: any | null;
  input_field_placeholder: string | null;
  submit_button_title: string | null;
}

export interface TrackShipmentData {
  id: number;
  documentId: string;
  page_icon: string | null;
  title: string;
  title_highlight: string;
  description: string | null;
  trackingSteps: TrackingStep[];
  tracking_title: string | null;
  tracking_sub_title: string | null;
  what_you_get: WhatYouGetItem[];
  track_shipment_cta: TrackShipmentCTA | null;
  track_form: TrackForm | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TrackShipmentResponse {
  data: TrackShipmentData;
  meta: Record<string, any>;
}
