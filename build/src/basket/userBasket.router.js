const BasketRouter = require('express');
const basketRouter = new BasketRouter();
const BasketController = require('./userBasket.controller');
const checkAuth = require('../../middleware/authorization');
basketRouter.put('/:productId', checkAuth, BasketController.addProductToBasket);
basketRouter.get('/', checkAuth, BasketController.getUserBasket);
basketRouter.delete('/:productId', checkAuth, BasketController.removeProduct);
basketRouter.delete('/', checkAuth, BasketController.clearBasket);
module.exports = basketRouter;
//# sourceMappingURL=userBasket.router.js.map