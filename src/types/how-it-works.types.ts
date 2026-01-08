/** ─────────────────────────────────────────────
 *  HOW IT WORKS SECTION API TYPES
 *  Matches JSON from: /api/how-it-works?populate=*
 *  ───────────────────────────────────────────── */

export interface HowItWorksResponse {
  data: HowItWorksData[];
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

// RICH TEXT (Strapi style)
export interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}

export interface RichTextChild {
  type: string;
  text: string;
  bold?: boolean;
}
