const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export const FAQ_ENDPOINT = `${API_BASE_URL}/faq?populate[FaqCategories][populate]=FAQS`;
export const ABOUT_ENDPOINT = `${API_BASE_URL}/about?populate[StatsItems][populate]=*&populate[ValueItems][populate]=*&populate[Why30Items][populate]=*&populate[sharedCTA][populate]=*`;
export const PRICING_ENDPOINT = `${API_BASE_URL}/pricing?populate=*`;
export const CONTACT_ENDPOINT = `${API_BASE_URL}/contact?populate[contact_methods]=*&populate[contact_form]=*&populate[business_info][populate]=*`;
export const FOOTER_ENDPOINT = `${API_BASE_URL}/footer?populate[feature_items]=*&populate[socialLinks]=*&populate[footerColumn][populate]=*&populate[horizontalGroups][populate]=*&populate[bottom_bar]=*`;
export const HEADER_ENDPOINT = `${API_BASE_URL}/header?populate=*`;
export const HOW_IT_WORKS_ENDPOINT = `${API_BASE_URL}/how-it-work?populate[hero_section][populate]=*&populate[verifiedQuotes][populate]=*&populate[customerSay][populate]=*&populate[shipping][populate]=*`;