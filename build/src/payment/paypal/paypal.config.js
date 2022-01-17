"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paypalUrls = exports.paypalConfig = void 0;
exports.paypalConfig = {
    'mode': `${process.env.PAYPAL_MODE}`,
    'client_id': `${process.env.PAYPAL_CLIENT_ID}`,
    'client_secret': `${process.env.PAYPAL_CLIENT_SECRETKEY}`
};
exports.paypalUrls = {
    return: "http://localhost:5000/api/payment/success",
    cancel: "http://localhost:5000/api/payment/cancel"
};
//# sourceMappingURL=paypal.config.js.map