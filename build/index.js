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
require('dotenv').config();
const postgresDb_1 = require("./src/db/postgresDb");
const cookieParser = require("cookie-parser");
const express = require('express');
const routes = require('./src/routes/mainRouter');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const path = require('path');
const errorHandler = require('./error/apiErrorHandler');
const PORT = process.env.SERVER_PORT;
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'src', 'static')));
app.use(fileUpload());
app.use(bodyParser.json());
app.use('/api', routes);
app.use(errorHandler);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield postgresDb_1.sequelize.authenticate();
        yield postgresDb_1.sequelize.sync();
        app.listen(PORT, () => console.log(`all good ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
});
start();
//# sourceMappingURL=index.js.map