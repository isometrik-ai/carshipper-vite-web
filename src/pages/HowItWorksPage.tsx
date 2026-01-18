import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import * as Icons from "lucide-react"; // Import all icons for dynamic mapping
import { Link } from "react-router-dom";
import { useHowItWorks } from "@/hooks/api/useHowItWorks";

// Helper to render Lucide icons by name from Strapi
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name];
  return IconComponent ? <IconComponent className={className} /> : <Icons.HelpCircle className={className} />;
};

const HowItWorksPage = () => {
  const { data, isLoading, error } = useHowItWorks();

  if (isLoading || error) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!data) return null;

  const { hero_section, verifiedQuotes, customerSay, shipping, howItWorksCTA } = data as any;

  return (
    <>
      <Helmet>
        <title>How Auto Transport Works | Complete Car Shipping Guide 2025 | CarShippers.ai</title>
        <meta name="description" content={hero_section?.description} />
        <link rel="canonical" href="https://carshippers.ai/how-it-works" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    {hero_section.hero_title} <span className="text-primary">{hero_section.hero_title_highlight}</span>
                  </h1>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8">
                    {hero_section.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    {hero_section.services.map((service: any) => (
                      <div key={service.id} className="flex items-center gap-2 text-sm bg-muted/50 px-4 py-2 rounded-full">
                        <DynamicIcon name={service.icon_name} className="w-4 h-4 text-primary" />
                        <span>{service.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {hero_section.contact.map((contact: any) => (
                      <a key={contact.id} href={contact.href} className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
                        <DynamicIcon name={contact.icon_name} className="w-5 h-5" />
                        {contact.text}
                      </a>
                    ))}
                  </div>
                </motion.div>

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

          {/* Shipping Process Steps */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{shipping.title}</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">{shipping.descrption}</p>
              </motion.div>

              <div className="max-w-4xl mx-auto">
                {shipping.shipping_process.map((step: any, index: number) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex gap-6 md:gap-8 ${index !== shipping.shipping_process.length - 1 ? "mb-12 pb-12 border-b border-border" : ""}`}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-2xl flex items-center justify-center relative">
                        <DynamicIcon name={step.icon_name} className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground" />
                        <span className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center text-sm font-bold text-success-foreground">
                          {step.serial_no}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Verification Comparison */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{verifiedQuotes.title}</h2>
                  <p className="text-muted-foreground">{verifiedQuotes.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {verifiedQuotes.quotesVerification.map((v: any) => (
                    <div
                      key={v.id}
                      className={`border rounded-2xl p-6 ${v.recommended ? 'bg-success/5 border-success/20' : 'bg-destructive/5 border-destructive/20'}`}
                    >
                      <h3 className={`font-semibold mb-3 ${v.recommended ? 'text-success' : 'text-destructive'}`}>
                        {v.title}
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {v.quotesList.map((item: string, i: number) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Customer Testimonials */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{customerSay.title}</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {customerSay.customerCard.map((card: any) => (
                  <div key={card.id} className="bg-muted/30 rounded-xl p-6 border border-border">
                    <p className="text-muted-foreground mb-4">{card.title}</p>
                    <div>
                      <p className="font-semibold">{card.author}</p>
                      <p className="text-sm text-muted-foreground">{card.place}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{howItWorksCTA.title}</h2>
              <p className="text-xl opacity-80 mb-8 max-w-2xl mx-auto">
                {howItWorksCTA.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/quote">
                  <Button variant="secondary" size="lg" className="text-lg px-8">{howItWorksCTA.primary_button_text}</Button>
                </Link>
                <a href={howItWorksCTA.secondary_button_link} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Icons.Phone className="w-5 h-5" />
                  <span className="font-medium">{howItWorksCTA.secondary_button_text}</span>
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HowItWorksPage;