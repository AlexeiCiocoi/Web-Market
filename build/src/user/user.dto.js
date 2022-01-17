"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDto = exports.userProfileSchema = exports.userSchema = void 0;
// const yup = require('yup')
const yup = require("yup");
exports.userSchema = yup.object({
    body: yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
        name: yup.string().required(),
    })
});
exports.userProfileSchema = yup.object({
    body: yup.object({
        lastName: yup.string(),
        phoneNumber: yup.string(),
        birthDate: yup.date(),
        gender: yup.string(),
        language: yup.string(),
    })
});
const orderProductDto = yup.object({
    name: yup.string().required(),
    price: yup.string().required(),
    quantity: yup.number().required(),
    productId: yup.number().required(),
});
exports.orderDto = yup.object({
    body: yup.object({
        description: yup.string().required(),
        products: yup.array(orderProductDto),
        currency: yup.string().required(),
    })
});
//# sourceMappingURL=user.dto.js.map