import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | CarShippers.ai</title>
        <meta
          name="description"
          content="CarShippers.ai Terms of Service. Read our terms and conditions for using our car shipping brokerage services."
        />
        <link rel="canonical" href="https://carshippers.ai/terms" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto prose prose-lg">
              <h1>Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: December 2024</p>

              <h2>1. Agreement to Terms</h2>
              <p>
                By accessing or using CarShippers.ai ("we," "our," or "us"), you agree to be 
                bound by these Terms of Service. If you do not agree, please do not use our services.
              </p>

              <h2>2. Our Services</h2>
              <p>
                CarShippers.ai is a licensed auto transport broker (MC #XXXXXX, DOT #XXXXXX). 
                We connect customers with licensed and insured motor carriers to transport vehicles. 
                We do not own or operate transport trucks; we arrange transportation services.
              </p>

              <h2>3. Quotes and Pricing</h2>
              <ul>
                <li>Quotes are estimates based on current market conditions and carrier availability</li>
                <li>Final pricing is confirmed at the time of booking</li>
                <li>Prices may vary based on vehicle condition, modifications, or special requirements not disclosed during quote request</li>
                <li>Quotes are valid for 7 days unless otherwise specified</li>
              </ul>

              <h2>4. Booking and Payment</h2>
              <ul>
                <li>Bookings are confirmed upon acceptance of terms and carrier assignment</li>
                <li>Payment is due upon delivery unless otherwise agreed</li>
                <li>Accepted payment methods: cash, credit card, debit card, Zelle, Venmo</li>
                <li>We do not require deposits for standard bookings</li>
              </ul>

              <h2>5. Cancellation Policy</h2>
              <ul>
                <li><strong>Before carrier dispatch:</strong> Free cancellation</li>
                <li><strong>After carrier dispatch:</strong> Cancellation fee may apply (typically $100-200)</li>
                <li><strong>No-show at pickup:</strong> Full quoted amount may be charged</li>
              </ul>

              <h2>6. Customer Responsibilities</h2>
              <p>You agree to:</p>
              <ul>
                <li>Provide accurate vehicle and contact information</li>
                <li>Ensure the vehicle is in safe, operable condition (or disclose if non-running)</li>
                <li>Remove personal items exceeding 100 lbs or disclose additional items</li>
                <li>Disable alarms and provide necessary keys/fobs</li>
                <li>Be present (or have an authorized representative) for pickup and delivery</li>
                <li>Inspect and sign the Bill of Lading at both ends</li>
              </ul>

              <h2>7. Insurance and Liability</h2>
              <ul>
                <li>All carriers in our network maintain cargo insurance (minimum $1,000,000)</li>
                <li>Damage claims must be noted on the Bill of Lading at delivery</li>
                <li>Personal items shipped inside the vehicle are NOT covered by carrier insurance</li>
                <li>We are not liable for delays caused by weather, mechanical issues, or circumstances beyond our control</li>
              </ul>

              <h2>8. Damage Claims</h2>
              <p>If your vehicle is damaged during transport:</p>
              <ul>
                <li>Document damage with photos immediately upon delivery</li>
                <li>Note all damage on the Bill of Lading before signing</li>
                <li>Contact us within 24 hours of delivery</li>
                <li>Claims are handled directly with the carrier's insurance</li>
              </ul>

              <h2>9. Prohibited Items</h2>
              <p>The following items may not be shipped inside the vehicle:</p>
              <ul>
                <li>Hazardous materials, explosives, or flammables</li>
                <li>Illegal items or contraband</li>
                <li>Firearms or ammunition</li>
                <li>Perishable goods</li>
                <li>Items exceeding 100 lbs total weight</li>
              </ul>

              <h2>10. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, CarShippers.ai's liability is limited 
                to the amount paid for services. We are not liable for indirect, incidental, 
                or consequential damages.
              </p>

              <h2>11. Dispute Resolution</h2>
              <p>
                Any disputes arising from these terms will be resolved through binding arbitration 
                in accordance with the rules of the American Arbitration Association. This does 
                not prevent you from filing complaints with the FMCSA.
              </p>

              <h2>12. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of our 
                services after changes constitutes acceptance of the new terms.
              </p>

              <h2>13. Governing Law</h2>
              <p>
                These terms are governed by federal transportation law and the laws of the 
                State of California, without regard to conflict of law principles.
              </p>

              <h2>14. Contact Information</h2>
              <p>
                For questions about these Terms of Service:
              </p>
              <ul>
                <li>Email: legal@carshippers.ai</li>
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

export default Terms;
