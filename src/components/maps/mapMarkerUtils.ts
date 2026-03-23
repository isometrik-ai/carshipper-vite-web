export const createMarkerElement = (color: string, label: string): HTMLElement => {
  const markerEl = document.createElement("div");
  markerEl.style.position = "relative";
  markerEl.style.display = "flex";
  markerEl.style.alignItems = "center";
  markerEl.style.justifyContent = "center";
  markerEl.style.cursor = "pointer";

  const pin = document.createElement("div");
  pin.innerHTML = `
    <svg width="28" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 22C12 22 20 14.8 20 9.5C20 5.36 16.42 2 12 2C7.58 2 4 5.36 4 9.5C4 14.8 12 22 12 22Z" fill="${color}" />
      <circle cx="12" cy="9.5" r="3.1" fill="white" />
    </svg>
  `;

  const badge = document.createElement("span");
  badge.textContent = label;
  badge.style.position = "absolute";
  badge.style.left = "28px";
  badge.style.top = "2px";
  badge.style.padding = "2px 6px";
  badge.style.borderRadius = "9999px";
  badge.style.background = "rgba(255,255,255,0.96)";
  badge.style.border = "1px solid rgba(15, 23, 42, 0.2)";
  badge.style.boxShadow = "0 1px 2px rgba(15, 23, 42, 0.15)";
  badge.style.color = "#0f172a";
  badge.style.fontSize = "10px";
  badge.style.fontWeight = "600";
  badge.style.lineHeight = "1.2";
  badge.style.whiteSpace = "nowrap";
  badge.style.pointerEvents = "none";

  markerEl.appendChild(pin);
  markerEl.appendChild(badge);
  return markerEl;
};
