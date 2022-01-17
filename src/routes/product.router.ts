const ProductRouter = require('express')
const productRouter = new ProductRouter()
import { userRoles } from '../constants/user.constants'
const checkRole = require('../../middleware//checkRole')
const ProductController = require('../controllers/product.controller')
const validateProductDto = require('../../middleware/validate-dto')
const checkAuth = require('../../middleware/authorization')
import {brandDto, typeDto, productDto} from '../dto/product.dto'


productRouter.post('/add',checkAuth,
    checkRole(userRoles.ADMIN),
    validateProductDto(productDto),
    ProductController.addProduct)
productRouter.get('/all',
    ProductController.getAllProducts)
productRouter.get('/productId/:id',
    ProductController.getProductById)
productRouter.get('/brands',
    ProductController.getAllBrands)
productRouter.get('/types',
    ProductController.getAllTypes)
productRouter.post('/brand',checkAuth,
    checkRole(userRoles.ADMIN,
    userRoles.PRODUCT_MANAGER),
    validateProductDto(brandDto),
    ProductController.addBrand)
productRouter.post('/type',checkAuth,
    checkRole(userRoles.ADMIN,
    userRoles.PRODUCT_MANAGER),
    validateProductDto(typeDto),
    ProductController.addType)

module.exports = productRouter 