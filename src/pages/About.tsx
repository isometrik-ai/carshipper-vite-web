import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Shield,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Truck,
  HelpCircle,
  LucideIcon,
  Phone
} from "lucide-react";
import { ABOUT_ENDPOINT } from "@/constants/apiConstants";
import { AboutData } from "@/types/about.types";

const iconMap: Record<string, LucideIcon> = {
  Shield,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Truck
};

const About = () => {
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ABOUT_ENDPOINT);
        if (response.data?.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching About page data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }


  return (
    <>
      <Helmet>
        <title>{data.about_helmet_title}</title>
        <meta name="description" content={data.hero_description} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {data.title} <span className="text-primary">{data.sub_title}</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  {data.hero_description}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 bg-primary">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {data.StatsItems.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                      {stat.label}
                    </div>
                    <div className="text-primary-foreground/80">{stat.value}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">{data.story_title}</h2>
                  <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line">
                    {data.story_content}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
              >
                {data.value_title}
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {data.ValueItems.map((value, index) => {
                  const IconComponent = iconMap[value.icon_name] || HelpCircle;
                  return (
                    <motion.div
                      key={value.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card p-6 rounded-2xl border border-border"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <IconComponent className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why 30 Minutes Section */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-secondary/50 rounded-3xl p-8 md:p-12"
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">{data.why_30_title}</h2>
                  <p className="text-muted-foreground mb-6">{data.why_30_description}</p>
                  <ul className="space-y-4">
                    {data.Why30Items.map((item) => {
                      const ItemIcon = iconMap[item.icon_name] || CheckCircle;
                      return (
                        <li key={item.id} className="flex items-start gap-3">
                          <ItemIcon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="text-muted-foreground mt-6">{data.why_30_footer}</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Dynamic CTA Section */}
          <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {data.sharedCTA?.icon_name && (
                  <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {(() => {
                      const CTAIcon = iconMap[data.sharedCTA.icon_name] || Truck;
                      return <CTAIcon className="w-8 h-8 text-primary-foreground" />;
                    })()}
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{data.sharedCTA?.title}</h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  {data.sharedCTA?.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="text-lg px-8"
                    onClick={() => window.location.href = data.sharedCTA.primary_button_link}
                  >
                    {data.sharedCTA?.primary_button_text}
                  </Button>

                  {data.sharedCTA?.show_phone && data.sharedCTA?.secondary_button_text && (
                    <a
                      href={data.sharedCTA?.secondary_button_link || "#"}
                      className="flex items-center gap-2 text-primary-foreground hover:underline font-medium"
                    >
                      <Phone className="w-5 h-5" />
                      {data.sharedCTA?.secondary_button_text}
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

export default About;