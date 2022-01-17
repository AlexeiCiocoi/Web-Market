export interface IOrder{
     id: number;
     status: string;
     totalPrice: string;
     currency:  string;
     paymentId: string;
     payerId?: string;
}
export interface IProductInfo{
    name: string;
    sku: string;
    price: string;
    currency: string;
    quantity: number;
}
export interface IProductOrder{
    name: string;
    price: string;
    quantity: number;
    productId: number;
}
export interface IExecutePayment{
    currency: string;
    amount: string;
}
export interface IOrderUrl{
    success_url: string;
    cancel_url: string;
}

export interface IOrderObj{

     UserId: number;
     ProductId: number;
     quantity: number;
}