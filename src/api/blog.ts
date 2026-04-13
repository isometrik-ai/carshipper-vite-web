import { useQuery } from "@tanstack/react-query";
import type { BlogPageResponse } from "@/types/BlogPage.types";
import { STRAPI_API_URL } from "@/lib/strapi";
import { BLOG_API_URL } from "@/lib/config";

type BlogPostNode = {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt?: string | null;
  content?: string | null;
  featuredImage?: {
    node?: {
      sourceUrl?: string | null;
    } | null;
  } | null;
};

type GetAllPostsResponse = {
  data?: {
    posts?: {
      nodes?: BlogPostNode[];
    };
  };
};

type GetPostBySlugResponse = {
  data?: {
    post?: {
      id: string;
      title: string;
      content: string;
      excerpt?: string | null;
      slug?: string | null;
      date?: string | null;
    } | null;
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
  const response = await fetch(getBlogGraphQlUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: GET_ALL_POSTS_QUERY,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
  }

  return response.json() as Promise<GetAllPostsResponse>;
};

const fetchBlogPost = async (slug: string): Promise<GetPostBySlugResponse["data"]["post"]> => {
  const response = await fetch(getBlogGraphQlUrl(), {
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
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch blog post: ${response.statusText}`);
  }

  const result = (await response.json()) as GetPostBySlugResponse;
  return result?.data?.post ?? null;
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
    return { blogPostsData: data, blogPostsLoading: isLoading };
  };

export const useBlogPost = (slug: string) =>
  useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchBlogPost(slug),
    enabled: Boolean(slug),
    refetchOnWindowFocus: false,
  });