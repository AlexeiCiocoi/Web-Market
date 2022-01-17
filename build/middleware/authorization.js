"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError = require('../error/apiError');
const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.json(ApiError.badRequest('Authorization failure'));
    }
    try {
        const userInfo = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = userInfo;
        console.log('Authorized', req.body);
        next();
    }
    catch (e) {
        return res.json(ApiError.badRequest(e));
    }
};
//# sourceMappingURL=authorization.js.map