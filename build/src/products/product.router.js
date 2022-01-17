"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductRouter = require('express');
const productRouter = new ProductRouter();
const user_constants_1 = require("../user/user.constants");
const checkRole = require('../../middleware//checkRole');
const ProductController = require('./product.controller');
const validateProductDto = require('../../middleware/validate-dto');
const checkAuth = require('../../middleware/authorization');
const product_dto_1 = require("./product.dto");
productRouter.post('/add', checkAuth, checkRole(user_constants_1.userRoles.ADMIN), validateProductDto(product_dto_1.productDto), ProductController.addProduct);
productRouter.get('/all', ProductController.getAllProducts);
productRouter.get('/productId/:id', ProductController.getProductById);
productRouter.get('/brands', ProductController.getAllBrands);
productRouter.get('/types', ProductController.getAllTypes);
productRouter.post('/brand', checkAuth, checkRole(user_constants_1.userRoles.ADMIN, user_constants_1.userRoles.PRODUCT_MANAGER), validateProductDto(product_dto_1.brandDto), ProductController.addBrand);
productRouter.post('/type', checkAuth, checkRole(user_constants_1.userRoles.ADMIN, user_constants_1.userRoles.PRODUCT_MANAGER), validateProductDto(product_dto_1.typeDto), ProductController.addType);
module.exports = productRouter;
//# sourceMappingURL=product.router.js.map