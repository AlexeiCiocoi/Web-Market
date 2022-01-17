
const PayPalRouter = require('express')
const paypalRouter = new PayPalRouter()
const checkAuthorized = require('../../middleware/authorization')
const paymentController = require('../controllers/paypal.controller')
const validateOrderDto = require('../../middleware/validate-dto')

paypalRouter.post('/order',checkAuthorized,paymentController.createPayment)
paypalRouter.post('/success',paymentController.executePayment)
// paypalRouter.get('/cancel',paymentController.createOrder)




module.exports = paypalRouter