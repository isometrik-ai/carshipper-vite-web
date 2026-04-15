import { BLOG_API_URL } from "@/lib/config";
import { htmlToText } from "@/lib/blogPostNormalizer";

const getBlogGraphQlUrl = (): string =>
  BLOG_API_URL.endsWith("/graphql")
    ? BLOG_API_URL
    : `${BLOG_API_URL.replace(/\/$/, "")}/graphql`;

export const fetchBlogGraphQl = async <TResponse>({
  query,
  variables,
  errorContext,
}: {
  query: string;
  variables?: Record<string, unknown>;
  errorContext: string;
}): Promise<TResponse> => {
  const response = await fetch(getBlogGraphQlUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${errorContext}: ${response.statusText}`);
  }

  return (await response.json()) as TResponse;
};

type FeaturedImageLike =
  | string
  | { url?: string | null }
  | { node?: { sourceUrl?: string | null } | null }
  | null
  | undefined;

type RawBlogPost = {
  id?: string | number;
  title?: string | null;
  slug?: string | null;
  content?: string | null;
  excerpt?: string | null;
  published_at?: string | null;
  date?: string | null;
  category?: string | null;
  featured_image?: FeaturedImageLike;
  cover?: { url?: string | null } | null;
  featuredImage?: { node?: { sourceUrl?: string | null } | null } | null;
};

export type UnifiedBlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published_at: string | null;
  category: string | null;
  featured_image: string | null;
};

const getFeaturedImageUrl = (post: RawBlogPost): string | null => {
  const imageCandidate = post.featured_image ?? post.featuredImage ?? post.cover;

  if (!imageCandidate) return null;
  if (typeof imageCandidate === "string") return imageCandidate;
  if ("node" in imageCandidate) return imageCandidate.node?.sourceUrl ?? null;
  return (imageCandidate as { url?: string | null }).url ?? null;
};

export const normalizeBlogPost = (post: RawBlogPost): UnifiedBlogPost => ({
  id: String(post.id ?? ""),
  title: post.title ?? "",
  slug: post.slug ?? "",
  content: post.content ?? "",
  excerpt: htmlToText(post.excerpt || post.content),
  published_at: post.published_at ?? post.date ?? null,
  category: post.category ?? null,
  featured_image: getFeaturedImageUrl(post),
});

export const normalizeBlogPosts = (posts: RawBlogPost[] = []): UnifiedBlogPost[] =>
  (posts ?? []).map(normalizeBlogPost);
