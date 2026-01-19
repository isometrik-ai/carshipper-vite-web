import type { SeoMetadata } from "./LandingPage.types";

/**
 * Blog Hero Component
 */
export interface BlogHero {
  __component: "shared.blog-hero";
  id: number;
  title: string | null;
  title_highlight: string | null;
  description: string | null;
  search_placeholder: string | null;
}

/**
 * Category Item Component
 */
export interface CategoryItem {
  id: number;
  name: string;
  is_default: boolean;
}

/**
 * Blog Categories Component
 */
export interface BlogCategories {
  __component: "shared.blog-categories";
  id: number;
  categories: CategoryItem[];
}

/**
 * Newsletter CTA Component
 */
export interface NewsletterCta {
  __component: "shared.newsletter-cta";
  id: number;
  title: string | null;
  description: string | null;
  email_placeholder: string | null;
  button_text: string | null;
}

/**
 * Blog Posts Display Component
 */
export interface BlogPostsDisplay {
  __component: "shared.blog-posts-display";
  id: number;
  featured_section_title: string | null;
  all_posts_section_title: string | null;
  empty_state_message: string | null;
  clear_filters_button_text: string | null;
  read_more_button_text: string | null;
  posts_per_page: number | null;
  show_featured_section: boolean | null;
}

/**
 * Blog Post
 */
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  read_time: string | null;
  date: string;
  category: string | null;
  featured: boolean;
  slug: string | null;
  cover: {
    id: number;
    url: string;
    alternativeText: string | null;
    width: number;
    height: number;
  } | null;
}

/**
 * Blog Page Content Component Types
 */
export type BlogPageContentComponent =
  | BlogHero
  | BlogCategories
  | NewsletterCta
  | BlogPostsDisplay;

/**
 * Blog Page Data Structure
 */
export interface BlogPageData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo_metadata: SeoMetadata;
  page_content: BlogPageContentComponent[];
  blog_posts: BlogPost[];
}

/**
 * Blog Page API Response
 */
export interface BlogPageResponse {
  data: BlogPageData;
  meta: Record<string, unknown>;
}
