import { useEffect, useState } from "react";
import { MapPin, Flag, Calendar, Package } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/animations/AnimationWrappers";
import { formatDisplayDate } from "@/lib/helpers";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type QuoteHeroVehicle = {
  year?: number;
  make?: string;
  model?: string;
  is_running?: boolean;
  condition?: string;
};

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
  vehicles: QuoteHeroVehicle[];
  transportType?: string;
  distance: string | number;
  transitTime: string | number;
  earliestPickup: string | number;
}

function vehicleTitle(vehicle: QuoteHeroVehicle) {
  const parts = [vehicle.year, vehicle.make, vehicle.model].filter(
    (x) => x !== null && x !== undefined && String(x).trim() !== "",
  );
  return parts.length ? parts.join(" ") : "Vehicle";
}

function VehicleHeroCard({
  vehicle,
  transportTypeText,
  formattedEarliestPickup,
  formattedTransitTime,
}: {
  vehicle: QuoteHeroVehicle;
  transportTypeText: string;
  formattedEarliestPickup: string;
  formattedTransitTime: string;
}) {
  const operableText = (() => {
    if (vehicle?.is_running === false) return "Inoperable";
    if (vehicle?.is_running === true) return "Operable";
    if ((vehicle?.condition || "").toLowerCase().includes("inoperable")) return "Inoperable";
    return "Operable";
  })();

  return (
    <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-featured h-full min-w-0 max-w-full overflow-hidden">
      <h2 className="text-2xl font-bold mb-3">{vehicleTitle(vehicle)}</h2>

      <div className="flex flex-wrap gap-2 mb-5">
        <span className="px-3 py-1.5 bg-primary/10 text-primary rounded-md text-sm font-medium">
          {operableText === "Inoperable" ? "✗" : "✓"} {operableText}
        </span>
        <span className="px-3 py-1.5 bg-success/10 text-success rounded-md text-sm font-medium">
          🚚 {transportTypeText}
        </span>
        <span className="px-3 py-1.5 bg-warning/10 text-warning rounded-md text-sm font-medium">
          🚪 Door-to-Door
        </span>
      </div>

      <div className="h-px bg-border my-5" />

      <div className="space-y-3">
        <div className="flex justify-between items-center gap-2">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 shrink-0" />
            Earliest Pickup
          </span>
          <span className="font-semibold text-right">{formattedEarliestPickup}</span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <span className="flex items-center gap-2 text-muted-foreground">
            <span>⏱️</span>
            Estimated Transit
          </span>
          <span className="font-semibold text-right">{formattedTransitTime}</span>
        </div>
        <div className="flex justify-between items-center gap-2">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Package className="w-4 h-4 shrink-0" />
            Personal Items
          </span>
          <span className="font-semibold text-right">Up to 100 lbs</span>
        </div>
      </div>
    </div>
  );
}

