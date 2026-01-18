export interface StepConfig {
    id: number;
    step_key: "vehicles" | "running" | "pickup" | "drops" | "transport" | "timeframe" | "contact";
    title: string;
    description: string;
}

export interface FormOption {
    id: number;
    label: string;
    value: string;
}

export interface QuoteFormConfigData {
    id: number;
    documentId: string;
    banner_timer_text: string;
    privacy_lock_text: string;
    vin_lookup_label: string;
    vin_placeholder: string;
    manual_divider_text: string;
    next_button_text: string;
    back_button_text: string;
    submit_button_text: string;
    make_model_placeholder: string;
    full_name_placeholder: string;
    email_placeholder: string;
    Phone_no_placehoder: string; // Note: typo in API field name
    VEHICLE_DATA: Record<string, string[]>;
    stepMeta: any | null;
    steps_config: StepConfig[];
    timeframe_options: FormOption[];
    transport_options: FormOption[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface QuoteFormConfigResponse {
    data: QuoteFormConfigData;
}