import {
    Truck,
    Phone,
    Car,
    Package,
    Building2,
    Factory,
    Store,
    BarChart3,
    Gavel,
    Shield,
    Users,
    Award,
    TrendingUp,
    CheckCircle,
    Star,
    Clock,
    DollarSign,
    MapPin,
    Mail,
    MessageCircle,
    MessageSquare,
    Zap,
    FileText,
    UserCheck,
    ClipboardCheck,
    CreditCard,
    Eye,
    Lock,
    BadgeCheck,
    Locate,
    Scale,
    HelpCircle,
    Weight,
    Route,
    AlertTriangle,
    Headphones,
    Info,
    RefreshCw,
    Calculator,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    X,
    XCircle,
    ArrowRight,
    type LucideIcon,
    AlertCircle,
    FileCheck,
} from "lucide-react";

/**
 * Icon mapping registry for Strapi icon names to Lucide React icons
 * This map should be kept in sync with the icon enumerations in Strapi schemas
 * 
 * Structure:
 * - PascalCase entries first (direct icon references)
 * - camelCase aliases after (for consistency with Strapi enum values)
 */
export const ICON_MAP: Record<string, LucideIcon> = {
    // ============================================
    // PascalCase Icons (Primary entries)
    // ============================================
    AlertCircle,
    AlertTriangle,
    ArrowRight,
    Award,
    BadgeCheck,
    BarChart3,
    Building2,
    Calculator,
    Car,
    CheckCircle,
    ClipboardCheck,
    Clock,
    CreditCard,
    DollarSign,
    Eye,
    Facebook,
    Factory,
    FileCheck,
    FileText,
    Gavel,
    Headphones,
    HelpCircle,
    Info,
    Instagram,
    Linkedin,
    Locate,
    Lock,
    Mail,
    MapPin,
    MessageCircle,
    MessageSquare,
    Package,
    Phone,
    RefreshCw,
    Route,
    Scale,
    Shield,
    Star,
    Store,
    TrendingUp,
    Truck,
    Twitter,
    UserCheck,
    Users,
    Weight,
    X,
    XCircle,
    Youtube,
    Zap,
    alertCircle: AlertCircle,
    alertTriangle: AlertTriangle,
    arrowRight: ArrowRight,
    award: Award,
    badgeCheck: BadgeCheck,
    barChart: BarChart3,
    barChart3: BarChart3,
    building2: Building2,
    calculator: Calculator,
    car: Car,
    checkCircle: CheckCircle,
    clipboardCheck: ClipboardCheck,
    clock: Clock,
    creditCard: CreditCard,
    dollarSign: DollarSign,
    eye: Eye,
    facebook: Facebook,
    factory: Factory,
    fileCheck: FileCheck,
    fileText: FileText,
    gavel: Gavel,
    headphones: Headphones,
    headsets: Headphones, // Alias for headsets
    helpCircle: HelpCircle,
    info: Info,
    instagram: Instagram,
    linkedin: Linkedin,
    locate: Locate,
    lock: Lock,
    mail: Mail,
    mapPin: MapPin,
    messageCircle: MessageCircle,
    messageSquare: MessageSquare,
    package: Package,
    phone: Phone,
    refreshCw: RefreshCw,
    route: Route,
    scale: Scale,
    shield: Shield,
    star: Star,
    store: Store,
    trendingUp: TrendingUp,
    truck: Truck,
    twitter: Twitter,
    userCheck: UserCheck,
    users: Users,
    weight: Weight,
    x: X,
    xCircle: XCircle,
    youtube: Youtube,
    zap: Zap,
} as const;

/**
 * Social media icon mapping - maps lowercase platform names to Lucide icons
 * This is separate from ICON_MAP because social media icons use lowercase names
 */
export const SOCIAL_ICON_MAP: Record<string, LucideIcon> = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
} as const;

/**
 * Default icon to use when icon name is not found or is null
 */
export const DEFAULT_ICON = Truck;

/**
 * Gets a Lucide icon component by name
 * 
 * @param iconName - The icon name from Strapi (can be null or undefined)
 * @returns The corresponding Lucide icon component, or DEFAULT_ICON if not found
 * 
 * @example
 * ```tsx
 * const Icon = getIcon("Truck");
 * <Icon className="w-6 h-6" />
 * ```
 */
export const getIcon = (iconName: string | null | undefined): LucideIcon => {
    if (!iconName) {
        return DEFAULT_ICON;
    }

    const icon = ICON_MAP[iconName];

    if (!icon) {
        console.warn(`Icon "${iconName}" not found in ICON_MAP. Using default icon.`);
        return DEFAULT_ICON;
    }

    return icon;
};

/**
 * Type guard to check if an icon name is valid
 * 
 * @param iconName - The icon name to check
 * @returns True if the icon exists in the map
 */
export const isValidIcon = (iconName: string | null | undefined): iconName is string => {
    return Boolean(iconName && iconName in ICON_MAP);
};

/**
 * Gets all available icon names
 * 
 * @returns Array of all available icon names
 */
export const getAvailableIconNames = (): string[] => {
    return Object.keys(ICON_MAP);
};

/**
 * Gets a social media icon by platform name
 * 
 * @param platformName - The social media platform name (e.g., "facebook", "twitter")
 * @returns The corresponding Lucide icon component, or null if not found
 * 
 * @example
 * ```tsx
 * const Icon = getSocialIcon("facebook");
 * {Icon && <Icon className="w-4 h-4" />}
 * ```
 */
export const getSocialIcon = (platformName: string | null | undefined): LucideIcon | null => {
    if (!platformName) {
        return null;
    }

    const icon = SOCIAL_ICON_MAP[platformName.toLowerCase()];
    return icon || null;
};
