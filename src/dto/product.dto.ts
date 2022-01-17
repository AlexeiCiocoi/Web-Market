
import * as yup from 'yup'
const reviewsDto = require('../dto/review.dto')
 
export const ProductInfo = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
})

export const productDto = yup.object({
    body: yup.object({
        name: yup.string().required(),
        price: yup.string().required(),
        info: yup.array().of(ProductInfo),
        description: yup.string(),
        reviews: yup.array().of(reviewsDto),
        discount: yup.number(),
        img: yup.string(),
        limit: yup.number(),
        page: yup.number(),
    })
})

export const brandDto = yup.object({
    body: yup.object({
        name: yup.string().required()
    })
})

export const typeDto = yup.object({
    body: yup.object({
        name: yup.string().required()
    })
})
