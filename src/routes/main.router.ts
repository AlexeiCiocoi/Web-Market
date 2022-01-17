const Router = require('express')
const router = new Router()

const usersRouter = require('../routes/user.router')
const productsRouter = require('../routes/product.router')
const reviewsRouter = require('./review.router')
const basketsRouter = require('./userBasket.router')
const payRouter = require('../routes/paypal.router')


router.use('/user',usersRouter)
router.use('/product',productsRouter)
router.use('/reviews',reviewsRouter)
router.use('/basket',basketsRouter)
router.use('/payment',payRouter)

module.exports = router

