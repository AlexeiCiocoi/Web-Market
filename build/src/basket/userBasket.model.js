"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBasket = void 0;
const postgresDb_1 = require("../db/postgresDb");
const sequelize_1 = require("sequelize");
class UserBasket extends sequelize_1.Model {
}
exports.UserBasket = UserBasket;
UserBasket.init({
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    products: { type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.JSON), allowNull: false, defaultValue: [] },
}, {
    tableName: 'user_basket',
    sequelize: postgresDb_1.sequelize
});
//# sourceMappingURL=userBasket.model.js.map