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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCaliforniaShipping } from "@/hooks/api/useCaliforniaShipping";

const iconMap: Record<string, any> = {
  Shield,
  Clock,
  Truck,
  Star,
  Car,
  DollarSign,
  CheckCircle,
  MapPin,
  Phone,
};

const CaliforniaShipping = () => {
  const { data, isLoading, error } = useCaliforniaShipping();

  if (isLoading || error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const hero = data;
  const howItWorks = data.service_cards[0];
  const whyCards = data.process_cards[0];
  const cities = data.trailer_options.services;
  const faqs = data.faqs.FAQS;
  const stats = data.stats.stats;
  const tableItems = data.table_data.table;

  return (
    <>
      <Helmet>
        <title>{hero.title}</title>
        <meta name="description" content={hero.description} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          {/* ----------------------- HERO ----------------------- */}
          <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {hero.page_tagline}
                    </span>
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {hero.title}{" "}
                    <span className="text-primary">{hero.title_highlight}</span>
                  </h1>

                  <p className="text-lg text-muted-foreground mb-6">
                    {hero.description}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={whyCards.contact[0]?.href || "#"}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                    >
                      <Phone className="w-5 h-5" />
                      {whyCards.contact[0]?.text}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <QuoteForm />
                </motion.div>
              </div>
            </div>
          </section>

          {/* ----------------------- STATS ----------------------- */}
          <section className="py-8 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {stats.map((s, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {s.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {s.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ----------------------- HOW IT WORKS ----------------------- */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {howItWorks.hero_title}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {howItWorks.description}
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {howItWorks.Stats.map((step, index) => (
                  <motion.div key={step.id} className="text-center">
                    <div className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {step.value}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {step.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.descrption}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ----------------------- TABLES ----------------------- */}
          {tableItems.map((table) => (
            <section key={table.id} className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <motion.div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {table.table_title}
                  </h2>
                  <p className="text-muted-foreground">{table.table_sub_title}</p>
                </motion.div>

                <div className="overflow-x-auto">
                  <table className="w-full bg-background rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-primary text-primary-foreground">
                      <tr>
                        {table.table_header.map((h) => (
                          <th key={h} className="px-4 py-3 text-left">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.table_cell_data.map((row, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-muted/50" : ""}
                        >
                          <td className="px-4 py-3">{row.from}</td>
                          <td className="px-4 py-3">{row.to}</td>
                          <td className="px-4 py-3">{row.distance}</td>
                          <td className="px-4 py-3">{row.time}</td>
                          <td className="px-4 py-3 font-semibold text-primary">
                            {row.cost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ))}

          {/* ----------------------- CITIES ----------------------- */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {data.trailer_options.hero_title}
                </h2>
                <p className="text-muted-foreground">
                  {data.trailer_options.description}
                </p>
              </motion.div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {cities.map((c) => (
                  <Link
                    key={c.id}
                    to={c.href || "#"}
                    className="flex items-center gap-2 p-4 bg-background rounded-lg border border-border hover:border-primary transition"
                  >
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-medium">{c.text}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* ----------------------- WHY CHOOSE US ----------------------- */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {whyCards.hero_title}
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {whyCards.services.map((item) => {
                  const IconComp =
                    iconMap[item.icon_name || "Shield"] || Shield;
                  return (
                    <motion.div key={item.id} className="text-center p-6 rounded-xl bg-muted/30">
                      <IconComp className="w-10 h-10 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold text-lg mb-2">{item.text}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ----------------------- FAQ ----------------------- */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {data.faqs.title}
                </h2>
              </motion.div>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq) => (
                  <motion.div key={faq.id} className="bg-background rounded-lg p-6 border border-border">
                    <h3 className="font-semibold text-lg mb-2">
                      {faq.questions}
                    </h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ----------------------- CTA ----------------------- */}
          <section className="py-16 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {data.cta.title}
                </h2>

                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  {data.cta.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="text-lg px-8"
                    onClick={() =>
                      window.location.href =
                      data.cta.primary_button_link || "#"
                    }
                  >
                    {data.cta.primary_button_text}
                  </Button>

                  {data.cta.show_phone && data.cta.secondary_button_text && (
                    <a
                      href={data.cta.secondary_button_link || "#"}
                      className="flex items-center gap-2 text-primary-foreground hover:underline"
                    >
                      <Phone className="w-5 h-5" />
                      {data.cta.secondary_button_text}
                    </a>
                  )}
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

export default CaliforniaShipping;