const Router = require('express');
const router = new Router();
const usersRouter = require('../user/user.router');
const productsRouter = require('../products/product.router');
const reviewsRouter = require('../reviews/review.router');
const basketsRouter = require('../basket/userBasket.router');
const payRouter = require('../payment/paypal/paypal.router');
router.use('/user', (req, res, next) => {
    console.log('User router');
    next();
}, usersRouter);
router.use('/product', productsRouter);
router.use('/reviews', reviewsRouter);
router.use('/basket', basketsRouter);
router.use('/payment', payRouter);
module.exports = router;
//# sourceMappingURL=mainRouter.js.map