import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";

import {
  Shield,
  Clock,
  Truck,
  Star,
  CheckCircle,
  MapPin,
  Phone,
  Car,
  DollarSign,
  Building2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { useLosAngelesShipping } from "@/hooks/api/useLosAngelesShipping";

const ICONS: Record<string, React.ComponentType<any>> = {
  Shield,
  Clock,
  Truck,
  Star,
  CheckCircle,
  MapPin,
  Phone,
  Car,
  DollarSign,
  Building2,
};

// ✅ Safe icon getter
const getIcon = (name?: string | null): React.ComponentType<any> => {
  if (!name) return CheckCircle;
  return ICONS[name] || CheckCircle;
};

const LosAngelesShipping = () => {
  const { data: page, isLoading } = useLosAngelesShipping();

  if (isLoading || !page) return null;

  // Dynamic Data from API
  const mainStats = page.stats?.stats || [];
  const neighborhoods = page.secondary_section?.services || [];
  const faqs = page.faqs?.FAQS || [];
  const serviceIcons = page.service_card?.servieces || [];
  const tableData = page.table_data?.table || [];
  const whyChooseUs = page.solutions?.services || [];

  const PageIcon = getIcon(page.page_icon);

  return (
    <>
      <Helmet>
        <title>{`${page.title} ${page.title_highlight}`}</title>
        <meta name="description" content={page.description} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          {/* -------------------------------- */}
          {/* HERO SECTION */}
          {/* -------------------------------- */}
          <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/20 overflow-hidden">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">

                {/* LEFT SIDE - TEXT */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                    <PageIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{page.page_tagline}</span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {page.title} <span className="text-primary">{page.title_highlight}</span>
                  </h1>

                  <p className="text-lg text-muted-foreground mb-6">
                    {page.description}
                  </p>

                  {/* Service Icons */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {serviceIcons.map((item) => {
                      const Icon = getIcon(item.icon_name);
                      return (
                        <div key={item.id} className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-primary" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Phone CTA */}
                  {page.cta?.show_phone && (
                    <a
                      href={page.cta.secondary_button_link || "#"}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                    >
                      <Phone className="w-5 h-5" />
                      {page.cta.secondary_button_text}
                    </a>
                  )}
                </motion.div>

                {/* RIGHT SIDE - QUOTE FORM */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <QuoteForm />
                </motion.div>
              </div>
            </div>
          </section>

          {/* -------------------------------- */}
          {/* STATS BLOCK */}
          {/* -------------------------------- */}
          <section className="py-8 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center items-center gap-10">
                {mainStats.map((stat) => (
                  <div key={stat.title} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* -------------------------------- */}
          {/* NEIGHBORHOODS */}
          {/* -------------------------------- */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {page.secondary_section.hero_title}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {page.secondary_section.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
                {neighborhoods.map((area) => {
                  const Icon = getIcon(area.icon_name);
                  return (
                    <div key={area.id} className="flex items-center gap-2 bg-muted/50 p-3 rounded-lg text-sm">
                      <Icon className="w-3 h-3 text-primary" />
                      <span>{area.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* -------------------------------- */}
          {/* TABLES */}
          {/* -------------------------------- */}
          {tableData.map((tbl) => (
            <section key={tbl.id} className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{tbl.table_title}</h2>
                <p className="text-muted-foreground mb-6">{tbl.table_sub_title}</p>

                <div className="overflow-x-auto">
                  <table className="w-full bg-background rounded-lg overflow-hidden shadow">
                    <thead className="bg-primary text-primary-foreground">
                      <tr>
                        {tbl.table_header.map((col) => (
                          <th key={col} className="px-4 py-3 text-left">{col}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {tbl.table_cell_data.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                          {tbl.table_header.map((col) => (
                            <td key={col} className="px-4 py-3">
                              {row[col.toLowerCase()] || row[col] || "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ))}

          {/* -------------------------------- */}
          {/* WHY CHOOSE US */}
          {/* -------------------------------- */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
                {page.solutions.title}
              </h2>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {whyChooseUs.map((item) => {
                  const Icon = getIcon(item.icon_name);
                  return (
                    <div key={item.id} className="text-center p-6 rounded-xl bg-background border">
                      <Icon className="w-10 h-10 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* -------------------------------- */}
          {/* FAQ */}
          {/* -------------------------------- */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {page.faqs.title}
              </h2>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-muted/30 p-6 rounded-lg border">
                    <h3 className="font-semibold text-lg mb-2">{faq.questions}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* -------------------------------- */}
          {/* CTA */}
          {/* -------------------------------- */}
          <section className="py-16 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {page.cta.title}
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-6">{page.cta.description}</p>

              <Button variant="secondary" size="lg" className="px-8 text-lg"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                {page.cta.primary_button_text}
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LosAngelesShipping;
