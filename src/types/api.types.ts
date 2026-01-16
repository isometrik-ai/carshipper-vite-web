/**
 * Common API Response Types
 * Generic Strapi API response structures
 */

/* ─────────────────────────────────────────────
 *  Generic Strapi Response Wrapper
 * ───────────────────────────────────────────── */
export interface StrapiResponseWrapper<T> {
    data: {
        id: number;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        data: T;
    };
    meta: Record<string, any>;
}

export interface StrapiCollectionResponse<T> {
    data: T[];
    meta: Record<string, any>;
}

export interface StrapiSingleResponse<T> {
    data: T;
    meta: Record<string, any>;
}
