"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDto = exports.brandDto = exports.productDto = exports.ProductInfo = void 0;
const yup = require("yup");
const reviewsDto = require('../reviews/review.dto');
exports.ProductInfo = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
});
exports.productDto = yup.object({
    body: yup.object({
        name: yup.string().required(),
        price: yup.string().required(),
        info: yup.array().of(exports.ProductInfo),
        description: yup.string().required(),
        reviews: yup.array().of(reviewsDto),
        discount: yup.number(),
        img: yup.string(),
        limit: yup.number(),
        page: yup.number(),
    })
});
exports.brandDto = yup.object({
    body: yup.object({
        name: yup.string().required()
    })
});
exports.typeDto = yup.object({
    body: yup.object({
        name: yup.string().required()
    })
});
//# sourceMappingURL=product.dto.js.map