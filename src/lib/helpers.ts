import { NUMBER_FROM_STRING_REGEX } from "./regx.constant";

export const emailValidator = (input: string): boolean => {
  const pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return pattern.test(input);
};

export const getFirstNumberFromString = (value: string): number => {
  const match = value.match(NUMBER_FROM_STRING_REGEX);
  if (match && match[0]) {
      const num = Number(match[0]);
      return isNaN(num) ? 1 : num;
  }
  return 1;
};

// Shared helper for consistent date display across the app
// Accepts string, number (timestamp), Date, or null/undefined
// Returns a formatted date like "Mar 12, 2026" or empty string if invalid
export const formatDisplayDate = (
  value: string | number | Date | null | undefined,
): string => {
  if (!value) return "";

  let date: Date;

  if (value instanceof Date) {
    date = value;
  } else if (typeof value === "number") {
    // Treat as timestamp (ms since epoch)
    date = new Date(value);
  } else {
    const trimmed = String(value).trim();
    if (!trimmed) return "";
    date = new Date(trimmed);
  }

  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/** Maps quote/booking API `personal_items_weight` codes to user-facing labels. */
export const formatPersonalItemsLabel = (weight: unknown): string => {
  const raw = typeof weight === "string" ? weight.trim() : String(weight ?? "").trim();
  const w = raw.toLowerCase();
  if (!w) return "Up to 100 lbs";
  if (w === "0-100" || w === "0_100") return "Up to 100 lbs";
  if (w === "100-150" || w === "100_150") return "100–150 lbs";
  if (w === "150-200" || w === "150_200") return "150–200 lbs";
  if (w === "200+" || /^200\s*\+$/.test(w) || w.includes("more than 200")) return "200+ lbs";
  return raw;
};