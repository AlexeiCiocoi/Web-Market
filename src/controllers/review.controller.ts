import { NextFunction, Request, Response } from "express"
import { UserCustomReq } from "../interfaces/user.interfaces";
const ApiError = require('../../error/apiError')
import { NOT_FOUND,REVIEW_DELETED,NO_REVIEWS_FOUND,PRODUCT_NOT_FOUND} from "../constants/review.constants";
import { ProductReview } from "../models/review.model";
import { IReview } from "../interfaces/reviews.interfaces";

const ReviewService = require('../services/review.service')


class ReviewController {

    async create(req: UserCustomReq , res: Response, next: NextFunction){
        
        const { ProductId , message } = req.body
        const { id, name } = req.user
       
        const newReview: IReview = { UserId: id, ProductId, message }
        try{
            const review: ProductReview = await ProductReview.create(newReview)
            return res.send({status: 200,message:'Success'})
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req: Request , res: Response){
      
        const review = await ReviewService.delete(req.params.id)
        if(!review){
            ApiError.badRequest(NOT_FOUND)
        }
        return res.status(200).json({message: REVIEW_DELETED})
    }

    async deleteAllByProductId(req: Request , res: Response){
        const review = await ReviewService.deleteAllByProductId(req.params.id)
        if(!review){
           return ApiError.badRequest(PRODUCT_NOT_FOUND)
        }
        return res.json(review)
    }

    async findAllReviews(req: Request , res: Response){
        const { id } = req.params
        console.log('params',id)
        const reviews: ProductReview[] =  await ReviewService.findAllReviews(id)
        res.json(reviews)
    }
}

module.exports = new ReviewController()
