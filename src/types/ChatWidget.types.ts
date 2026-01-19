export interface ChatWidgetData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  widget_title: string;
  widget_subtitle: string;
  initial_message: string;
  placeholder_text: string;
  auto_response: string;
  phone_number: string | null;
}

export interface ChatWidgetResponse {
  data: ChatWidgetData;
  meta: Record<string, unknown>;
}
