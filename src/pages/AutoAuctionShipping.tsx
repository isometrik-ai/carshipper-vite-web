import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { motion } from "framer-motion";
import {
  Gavel,
  Shield,
  Clock,
  CheckCircle,
  Truck,
  Phone,
  ArrowRight,
  MapPin,
  Users,
  Zap,
  FileText,
  Route,
  Weight,
  AlertTriangle,
  MessageSquare,
  BarChart3,
} from "lucide-react";

import { useAutoAuctionShipping } from "@/hooks/api/useAutoAuctionShipping";

const ICONS: Record<string, any> = {
  Truck,
  Shield,
  Clock,
  FileText,
  Route,
  Weight,
  CheckCircle,
  Phone,
  AlertTriangle,
  Gavel,
  MessageSquare,
  MapPin,
  BarChart3,
  Zap,
  Users,
  ArrowRight,
};

const getIcon = (name?: string | null): React.ComponentType<any> => {
  if (!name) return CheckCircle;
  return ICONS[name] || CheckCircle;
};

const AutoAuctionShipping = () => {
  const { data: page, isLoading } = useAutoAuctionShipping();

  if (isLoading || !page) return null;

  const auctionServices = page.service_card?.servieces ?? [];
  const services = page.secondary_section?.services ?? [];
  const features = page.trailer_options?.services ?? [];
  const processSteps = page.process_cards?.[0]?.Stats ?? [];

  const PageIcon = getIcon(page.page_icon);

  return (
    <>
      <Helmet>
        <title>
          {page.title} {page.title_highlight}
        </title>
        <meta name="description" content={page.description} />
      </Helmet>

      <Header />

      <main>
        {/* Hero Section with Quote Form */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/5 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
                  <PageIcon className="w-4 h-4" />
                  <span>{page.page_tagline}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  {page.title} <span className="text-primary">{page.title_highlight}</span>
                </h1>

                <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                  {page.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <QuoteForm />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Auction Services */}
        {auctionServices.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-card rounded-2xl shadow-lg p-8 border"
                >
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    {page.service_card?.title ?? "Auction Services"}
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {auctionServices.map((service) => {
                      const Icon = getIcon(service.icon_name);
                      return (
                        <div key={service.id} className="flex items-center gap-2 text-sm">
                          <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                          <span>{service.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Two-Way Service */}
        {services.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {page.secondary_section?.hero_title ?? "We Work with Auto Auctions Two Ways"}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {page.secondary_section?.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {services.map((service, index) => {
                  const Icon = getIcon(service.icon_name);
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-card rounded-xl p-8 shadow-lg border"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{service.text}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {page.trailer_options?.hero_title ?? "Why Auction Buyers Trust Us"}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {page.trailer_options?.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = getIcon(feature.icon_name);
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-card rounded-xl p-6 shadow-lg border hover:shadow-xl transition-shadow"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.text}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Process Section */}
        {processSteps.length > 0 && (
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {page.process_cards?.[0]?.hero_title ?? "From Winning Bid to Delivery"}
              </h2>

              <div className="flex flex-wrap justify-center gap-4">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(20%-1rem)]"
                  >
                    <div className="w-10 h-10 bg-primary-foreground text-primary rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                      {step.value}
                    </div>
                    <h3 className="font-semibold mb-2">{String(step.label)}</h3>
                    <p className="text-primary-foreground/80 text-sm">{step.descrption}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonial */}
        {page.manager_msg && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-xl italic text-muted-foreground mb-6">{page.manager_msg}</p>
                  {page.manager_name ? (
                    <p className="font-semibold">{page.manager_name}</p>
                  ) : null}
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* Storage Fee Warning */}
        {page.compliance && (
          <section className="py-12 bg-accent/10">
            <div className="container mx-auto px-4">
              <div className="flex items-start gap-4 max-w-4xl mx-auto">
                <Clock className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">{page.compliance.hero_title}</h3>
                  <p className="text-muted-foreground">{page.compliance.description}</p>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
};

export default AutoAuctionShipping;
