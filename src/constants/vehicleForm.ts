/** Personal-items weight bands: aligned with booking `mapPersonalItemsForBooking` mapping. */
export const QUOTE_PERSONAL_ITEMS_OPTIONS = [
  "None or less than 100 lbs.",
  "100-200 lbs",
  "More than 200 lbs",
] as const;

/** Default body-style list when API types are unavailable. */
export const VEHICLE_TYPE_OPTIONS = [
  "Sedan",
  "SUV",
  "Truck",
  "Van",
  "Coupe",
  "Convertible",
  "Wagon",
  "Hatchback",
  "Motorcycle",
] as const;
