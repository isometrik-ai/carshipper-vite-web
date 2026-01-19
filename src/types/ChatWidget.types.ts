export interface ChatWidgetData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  welcome_message: string;
  reply_message: string;
  modal_icon: string;
  modal_close_icon: string;
  modal_title: string;
  modal_description: string;
  input_placehoder: string; // Note: keeping typo to match existing Strapi field
}

export interface ChatWidgetResponse {
  data: ChatWidgetData;
  meta: Record<string, unknown>;
}
