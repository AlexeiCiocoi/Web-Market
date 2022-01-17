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
const ApiError = require('../../error/apiError');
const userBasket_model_1 = require("../basket/userBasket.model");
const user_model_1 = require("./user.model");
class UserService {
    register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = yield user_model_1.User.create(user);
            const userProfile = yield user_model_1.UserProfileData.create({
                userId: newUser.id,
                email: user.email,
                name: user.name
            });
            const userBasket = yield userBasket_model_1.UserBasket.create({ UserId: newUser.id });
            const userOrders = yield user_model_1.UserOrders.create({ UserId: newUser.id });
            return (({ id, name, email, role }) => ({ id, name, email, role }))(newUser);
        });
    }
    login(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.User.findOne({ where: { email } });
        });
    }
    addProfileData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield user_model_1.UserProfileData.findOne({ where: { userId: data.UserId } });
            const updatedProfile = yield profile.update(data);
            return updatedProfile;
        });
    }
    // under construction)
    addOrder(UserId, order) {
        return __awaiter(this, void 0, void 0, function* () {
            let orders = [];
            let userOrders = yield user_model_1.UserOrders.findOne({ where: { UserId } });
            userOrders.orders.push(order);
            yield user_model_1.UserOrders.update({
                orders: userOrders.orders
            }, {
                where: {
                    UserId
                }
            });
        });
    }
}
module.exports = new UserService();
//# sourceMappingURL=user.service.js.map