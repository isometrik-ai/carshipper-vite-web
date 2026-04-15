import { useQuery } from "@tanstack/react-query";
import type { BlogPageResponse } from "@/types/BlogPage.types";
import { STRAPI_API_URL } from "@/lib/strapi";
import { BLOG_API_URL } from "@/lib/config";
import {
  normalizeGraphQlPost,
  normalizeGraphQlPosts,
  type GraphQlBlogPostNode,
  type NormalizedBlogPost,
} from "@/lib/blogPostNormalizer";

type GetAllPostsResponse = {
  data?: {
    posts?: {
      nodes?: GraphQlBlogPostNode[];
    };
  };
  normalizedPosts?: NormalizedBlogPost[];
};

type GetPostBySlugResponse = {
  data?: {
    post?: GraphQlBlogPostNode | null;
  };
};

const GET_ALL_POSTS_QUERY = `
  query GetAllPosts {
    posts(first: 100) {
      nodes {
        id
        title
        slug
        date
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($id: ID!, $idType: PostIdType!) {
    post(id: $id, idType: $idType) {
      id
      title
      content
      excerpt
      slug
      date
    }
  }
`;

const getBlogGraphQlUrl = (): string =>
  BLOG_API_URL.endsWith("/graphql")
    ? BLOG_API_URL
    : `${BLOG_API_URL.replace(/\/$/, "")}/graphql`;

/**
 * Fetches Blog page data from Strapi with full population
 */
const fetchBlogPage = async (): Promise<BlogPageResponse> => {
  const response = await fetch(
    `${STRAPI_API_URL}/api/blog?populate[seo_metadata]=*&populate[seo_metadata][populate][og_image][fields][0]=url&populate[seo_metadata][populate][og_image][fields][1]=alternativeText&populate[seo_metadata][populate][og_image][fields][2]=width&populate[seo_metadata][populate][og_image][fields][3]=height&populate[seo_metadata][populate][twitter_image][fields][0]=url&populate[seo_metadata][populate][twitter_image][fields][1]=alternativeText&populate[seo_metadata][populate][twitter_image][fields][2]=width&populate[seo_metadata][populate][twitter_image][fields][3]=height&populate[page_content][on][shared.blog-hero][populate]=*&populate[page_content][on][shared.blog-categories][populate][categories][populate]=*&populate[page_content][on][shared.newsletter-cta][populate]=*&populate[page_content][on][shared.blog-posts-display][populate]=*&populate[blog_posts][populate][cover][fields][0]=url&populate[blog_posts][populate][cover][fields][1]=alternativeText&populate[blog_posts][populate][cover][fields][2]=width&populate[blog_posts][populate][cover][fields][3]=height`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch blog page: ${response.statusText}`);
  }
  
  return response.json();
};

const fetchBlogPosts = async (): Promise<GetAllPostsResponse> => {
  const controller = new AbortController();
  const responsePromise = fetch(getBlogGraphQlUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_ALL_POSTS_QUERY,
    }),
    signal: controller.signal
  });
  // Optionally, store controller to cancel request if needed
  if (!responsePromise) {
    throw new Error(`Failed to initiate fetch for blog posts`);
  }
  const response = await responsePromise;
  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
  }
  const result = (await response.json()) as GetAllPostsResponse;
  const nodes = result?.data?.posts?.nodes ?? [];
  return {
    ...result,
    normalizedPosts: normalizeGraphQlPosts(nodes),
  };
};

const fetchBlogPost = async (slug: string): Promise<NormalizedBlogPost | null> => {
  const controller = new AbortController();
  const responsePromise = fetch(getBlogGraphQlUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_POST_BY_SLUG_QUERY,
      variables: {
        id: slug,
        idType: "SLUG",
      },
    }),
    signal: controller.signal
  });
  if (!responsePromise) {
    throw new Error(`Failed to initiate fetch for blog post`);
  }
  const response = await responsePromise;
  if (!response.ok) {
    throw new Error(`Failed to fetch blog post: ${response.statusText}`);
  }
  const result = (await response.json()) as GetPostBySlugResponse;
  return result?.data?.post ? normalizeGraphQlPost(result.data.post) : null;
};

/**
 * React Query hook for fetching Blog page data
 */
export const useBlogPage = () =>
  useQuery({
    queryKey: ["blog-page"],
    queryFn: fetchBlogPage,
    refetchOnWindowFocus: false,
  });

  export const useBlogPosts = () =>{
    const { data, isLoading } = useQuery({
      queryKey: ["blog-posts"],
      queryFn: fetchBlogPosts,
      refetchOnWindowFocus: false,
    });
    return { blogPostsData: data?.normalizedPosts ?? [], blogPostsLoading: isLoading };
  };

export const useBlogPost = (slug: string) =>
  useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchBlogPost(slug),
    enabled: Boolean(slug),
    refetchOnWindowFocus: false,
  });