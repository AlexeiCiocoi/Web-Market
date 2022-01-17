import { Request, Response, NextFunction} from 'express'
import { INCORRECT_ID,PRODUCT_ADDED} from '../constants/userBasket.constants'
import  BasketService from '../services/userBasket.service'
const ApiError = require('../../error/apiError')
import { UserCustomReq } from '../interfaces/user.interfaces'
import  ProductService  from '../services/product.service'
import { IUserBasketResponse } from '../interfaces/userBasket.interface'
import { UserBasketModel } from '../models/userBasket.model'




 class BasketController {

    public async addProductToBasket(req: UserCustomReq,res: Response, next: NextFunction){
        const { productId } = req.params
        const { id } = req.user
        const data = { UserId: id , ProductId:Number(productId) }
        try{
            const checkProduct = await ProductService.getProductById(productId)
            if(!checkProduct){
                next(ApiError.badRequest(INCORRECT_ID))
            }
            const findBasketItem = await BasketService.findBasketItem(data)
            if(findBasketItem){
                let { quantity } =  findBasketItem
                quantity++
                await BasketService.updateQuantity({...data,quantity })
                return res.send({status: 200 , message: 'Product Quantity Increased'})
            }
            await BasketService.addProductToBasket(data)
            return res.status(200).send({message: PRODUCT_ADDED , status: 200})
        }catch(e){
            return  next(ApiError.badRequest(e.message))
        }
    }

    public async getUserBasket(req: UserCustomReq,res: Response){
        const { id } = req.user
        const userBasket: IUserBasketResponse =  await BasketService.getAllProducts(id)
        if(!userBasket){
            return res.send({
                count: 0,
                products: {}
            })
        }
        let totalPrice: number = 0;
        const newArr = [...userBasket.rows]
        for(let i =0 ; i < newArr.length; i++){
            totalPrice += newArr[i].quantity * newArr[i].Product.price
        }
         
        return res.json({...userBasket, totalPrice})
    }

     async removeProduct(req: UserCustomReq,res: Response,next: Function){
        const { id } = req.user
        const {productId} = req.params
        const basketInfo = { UserId: id , ProductId:Number(productId) }
        try{
            const userBasket =  await BasketService.deleteBasketItem(basketInfo)
            return res.send({status:200 , message: 'Product Removed from basket'})
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
     }

     async updateProductQuantity(req: UserCustomReq,res: Response,next: Function){
        const { ProductId , quantity } = req.body
        const { id } = req.user
        await BasketService.updateQuantity({UserId: id,ProductId,quantity })
        return res.send({status: 200, message: 'Quantity Updates '})
     }
}


module.exports = new BasketController()
