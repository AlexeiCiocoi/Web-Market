"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError = require('./apiError');
module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json(err.message);
    }
    return res.status(500).json(err.message);
};
//# sourceMappingURL=apiErrorHandler.js.map