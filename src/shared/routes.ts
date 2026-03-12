export const ROUTES_LIST = {
  QUOTE: "/quote",
};

// Centralized helpers for building app routes
export const getQuoteRoute = (quoteId: string) => `${ROUTES_LIST.QUOTE}/${quoteId}`;