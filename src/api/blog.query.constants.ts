export const BLOG_QUERY_PARAMS = [
  "populate[seo_metadata]=*",
  "populate[seo_metadata][populate][og_image][fields][0]=url",
  "populate[seo_metadata][populate][og_image][fields][1]=alternativeText",
  "populate[seo_metadata][populate][og_image][fields][2]=width",
  "populate[seo_metadata][populate][og_image][fields][3]=height",
  "populate[seo_metadata][populate][twitter_image][fields][0]=url",
  "populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText",
  "populate[seo_metadata][populate][twitter_image][fields][2]=width",
  "populate[seo_metadata][populate][twitter_image][fields][3]=height",
  "populate[page_content][on][shared.blog-hero][populate]=*",
  "populate[page_content][on][shared.blog-categories][populate][categories][populate]=*",
  "populate[page_content][on][shared.newsletter-cta][populate]=*",
  "populate[page_content][on][shared.blog-posts-display][populate]=*",
  "populate[blog_posts][populate][featured_image][fields][0]=url",
  "populate[blog_posts][populate][featured_image][fields][1]=alternativeText",
  "populate[blog_posts][populate][featured_image][fields][2]=width",
  "populate[blog_posts][populate][featured_image][fields][3]=height",
] as const;

export const BLOG_QUERY = `?${BLOG_QUERY_PARAMS.join("&")}`;

