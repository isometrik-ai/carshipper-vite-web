import { Phone, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuoteHeaderProps {
  quoteId: string;
}

export function QuoteHeader({ quoteId }: QuoteHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm md:text-base">CS</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg md:text-xl text-foreground">CarShippers.ai</span>
          </div>
          <div className="flex items-center px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 text-primary rounded-md text-xs sm:text-sm font-medium">
            <span className="sm:hidden">#</span>
            <span className="hidden sm:inline">Quote #</span>
            {quoteId}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <a 
            href="tel:8005531828" 
            className="hidden md:flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="font-medium">(800) 553-1828</span>
          </a>
          
          <Button asChild className="hidden sm:inline-flex">
            <a href="#pricing">Select & Book →</a>
          </Button>
          
          <button className="md:hidden p-2 text-muted-foreground">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
