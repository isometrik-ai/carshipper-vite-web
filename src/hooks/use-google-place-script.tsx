import { useCallback, useState } from "react";

export function useGoogleMapsScript() {
  const [isLoaded, setIsLoaded] = useState(false);

  const loadScript = useCallback(() => {
    if (typeof window === "undefined") return;

    // Already loaded.
    if ((window as any).google?.maps?.places) {
      setIsLoaded(true);
      return;
    }

    // Script already exists; wait for it to finish loading.
    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      existingScript.addEventListener("load", () => setIsLoaded(true), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => setIsLoaded(true);

    document.body.appendChild(script);
  }, []);

  return { isLoaded, loadScript };
}