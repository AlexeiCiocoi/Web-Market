import { IProductInfo } from './payment.interfaces'
import { Model } from 'sequelize'
import { Request } from 'express'
import { User, UserProfile } from '../models/user.model'


export interface UserAttributes{
    id: number;
    email: string;
    name: string;
    password: string;
    role: string;
}

export interface IUserOrder extends Model {
    paymentId: string;
    amountPaid: string;
    currency: string;
    status: boolean;
    products: IProductInfo[];
  
}
 
export interface IUserRegisterForm{
    name: string;
    email: string;
    password: string;
}

export interface IUserInfo{
    id: number;
    name: string;
    email: string;
    role: string;
}
export interface UserCustomReq extends Request{
    user: IUserInfo
    token?: string
}

export interface IUserLoginRes extends IUserInfo {
    password: string;
    id: number;
    profile:UserProfile
}