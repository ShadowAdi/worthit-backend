
export interface CreateBrandDto {
    name: string;
    description: string;
    slug: string;

    whyItExists: string;

    images: {
        url: string;
        alt: string;
        order: number;
    }[];
    demoVideo?: string;

    category: [string];
    howToUse: string;

    websiteUrl?: string;
    socialLinks?: {
        platform: 'instagram' | 'linkedin' | 'twitter' | 'youtube' | 'other' | string;
        url: string;
    }[];

    status: "draft" | "published";

    country: string;

    launchAt?: Date;
}