"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const paypal_config_1 = require("./paypal.config");
class Order {
    constructor(order) {
        this.description = order.description;
        this.currency = order.currency;
        this.products = order.products;
        this.totalPrice = 0;
        this.items = [];
    }
    createOrder() {
        this.createProductList();
        return {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": paypal_config_1.paypalUrls.return,
                "cancel_url": paypal_config_1.paypalUrls.cancel
            },
            "transactions": [{
                    "item_list": {
                        "items": this.items
                    },
                    "amount": {
                        "currency": this.currency,
                        "total": this.totalPrice
                    },
                    "description": this.description
                }]
        };
    }
    createProductList() {
        const itemsList = [];
        this.calcPrice(this.products);
        let newPrice;
        for (let product of this.products) {
            newPrice = parseInt(product.price).toFixed(2).toString();
            itemsList.push({
                "name": product.name,
                "sku": "001",
                "price": newPrice,
                "currency": this.currency,
                "quantity": product.quantity
            });
        }
        this.items = itemsList;
    }
    calcPrice(products) {
        for (let product of products) {
            this.totalPrice += parseInt(product.price) * product.quantity;
        }
        this.totalPrice = this.totalPrice.toFixed(2);
    }
}
exports.Order = Order;
//# sourceMappingURL=paypal.order.js.map