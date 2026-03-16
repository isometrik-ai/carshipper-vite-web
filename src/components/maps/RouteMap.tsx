'use client';

import React, { useEffect, useRef } from "react";

interface RouteMapProps {
  origin: string;
  destination: string;
}

declare global {
  interface Window {
    googleMapsLoaded?: boolean;
  }
}

const RouteMap: React.FC<RouteMapProps> = ({ origin, destination }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const directionsRendererRef = useRef<any>(null);

  useEffect(() => {
    if (!origin || !destination) return;

    const initializeMap = () => {
      if (!mapContainerRef.current) return;
      const anyWindow = window as any;
      if (!anyWindow.google || !anyWindow.google.maps) return;

      const google = anyWindow.google as any;

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapContainerRef.current, {
          center: { lat: 39.5, lng: -98.35 }, // Approximate center of USA
          zoom: 5,
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          gestureHandling: "greedy",
          draggable: true,
        });

        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          map: mapInstanceRef.current,
          suppressMarkers: true, // we will render our own markers
          preserveViewport: false,
          polylineOptions: {
            strokeColor: "#10b981",
            strokeOpacity: 0.9,
            strokeWeight: 4,
          },
        });
      }

      const map = mapInstanceRef.current;
      const directionsService = new google.maps.DirectionsService();

      // Try to draw the route line (if Directions API is enabled)
      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result: any, status: any) => {
          if (
            status === google.maps.DirectionsStatus.OK &&
            result &&
            directionsRendererRef.current
          ) {
            directionsRendererRef.current.setDirections(result);
          }
        }
      );

      // Always place explicit pickup/drop markers using Geocoder,
      // even if the Directions API call fails.
      const geocoder = new google.maps.Geocoder();
      const bounds = new google.maps.LatLngBounds();
      let placedCount = 0;

      // Declare marker references at the component level
      const originMarkerRef = useRef<any>(null);
      const destinationMarkerRef = useRef<any>(null);

      // Inside initializeMap, before placing new markers, remove existing ones
      if (originMarkerRef.current) {
        originMarkerRef.current.setMap(null);
      }
      if (destinationMarkerRef.current) {
        destinationMarkerRef.current.setMap(null);
      }
      const placeMarker = (address: string, label: string, color: "red" | "green") => {
        if (!address) return;
        geocoder.geocode({ address }, (results: any, status: any) => {
          if (status === "OK" && results && results[0]) {
            const location = results[0].geometry.location;
            const marker = new google.maps.Marker({
              map,
              position: location,
              label,
              title: address,
              icon:
                color === "red"
                  ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                  : "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            });
            if (label === "A") {
              originMarkerRef.current = marker;
            } else if (label === "B") {
              destinationMarkerRef.current = marker;
            }
            bounds.extend(location);
            // fit bounds if both markers are placed
            placedCount += 1;
            if (placedCount >= 2 && originMarkerRef.current && destinationMarkerRef.current) {
              map.fitBounds(bounds);
            }
          }
        });
      };

      placeMarker(origin, "A", "red");
      placeMarker(destination, "B", "green");
    };

    if (window.googleMapsLoaded) {
      initializeMap();
    } else {
      const listener = () => {
        initializeMap();
      };
      window.addEventListener("google-maps-loaded", listener);
      return () => {
        window.removeEventListener("google-maps-loaded", listener);
      };
    }
  }, [origin, destination]);

  const hasAddresses = origin && destination;

  return (
    <div className="aspect-video rounded-xl overflow-hidden bg-muted">
      {hasAddresses ? (
        <div
          ref={mapContainerRef}
          className="w-full h-full"
          aria-label="Route map preview"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-950 dark:to-green-950 flex items-center justify-center text-muted-foreground text-sm">
          Route map unavailable
        </div>
      )}
    </div>
  );
};

export default RouteMap;

