interface StatItem {
    id: number;
    label: string;
    value: string;
}

interface ValueItem {
    id: number;
    title: string;
    description: string;
    icon_name: string;
}

interface Why30Item {
    id: number;
    text: string;
    icon_name: string;
}

interface SharedCTA {
    id: number;
    title: string;
    description: string;
    primary_button_text: string;
    primary_button_link: string;
    secondary_button_text: string | null;
    secondary_button_link: string | null;
    show_phone: boolean | null;
    icon_name: string;
}

export interface AboutData {
    about_helmet_title: string;
    title: string;
    sub_title: string;
    hero_title: string;
    hero_description: string;
    story_title: string;
    story_content: string;
    value_title: string;
    why_30_title: string;
    why_30_description: string;
    why_30_footer: string;
    StatsItems: StatItem[];
    ValueItems: ValueItem[];
    Why30Items: Why30Item[];
    sharedCTA: SharedCTA;
}