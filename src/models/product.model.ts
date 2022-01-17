import { Interface } from "readline";
import { Model ,DataTypes } from "sequelize";
import { sequelize } from "../db/postgresDb";
import { UserBasketModel } from "./userBasket.model";
import { ProductReview } from "./review.model";
import { IReview } from "../interfaces/reviews.interfaces";
import { IInfo } from "../interfaces/product.interfaces";
import { Order } from "./order.model";

export class Brand extends Model {
    public id: number;
    public name: string;
}

export class Type extends Model {
    public id: number;
    public name: string;
}

export class Product extends Model {

    public id: number;
    public name: string;
    public price: string;
    public description: string;
    public discount?: string;
    public img?: string;
    public info: IInfo[];
    public reviews?: IReview[];

}

 export class ProductInfo extends Model{
    ProductId: number;
    title: string;
    description: string;
     
}

export class SoldProduct extends Model{
    public id: number;
    public ProductId: number;
    public quantity: number;
    public OrderId: number;
}

SoldProduct.init({
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity: {type:DataTypes.INTEGER },
    
    
},{
    tableName: 'sold_products',
    sequelize
})

ProductInfo.init({
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type:DataTypes.STRING },
    description: {type:DataTypes.STRING }
    
},{
    tableName: 'product_info',
    sequelize
})

Product.init({
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING,},
    price: {type:DataTypes.STRING, allowNull: false},
    description: {type:DataTypes.STRING, allowNull: false},
    discount: {type:DataTypes.INTEGER},
    img: {type: DataTypes.STRING, unique: true, allowNull: true},
    rating: {type: DataTypes.STRING,},
   
},{
    tableName: 'products',
    sequelize
})

Brand.init({
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING,},
},{
    tableName: 'brands',
    sequelize
})

Type.init({
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type:DataTypes.STRING,},
},{
    tableName: 'types',
    sequelize
})

Brand.hasMany(Product)
Product.belongsTo(Brand)

Type.hasMany(Product)
Product.belongsTo(Type)

SoldProduct.belongsTo(Order)
Order.hasMany(SoldProduct,{as: 'products'})

SoldProduct.belongsTo(Product)
Product.hasMany(SoldProduct)

Product.hasMany(ProductInfo,{as: 'info'})
ProductInfo.belongsTo(Product)

Product.hasMany(ProductReview,{as:'reviews'})
ProductReview.belongsTo(Product)

Product.hasMany(UserBasketModel)
UserBasketModel.belongsTo(Product)