"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const review_model_1 = require("../reviews/review.model");
const user_model_1 = require("../user/user.model");
const product_model_1 = require("./product.model");
const ApiError = require('../../error/apiError');
class ProductService {
    getAllProducts(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { limit, page, brandId, typeId } = data;
            const offset = limit * page - limit;
            page = page || 1;
            if (!brandId && !typeId) {
                return yield product_model_1.Product.findAndCountAll({ limit, offset });
            }
            if (!brandId && typeId) {
                return yield product_model_1.Product.findAndCountAll({ where: { TypeId: typeId }, limit, offset });
            }
            if (!typeId && brandId) {
                return yield product_model_1.Product.findAndCountAll({ where: { BrandId: brandId }, limit, offset });
            }
            if (typeId && brandId) {
                return yield product_model_1.Product.findAndCountAll({ where: { TypeId: typeId, BrandId: brandId }, limit, offset });
            }
        });
    }
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.Product.findOne({
                where: { id },
                include: [
                    {
                        model: product_model_1.ProductInfo,
                        as: 'info',
                    },
                    {
                        model: review_model_1.ProductReview,
                        as: 'reviews',
                        attributes: ['message', 'createdAt',],
                        include: [
                            {
                                model: user_model_1.User,
                                attributes: ['name', 'img', 'id'],
                            }
                        ]
                    }
                ]
            });
        });
    }
    getAllBrands() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.Brand.findAll();
        });
    }
    getAllTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.Type.findAll();
        });
    }
    addBrand(brand) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Brand ', brand);
            return yield product_model_1.Brand.create(brand);
        });
    }
    addType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.Type.create(type);
        });
    }
}
module.exports = new ProductService();
//# sourceMappingURL=product.service.js.map