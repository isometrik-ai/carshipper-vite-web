'use client';

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { PageSEO } from "@/components/seo/PageSEO";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { useContact } from "@/api/contact";
import { getIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import type { LucideIcon } from "lucide-react";
import type { HeroSection } from "@/types/LandingPage.types";
import type { ContactMethod, ContactMethodComponent, ContactForm, BusinessInfo } from "@/types/Contact.types";

// Force dynamic rendering (no static generation)
export const dynamic = 'force-dynamic';

/**
 * Contact page component
 * 
 * Fetches page content from Strapi CMS and renders sections with exact original layout.
 * All content is managed through Strapi, including SEO metadata and page sections.
 */
export default function Contact() {
  const { data, isLoading } = useContact();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Extract components from page content
  const pageData = useMemo(() => {
    if (!data?.data?.page_content) return null;

    const content = data.data.page_content;
    const heroSection = content.find(c => c.__component === "shared.hero-section") as HeroSection | undefined;
    const contactMethods = content.filter(c => c.__component === "shared.contact-methods") as ContactMethodComponent[];
    const contactForm = content.find(c => c.__component === "shared.contact-form") as ContactForm | undefined;
    const businessInfo = content.find(c => c.__component === "shared.business-info") as BusinessInfo | undefined;

    return {
      hero: heroSection,
      contactMethods,
      contactForm,
      businessInfo,
    };
  }, [data]);

  // Extract page content for SEO
  const pageContent = useMemo(() => {
    return data?.data?.page_content || [];
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pageData?.contactForm) {
      toast({
        title: pageData.contactForm.success_message_title || "Message Sent!",
        description: pageData.contactForm.success_message_description || "We'll get back to you within 24 hours.",
      });
    } else {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    }
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  // Show loading state while fetching initial data
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

      <main className="flex-1 pt-20" role="main" aria-label="Contact page main content">
        {/* Hero Section - Contains the ONLY H1 on the page */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background" aria-labelledby="contact-hero-heading">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 id="contact-hero-heading" className="text-4xl md:text-5xl font-bold mb-6">
                {pageData.hero?.main_headline || "Get in"}{" "}
                {pageData.hero?.highlighted_text ? (
                  <span className="text-primary">{pageData.hero.highlighted_text}</span>
                ) : null}
              </h1>
              {pageData.hero?.description ? (
                <p className="text-lg md:text-xl text-muted-foreground">
                  {pageData.hero.description}
                </p>
              ) : null}
            </motion.div>
          </div>
        </section>

        {/* Contact Methods Section */}
        {pageData.contactMethods && pageData.contactMethods.length > 0 ? (
          <section className="py-12" aria-label="Contact methods">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto" role="list" aria-label="Contact methods">
                {pageData.contactMethods.map((method, index) => {
                  const MethodIcon = method.icon_name
                    ? (getIcon(method.icon_name) as LucideIcon)
                    : null;

                  return (
                    <motion.article
                      key={method.id || method.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
                      role="listitem"
                    >
                      {MethodIcon ? (
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                          <MethodIcon className="w-6 h-6 text-primary" />
                        </div>
                      ) : null}
                      <p className="font-semibold mb-1 text-lg">{method.title}</p>
                      <p className="text-primary font-medium mb-1">{method.value}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* Contact Form Section */}
        {pageData.contactForm ? (
          <section className="py-16 md:py-24" aria-labelledby="contact-form-heading">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {pageData.contactForm.form_title ? (
                    <h2 id="contact-form-heading" className="text-2xl md:text-3xl font-bold mb-8 text-center">
                      {pageData.contactForm.form_title}
                    </h2>
                  ) : null}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        {pageData.contactForm.name_label ? (
                          <label className="block text-sm font-medium mb-2">
                            {pageData.contactForm.name_label}
                          </label>
                        ) : null}
                        <Input
                          placeholder={pageData.contactForm.name_placeholder || "Your name"}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required={pageData.contactForm.name_required}
                        />
                      </div>
                      <div>
                        {pageData.contactForm.email_label ? (
                          <label className="block text-sm font-medium mb-2">
                            {pageData.contactForm.email_label}
                          </label>
                        ) : null}
                        <Input
                          type="email"
                          placeholder={pageData.contactForm.email_placeholder || "you@example.com"}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required={pageData.contactForm.email_required}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        {pageData.contactForm.phone_label ? (
                          <label className="block text-sm font-medium mb-2">
                            {pageData.contactForm.phone_label}
                          </label>
                        ) : null}
                        <Input
                          type="tel"
                          placeholder={pageData.contactForm.phone_placeholder || "(555) 555-5555"}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required={pageData.contactForm.phone_required}
                        />
                      </div>
                      <div>
                        {pageData.contactForm.subject_label ? (
                          <label className="block text-sm font-medium mb-2">
                            {pageData.contactForm.subject_label}
                          </label>
                        ) : null}
                        <Input
                          placeholder={pageData.contactForm.subject_placeholder || "How can we help?"}
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required={pageData.contactForm.subject_required}
                        />
                      </div>
                    </div>
                    <div>
                      {pageData.contactForm.message_label ? (
                        <label className="block text-sm font-medium mb-2">
                          {pageData.contactForm.message_label}
                        </label>
                      ) : null}
                      <Textarea
                        placeholder={pageData.contactForm.message_placeholder || "Tell us more about your question..."}
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required={pageData.contactForm.message_required}
                      />
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      {pageData.contactForm.submit_button_text || "Send Message"}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>
        ) : null}

        {/* Business Info Section */}
        {pageData.businessInfo ? (
          <section className="py-16 bg-muted/30" aria-labelledby="business-info-heading">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                {pageData.businessInfo.section_title ? (
                  <h2 id="business-info-heading" className="text-2xl font-bold mb-8">{pageData.businessInfo.section_title}</h2>
                ) : null}
                {pageData.businessInfo.info_items && pageData.businessInfo.info_items.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {pageData.businessInfo.info_items.map((item) => {
                      const ItemIcon = item.icon_name
                        ? (getIcon(item.icon_name) as LucideIcon)
                        : null;

                      return (
                        <div key={item.id || item.text} className="flex items-center justify-center gap-3 text-muted-foreground">
                          {ItemIcon ? (
                            <ItemIcon className="w-5 h-5 text-primary" aria-hidden="true" />
                          ) : null}
                          <span>{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                {pageData.businessInfo.license_info ? (
                  <p className="mt-6 text-muted-foreground">
                    {pageData.businessInfo.license_info}
                  </p>
                ) : null}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}

