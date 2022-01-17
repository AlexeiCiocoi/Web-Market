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
const ApiError = require('../../error/apiError');
const review_constants_1 = require("./review.constants");
const review_model_1 = require("./review.model");
const ReviewService = require('./review.service');
class ReviewController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ProductId, message } = req.body;
            const { id } = req.user;
            const newReview = { UserId: id, ProductId, message };
            try {
                const review = yield review_model_1.ProductReview.create(newReview);
                return res.status(200).json({ status: 200, message: 'review successfully added' });
            }
            catch (e) {
                next(ApiError.badRequest(e.message));
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield ReviewService.delete(req.params.id);
            if (!review) {
                ApiError.badRequest(review_constants_1.NOT_FOUND);
            }
            return res.status(200).json({ message: review_constants_1.REVIEW_DELETED });
        });
    }
    findAllByProductId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const reviews = yield ReviewService.findAllByProductId(req.params.id);
            if (reviews.length <= 0) {
                return ApiError.badRequest(review_constants_1.NO_REVIEWS_FOUND);
            }
            return res.json(reviews);
        });
    }
    deleteAllByProductId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const review = yield ReviewService.deleteAllByProductId(req.params.id);
            if (!review) {
                return ApiError.badRequest(review_constants_1.PRODUCT_NOT_FOUND);
            }
            return res.json(review);
        });
    }
}
module.exports = new ReviewController();
//# sourceMappingURL=review.controller.js.map