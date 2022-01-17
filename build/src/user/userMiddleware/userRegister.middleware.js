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
const ApiError = require('../../../error/apiError');
const bcrypt = require('bcrypt');
const constants = require("../user.constants");
const user_model_1 = require("../user.model");
const fileHelper_1 = require("../../helpers/fileHelper");
const userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    let userImgPath;
    const checkExistingEmail = yield user_model_1.User.findOne({ where: { email } });
    if (checkExistingEmail) {
        next(ApiError.badRequest(constants.EMAIL_IN_USE));
    }
    if (req.files) {
        const { img } = req.files;
        userImgPath = fileHelper_1.default.storeImgToStatic(img);
    }
    const hashPassword = yield bcrypt.hash(password, 5);
    req.user = { password: hashPassword, name, email, img: userImgPath };
    next();
});
exports.default = userRegister;
//# sourceMappingURL=userRegister.middleware.js.map