
import { NextFunction, Request, Response } from 'express'
import FileHelper from '../helpers/file.helper';
import { IUserInfo } from '../interfaces/user.interfaces';
import { IProductFullInfo } from '../interfaces/product.interfaces';
import { Brand, Product, ProductInfo, Type } from '../models/product.model';
const ApiError = require('../../error/apiError')
import ProductService from '../services/product.service'

interface CustomReq extends Request{
    files: any;
    user: IUserInfo;
}

 class ProductController {

    async addProduct(req: CustomReq , res: Response , next: NextFunction){
        const { info } = req.body
        const { img } = req.files
        try{
            const imgFileName = FileHelper.storeImgToStatic(img);
            const product: Product = await Product.create({
                ...req.body,
                img: imgFileName
            });
            if(info){
               await ProductService.createProductInfo(info,product.id)
            }
            return res.json(product)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
       
    }

    

    async getAllProducts(req: Request , res: Response){
       
        const products = await ProductService.getAllProducts(req.query);
       
        return res.json(products)
    }

    async getProductById(req: Request , res: Response){
      
        const product: Product = await ProductService.getProductById(req.params.id)
        return res.json(product)
    }   

    async getAllBrands(req: Request , res: Response){
    
        const brands: Brand[] = await ProductService.getAllBrands()
        return res.json(brands)
    }
    
    async getAllTypes(req: Request , res: Response){
      
        const type: Type[] = await ProductService.getAllTypes()
        return res.json(type)
    }

    async addBrand(req: Request , res: Response){
    
        const brand: Brand = await ProductService.addBrand(req.body)
        return res.json(brand)
    }

    async addType(req: Request , res: Response){
      
        const type: Type = await ProductService.addType(req.body)
        return res.json(type)
    }

}

module.exports = new ProductController()