import { Request, Response} from 'express'
import { INCORRECT_ID,PRODUCT_ADDED} from '../constants/userBasket.constants'
const BasketService = require('./userBasket.service')
const ApiError = require('../../error/apiError')
const ProductService = require('../products/product.service')

class BasketController {

    async addProductToBasket(req: Request,res: Response, next: Function){
        const {productId} = req.params
       
        try{
            const user = req.body.user
            const userBasket = await BasketService.getUserBasket(user.id)
            const productToAdd = await ProductService.getProductById(productId)
            if(!productToAdd){
                next(ApiError.badRequest(INCORRECT_ID))
            }
            const { img , price,name} = productToAdd
            userBasket.products.push({
                img,
                price,
                productId,
                quantity: 1,
                name
            })
            await BasketService.updateBasket(userBasket.products,user.id)
          
            return res.status(200).json({message:PRODUCT_ADDED,status: 200})
        }catch(e){
            return  next(ApiError.badRequest(e.message))
        }
        
    }

    async getUserBasket(req: Request,res: Response){
        const userId = req.body.user.id
        const userBasket =  await BasketService.getUserBasket(userId)
        
        return res.json(userBasket.products)
    }

    async removeProduct(req: Request,res: Response,next: Function){
        const user = req.body.user
        const {productId} = req.params
        
        try{
            const userBasket = await BasketService.getUserBasket(user.id)
            let products = userBasket.products.filter( product => product.productId !== productId)
            const updatedBasket = await BasketService.updateBasket(products,user.id)
            return res.status(200).json(updatedBasket)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
       
        
    }

    async clearBasket(req: Request,res: Response,next: Function){
        const user = req.body.user
        try{
             await BasketService.updateBasket([],user.id)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new BasketController()