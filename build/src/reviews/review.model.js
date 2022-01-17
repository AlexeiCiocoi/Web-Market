"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReview = void 0;
const sequelize_1 = require("sequelize");
const postgresDb_1 = require("../db/postgresDb");
class ProductReview extends sequelize_1.Model {
}
exports.ProductReview = ProductReview;
ProductReview.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    message: { type: sequelize_1.DataTypes.STRING },
}, {
    tableName: 'reviews',
    sequelize: postgresDb_1.sequelize
});
//# sourceMappingURL=review.model.js.map