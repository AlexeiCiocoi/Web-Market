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
const userBasket_constants_1 = require("./userBasket.constants");
const BasketService = require('./userBasket.service');
const ApiError = require('../../error/apiError');
const ProductService = require('../products/product.service');
class BasketController {
    addProductToBasket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { productId } = req.params;
            try {
                const user = req.body.user;
                const userBasket = yield BasketService.getUserBasket(user.id);
                const productToAdd = yield ProductService.getProductById(productId);
                if (!productToAdd) {
                    next(ApiError.badRequest(userBasket_constants_1.INCORRECT_ID));
                }
                const { img, price, name } = productToAdd;
                userBasket.products.push({
                    img,
                    price,
                    productId,
                    quantity: 1,
                    name
                });
                yield BasketService.updateBasket(userBasket.products, user.id);
                return res.status(200).json({ message: userBasket_constants_1.PRODUCT_ADDED, status: 200 });
            }
            catch (e) {
                return next(ApiError.badRequest(e.message));
            }
        });
    }
    getUserBasket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.user.id;
            const userBasket = yield BasketService.getUserBasket(userId);
            return res.json(userBasket.products);
        });
    }
    removeProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body.user;
            const { productId } = req.params;
            try {
                const userBasket = yield BasketService.getUserBasket(user.id);
                let products = userBasket.products.filter(product => product.productId !== productId);
                const updatedBasket = yield BasketService.updateBasket(products, user.id);
                return res.status(200).json(updatedBasket);
            }
            catch (e) {
                next(ApiError.badRequest(e.message));
            }
        });
    }
    clearBasket(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body.user;
            try {
                yield BasketService.updateBasket([], user.id);
            }
            catch (e) {
                next(ApiError.badRequest(e.message));
            }
        });
    }
}
module.exports = new BasketController();
//# sourceMappingURL=userBasket.controller.js.map