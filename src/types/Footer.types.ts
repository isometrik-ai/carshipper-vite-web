import { RichTextBlock, RichTextChild } from "./common.types";

// Re-export for backward compatibility
export type { RichTextBlock, RichTextChild };

/* --------------------------------------------- */
/* Footer Navigation (Top groups)                */
/* --------------------------------------------- */

export interface FooterNavLink {
    id: number;
    label: string;
    url: string;
}

export interface FooterNavigationGroup {
    id: number;
    title: string;
    footerNavLinks: FooterNavLink[];
}

/* --------------------------------------------- */
/* SEO Footer Groups (States, Cities, Makes...)  */
/* --------------------------------------------- */

export interface FooterSEOGroupLink {
    id: number;
    label: string;
    url: string;
}

export interface FooterSEOGroup {
    id: number;
    groupTitle: string;
    viewAllLabel: string;
    viewAllUrl: string;
    footerNavLinks: FooterSEOGroupLink[];
}

/* --------------------------------------------- */
/* Bottom links                                  */
/* --------------------------------------------- */

export interface BottomLink {
    id: number;
    label: string;
    url: string;
}

/* --------------------------------------------- */
/* Main Footer Response Data                     */
/* --------------------------------------------- */

export interface FooterData {
    id: number;

    brandName: string;
    brandAccent: string;

    // Rich text
    description: RichTextBlock[];

    phoneNumber: string;
    email: string;
    availabilityNote: string;
    followUpNote: string;

    copyrightsText: string;
    mcNumber: string;
    dotNumber: string;

    footerNavigationGroup: FooterNavigationGroup[];

    footerLinkGroups: FooterSEOGroup[];

    bottomLinks: BottomLink[];
}

/* --------------------------------------------- */
/* API Response wrapper                          */
/* --------------------------------------------- */

export interface FooterResponse {
    data: FooterData;
}
