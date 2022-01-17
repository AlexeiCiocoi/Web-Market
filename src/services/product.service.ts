import 'reflect-metadata';
import { Service } from "typedi";
import { ProductReview } from "../models/review.model";
import { IReview } from "../interfaces/reviews.interfaces";
import { User } from "../models/user.model";
import { IInfo, IProductFullInfo, IProductRequest } from "../interfaces/product.interfaces";
import { Product, Type , Brand,ProductInfo , SoldProduct } from "../models/product.model";
const ApiError = require('../../error/apiError')


class ProductService {

    public async getAllProducts (data){
        let { limit , page , brandId, typeId } = data;
        const offset: number  = limit * page - limit;
        page = page || 1;

        if(!brandId && !typeId){
            return await Product.findAndCountAll({limit,offset})
        }
        if(!brandId && typeId){
            return await Product.findAndCountAll({where: {TypeId: typeId }, limit , offset})
        }
        if(!typeId && brandId){
            return await Product.findAndCountAll({where: {BrandId: brandId }, limit , offset})
        }
        if(typeId && brandId){
            return await Product.findAndCountAll({where: {TypeId: typeId ,BrandId: brandId} , limit , offset})
        }
       
    }

    public async getProductById (id: string){
     
        return await Product.findOne({
             where: { id },
             include:[
                {
                    model: ProductInfo,
                    as: 'info',
                    
                },
                {
                    model: ProductReview,
                    as: 'reviews',
                    attributes: ['message','createdAt',],
                    include:[
                        {
                            model: User,
                            attributes: ['name','img','id'],
                        }
                    ]
                }
             ]
            
        })
    }

    public async getAllBrands (): Promise<Brand[]>{
        return await Brand.findAll()
    }

    public async getAllTypes (): Promise<Type[]>{
        return await Type.findAll()
    }

    public async addBrand (brand): Promise<Brand>{
        return await Brand.create(brand)
    }

    public async addType (type): Promise<Type>{
        return await Type.create(type)
    }

    public async createProductInfo (infos: ProductInfo[],ProductId: number): Promise<void> {
        infos.forEach( i => {
            ProductInfo.create({
                title: i.title,
                description: i.description,
                ProductId,
            })
          });
    }


    public async createSoldProduct(data){
        const { OrderId, soldProducts} = data
        soldProducts.forEach(element => {
            SoldProduct.create({...element, OrderId })
        });
    }
}

export default new ProductService()