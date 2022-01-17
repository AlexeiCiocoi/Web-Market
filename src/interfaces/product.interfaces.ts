import { ProductReview } from "../models/review.model";
import { Product } from "../models/product.model";

export interface IInfo{
    title: string;
    description: string;
}

export interface IProductFullInfo extends Product{
    
    info: IInfo[];
    reviews?: ProductReview[];
}

export interface ISoldProduct{
     id: number;
     ProductId: number;
     quantity: number;
     OrderId: number;
}

export interface IProductRequest{
    brandId?: number;
    typeId?: number;
    limit: number;
    page?: number;
}