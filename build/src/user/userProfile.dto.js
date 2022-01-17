"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const userProfileSchema = yup.object({
    body: yup.object({
        lastName: yup.string(),
        phoneNumber: yup.string(),
        birthDate: yup.date(),
        gender: yup.string(),
        language: yup.string(),
    })
});
module.exports = userProfileSchema;
//# sourceMappingURL=userProfile.dto.js.map