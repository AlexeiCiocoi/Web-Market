"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const reviewSchema = yup.object({
    body: yup.object({
        message: yup.string().required(),
        ProductId: yup.number().required(),
    }),
});
module.exports = reviewSchema;
//# sourceMappingURL=review.dto.js.map