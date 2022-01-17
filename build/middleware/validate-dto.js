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
const ApiError = require('../error/apiError');
const dtoValidation = function (schema) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            const validation = yield schema.validate({
                body: req.body,
                params: req.params
            });
            req.body = validation.body;
            next();
        }
        catch (e) {
            console.log(e);
            return res.status(404).json({ status: 404, message: e.errors });
        }
    });
};
module.exports = dtoValidation;
//# sourceMappingURL=validate-dto.js.map