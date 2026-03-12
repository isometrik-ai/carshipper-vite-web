export const US_PHONE_FORMAT_REGEX = /^(\d{0,3})(\d{0,3})(\d{0,4})$/;
export const NON_DIGIT_REGEX = /\D/g;
export const NUMBER_FROM_STRING_REGEX = /\d+/;

// Allows only safe characters for quote IDs used in URLs and API calls
export const SAFE_QUOTE_ID_REGEX = /^[a-zA-Z0-9-_]+$/;
// Matches any character that is NOT allowed in a safe quote ID
export const UNSAFE_QUOTE_ID_CHARS_REGEX = /[^a-zA-Z0-9-_]/g;