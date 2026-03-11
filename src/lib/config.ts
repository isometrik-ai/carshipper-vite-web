
export const PHONE_NUMBER_MAX_DIGITS=9;
export const COUNTRY_CODES = ['us'];
export const PREFERRED_COUNTRY_CODES = ['us'];
export const DEFAULT_COUNTRY_CODE = 'us';
export const DEFAULT_COUNTRY_CODE_SYMBOL = '+1';
export const DEFAULT_CURRENCY_SYMBOl = "$";
export const DEFAULT_CURRENCY_CODE = "USD";
const rawApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://5.161.218.11:7008";
export const API_BASE_URL =
  typeof window !== "undefined" && window.location?.protocol === "https:"
    ? "/api/backend"
    : rawApiBase;
export const MAIN_API_URL = `${API_BASE_URL}/v1`;