import { Request, Response, NextFunction } from "express";
declare class BrandControllerClass {
    createBrand(req: Request, res: Response, next: NextFunction): Promise<void>;
    getAllBrands(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUserBrands(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBrand(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBrandBySlug(req: Request, res: Response, next: NextFunction): Promise<void>;
    getBrandByNameOrSlug(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteBrand(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateBrand(req: Request, res: Response, next: NextFunction): Promise<void>;
    increaseBrandView(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateBrandTeam(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare const BrandController: BrandControllerClass;
export {};
