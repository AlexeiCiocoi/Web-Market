"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReviewRouter = require('express');
const reviewRouter = new ReviewRouter();
const userAuthorization = require('../../middleware/authorization');
const reviewController = require('./review.controller');
const validateReviewDto = require('../../middleware/validate-dto');
const reviewDto = require('./review.dto');
const checkRole = require('../../middleware/checkRole');
const user_constants_1 = require("../user/user.constants");
reviewRouter.post('/add', userAuthorization, validateReviewDto(reviewDto), reviewController.create);
reviewRouter.delete('/delete/:id', userAuthorization, reviewController.delete);
reviewRouter.delete('/byProduct/delete/:id', checkRole(user_constants_1.userRoles.MODERATOR), userAuthorization, reviewController.deleteAllByProductId);
reviewRouter.get('/byProduct/:id', userAuthorization, reviewController.findAllByProductId);
module.exports = reviewRouter;
//# sourceMappingURL=review.router.js.map