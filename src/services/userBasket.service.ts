import { UserBasketModel } from "../models/userBasket.model";
import { IBasketUpdateQuantity, IUserBasketPassData, IUserBasketResponse } from "../interfaces/userBasket.interface";
import { Product } from "../models/product.model";

 export default class BasketService{

    static async addProductToBasket(data : IUserBasketPassData){
        return await UserBasketModel.create(data)
    }

    static async findBasketItem({UserId,ProductId} : IUserBasketPassData){
        return await UserBasketModel.findOne({where:{
            UserId,
            ProductId
        }})
    }

    static async getAllProducts(UserId: number): Promise<IUserBasketResponse>{
       
        const userBasket: IUserBasketResponse =  await UserBasketModel.findAndCountAll({
            where: {
                UserId
            },
            include:[
                {
                    model: Product,
                    attributes:['img','name','price']
                }
            ]
        })
        return userBasket
    }

    static async deleteBasketItem ({ProductId, UserId}: IUserBasketPassData) {
        await UserBasketModel.destroy({where:{
            UserId,
            ProductId
        }})
    }
    static async clearUserBasket (UserId) {
        await UserBasketModel.destroy({where:{
            UserId,
        }})
    }



    static async updateQuantity ({UserId,ProductId , quantity}: IBasketUpdateQuantity) {
        await UserBasketModel.update({
            quantity
        },{
            where:
            {
                UserId,
                ProductId,
            }
        })
    }

    
}

