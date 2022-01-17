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
const constants = require("./user.constants");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('./user.service');
const ApiError = require('../../error/apiError');
class UserController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let newUser;
            try {
                newUser = yield userService.register(req.user);
            }
            catch (e) {
                next(ApiError.badRequest(e.message));
            }
            const token = yield jwt.sign(newUser, process.env.TOKEN_SECRET_KEY, { expiresIn: '24h' });
            return res.json({ token });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log('Errors ', email, password);
            const user = yield userService.login(email);
            if (!user)
                res.json(ApiError.badRequest(constants.INCORRECT_EMAIL));
            const comparePassword = yield bcrypt.compareSync(password, user.password);
            if (!comparePassword)
                res.json(ApiError.badRequest(constants.INCORRECT_PASSWORD));
            const { id, name, role, img } = user;
            const userInfo = { id, role, img, name, email };
            const token = yield jwt.sign(userInfo, process.env.TOKEN_SECRET_KEY, { expiresIn: '24h' });
            return res.json({ token });
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    addProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let profileData;
            try {
                profileData = yield userService.addProfileData(req.body);
                return res.json(profileData);
            }
            catch (e) {
                next(ApiError.badRequest(e.message));
            }
        });
    }
}
module.exports = new UserController;
//# sourceMappingURL=user.controller.js.map