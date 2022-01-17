import { Model ,DataTypes } from "sequelize";
import { sequelize } from '../db/postgresDb'
import { IReview, IUserReviewInfo } from "../interfaces/reviews.interfaces";



export class ProductReview extends Model{
    public ProductId: number;
    public UserId: number;
    public message: string;
    public userInfo: IUserReviewInfo[];
    public createdAt: Date;
   

}

ProductReview.init({
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    message: { type:DataTypes.STRING },

},{
    tableName:'reviews',
    sequelize
}
)