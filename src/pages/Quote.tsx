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
  Phone,
  CheckCircle,
  DollarSign,
  Car,
  Calculator,
  TrendingUp,
  MapPin,
} from "lucide-react";

import { useQuote } from "@/hooks/api/useQuote";

const ICONS: Record<string, any> = {
  Truck,
  Shield,
  Clock,
  CheckCircle,
  Phone,
  Calculator,
  MapPin,
  Car,
  TrendingUp,
  DollarSign,
  Star,
};

const getIcon = (name?: string | null): React.ComponentType<any> => {
  if (!name) return CheckCircle;
  return ICONS[name] || CheckCircle;
};

const getChipColorClasses = (index: number) => {
  const colors = [
    "bg-success/10 text-success", // First chip - green
    "bg-primary/10 text-primary", // Second chip - blue
    "bg-warning/10 text-warning-foreground", // Third chip - yellow/gold
  ];
  return colors[index % colors.length] || "bg-primary/10 text-primary";
};

const Quote = () => {
  const { data: page, isLoading } = useQuote();

  if (isLoading || !page) return null;

  // The 3 key benefits with green checkmarks come from page.services
  const keyBenefits = page.services ?? [];
  // The 6 colored service chips come from page.service_card.servieces
  const serviceChips = page.service_card?.servieces ?? [];
  const stats = page.stats?.stats ?? [];
  const costFactors = page.service_cards?.[0]?.services ?? [];
  const processSteps = page.process_cards?.[0]?.features ?? [];
  const tables = page.table_data?.table ?? [];

  const PageIcon = getIcon(page.page_icon);

  return (
    <>
      <Helmet>
        <title>Car Shipping Cost Calculator | Auto Transport Quotes 2025 | CarShippers.ai</title>
        <meta name="description" content="Calculate your car shipping cost instantly. Get accurate auto transport quotes based on distance, vehicle type, and carrier. Average cost: $0.40-$2.00 per mile." />
        <link rel="canonical" href="https://carshippers.ai/quote" />
        <meta name="keywords" content="car shipping cost calculator, auto transport quote, vehicle shipping cost, car transport price, shipping car cost" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {page.page_tagline ? (
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                      <PageIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{page.page_tagline}</span>
                    </div>
                  ) : null}

                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {page.title} <span className="text-primary">{page.title_highlight}</span>
                  </h1>

                  {page.description ? (
                    <p className="text-lg text-muted-foreground mb-6">
                      {page.description}
                    </p>
                  ) : null}

                  {/* Key Benefits - 3 items with green checkmarks */}
                  {keyBenefits.length > 0 && (
                    <div className="space-y-3 mb-8">
                      {keyBenefits.map((benefit) => {
                        const Icon = getIcon(benefit.icon_name);
                        return (
                          <div key={benefit.id} className="flex items-center gap-3">
                            <Icon className="w-5 h-5 text-success flex-shrink-0" />
                            <span>{benefit.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Service Chips - 6 colored badges */}
                  {serviceChips.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {serviceChips.map((chip, index) => {
                        const Icon = getIcon(chip.icon_name);
                        const colorClasses = getChipColorClasses(index);
                        return (
                          <div key={chip.id} className={`flex items-center gap-2 ${colorClasses} px-4 py-2 rounded-full`}>
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{chip.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>

                {/* Quote Form */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <QuoteForm />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          {stats.length > 0 && (
            <section className="py-12 bg-muted/30">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={String(stat.label)}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{String(stat.label)}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* How Much Does It Cost */}
          {page.table_data && (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {page.table_data.title ?? "How Much Does It Cost to Ship a Car?"}
                  </h2>
                  {page.table_data.sub_title ? (
                    <p className="text-muted-foreground max-w-3xl mx-auto">
                      {page.table_data.sub_title}
                    </p>
                  ) : null}
                </motion.div>

                {tables.map((table, tableIndex) => (
                  <div key={table.id} className={tableIndex < tables.length - 1 ? "mb-12" : ""}>
                    <h3 className="text-xl font-semibold mb-4">{table.table_title}</h3>
                    {table.table_sub_title ? (
                      <p className="text-muted-foreground mb-4">{table.table_sub_title}</p>
                    ) : null}
                    <div className="overflow-x-auto">
                      <table className="w-full bg-background rounded-lg overflow-hidden shadow-sm border border-border">
                        <thead className="bg-primary text-primary-foreground">
                          <tr>
                            {table.table_header.map((header, headerIndex) => (
                              <th key={headerIndex} className="px-4 py-3 text-left">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.table_cell_data.map((row: any, rowIndex: number) => (
                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-muted/50" : ""}>
                              {table.table_header.map((header, headerIndex) => {
                                const headerLower = header.toLowerCase();
                                let cellValue = "";

                                // Map header to row property based on common patterns
                                if (headerLower.includes("route") || headerLower.includes("distance")) {
                                  cellValue = row.distance || "";
                                } else if (headerLower.includes("open")) {
                                  cellValue = row.openCost || "";
                                } else if (headerLower.includes("enclosed")) {
                                  cellValue = row.enclosedCost || "";
                                } else if (headerLower.includes("vehicle") || headerLower.includes("type")) {
                                  cellValue = row.type || "";
                                } else if (headerLower.includes("<500") || (headerLower.includes("500") && !headerLower.includes("2500"))) {
                                  cellValue = row.short || "";
                                } else if (headerLower.includes("500-2,500") || headerLower.includes("500-2500")) {
                                  cellValue = row.medium || "";
                                } else if (headerLower.includes(">2,500") || headerLower.includes(">2500")) {
                                  cellValue = row.long || "";
                                } else {
                                  // Fallback: try to find matching property
                                  const key = Object.keys(row).find(
                                    (k) => k.toLowerCase() === headerLower.replace(/\s+/g, "") ||
                                      headerLower.includes(k.toLowerCase()) ||
                                      k.toLowerCase().includes(headerLower.replace(/\s+/g, ""))
                                  );
                                  cellValue = key ? row[key] : "";
                                }

                                return (
                                  <td
                                    key={headerIndex}
                                    className={headerIndex === 0 ? "px-4 py-3 font-medium" : "px-4 py-3 text-primary"}
                                  >
                                    {cellValue}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Cost Factors */}
          {costFactors.length > 0 && (
            <section className="py-16 bg-muted/30">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {page.service_cards?.[0]?.hero_title ?? "6 Factors That Impact Car Shipping Cost"}
                  </h2>
                  {page.service_cards?.[0]?.description ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {page.service_cards[0].description}
                    </p>
                  ) : null}
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {costFactors.map((factor, index) => {
                    const Icon = getIcon(factor.icon_name);
                    return (
                      <motion.div
                        key={factor.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-background p-6 rounded-xl border border-border"
                      >
                        <Icon className="w-8 h-8 text-primary mb-4" />
                        <h3 className="font-semibold text-lg mb-2">{factor.text}</h3>
                        <p className="text-sm text-muted-foreground">{factor.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* How It Works */}
          {processSteps.length > 0 && (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {page.process_cards?.[0]?.hero_title ?? "How Our Quote Process Works"}
                  </h2>
                  {page.process_cards?.[0]?.description ? (
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                      {page.process_cards[0].description}
                    </p>
                  ) : null}
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center"
                    >
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                        {step.value}
                      </div>
                      <h3 className="font-semibold mb-2">{String(step.label)}</h3>
                      <p className="text-sm text-muted-foreground">{step.descrption}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Call CTA */}
          {page.cta && (
            <section className="py-12 bg-primary">
              <div className="container mx-auto px-4 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-primary-foreground mb-4">
                    {page.cta.title}
                  </h2>
                  {page.cta.description ? (
                    <p className="text-primary-foreground/80 mb-6">
                      {page.cta.description}
                    </p>
                  ) : null}
                  {page.cta.show_phone && page.cta.secondary_button_text && page.cta.secondary_button_link ? (
                    <a
                      href={page.cta.secondary_button_link}
                      className="inline-flex items-center gap-2 text-xl font-bold text-primary-foreground hover:underline"
                    >
                      <Phone className="w-6 h-6" />
                      {page.cta.secondary_button_text}
                    </a>
                  ) : null}
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

export default Quote;