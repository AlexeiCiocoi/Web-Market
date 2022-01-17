import { UserBasket } from "./userBasket.model";

 class BasketService{

    async getUserBasket(UserId: number){
        return await UserBasket.findOne({where:{UserId },raw: true})
    }


    async updateBasket(products,UserId){
        return await UserBasket.update({
            products: [...products]
                },{
                    where: {UserId},
                    returning: true,
                })
    }


}

module.exports = new BasketService()