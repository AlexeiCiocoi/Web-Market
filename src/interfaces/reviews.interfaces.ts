import { IUserInfo } from "./user.interfaces";

export interface IReview{
     UserId: number;
     message: string;
     ProductId: number;
}
export interface IUserReviewInfo{
     userImg: string;
     userName: string;
}