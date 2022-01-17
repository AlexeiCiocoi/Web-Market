"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOrders = exports.UserProfileData = exports.User = void 0;
const postgresDb_1 = require("../db/postgresDb");
const sequelize_1 = require("sequelize");
const userBasket_model_1 = require("../basket/userBasket.model");
const review_model_1 = require("../reviews/review.model");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    img: { type: sequelize_1.DataTypes.STRING },
    role: { type: sequelize_1.DataTypes.STRING, allowNull: false, defaultValue: 'User' }
}, {
    tableName: 'users',
    sequelize: postgresDb_1.sequelize
});
class UserProfileData extends sequelize_1.Model {
}
exports.UserProfileData = UserProfileData;
UserProfileData.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    email: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    img: { type: sequelize_1.DataTypes.STRING },
    lastName: { type: sequelize_1.DataTypes.STRING },
    phoneNumber: { type: sequelize_1.DataTypes.STRING, unique: true },
    birthDate: { type: sequelize_1.DataTypes.DATEONLY },
    gender: { type: sequelize_1.DataTypes.STRING },
    language: { type: sequelize_1.DataTypes.STRING, defaultValue: 'RU' },
}, {
    tableName: 'user_profile',
    sequelize: postgresDb_1.sequelize
});
class UserOrders extends sequelize_1.Model {
}
exports.UserOrders = UserOrders;
UserOrders.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    UserId: { type: sequelize_1.DataTypes.INTEGER },
    orders: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON), allowNull: false, defaultValue: [] },
}, {
    tableName: 'user_orders',
    sequelize: postgresDb_1.sequelize
});
User.hasOne(UserOrders);
UserOrders.belongsTo(User);
User.hasOne(UserProfileData);
UserProfileData.belongsTo(User);
User.hasOne(userBasket_model_1.UserBasket);
userBasket_model_1.UserBasket.belongsTo(User);
User.hasMany(review_model_1.ProductReview);
review_model_1.ProductReview.belongsTo(User);
// module.exports = new User
//# sourceMappingURL=user.model.js.map