import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      value: "(888) 555-1234",
      description: "Available 24/7",
      href: "tel:+18885551234",
    },
    {
      icon: Mail,
      title: "Email Us",
      value: "support@carshippers.ai",
      description: "Response within 24 hours",
      href: "mailto:support@carshippers.ai",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      value: "Chat Now",
      description: "Available 8am-10pm EST",
      href: "#chat",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact CarShippers.ai | 24/7 Support | (888) 555-1234</title>
        <meta
          name="description"
          content="Contact CarShippers.ai for car shipping quotes and support. Call (888) 555-1234, available 24/7. Email support@carshippers.ai for questions."
        />
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
                  Get in <span className="text-primary">Touch</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Have questions about shipping your car? Our team is here to help 24/7.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-card p-6 rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all text-center"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <method.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{method.title}</h3>
                    <p className="text-primary font-medium mb-1">{method.value}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </motion.a>
                ))}
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
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <Input
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input
                          type="tel"
                          placeholder="(555) 555-5555"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <Input
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <Textarea
                        placeholder="Tell us more about your question..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Send Message
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
                <h2 className="text-2xl font-bold mb-8">Business Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Licensed & Bonded Nationwide</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>24/7 Phone Support</span>
                  </div>
                </div>
                <p className="mt-6 text-muted-foreground">
                  MC #XXXXXX | DOT #XXXXXX
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
