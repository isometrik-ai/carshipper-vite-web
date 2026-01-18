/** ─────────────────────────────────────────────
 *  HOW IT WORKS SECTION API TYPES
 *  Matches JSON from: /api/how-it-works?populate=*
 *  ───────────────────────────────────────────── */

export interface HowItWorksResponse {
  data: HowItWorksData[];
  shipping: any;
  meta: Record<string, any>;
}

// MAIN DATA
export interface HowItWorksData {
  id: number;
  documentId: string;
  title: string;
  subTitle: string;
  buttonLabel: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  stats: HowItWorksStat[];
  steps: HowItWorksStep[];
}

// STATS
export interface HowItWorksStat {
  id: number;
  label: string;
  subLabel: string;
  icon: string | null;
}

// STEPS
export interface HowItWorksStep {
  id: number;
  stepNumber: string | null;
  title: string | null;
  description: RichTextBlock[] | null;
  icon: string | null;
}

import { RichTextBlock, RichTextChild } from "./common.types";

// Re-export for backward compatibility
export type { RichTextBlock, RichTextChild };
