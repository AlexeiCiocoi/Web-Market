const BasketRouter = require('express')
const basketRouter = new BasketRouter()
const BasketController = require('../controllers/userBasket.controller')
const checkAuth = require('../../middleware/authorization')

basketRouter.post('/:productId',
    checkAuth,
    BasketController.addProductToBasket)
basketRouter.get('/',
    checkAuth,
    BasketController.getUserBasket)
basketRouter.delete('/:productId',
    checkAuth,
    BasketController.removeProduct)
basketRouter.put('/',
    checkAuth,
    BasketController.updateProductQuantity)


 
module.exports = basketRouter