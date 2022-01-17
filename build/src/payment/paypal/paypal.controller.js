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
const paypal_config_1 = require("./paypal.config");
const paypal = require('paypal-rest-sdk');
const ApiError = require('../../../error/apiError');
const PaymentService = require('./paypal.service');
const ProductService = require('../../products/product.service');
const UserService = require('../../user/user.service');
const paypal_order_1 = require("./paypal.order");
const jwt = require('jsonwebtoken');
paypal.configure(paypal_config_1.paypalConfig);
class paymentController {
    createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products, user } = req.body;
            let orderData;
            let paymentUrl;
            const order = new paypal_order_1.Order(req.body);
            const create_payment_json = yield order.createOrder();
            yield paypal.payment.create(create_payment_json, (error, payment) => {
                if (error) {
                    next(ApiError.badRequest(error.response.details));
                }
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href);
                    }
                }
            });
        });
    }
    executePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { PayerID, paymentId } = req.query;
            const execute_payment_json = {
                "payer_id": PayerID,
                "transactions": [{
                        "amount": {
                            "currency": "USD",
                            "total": "25.00"
                        }
                    }]
            };
            // Obtains the transaction details from paypal
            paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
                //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
                if (error) {
                    console.log(error.response);
                    throw error;
                }
                else {
                    console.log(JSON.stringify(payment));
                    res.send('Success');
                }
            });
        });
    }
    cancelPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({ message: 'Payment successfully canceled', code: 200 });
        });
    }
}
module.exports = new paymentController();
//# sourceMappingURL=paypal.controller.js.map