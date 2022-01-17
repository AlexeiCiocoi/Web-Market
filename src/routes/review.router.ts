const ReviewRouter = require('express')
const reviewRouter = new ReviewRouter()
const userAuthorization = require('../../middleware/authorization')
const reviewController = require('../controllers/review.controller')
const validateReviewDto = require('../../middleware/validate-dto')
const reviewDto = require('../dto/review.dto')
const checkRole = require('../../middleware/checkRole')
import { userRoles } from "../constants/user.constants"

reviewRouter.post('/add',userAuthorization,
    validateReviewDto(reviewDto),
    reviewController.create)
reviewRouter.delete('/delete/:id',
    userAuthorization,
    reviewController.delete)
reviewRouter.delete('/byProduct/delete/:id',
    checkRole(userRoles.MODERATOR),
    userAuthorization,
    reviewController.deleteAllByProductId)
reviewRouter.get('/product/:id',
    userAuthorization,
    reviewController.findAllReviews)
module.exports = reviewRouter