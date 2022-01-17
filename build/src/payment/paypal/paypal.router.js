"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PayPalRouter = require('express');
const paypalRouter = new PayPalRouter();
const checkAuthorized = require('../../../middleware/authorization');
const paymentController = require('./paypal.controller.ts');
const validateOrderDto = require('../../../middleware/validate-dto');
const user_dto_1 = require("../../user/user.dto");
paypalRouter.post('/order', checkAuthorized, validateOrderDto(user_dto_1.orderDto), paymentController.createOrder);
paypalRouter.get('/success', paymentController.executePayment);
paypalRouter.get('/cancel', paymentController.createOrder);
module.exports = paypalRouter;
//# sourceMappingURL=paypal.router.js.map