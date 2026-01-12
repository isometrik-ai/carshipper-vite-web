import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare, LucideIcon } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useContact } from "@/hooks/api/useContact";

const IconMap: Record<string, LucideIcon> = {
  Phone: Phone,
  Mail: Mail,
  MessageSquare: MessageSquare,
  MapPin: MapPin,
  Clock: Clock,
};

const Contact = () => {
  const { toast } = useToast();
  const { data, isLoading, error } = useContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message.",
      });
    }
  };

  if (isLoading || error || !data) return null;

  return (
    <>
      <Helmet>
        <title>{data.contact_helmet_title}</title>
        <meta name="description" content={data.heroDescription} />
        <link rel="canonical" href="https://carshippers.ai/contact" />
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
                  {data.heroTitleNormal} <span className="text-primary">{data.heroTitleHighlight}</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  {data.heroDescription}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {data.contact_methods?.map((method: any, index: number) => {
                  const Icon = IconMap[method.icon_name] || MessageSquare;
                  return (
                    <motion.a
                      key={method.id}
                      href={method.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-1">{method.title}</h3>
                      <p className="text-primary font-medium mb-1">{method.value}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Contact Form */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                    {data.formTitle}
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">{data.contact_form.labelName}</label>
                        <Input
                          placeholder={data.contact_form.placeholderName}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{data.contact_form.labelEmail}</label>
                        <Input
                          type="email"
                          placeholder={data.contact_form.placeholderEmail}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">{data.contact_form.labelPhone}</label>
                        <Input
                          type="tel"
                          placeholder={data.contact_form.placeholderPhone}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{data.contact_form.labelSubject}</label>
                        <Input
                          placeholder={data.contact_form.placeholderSubject}
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{data.contact_form.labelMessage}</label>
                      <Textarea
                        placeholder={data.contact_form.placeholderMessage}
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      {data.contact_form.submitButtonText}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Business Info */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-8">{data.business_info.infoTitle}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {data.business_info.feature_items?.map((item: any) => {
                    const FeatureIcon = IconMap[item.icon_name] || MapPin;
                    return (
                      <div key={item.id} className="flex items-center justify-center gap-3 text-muted-foreground">
                        <FeatureIcon className="w-5 h-5 text-primary" />
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-6 text-muted-foreground">
                  {data.business_info.mcNumber} | {data.business_info.dotNumber}
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;