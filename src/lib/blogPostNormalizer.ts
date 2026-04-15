export type GraphQlBlogPostNode = {
  id: string;
  title: string;
  slug: string;
  date?: string | null;
  excerpt?: string | null;
  content?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
    } | null;
  } | null;
};

export type NormalizedBlogPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published_at: string | null;
  featured_image: string | null;
};

export const htmlToText = (html?: string | null): string => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&hellip;/gi, "...")
    .replace(/\s+/g, " ")
    .trim();
};

export const normalizeGraphQlPost = (post: GraphQlBlogPostNode): NormalizedBlogPost => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  content: post.content ?? "",
  excerpt: htmlToText(post.excerpt || post.content),
  published_at: post.date ?? null,
  featured_image: post?.featuredImage?.node?.sourceUrl ?? null,
});

export const normalizeGraphQlPosts = (posts: GraphQlBlogPostNode[] = []): NormalizedBlogPost[] =>
  posts.map(normalizeGraphQlPost);
