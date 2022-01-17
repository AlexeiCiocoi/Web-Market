"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductInfo = exports.Product = exports.Type = exports.Brand = void 0;
const sequelize_1 = require("sequelize");
const postgresDb_1 = require("../db/postgresDb");
const review_model_1 = require("../reviews/review.model");
class Brand extends sequelize_1.Model {
}
exports.Brand = Brand;
class Type extends sequelize_1.Model {
}
exports.Type = Type;
class Product extends sequelize_1.Model {
}
exports.Product = Product;
class ProductInfo extends sequelize_1.Model {
}
exports.ProductInfo = ProductInfo;
ProductInfo.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: sequelize_1.DataTypes.STRING },
    description: { type: sequelize_1.DataTypes.STRING }
}, {
    tableName: 'product_info',
    sequelize: postgresDb_1.sequelize
});
Product.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, },
    price: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    discount: { type: sequelize_1.DataTypes.INTEGER },
    img: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: true },
    rating: { type: sequelize_1.DataTypes.STRING, },
}, {
    tableName: 'products',
    sequelize: postgresDb_1.sequelize
});
Brand.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, },
}, {
    tableName: 'brands',
    sequelize: postgresDb_1.sequelize
});
Type.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, },
}, {
    tableName: 'types',
    sequelize: postgresDb_1.sequelize
});
Brand.hasMany(Product);
Product.belongsTo(Brand);
Type.hasMany(Product);
Product.belongsTo(Type);
Product.hasMany(ProductInfo, { as: 'info' });
ProductInfo.belongsTo(Product);
Product.hasMany(review_model_1.ProductReview, { as: 'reviews' });
review_model_1.ProductReview.belongsTo(Product);
//# sourceMappingURL=product.model.js.map