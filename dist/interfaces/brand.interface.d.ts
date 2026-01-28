import { Document, Types } from 'mongoose';
export interface IBrand extends Document {
    name: string;
    description: string;
    slug: string;
    one_liner: string;
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
    country: string;
    isIndianBrand: boolean;
    status: "draft" | "published";
    publishedAt?: Date;
    launchAt?: Date;
    recommendCount: number;
    notRecommendCount: number;
    reviewCount: number;
    founderId: Types.ObjectId;
    team?: {
        role: 'founder' | 'co-founder' | 'team-member' | string;
        userId: Types.ObjectId;
        isVerified: boolean;
    }[];
    viewCount: number;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
