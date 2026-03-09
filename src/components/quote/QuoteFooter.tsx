interface QuoteFooterProps {
  quoteId: string;
  expirationDate: string;
}

export function QuoteFooter({ quoteId, expirationDate }: QuoteFooterProps) {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a href="/terms" className="text-background/70 hover:text-background transition-colors">
              Terms & Conditions
            </a>
            <a href="/privacy" className="text-background/70 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href={`/quote/${quoteId}/unsubscribe`} className="text-background/70 hover:text-background transition-colors">
              Unsubscribe
            </a>
          </div>

          {/* Quote Info */}
          <div className="space-y-2 text-sm text-background/60">
            <p>This quote is valid for 30 days. Prices may change based on market conditions.</p>
            <p>Quote #{quoteId} | Expires: {expirationDate}</p>
          </div>

          {/* Company Info */}
          <div className="text-sm text-background/50 space-y-1">
            <p className="font-semibold text-background/70">CarShippers.ai</p>
            <p>MC #XXXXXX | DOT #XXXXXX</p>
            <p>support@carshippers.ai | (800) 553-1828</p>
          </div>

          {/* Copyright */}
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} CarShippers.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
