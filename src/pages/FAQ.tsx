import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useFAQ } from "@/api/faq";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { FAQHero, FAQCategories, ContactCTA, FAQItem } from "@/types/FAQ.types";
import type { CallToAction } from "@/types/LandingPage.types";

/**
 * FAQ page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
const FAQ = () => {
  const { data, isLoading } = useFAQ();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const faqHero = content.find(c => c.__component === "shared.faq-hero") as FAQHero | undefined;
    const faqCategories = content.find(c => c.__component === "shared.faq-categories") as FAQCategories | undefined;
    const contactCTA = content.find(c => c.__component === "shared.contact-cta") as ContactCTA | undefined;
    const cta = content.find(c => c.__component === "shared.call-to-action") as CallToAction | undefined;

    return {
      hero: faqHero,
      categories: faqCategories,
      contactCTA,
      cta,
    };
  }, [data]);

  // Filter categories based on search query
  const filteredCategories = useMemo(() => {
    if (!pageData?.categories?.categories) return [];

    // If no search query, show all categories with all FAQs
    if (!searchQuery.trim()) {
      return pageData.categories.categories;
    }

    // Filter categories and FAQs based on search query
    const query = searchQuery.toLowerCase();
    return pageData.categories.categories
      .map(category => ({
        ...category,
        faqs: category.faqs?.filter(
          (faq: FAQItem) =>
            faq.question?.toLowerCase().includes(query) ||
            faq.answer?.toLowerCase().includes(query)
        ) || [],
      }))
      .filter(category => category.faqs.length > 0);
  }, [pageData?.categories?.categories, searchQuery]);

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
          <main className="flex-1 pt-20" role="main" aria-label="Main content">
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
          {/* Hero */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                {pageData.hero ? (
                  <>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                      {pageData.hero.main_headline || "Frequently Asked"}{" "}
                      {pageData.hero.highlighted_text ? (
                        <span className="text-primary">{pageData.hero.highlighted_text}</span>
                      ) : null}
                    </h1>
                    {pageData.hero.description ? (
                      <p className="text-lg md:text-xl text-muted-foreground mb-8">
                        {pageData.hero.description}
                      </p>
                    ) : null}
                    <div className="relative max-w-md mx-auto">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                      <Input
                        placeholder={pageData.hero.search_placeholder || "Search questions..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 h-12 text-lg"
                      />
                    </div>
                  </>
                ) : null}
              </motion.div>
            </div>
          </section>

          {/* FAQ Categories */}
          {pageData.categories && pageData.categories.categories && pageData.categories.categories.length > 0 ? (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                  {filteredCategories.map((category, categoryIndex) => (
                    <motion.div
                      key={category.id || category.category_title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                      className="mb-12"
                    >
                      <h2 id={`category-${category.id}`} className="text-2xl font-bold mb-6">
                        {category.category_title}
                      </h2>
                      {category.faqs && category.faqs.length > 0 ? (
                        <Accordion type="single" collapsible className="space-y-4" aria-labelledby={`category-${category.id}`}>
                          {category.faqs.map((faq: FAQItem, index: number) => (
                            <AccordionItem
                              key={faq.id || index}
                              value={`category-${category.id}-faq-${faq.id || index}`}
                              className="bg-card border border-border rounded-xl px-6"
                            >
                              <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground pb-4 whitespace-pre-line">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : null}
                    </motion.div>
                  ))}

                  {filteredCategories.length === 0 && searchQuery ? (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">
                        {pageData.categories.empty_state_message || `No questions found matching "${searchQuery}"`}
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setSearchQuery("")}
                      >
                        {pageData.categories.clear_search_button_text || "Clear Search"}
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            </section>
          ) : null}

          {/* Still Have Questions */}
          {pageData.contactCTA ? (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {pageData.contactCTA.title ? (
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {pageData.contactCTA.title}
                    </h2>
                  ) : null}
                  {pageData.contactCTA.description ? (
                    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                      {pageData.contactCTA.description}
                    </p>
                  ) : null}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {pageData.contactCTA.primary_button ? (
                      <Button 
                        variant="hero" 
                        size="lg" 
                        onClick={() => {
                          const link = pageData.contactCTA.primary_button?.button_link || "/contact";
                          if (link.startsWith("http") || link.startsWith("tel:") || link.startsWith("mailto:")) {
                            window.location.href = link;
                          } else {
                            navigate(link);
                          }
                        }}
                      >
                        {pageData.contactCTA.primary_button.button_text || "Contact Us"}
                      </Button>
                    ) : null}
                    {pageData.contactCTA.secondary_button ? (
                      <a 
                        href={pageData.contactCTA.secondary_button.button_link || "tel:+18885551234"}
                        className="text-primary hover:underline font-medium"
                      >
                        {pageData.contactCTA.secondary_button.button_text || "Or call (888) 555-1234"}
                      </a>
                    ) : null}
                  </div>
                </motion.div>
              </div>
            </section>
          ) : null}

          {/* CTA */}
          {pageData.cta ? (
            <section className="py-16 md:py-24 bg-primary">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                    {pageData.cta.headline || "Ready to Ship Your Car?"}
                  </h2>
                  {pageData.cta.description ? (
                    <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                      {pageData.cta.description}
                    </p>
                  ) : null}
                  {pageData.cta.primary_button ? (
                    <Button
                      variant="secondary"
                      size="lg"
                      className="text-lg px-8"
                      onClick={() => {
                        const link = pageData.cta.primary_button?.button_link || "/quote";
                        if (link.startsWith("http") || link.startsWith("tel:") || link.startsWith("mailto:")) {
                          window.location.href = link;
                        } else {
                          navigate(link);
                        }
                      }}
                    >
                      {pageData.cta.primary_button.button_text || "Get Your Quote"}
                    </Button>
                  ) : null}
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

export default FAQ;
