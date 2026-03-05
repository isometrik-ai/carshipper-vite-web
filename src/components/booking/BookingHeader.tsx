import { Phone } from "lucide-react";
import Link from "next/link";

interface BookingHeaderProps {
  quoteId: string;
}

export function BookingHeader({ quoteId }: BookingHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          <span className="font-bold text-lg hidden sm:inline">CARSHIPPERS.AI</span>
        </Link>

        <a 
          href="tel:8005531828"
          className="flex items-center gap-2 text-white hover:text-white/90 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span className="font-medium">800-553-1828</span>
        </a>
      </div>
    </header>
  );
}
