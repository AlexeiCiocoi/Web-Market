"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userRouter = require('express');
const UserRouter = new userRouter();
const authorization = require('../../middleware/authorization');
const validateDto = require('../../middleware/validate-dto');
const UserController = require('./user.controller');
const user_dto_1 = require("./user.dto");
const userRegister_middleware_1 = require("./userMiddleware/userRegister.middleware");
UserRouter.post('/registration', validateDto(user_dto_1.userSchema), userRegister_middleware_1.default, UserController.register);
UserRouter.post('/login', UserController.login);
UserRouter.get('/logout', authorization, UserController.logout);
UserRouter.put('/profile/edit', validateDto(user_dto_1.userProfileSchema), authorization, UserController.addProfile);
module.exports = UserRouter;
//# sourceMappingURL=user.router.js.map