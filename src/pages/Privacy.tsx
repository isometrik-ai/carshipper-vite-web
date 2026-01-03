import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | CarShippers.ai</title>
        <meta
          name="description"
          content="CarShippers.ai Privacy Policy. Learn how we collect, use, and protect your personal information."
        />
        <link rel="canonical" href="https://carshippers.ai/privacy" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h1>Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: December 2024</p>

              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us when requesting a quote 
                or using our services, including:
              </p>
              <ul>
                <li>Name and contact information (email, phone number)</li>
                <li>Vehicle information (year, make, model, VIN)</li>
                <li>Pickup and delivery addresses</li>
                <li>Payment information (processed securely by third-party providers)</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide car shipping quotes and services</li>
                <li>Communicate with you about your shipment</li>
                <li>Send updates via email and SMS (with your consent)</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We share your information only as necessary to provide our services:
              </p>
              <ul>
                <li><strong>Carriers:</strong> We share pickup/delivery details with assigned transport carriers</li>
                <li><strong>Service Providers:</strong> We use third-party services for payment processing, communications, and analytics</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law</li>
              </ul>
              <p>
                We do not sell your personal information to third parties for marketing purposes.
              </p>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information, 
                including encryption, secure servers, and access controls. However, no method of 
                transmission over the internet is 100% secure.
              </p>

              <h2>5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information (subject to legal requirements)</li>
                <li>Opt out of marketing communications</li>
              </ul>

              <h2>6. Cookies</h2>
              <p>
                We use cookies and similar technologies to improve your experience on our website, 
                analyze traffic, and personalize content. You can control cookie settings through 
                your browser preferences.
              </p>

              <h2>7. SMS/Text Messages</h2>
              <p>
                By providing your phone number, you consent to receive SMS messages related to 
                your shipment, including quotes, booking confirmations, and delivery updates. 
                You can opt out at any time by replying STOP.
              </p>

              <h2>8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible 
                for the privacy practices of these external sites.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under 18 years of age. We do not 
                knowingly collect information from children.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of significant 
                changes by posting the new policy on our website with an updated effective date.
              </p>

              <h2>11. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul>
                <li>Email: privacy@carshippers.ai</li>
                <li>Phone: (888) 555-1234</li>
              </ul>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Privacy;
