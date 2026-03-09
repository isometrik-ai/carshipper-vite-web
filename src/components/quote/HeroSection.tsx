import { MapPin, Flag, Calendar, Package } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/animations/AnimationWrappers";

interface HeroSectionProps {
  origin: {
    city: string;
    state: string;
    zip: string;
  };
  destination: {
    city: string;
    state: string;
    zip: string;
  };
  vehicle: {
    year: number;
    make: string;
    model: string;
  };
  distance: string;
  transitTime: string;
  earliestPickup: string;
}

export function HeroSection({
  origin,
  destination,
  vehicle,
  distance,
  transitTime,
  earliestPickup,
}: HeroSectionProps) {
  return (
    <section className="pt-20 md:pt-24 gradient-hero text-primary-foreground">
      <div className="container py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Status Badge */}
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 text-success-foreground border border-success/30">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium">Quote Ready - Valid for 30 Days</span>
              </div>
            </FadeIn>
            
            {/* Title */}
            <FadeIn delay={0.2}>
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Your Car Shipping Quote
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80">
                  Choose your service level and book online. Your card will only be charged once a carrier is assigned—typically 24-72 hours before pickup.
                </p>
              </div>
            </FadeIn>
            
            {/* Route Card */}
            <FadeIn delay={0.3}>
              <div className="glass-card rounded-2xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                  {/* Origin */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wide text-primary-foreground/60">Pickup</span>
                      <p className="text-xl font-bold">{origin.city}, {origin.state}</p>
                      <p className="text-sm text-primary-foreground/70">{origin.zip}</p>
                    </div>
                  </div>
                  
                  {/* Arrow & Distance */}
                  <div className="flex md:flex-col items-center gap-2 md:flex-1 px-4">
                    <div className="hidden md:block h-px flex-1 bg-primary-foreground/30" />
                    <div className="text-center">
                      <span className="text-2xl">→</span>
                      <p className="text-xs text-primary-foreground/70">{distance}</p>
                      <p className="text-xs text-primary-foreground/70">{transitTime}</p>
                    </div>
                    <div className="hidden md:block h-px flex-1 bg-primary-foreground/30" />
                  </div>
                  
                  {/* Destination */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-rush/20 flex items-center justify-center flex-shrink-0">
                      <Flag className="w-6 h-6 text-rush" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wide text-primary-foreground/60">Delivery</span>
                      <p className="text-xl font-bold">{destination.city}, {destination.state}</p>
                      <p className="text-sm text-primary-foreground/70">{destination.zip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          
          {/* Right: Vehicle Card */}
          <div className="lg:col-span-2">
            <ScaleIn delay={0.4}>
              <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-featured">
                <h2 className="text-2xl font-bold mb-3">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h2>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm font-medium">
                    ✓ Operable
                  </span>
                  <span className="px-3 py-1.5 bg-success/10 text-success rounded-md text-sm font-medium">
                    🚚 Open Transport
                  </span>
                  <span className="px-3 py-1.5 bg-warning/10 text-warning rounded-md text-sm font-medium">
                    🚪 Door-to-Door
                  </span>
                </div>
                
                <div className="h-px bg-border my-5" />
                
                {/* Quick Info */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Earliest Pickup
                    </span>
                    <span className="font-semibold">{earliestPickup}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <span>⏱️</span>
                      Estimated Transit
                    </span>
                    <span className="font-semibold">{transitTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Package className="w-4 h-4" />
                      Personal Items
                    </span>
                    <span className="font-semibold">Up to 100 lbs</span>
                  </div>
                </div>
              </div>
            </ScaleIn>
          </div>
        </div>
      </div>
    </section>
  );
}
