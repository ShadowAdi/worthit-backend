export interface UpdateBrandDto {
    name?: string;
    description?: string;
    slug?: string;

    whyItExists?: string;

    one_liner?: string

    images?: {
        url?: string;
        alt?: string;
        order?: number;
    }[];
    demoVideo?: string;

    category?: string[];
    howToUse?: string;

    websiteUrl?: string;
    socialLinks?: {
        platform: 'instagram' | 'linkedin' | 'twitter' | 'youtube' | 'other' | string;
        url: string;
    }[];

    country?: string;

    launchAt?: string;

    team?: {
        role: 'founder' | 'co-founder' | 'team-member' | string;
        userId: string;
        isVerified?: boolean;
    }[];
}