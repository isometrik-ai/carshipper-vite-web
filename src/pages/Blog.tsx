import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { useState, useEffect } from "react";

import { useBlog } from "@/hooks/api/useBlog";

const ICONS: Record<string, any> = {
  Search,
};

const getIcon = (name?: string | null): React.ComponentType<any> => {
  if (!name) return Search;
  return ICONS[name] || Search;
};

const Blog = () => {
  const { data: page, isLoading } = useBlog();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Posts");

  if (isLoading || !page) return null;

  const categories = page.categories ?? [];
  const blogPosts = page.blogPosts ?? [];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All Posts" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <Helmet>
        <title>Car Shipping Blog | Tips, Guides & Industry News | CarShippers.ai</title>
        <meta name="description" content="Expert car shipping tips, industry news, and comprehensive guides. Learn how to ship your car safely and save money on auto transport." />
        <link rel="canonical" href="https://carshippers.ai/blog" />
      </Helmet>

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
                  {page.title} <span className="text-primary">{page.title_highlight}</span>
                </h1>
                {page.description ? (
                  <p className="text-lg text-muted-foreground mb-8">
                    {page.description}
                  </p>
                ) : null}

                {/* Search */}
                <div className="relative max-w-md mx-auto">
                  {(() => {
                    const SearchIcon = getIcon(page.search_bar_icon_name);
                    return <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />;
                  })()}
                  <Input
                    placeholder={page.search_bar_icon_placeholder || "Search articles..."}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Categories */}
          <section className="py-6 border-b">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8">
                  {page.featured_articles_title || "Featured Articles"}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {featuredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-card rounded-2xl overflow-hidden border shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Tag className="w-4 h-4" />
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                          <Button variant="ghost" size="sm" className="group/btn">
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Regular Posts */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              {featuredPosts.length > 0 && (
                <h2 className="text-2xl font-bold mb-8">
                  {page.all_articles_title || "All Articles"}
                </h2>
              )}

              {regularPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group bg-card rounded-xl overflow-hidden border hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No articles found matching your criteria.
                  </p>
                  <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("All Posts"); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Newsletter CTA */}
          {page.blog_cta && (
            <section className="py-16 bg-primary">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="max-w-xl mx-auto"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                    {page.blog_cta.title}
                  </h2>
                  {page.blog_cta.description ? (
                    <p className="text-primary-foreground/80 mb-6">
                      {page.blog_cta.description}
                    </p>
                  ) : null}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      placeholder={page.blog_cta.input_field_placeholder || "Enter your email"}
                      className="bg-primary-foreground text-foreground"
                    />
                    <Button variant="secondary">
                      {page.blog_cta.submit_button_title || "Subscribe"}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blog;