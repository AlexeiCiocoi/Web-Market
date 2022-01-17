import { UserBasketModel } from "../models/userBasket.model";

export interface IUserBasketPassData {
    UserId: number;
    ProductId: number;
}

export interface IUserBasketProducts {
    
}


export interface IBasketUpdateQuantity extends IUserBasketPassData {
     quantity: number;
}


export interface IUserBasketResponse {
     totalPrice?: number;
     rows:UserBasketModel[]
     count: number;
}

export interface IUserBasketInfo {
    UserId: number;
    ProductId: number;
    quantity: number;
    Product: IUserBasketProductInfo;
}

export interface IUserBasketProductInfo {
    img: string;
    name: string;
    price: number;
}