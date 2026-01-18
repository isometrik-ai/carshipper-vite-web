export interface QuoteFormField {
  id: number;
  field_key: string;
  label: string | null;
  placeholder: string | null;
  helper_text: string | null;
  is_required: boolean;
}

export interface QuoteFormStep {
  id: number;
  step_key: string;
  step_title: string;
  step_description: string | null;
  dynamic_description: string | null;
  options: unknown | null;
  running_question_text: string;
  vehicle_assignment_question: string;
  fields: QuoteFormField[];
}

export interface TimeframeOption {
  id: number;
  value: string;
  label: string;
}

export interface TransportTypeOption {
  id: number;
  value: string;
  label: string;
  description: string;
  icon_name: string;
}

export interface RunningStatusOption {
  id: number;
  value: boolean | null;
  label: string;
  icon_name: string;
}

export interface QuoteFormButtons {
  id: number;
  back_button: string;
  next_button: string;
  submit_button: string;
  submitting_text: string;
  add_vehicle_button: string;
  add_drop_location_button: string;
  vin_lookup_button: string;
}

export interface VehicleFieldConfig {
  id: number;
  vehicle_label_format: string;
  vin_label: string;
  vin_placeholder: string;
  vin_lookup_button: string;
  manual_select_divider: string;
  year_label: string;
  year_placeholder: string;
  make_model_label: string;
  make_model_placeholder: string;
}

export interface VehicleModel {
  id: number;
  model_name: string;
}

export interface VehicleMake {
  id: number;
  make_name: string;
  models: VehicleModel[];
}

export interface QuoteFormConfig {
  id: number;
  progress_badge_text: string;
  footer_message: string;
  success_title: string;
  success_description: string;
  success_toast_title: string;
  success_toast_description: string;
  step_counter_format: string;
  delivery_location_label_single: string;
  delivery_location_label_multiple: string;
  steps: QuoteFormStep[];
  timeframe_options: TimeframeOption[];
  transport_type_options: TransportTypeOption[];
  button_texts: QuoteFormButtons;
  running_status_options: RunningStatusOption[];
  vehicle_field_config: VehicleFieldConfig;
  vehicle_data?: VehicleMake[];
}

export interface QuoteFormData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  form_config: QuoteFormConfig;
}

export interface QuoteFormResponse {
  data: QuoteFormData;
  meta: Record<string, unknown>;
}
