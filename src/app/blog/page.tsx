'use client';

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useBlogPage } from "@/api/blog";
import { getStrapiMediaUrl } from "@/lib/strapi";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch {
    return dateString;
  }
};

export const dynamic = 'force-dynamic';

export default function Blog() {
  const { data, isLoading } = useBlogPage();
  const [searchQuery, setSearchQuery] = useState("");

  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;
    const content = data.data.page_content;
    const blogHero = content.find(c => c.__component === "shared.blog-hero");
    const blogCategories = content.find(c => c.__component === "shared.blog-categories");
    const newsletterCta = content.find(c => c.__component === "shared.newsletter-cta");
    const blogPostsDisplay = content.find(c => c.__component === "shared.blog-posts-display");

    return {
      hero: blogHero,
      categories: blogCategories,
      newsletter: newsletterCta,
      postsDisplay: blogPostsDisplay,
    };
  }, [data]);

  const categories = useMemo(() => {
    if (!pageData?.categories?.categories) {
      return [{ id: 1, name: "All Posts", is_default: true }];
    }
    return pageData.categories.categories;
  }, [pageData?.categories]);

  const defaultCategory = useMemo(() => {
    const defaultCat = categories.find((c: any) => c.is_default);
    return defaultCat?.name || categories[0]?.name || "All Posts";
  }, [categories]);

  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  useEffect(() => {
    if (defaultCategory) {
      setActiveCategory(defaultCategory);
    }
  }, [defaultCategory]);

  const blogPosts = useMemo(() => {
    return data?.data?.blog_posts || [];
  }, [data]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post: any) => {
      const matchesSearch = searchQuery.trim() === "" ||
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All Posts" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogPosts, searchQuery, activeCategory]);

  const pageContent = useMemo(() => {
    return data?.data?.page_content || [];
  }, [data]);

  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} pageContent={null} />
        <PageSkeleton />
      </>
    );
  }

  if (!pageData) {
    return (
      <>
        <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">No content available.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />
      <main className="flex-1 pt-20">
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {pageData.hero?.main_headline || "Blog"}{" "}
                {pageData.hero?.highlighted_text ? (
                  <span className="text-primary">{pageData.hero.highlighted_text}</span>
                ) : null}
              </h1>
              {pageData.hero?.description ? (
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  {pageData.hero.description}
                </p>
              ) : null}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {categories.length > 1 && (
          <section className="py-8 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category: any) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.name ? "default" : "outline"}
                    onClick={() => setActiveCategory(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post: any, index: number) => (
                  <motion.article
                    key={post.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {post.featured_image ? (
                      <div className="aspect-video bg-muted relative">
                        <img
                          src={getStrapiMediaUrl(post.featured_image)}
                          alt={post.title || "Blog post"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="p-6">
                      {post.category ? (
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{post.category}</span>
                        </div>
                      ) : null}
                      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                      {post.excerpt ? (
                        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                      ) : null}
                      <div className="flex items-center justify-between">
                        {post.published_at ? (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.published_at)}</span>
                          </div>
                        ) : null}
                        <Link href={`/blog/${post.slug || post.id}`}>
                          <Button variant="ghost" size="sm">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No articles found matching your criteria.</p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(defaultCategory);
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

