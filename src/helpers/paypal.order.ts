import { IProductInfo,IProductOrder,IOrder, IOrderObj, IOrderUrl} from '../interfaces/payment.interfaces'
import { paypalUrls } from '../configs/paypal.config'
import { UserBasketModel } from '../models/userBasket.model';

export class OrderHelper {

    public products: UserBasketModel[];
    public currency: string;
    public description: string;
    public productId: number;
    public totalPrice: any;
    public items:IProductInfo[];
    public routes: IOrderUrl;

    constructor(products: UserBasketModel[],routes){
        this.description = '';
        this.currency = 'USD'
        this.products = products;
        this.totalPrice = 0;
        this.items = [];
        this.routes = routes
    }
    createPaymentJson(){
        this.createProductList()
        const { success_url , cancel_url} = this.routes
        return {
                "intent": "sale",
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": success_url,
                    "cancel_url": "http://localhost:5000/api/payment/cancel"
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

    createProductList(): void{
        const itemsList: IProductInfo[] = [];
        this.calcPrice(this.products)
        let newPrice;
        for(let item of this.products){
            
            newPrice = item.Product.price.toString()
           
            itemsList.push(
                 {
                    "name": item.Product.name,
                    "sku": "001",
                     "price": newPrice,
                    "currency": this.currency,
                    "quantity": item.quantity
                 }
            )      
        }
        this.items = itemsList
    }

    createSoldProductObj(){
        const productInfo = []
        this.products.forEach(item => {
            productInfo.push({
                ProductId: item.ProductId,
                quantity: item.quantity,
            })
        });
        return productInfo
    }

    calcPrice(products): void{
        for(let item of products){
            this.totalPrice += item.Product.price * item.quantity
        }
        this.totalPrice = this.totalPrice.toString()
      
    }

}