export function HeroSection({
  origin,
  destination,
  vehicles,
  transportType,
  distance,
  transitTime,
  earliestPickup,
}: HeroSectionProps) {
  const formattedDistance = (() => {
    if (distance === null || distance === undefined) return "N/A";
    if (typeof distance === "number") {
      return `${distance?.toLocaleString()} miles`;
    }
    const value = String(distance)?.trim();
    if (!value) return "N/A";
    return value?.toLowerCase()?.includes("mile") ? value : `${value} miles`;
  })();

  const formattedTransitTime = (() => {
    if (transitTime === null || transitTime === undefined) return "N/A";
    const value = String(transitTime)?.trim();
    return value || "N/A";
  })();

  const formattedEarliestPickup = (() => {
    if (earliestPickup === null || earliestPickup === undefined) return "TBD";
    if (typeof earliestPickup === "number") {
      return formatDisplayDate(earliestPickup);
    }
    const value = String(earliestPickup)?.trim();
    return value || "TBD";
  })();

  const transportTypeText = (() => {
    const raw = String(transportType || "").trim();
    if (!raw) return "Open Transport";
    if (/open/i.test(raw)) return "Open Transport";
    if (/enclosed/i.test(raw)) return "Enclosed Transport";
    return raw;
  })();

  const displayVehicles: QuoteHeroVehicle[] =
    vehicles.length > 0 ? vehicles : [{ year: undefined, make: "—", model: "" }];

  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carouselApi || displayVehicles.length <= 1) return;
    const onSelect = () => setCurrentIndex(carouselApi.selectedScrollSnap());
    onSelect();
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, displayVehicles.length]);

  const vehicleColumn = (() => {
    if (displayVehicles.length <= 1) {
      return (
        <VehicleHeroCard
          vehicle={displayVehicles[0]}
          transportTypeText={transportTypeText}
          formattedEarliestPickup={formattedEarliestPickup}
          formattedTransitTime={formattedTransitTime}
        />
      );
    }

    return (
      <div className="relative w-full min-w-0 max-w-full overflow-hidden">
        <Carousel className="w-full min-w-0 max-w-full" setApi={setCarouselApi} opts={{ align: "start", loop: false }}>
          {/* ml-0 / pl-0: avoid default -ml-4 + pl-4 slide gutters that widen past the viewport on narrow screens */}
          <CarouselContent className="ml-0">
            {displayVehicles.map((vehicle, index) => (
              <CarouselItem key={`${vehicleTitle(vehicle)}-${index}`} className="pl-0 px-2 basis-full">
                <VehicleHeroCard
                  vehicle={vehicle}
                  transportTypeText={transportTypeText}
                  formattedEarliestPickup={formattedEarliestPickup}
                  formattedTransitTime={formattedTransitTime}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div
            className="mt-4 flex min-w-0 items-center justify-center gap-3 px-1"
            role="group"
            aria-label="Vehicle carousel navigation"
          >
            <CarouselPrevious
              variant="secondary"
              className="static shrink-0 left-0 right-0 top-0 translate-x-0 translate-y-0 h-10 w-10 rounded-full border-border bg-background p-0 shadow-sm"
              aria-label="Previous vehicle"
            />
            <span
              className="inline-flex h-10 min-w-0 shrink-0 items-center justify-center px-1 text-sm leading-none text-primary-foreground/90 tabular-nums"
              aria-live="polite"
            >
              Vehicle {currentIndex + 1} of {displayVehicles.length}
            </span>
            <CarouselNext
              variant="secondary"
              className="static shrink-0 left-0 right-0 top-0 translate-x-0 translate-y-0 h-10 w-10 rounded-full border-border bg-background p-0 shadow-sm"
              aria-label="Next vehicle"
            />
          </div>
        </Carousel>
      </div>
    );
  })();

  return (
    <section className="pt-20 md:pt-24 gradient-hero text-primary-foreground overflow-x-hidden min-w-0 w-full">
      <div className="container max-w-full py-12 md:py-16 lg:py-20 bg-blue-700 rounded-md min-w-0">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start min-w-0 w-full">
          <div className="lg:col-span-3 space-y-6 min-w-0">
            <FadeIn delay={0.1}>
              <div className="inline-flex  items-center gap-2 px-4 py-2 rounded-full bg-success/20 text-success-foreground border border-success/30">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-sm font-medium">Quote Ready - Valid for 30 Days</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-3 min-w-0">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight break-words">
                  Your Car Shipping Quote
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80 break-words">
                  Choose your service level and book online. Your card will only be charged once a carrier is
                  assigned—typically 24-72 hours before pickup.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="glass-card rounded-2xl p-6 md:p-8 min-w-0 max-w-full overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 min-w-0">
                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-success" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs uppercase tracking-wide text-primary-foreground/60">Pickup</span>
                      <p className="text-xl font-bold break-words">
                        {origin.city}, {origin.state}
                      </p>
                      <p className="text-sm text-primary-foreground/70">{origin.zip}</p>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center gap-2 md:flex-1 px-4">
                    <div className="hidden md:block h-px flex-1 bg-primary-foreground/30" />
                    <div className="text-center">
                      <span className="text-2xl">→</span>
                      <p className="text-xs text-primary-foreground/70">{formattedDistance}</p>
                    </div>
                    <div className="hidden md:block h-px flex-1 bg-primary-foreground/30" />
                  </div>

                  <div className="flex items-start gap-4 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-rush/20 flex items-center justify-center flex-shrink-0">
                      <Flag className="w-6 h-6 text-rush" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs uppercase tracking-wide text-primary-foreground/60">Delivery</span>
                      <p className="text-xl font-bold break-words">
                        {destination.city}, {destination.state}
                      </p>
                      <p className="text-sm text-primary-foreground/70">{destination.zip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <div className="lg:col-span-2 min-w-0 w-full max-w-full">
            <ScaleIn delay={0.4}>{vehicleColumn}</ScaleIn>
          </div>
        </div>
      </div>
    </section>
  );
}
