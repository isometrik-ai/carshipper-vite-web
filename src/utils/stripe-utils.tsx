import { loadStripe, Stripe } from '@stripe/stripe-js';
import { STRIPE_KEY } from '@/lib/config';

let stripePromise: Promise<Stripe | null> | null = null;

/**
 * Generic method to load Stripe instance
 * Uses singleton pattern to ensure only one Stripe instance is created
 * @returns Promise<Stripe | null> - The Stripe instance
 */
export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(STRIPE_KEY);
  }
  return stripePromise;
};