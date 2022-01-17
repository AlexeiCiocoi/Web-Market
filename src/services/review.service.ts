
import { ProductReview } from "../models/review.model";
import { User } from "../models/user.model";

class ReviewService {


    async delete(id: number){
        return await ProductReview.destroy({where: {id}})
    }

    async deleteAllByProductId(ProductId: number){
      
        return await ProductReview.destroy({where:{ProductId}})
    }

    async findAllReviews(ProductId: number): Promise<ProductReview[]>{
        return await ProductReview.findAll({where:{
            ProductId
        },
        attributes: ['message','createdAt',],
        include:[
            {
                model: User,
                attributes: ['name','img','id'],
            }
        ]
    
    })
    }


}
module.exports = new ReviewService()
