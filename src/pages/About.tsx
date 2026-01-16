import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useAbout } from "@/hooks/api";
import type { LucideIcon } from "lucide-react";

// Helper to resolve dynamic icons from Lucide
const getIcon = (name: string): LucideIcon => {
  const Icon = (LucideIcons as any)[name];
  return Icon || LucideIcons.HelpCircle;
};

const About = () => {
  const { data, isLoading } = useAbout();

  if (isLoading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  // Parse story_content to handle newlines
  const storyParagraphs = data.story_content.split("\n\n").filter((p) => p.trim());

  // Map StatsItems - API has label/value swapped compared to component usage
  const stats = data.StatsItems.map((item) => ({
    value: item.label,
    label: item.value,
  }));

  // Map ValueItems with dynamic icons
  const values = data.ValueItems.map((item) => ({
    icon: getIcon(item.icon_name),
    title: item.title,
    description: item.description,
  }));

  // Map Why30Items with dynamic icons
  const why30Items = data.Why30Items.map((item) => ({
    icon: getIcon(item.icon_name),
    text: item.text,
  }));

  // Get CTA icon
  const ctaIcon = data.sharedCTA.icon_name ? getIcon(data.sharedCTA.icon_name) : LucideIcons.Truck;

  return (
    <>
      <Helmet>
        <title>{data.about_helmet_title}</title>
        <meta
          name="description"
          content="Learn about CarShippers.ai - a licensed auto transport broker providing expert-verified quotes in 30 minutes. 50,000+ cars shipped, 4.9★ rating."
        />
        <link rel="canonical" href="https://carshippers.ai/about" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {data.title} <span className="text-primary">{data.hero_title}</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  {data.hero_description}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 bg-primary">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                      {stat.value}
                    </div>
                    <div className="text-primary-foreground/80">{stat.label}</div>
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
                  <div className="prose prose-lg max-w-none text-muted-foreground">
                    {storyParagraphs.map((paragraph, index) => (
                      <p key={index} className={index < storyParagraphs.length - 1 ? "mb-4" : ""}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values */}
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
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Why 30 Minutes */}
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
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">
                    {data.why_30_title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {data.why_30_description}
                  </p>
                  <ul className="space-y-4">
                    {why30Items.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <li key={index} className="flex items-start gap-3">
                          <Icon className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span>{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="text-muted-foreground mt-6">
                    {data.why_30_footer}
                  </p>
                </motion.div>
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
                {data.sharedCTA.icon_name ? (
                  <div className="w-16 h-16 bg-primary-foreground/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {(() => {
                      const Icon = ctaIcon;
                      return <Icon className="w-8 h-8 text-primary-foreground" />;
                    })()}
                  </div>
                ) : null}
                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  {data.sharedCTA.title}
                </h2>
                <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  {data.sharedCTA.description}
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => {
                    if (data.sharedCTA.primary_button_link) {
                      window.location.href = data.sharedCTA.primary_button_link;
                    }
                  }}
                >
                  {data.sharedCTA.primary_button_text}
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

export default About;
