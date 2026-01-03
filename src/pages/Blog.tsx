import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { useState } from "react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All Posts",
    "Shipping Tips",
    "Industry News",
    "Guides",
    "Cost Savings",
    "Vehicle Care"
  ];

  const [activeCategory, setActiveCategory] = useState("All Posts");

  const blogPosts = [
    {
      id: 1,
      title: "How to Prepare Your Car for Cross-Country Shipping",
      excerpt: "A comprehensive checklist to ensure your vehicle is ready for safe transport across the country.",
      category: "Shipping Tips",
      date: "December 28, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Open vs Enclosed Transport: Which is Right for You?",
      excerpt: "Understanding the differences between transport types to make the best choice for your vehicle.",
      category: "Guides",
      date: "December 20, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
      featured: true
    },
    {
      id: 3,
      title: "5 Ways to Save Money on Car Shipping",
      excerpt: "Insider tips from industry experts on reducing your auto transport costs without sacrificing quality.",
      category: "Cost Savings",
      date: "December 15, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "What Insurance Covers During Auto Transport",
      excerpt: "Everything you need to know about cargo insurance and what happens if your vehicle is damaged.",
      category: "Guides",
      date: "December 10, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "Shipping a Classic Car: Special Considerations",
      excerpt: "Protect your investment with these expert tips for transporting vintage and classic vehicles.",
      category: "Vehicle Care",
      date: "December 5, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: 6,
      title: "2025 Auto Transport Industry Trends",
      excerpt: "What's changing in the car shipping industry and how it affects your next transport.",
      category: "Industry News",
      date: "December 1, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
      featured: false
    }
  ];

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
                  Car Shipping <span className="text-primary">Blog</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Expert tips, industry insights, and comprehensive guides to help you ship your car with confidence.
                </p>
                
                {/* Search */}
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
                <h2 className="text-2xl font-bold mb-8">Featured Articles</h2>
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
              {featuredPosts.length > 0 && <h2 className="text-2xl font-bold mb-8">All Articles</h2>}
              
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
                  Stay Updated
                </h2>
                <p className="text-primary-foreground/80 mb-6">
                  Get the latest car shipping tips and industry news delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input 
                    placeholder="Enter your email" 
                    className="bg-primary-foreground text-foreground"
                  />
                  <Button variant="secondary">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Blog;