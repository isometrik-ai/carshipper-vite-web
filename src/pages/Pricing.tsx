import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Info, ArrowRight } from "lucide-react";
import axios from "axios";
import { PRICING_ENDPOINT } from "@/constants/apiConstants";

const Pricing = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(PRICING_ENDPOINT);

        if (response.data?.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching Pricing page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !data) {
    return <div className="min-h-screen flex items-center justify-center">Loading Pricing...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{data.helmet_title}</title>
        <meta
          name="description"
          content="Car shipping costs $800-2,500 depending on distance, vehicle size, and transport type. Get your exact price in 30 minutes. No hidden fees."
        />
        <link rel="canonical" href="https://carshippers.ai/pricing" />
      </Helmet>

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
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {data.title} <span className="text-primary">{data.title_highlight}</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  {data.sub_title}
                </p>
                <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  {data.sub_title_highlight}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Service Types - Transport Options */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center mb-12"
              >
                {data.service_title}
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Note: Ensure your Strapi JSON includes 'serviceTypes' component array if not in the provided snippet */}
                {data.serviceTypes?.map((service: any, index: number) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`relative bg-card rounded-2xl border p-6 ${service.recommended ? "border-primary shadow-lg" : "border-border"
                      }`}
                  >
                    {service.recommended && (
                      <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                        Most Popular
                      </span>
                    )}
                    <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                    <p className="text-3xl font-bold text-primary mb-4">{service.price}</p>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features?.map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Popular Routes */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold text-center mb-4"
              >
                {data.popular_route_title}
              </motion.h2>
              <p className="text-center text-muted-foreground mb-12">
                {data.sub_popular_routes_title}
              </p>
              <div className="max-w-5xl mx-auto overflow-x-auto">
                <table className="w-full bg-card rounded-2xl border border-border overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      {data.popular_route_table_title?.map((header: string) => (
                        <th key={header} className="text-left p-4 font-semibold">{header}</th>
                      ))}
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.popularRoutes?.map((route: any, index: number) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-t border-border hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4">
                          <span className="font-medium">{route.from}</span>
                          <span className="text-muted-foreground mx-2">→</span>
                          <span className="font-medium">{route.to}</span>
                        </td>
                        <td className="p-4 text-muted-foreground">{route.distance}</td>
                        <td className="p-4 font-semibold text-primary">{route.price}</td>
                        <td className="p-4 text-muted-foreground">{route.days} days</td>
                        <td className="p-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary"
                            onClick={() => window.location.href = data.quoteButton?.label_url || "/#quote-form"}
                          >
                            {data.quoteButton?.button_label} <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Pricing Factors */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold text-center mb-4"
                >
                  What Affects Your Price?
                </motion.h2>
                <p className="text-center text-muted-foreground mb-12">
                  Understanding the factors that determine your shipping cost.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {data.pricingFactors?.map((item: any, index: number) => (
                    <motion.div
                      key={item.factor}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border"
                    >
                      <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold mb-1">{item.factor}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* What's Included */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold mb-8"
                >
                  {data.quote_tilte}
                </motion.h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.quotes?.map((item: string, index: number) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center justify-center gap-2 bg-card p-4 rounded-xl border border-border"
                    >
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span className="font-medium">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 md:py-24 bg-primary">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  {data.pricingCTA?.title}
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  {data.pricingCTA?.description}
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => window.location.href = data.pricingCTA?.primary_button_link || "/#quote-form"}
                >
                  {data.pricingCTA?.primary_button_text}
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Pricing;