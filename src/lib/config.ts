
export const PHONE_NUMBER_MAX_DIGITS=9;
export const COUNTRY_CODES = ['us'];
export const PREFERRED_COUNTRY_CODES = ['us'];
export const DEFAULT_COUNTRY_CODE = 'us';
export const DEFAULT_COUNTRY_CODE_SYMBOL = '+1';
export const DEFAULT_CURRENCY_SYMBOl = "$";
export const DEFAULT_CURRENCY_CODE = "USD";
const rawApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://5.161.218.11:7009";
export const API_BASE_URL =
  typeof window !== "undefined" && window.location?.protocol === "https:"
    ? "/api/backend"
    : (process.env.NEXT_PUBLIC_API_BASE_URL && process.env.NEXT_PUBLIC_API_BASE_URL.trim() !== '') ? process.env.NEXT_PUBLIC_API_BASE_URL : (() => { throw new Error('Missing or invalid NEXT_PUBLIC_API_BASE_URL environment variable'); })();
export const MAIN_API_URL = `${API_BASE_URL}/v2`;
export const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
export const CUSTOM_WHITE_COLOR = "#FFFFFF";
export const CUSTOM_LIGHT_GRAY_COLOR = "#000000";
export const CUSTOM_LIGHT_GRAY="#000000";
export const CARD = "card";
export const MAP_BOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||'';

// Validate Mapbox token (browser-only)
if (typeof window !== 'undefined' && !MAP_BOX_ACCESS_TOKEN) {
  console.warn('Mapbox access token is not configured. Please check .env file.');
}
export const MAP_BOX_STYLE_LINK = "mapbox://styles/mapbox/dark-v11";