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
const fileHelper_1 = require("../helpers/fileHelper");
const product_model_1 = require("./product.model");
const ApiError = require('../../error/apiError');
const ProductService = require('./product.service');
class ProductController {
    addProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Product controler');
            const { img } = req.files;
            try {
                let { name, price, TypeId, BrandId, info, description } = req.body;
                const imgFileName = fileHelper_1.default.storeImgToStatic(img);
                const product = yield product_model_1.Product.create({
                    name,
                    price,
                    TypeId,
                    BrandId,
                    description,
                    img: imgFileName
                });
                if (info) {
                    this.addProductInfo(info, product.id);
                }
                return res.json(product);
            }
            catch (e) {
                next(ApiError.badRequest(e.message));
            }
        });
    }
    addProductInfo(infos, ProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            infos.forEach(i => {
                product_model_1.ProductInfo.create({
                    title: i.title,
                    description: i.description,
                    ProductId,
                });
            });
        });
    }
    getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Product controler');
            const products = yield ProductService.getAllProducts(req.query);
            return res.json(products);
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Product controler');
            const product = yield ProductService.getProductById(req.params.id);
            return res.json(product);
        });
    }
    getAllBrands(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Product controler');
            const brands = yield ProductService.getAllBrands();
            return res.json(brands);
        });
    }
    getAllTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Product controler');
            const type = yield ProductService.getAllTypes();
            return res.json(type);
        });
    }
    addBrand(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Product controler');
            const brand = yield ProductService.addBrand(req.body);
            return res.json(brand);
        });
    }
    addType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Product controler');
            const type = yield ProductService.addType(req.body);
            return res.json(type);
        });
    }
}
module.exports = new ProductController();
//# sourceMappingURL=product.controller.js.map