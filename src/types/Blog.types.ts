import { StrapiResponseWrapper } from "./api.types";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

export interface BlogCTA {
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

export interface BlogData {
  id: number;
  documentId: string;
  title: string;
  title_highlight: string;
  description: string;
  search_bar_icon_name: string;
  search_bar_icon_placeholder: string;
  categories: string[];
  blogPosts: BlogPost[];
  featured_articles_title: string;
  all_articles_title: string;
  blog_cta: BlogCTA;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface BlogResponse {
  data: BlogData;
  meta: Record<string, any>;
}
