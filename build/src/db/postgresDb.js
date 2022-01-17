"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
require('dotenv').config();
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(process.env.SQL_DB_NAME, process.env.SQL_DB_USER, process.env.SQL_DB_PASSWORD, {
    dialect: 'postgres',
    host: '127.0.0.1',
    port: Number(process.env.SQL_DB_PORT)
});
//# sourceMappingURL=postgresDb.js.map