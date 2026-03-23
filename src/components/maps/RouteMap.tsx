'use client';

import React, { useEffect, useRef } from "react";
import mapboxgl, { Map as MapboxMap, Marker, Popup } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAP_BOX_ACCESS_TOKEN } from "@/lib/config";
import { createMarkerElement } from "@/components/maps/mapMarkerUtils";

interface RouteMapProps {
  origin: string;
  destination: string;
}

const RouteMap: React.FC<RouteMapProps> = ({ origin, destination }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<MapboxMap | null>(null);
  const pickupMarkerRef = useRef<Marker | null>(null);
  const dropMarkerRef = useRef<Marker | null>(null);
  const activePopupsRef = useRef<Popup[]>([]);
  const latestUpdateRequestIdRef = useRef(0);
  const navControlAddedRef = useRef(false);

  useEffect(() => {
    if (!origin || !destination || !mapContainerRef.current || !MAP_BOX_ACCESS_TOKEN) return;

    mapboxgl.accessToken = MAP_BOX_ACCESS_TOKEN;
    const normalizedOrigin = origin.trim().toLowerCase();
    const normalizedDestination = destination.trim().toLowerCase();
    if (!normalizedOrigin || !normalizedDestination) return;

    const map =
      mapInstanceRef.current ??
      new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/navigation-day-v1",
        center: [-98.5795, 39.8283],
        zoom: 3.5,
      });

    mapInstanceRef.current = map;
    if (!navControlAddedRef.current) {
      map.addControl(new mapboxgl.NavigationControl(), "top-right");
      navControlAddedRef.current = true;
    }

    const removeAllActivePopups = () => {
      activePopupsRef.current.forEach((popup) => popup.remove());
      activePopupsRef.current = [];
    };

    const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
      const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json?limit=1&access_token=${MAP_BOX_ACCESS_TOKEN}`;
      const response = await fetch(geocodeUrl);
      if (!response.ok) return null;
      const data = await response.json();
      const coordinates = data?.features?.[0]?.center;
      if (!coordinates || coordinates.length < 2) return null;
      return [coordinates[0], coordinates[1]];
    };

    const attachHoverPopup = (marker: Marker, address: string) => {
      let popup: Popup | null = null;
      const markerEl = marker.getElement() as HTMLElement;

      markerEl.addEventListener("mouseenter", () => {
        removeAllActivePopups();
        popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
          offset: 18,
        })
          .setLngLat(marker.getLngLat())
          .setHTML(`<div style="font-size:12px;line-height:1.2;">${address}</div>`)
          .addTo(map);
        activePopupsRef.current.push(popup);
      });
      markerEl.addEventListener("mouseleave", () => {
        if (popup) {
          popup.remove();
          activePopupsRef.current = activePopupsRef.current.filter(
            (activePopup) => activePopup !== popup
          );
          popup = null;
        }
      });
    };

    const updateMap = async () => {
      const requestId = ++latestUpdateRequestIdRef.current;
      const isCurrentRequest = () => requestId === latestUpdateRequestIdRef.current;

      const [pickupCoords, dropCoords] = await Promise.all([
        geocodeAddress(normalizedOrigin),
        geocodeAddress(normalizedDestination),
      ]);

      if (!isCurrentRequest()) return;
      if (!pickupCoords || !dropCoords) return;

      removeAllActivePopups();
      if (pickupMarkerRef.current) pickupMarkerRef.current.remove();
      if (dropMarkerRef.current) dropMarkerRef.current.remove();

      const pickupMarker = new mapboxgl.Marker({
        element: createMarkerElement("#22c55e", "Pickup"),
        anchor: "bottom",
      })
        .setLngLat(pickupCoords)
        .addTo(map);
      const dropMarker = new mapboxgl.Marker({
        element: createMarkerElement("#ef4444", "Drop"),
        anchor: "bottom",
      })
        .setLngLat(dropCoords)
        .addTo(map);

      pickupMarkerRef.current = pickupMarker;
      dropMarkerRef.current = dropMarker;
      attachHoverPopup(pickupMarker, normalizedOrigin);
      attachHoverPopup(dropMarker, normalizedDestination);

      const routeUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoords[0]},${pickupCoords[1]};${dropCoords[0]},${dropCoords[1]}?geometries=geojson&overview=full&access_token=${MAP_BOX_ACCESS_TOKEN}`;
      const routeResponse = await fetch(routeUrl);
      if (!isCurrentRequest()) return;
      if (!routeResponse.ok) return;
      const routeData = await routeResponse.json();
      if (!isCurrentRequest()) return;
      const geometry = routeData?.routes?.[0]?.geometry;
      if (!geometry) return;

      const existingRouteLayer = map.getLayer("route-line");
      const existingRouteSource = map.getSource("route-line");

      if (existingRouteLayer) {
        map.removeLayer("route-line");
      }
      if (existingRouteSource) {
        map.removeSource("route-line");
      }

      try {
        if (!map.getSource("route-line")) {
          map.addSource("route-line", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry,
            },
          });
        }
      } catch (error) {
        console.error("Unable to add route source:", error);
      }

      try {
        if (!map.getLayer("route-line") && map.getSource("route-line")) {
          map.addLayer({
            id: "route-line",
            type: "line",
            source: "route-line",
            paint: {
              "line-color": "#2563eb",
              "line-width": 4,
              "line-opacity": 0.9,
            },
          });
        }
      } catch (error) {
        console.error("Unable to add route layer:", error);
      }

      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(pickupCoords);
      bounds.extend(dropCoords);
      map.fitBounds(bounds, { padding: 60, maxZoom: 12 });
    };

    if (map.isStyleLoaded()) {
      void updateMap();
    } else {
      map.once("load", () => {
        void updateMap();
      });
    }
  }, [origin, destination]);

  useEffect(() => {
    return () => {
      latestUpdateRequestIdRef.current += 1;
      activePopupsRef.current.forEach((popup) => popup.remove());
      activePopupsRef.current = [];
      if (pickupMarkerRef.current) pickupMarkerRef.current.remove();
      if (dropMarkerRef.current) dropMarkerRef.current.remove();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        navControlAddedRef.current = false;
      }
    };
  }, []);

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

