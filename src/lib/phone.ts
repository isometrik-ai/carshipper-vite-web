import { CountryCode } from "libphonenumber-js";
import { NON_DIGIT_REGEX } from "@/lib/regx.constant";
import {
  DEFAULT_COUNTRY_CODE,
  DEFAULT_COUNTRY_CODE_SYMBOL,
  PHONE_NUMBER_MAX_DIGITS,
} from "@/lib/config";
import { getPhoneNumberLengthRange } from "@/lib/global";

export const normalizeDigits = (value: string): string =>
  (value || "").replace(NON_DIGIT_REGEX, "");

export const resolveCountryIso2 = (country?: string): string => {
  const base = (country || DEFAULT_COUNTRY_CODE || "us").toString().toLowerCase();
  return base;
};

export const resolveDialCode = (iso2Lower: string): string => {
  const code = iso2Lower.toLowerCase();

  if (code === "us") {
    return DEFAULT_COUNTRY_CODE_SYMBOL || "+1";
  }

  return "";
};

export const getPhoneConstraints = (
  iso2Upper: string
): { min: number; max: number } => {
  try {
    const range = getPhoneNumberLengthRange(iso2Upper as CountryCode);
    if (range && (range.min || range.max)) {
      return range;
    }
  } catch {
    // fall through to default
    return {
      min: PHONE_NUMBER_MAX_DIGITS,
      max: PHONE_NUMBER_MAX_DIGITS,
    };
  }
};

