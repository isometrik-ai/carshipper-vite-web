import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useBlogPage } from "@/api/blog";
import { getStrapiMediaUrl } from "@/lib/strapi";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";

/**
 * Format date from "2025-12-28" to "December 28, 2025"
 */
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

/**
 * Blog page component
 * 
 * Fetches page content from Strapi CMS and renders blog posts with filtering and search.
 * All content is managed through Strapi, including SEO metadata, categories, and blog posts.
 */
const Blog = () => {
  const { data, isLoading } = useBlogPage();
  const [searchQuery, setSearchQuery] = useState("");

  // Extract components from page content
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

  // Get categories and default category
  const categories = useMemo(() => {
    if (!pageData?.categories?.categories) {
      return [{ id: 1, name: "All Posts", is_default: true }];
    }
    return pageData.categories.categories;
  }, [pageData?.categories]);

  const defaultCategory = useMemo(() => {
    const defaultCat = categories.find(c => c.is_default);
    return defaultCat?.name || categories[0]?.name || "All Posts";
  }, [categories]);

  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  // Update active category when default changes
  useEffect(() => {
    if (defaultCategory) {
      setActiveCategory(defaultCategory);
    }
  }, [defaultCategory]);

  // Get blog posts
  const blogPosts = useMemo(() => {
    return data?.data?.blog_posts || [];
  }, [data]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post: any) => {
      const matchesSearch = searchQuery.trim() === "" ||
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All Posts" || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogPosts, searchQuery, activeCategory]);

  const featuredPosts = useMemo(() => {
    return filteredPosts.filter((post: any) => post.featured === true);
  }, [filteredPosts]);

  const regularPosts = useMemo(() => {
    return filteredPosts.filter((post: any) => post.featured !== true);
  }, [filteredPosts]);

  // Get display configuration
  const displayConfig = useMemo(() => {
    const config = pageData?.postsDisplay;
    return {
      featuredSectionTitle: config?.featured_section_title || "Featured Articles",
      allPostsSectionTitle: config?.all_posts_section_title || "All Articles",
      emptyStateMessage: config?.empty_state_message || "No articles found matching your criteria.",
      clearFiltersButtonText: config?.clear_filters_button_text || "Clear Filters",
      readMoreButtonText: config?.read_more_button_text || "Read More",
      showFeaturedSection: config?.show_featured_section !== false,
    };
  }, [pageData?.postsDisplay]);

  // Extract page content for SEO
  const pageContent = useMemo(() => {
    return data?.data?.page_content || [];
  }, [data]);

  // Show loading state while fetching initial data
  if (isLoading && !data) {
    return (
      <>
        <PageSEO seoMetadata={null} pageContent={null} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1" role="main" aria-label="Main content">
            <PageSkeleton />
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (!pageData) {
    return (
      <>
        <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-20" role="main" aria-label="Main content">
            <div className="container mx-auto px-4 py-12 text-center">
              <p className="text-muted-foreground">No content available.</p>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <PageSEO seoMetadata={data?.data?.seo_metadata} pageContent={pageContent} />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-20 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {pageData.hero?.title || "Car Shipping"}{" "}
                  {pageData.hero?.title_highlight ? (
                    <span className="text-primary">{pageData.hero.title_highlight}</span>
                  ) : null}
                </h1>
                {pageData.hero?.description ? (
                  <p className="text-lg text-muted-foreground mb-8">
                    {pageData.hero.description}
                  </p>
                ) : null}

                {/* Search */}
                <div className="relative max-w-md mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder={pageData.hero?.search_placeholder || "Search articles..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Categories */}
          {categories.length > 0 ? (
            <section className="py-6 border-b">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id || category.name}
                      variant={activeCategory === category.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveCategory(category.name)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* Featured Posts */}
          {displayConfig.showFeaturedSection && featuredPosts.length > 0 ? (
            <section className="py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8">{displayConfig.featuredSectionTitle}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post: any, index: number) => {
                    const imageUrl = post.cover?.url
                      ? getStrapiMediaUrl(post.cover.url)
                      : null;
                    const formattedDate = formatDate(post.date);

                    return (
                      <motion.article
                        key={post.id || post.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group bg-card rounded-2xl overflow-hidden border shadow-lg hover:shadow-xl transition-shadow"
                      >
                        {imageUrl ? (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={post.cover?.alternativeText || post.title || "Blog post image"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : null}
                        <div className="p-6">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            {post.category ? (
                              <span className="flex items-center gap-1">
                                <Tag className="w-4 h-4" aria-hidden="true" />
                                {post.category}
                              </span>
                            ) : null}
                            {formattedDate ? (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" aria-hidden="true" />
                                {formattedDate}
                              </span>
                            ) : null}
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          {post.excerpt ? (
                            <p className="text-muted-foreground mb-4">{post.excerpt.trim()}</p>
                          ) : null}
                          <div className="flex items-center justify-between">
                            {post.read_time ? (
                              <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="w-4 h-4" aria-hidden="true" />
                                {post.read_time}
                              </span>
                            ) : null}
                            <Button variant="ghost" size="sm" className="group/btn">
                              {displayConfig.readMoreButtonText}
                              <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                            </Button>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : null}

          {/* Regular Posts */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              {displayConfig.showFeaturedSection && featuredPosts.length > 0 ? (
                <h2 className="text-2xl font-bold mb-8">{displayConfig.allPostsSectionTitle}</h2>
              ) : null}

              {regularPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post: any, index: number) => {
                    const imageUrl = post.cover?.url
                      ? getStrapiMediaUrl(post.cover.url)
                      : null;

                    return (
                      <motion.article
                        key={post.id || post.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow"
                      >
                        {imageUrl ? (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={post.cover?.alternativeText || post.title || "Blog post image"}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : null}
                        <div className="p-5">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                            {post.category ? (
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                                {post.category}
                              </span>
                            ) : null}
                            {post.read_time ? <span>{post.read_time}</span> : null}
                          </div>
                          <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt ? (
                            <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt.trim()}</p>
                          ) : null}
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {displayConfig.emptyStateMessage}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory(defaultCategory);
                    }}
                  >
                    {displayConfig.clearFiltersButtonText}
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Newsletter CTA */}
          {pageData.newsletter ? (
            <section className="py-16 bg-primary">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl mx-auto"
                >
                  {pageData.newsletter.title ? (
                    <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                      {pageData.newsletter.title}
                    </h2>
                  ) : null}
                  {pageData.newsletter.description ? (
                    <p className="text-primary-foreground/80 mb-6">
                      {pageData.newsletter.description}
                    </p>
                  ) : null}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      placeholder={pageData.newsletter.email_placeholder || "Enter your email"}
                      className="bg-primary-foreground text-foreground"
                    />
                    <Button variant="secondary">
                      {pageData.newsletter.button_text || "Subscribe"}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>
          ) : null}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
