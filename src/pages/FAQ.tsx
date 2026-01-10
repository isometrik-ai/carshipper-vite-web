import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import FAQSection from "./FAQSection";
import { FAQ_ENDPOINT } from "@/constants/apiConstants";
import { FAQTexts } from "@/types/faq.types";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [faqCategories, setFaqCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [faqsTexts, setFaqsTexts] = useState<FAQTexts>({
    title: "",
    sub_title: "",
    loading_faq_msg: "",
    no_mached_msg: "",
    still_question_title: "",
    button_label: "",
    faq_helmet_title: "",
  });

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(FAQ_ENDPOINT);
        const attr = response.data?.data;

        if (attr?.FaqCategories) {
          setFaqCategories(attr.FaqCategories);
          setFaqsTexts({
            title: attr.title,
            sub_title: attr.sub_title,
            loading_faq_msg: attr.loading_faq_msg,
            no_mached_msg: attr.no_mached_msg,
            still_question_title: attr.still_question_title,
            button_label: attr.button_label,
            faq_helmet_title: attr.faq_helmet_title,
          });
        }
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  // Filtering logic adapted for Athe 'questions' field in your JSON
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    FAQS: category.FAQS.filter(
      (faq: any) =>
        faq.questions.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.FAQS.length > 0);

  return (
    <>
      <Helmet>
        <title>{faqsTexts.faq_helmet_title}</title>
        <meta name="description" content="Get answers to common car shipping questions." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 pt-20">
          <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/50 to-background">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {faqsTexts.title} <span className="text-primary">{faqsTexts.sub_title}</span>
              </h1>
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                {loading ? (
                  <div className="text-center py-12">{faqsTexts.loading_faq_msg}</div>
                ) : (
                  filteredCategories.map((category, index) => (
                    <FAQSection key={category.id} category={category} index={index} />
                  ))
                )}

                {!loading && filteredCategories.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">{faqsTexts.no_mached_msg} "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Static CTA Sections remain as per your design */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{faqsTexts.still_question_title}</h2>
              <Button variant="hero" size="lg" onClick={() => window.location.href = "/contact"}>
                {faqsTexts.button_label}
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQ;