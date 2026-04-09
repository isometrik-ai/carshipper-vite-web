/**
 * Canonical vehicle model for quote UI, booking UI, and API mapping.
 * Use this type (not ad-hoc shapes) whenever vehicle state is passed between components.
 */
export interface Vehicle {
  id: string;
  /**
   * Model year. Use `0` when the user has not selected a year yet (quote step 1).
   */
  year: number;
  make: string;
  model: string;
  /**
   * Body style (SUV, Sedan, …). Sent as `type` on quote/booking APIs.
   */
  type: string;
  /**
   * Runs and drives. `null` = not yet chosen (quote flow “running” step).
   * Booking / edit dialogs use `true` | `false` only.
   */
  operational: boolean | null;
  personalItems: string;
  color: string;
  vin: string;
  /** Transient: VIN decode in progress (quote vehicle step). */
  vinLookupLoading?: boolean;
}
