"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const user_constants_1 = require("../src/user/user.constants");
const ApiError = require('../error/apiError');
const checkRole = (...roles) => {
    const allowRoles = new Set(roles);
    return (req, res, next) => {
        const token = req.cookies.access_token;
        const user = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        if (!permission(allowRoles, user.role.toUpperCase())) {
            next(ApiError.forbidden(user_constants_1.PERMISSION_DENIED));
        }
        next();
    };
};
const permission = (allowRoles, currentRole) => {
    return allowRoles.has(currentRole);
};
module.exports = checkRole;
//# sourceMappingURL=checkRole.js.map