import { Types } from "mongoose";
import type { CreateBrandDto } from "../types/brand/brand-create.dto.js";
import type { UpdateBrandDto } from "../types/brand/brand-update.dto.js";
declare class BrandClassService {
    createBrand(payload: CreateBrandDto, userId: string | Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, import("../interfaces/brand.interface.js").IBrand, {}, {}> & import("../interfaces/brand.interface.js").IBrand & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getAllBrands(): Promise<{
        totalBrands: number;
        brands: (import("mongoose").FlattenMaps<import("../interfaces/brand.interface.js").IBrand> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getUserBrands(userId: string): Promise<{
        totalBrands: number;
        brands: (import("mongoose").FlattenMaps<import("../interfaces/brand.interface.js").IBrand> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getBrand(brandId: string): Promise<(import("mongoose").FlattenMaps<import("../interfaces/brand.interface.js").IBrand> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getBrandBySlug(slug: string, userId?: string): Promise<{
        brand: import("mongoose").FlattenMaps<import("../interfaces/brand.interface.js").IBrand> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        };
        reviews: (import("mongoose").FlattenMaps<import("../interfaces/review.interface.js").IReview> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
    }>;
    getBrandByNameOrSlug(identifier: string): Promise<(import("mongoose").FlattenMaps<import("../interfaces/brand.interface.js").IBrand> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    deleteBrand(brandId: string, userId: string): Promise<string>;
    updateBrand(brandId: string, userId: string, updateBrandPayload: UpdateBrandDto): Promise<(import("mongoose").FlattenMaps<import("../interfaces/brand.interface.js").IBrand> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    increaseBrandView(brandId: string): Promise<import("mongoose").FlattenMaps<import("../interfaces/brand.interface.js").IBrand> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateBrandTeam(brandId: string, userId: string, teamMembers: {
        role: 'founder' | 'co-founder' | 'team-member' | string;
        userId: string;
        isVerified?: boolean;
    }[]): Promise<import("mongoose").FlattenMaps<import("../interfaces/brand.interface.js").IBrand> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
export declare const BrandService: BrandClassService;
export {};
