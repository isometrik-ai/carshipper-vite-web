import { ENV_CONFIG } from "@/config/env";

export const PHONE_NUMBER_MAX_DIGITS=9;
export const COUNTRY_CODES = ['us'];
export const PREFERRED_COUNTRY_CODES = ['us'];
export const DEFAULT_COUNTRY_CODE = 'us';
export const DEFAULT_COUNTRY_CODE_SYMBOL = '+1';
export const DEFAULT_CURRENCY_SYMBOl = "$";
export const DEFAULT_CURRENCY_CODE = "USD";
const rawApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "https://carshippersapi.loadfinder.ai";
export const API_BASE_URL =
  typeof window !== "undefined" && window.location?.protocol === "https:"
    ? "/api/backend"
    : (process.env.NEXT_PUBLIC_API_BASE_URL && process.env.NEXT_PUBLIC_API_BASE_URL.trim() !== '') ? process.env.NEXT_PUBLIC_API_BASE_URL : (() => { throw new Error('Missing or invalid NEXT_PUBLIC_API_BASE_URL environment variable'); })();
export const MAIN_API_URL = `${API_BASE_URL}/v2`;
export const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
export const CUSTOM_WHITE_COLOR = "#FFFFFF";
export const CUSTOM_LIGHT_GRAY_COLOR = "#6b7280";
export const CUSTOM_LIGHT_GRAY="#000000";
export const CARD = "card";
export const MAP_BOX_ACCESS_TOKEN = ENV_CONFIG?.MAP_BOX_ACCESS_TOKEN ||'';
export const MAP_BOX_STYLE_LINK = "mapbox://styles/mapbox/dark-v11";
export const LEADS_BASE_API_URL = process.env.NEXT_PUBLIC_LEADS_BASE_API_URL || 'https://api-v2.houseofapps.ai/v1';
export const appSecret = "SFMyNTY.g3QAAAACZAAEZGF0YXQAAAADbQAAAAlhY2NvdW50SWRtAAAAGDY5MWFkMjdjMzQ4ZjcwZjUxOGVlMDA1M20AAAAIa2V5c2V0SWRtAAAAJGJmYjgxODc4LTk0NTEtNGZiNi04MmE1LTE5OWIzN2YwNDI2OW0AAAAJcHJvamVjdElkbQAAACRiMTViMDI4MC0xNTA3LTQ4MjMtYTJjNS1hYmI1YTFhZjdmMDNkAAZzaWduZWRuBgAY4n0vnQE.TI8wGDMjNZrXDdri8fO-nupTZiSydltzxZn3l7DnSOw";
export const licenseKey="lic-IMK0yLFHOosnmvsb5X0I6C2O1Cwvig4DvyW";