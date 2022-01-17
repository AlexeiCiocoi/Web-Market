import { Request, Response } from "express";
import { paypalConfig } from '../configs/paypal.config'
const paypal = require('paypal-rest-sdk');
const ApiError = require('../../error/apiError')
const orderService = require('../services/order.service')
import { OrderHelper } from '../helpers/paypal.order'
import { UserCustomReq } from '../interfaces/user.interfaces'
import BasketService from "../services/userBasket.service";
import { IUserBasketResponse } from "../interfaces/userBasket.interface";

import productService from "../services/product.service";

const jwt = require('jsonwebtoken') 
paypal.configure(paypalConfig);

class paymentController {
  
async createPayment(req: UserCustomReq,res: Response,next: Function){
    const { id } = req.user
    let userOrder: IUserBasketResponse ;
    
    try{
      userOrder = await BasketService.getAllProducts(id)
      const orderHelper: OrderHelper = new OrderHelper(userOrder.rows,req.body)
      
      const create_payment_json = await orderHelper.createPaymentJson()
      
      await paypal.payment.create(create_payment_json, async (error, payment) => {
        if (error) {
          console.log('error.response.details',error.response.details)
            return next(ApiError.badRequest(error.response.details))
        }
     
        const createOrder = await orderService.createOrder({
          status: payment.state,
          totalPrice: orderHelper.totalPrice,
          currency: orderHelper.currency,
          paymentId: payment.id,
          method: 'payPal',
          UserId: id
        })
        
        const soldProducts = orderHelper.createSoldProductObj()

        productService.createSoldProduct({
          soldProducts,
          OrderId: createOrder.id
        })
        
       
        for(let i = 0;i < payment.links.length;i++){
               if(payment.links[i].rel === 'approval_url'){
                res.send(payment.links[i].href)
              }
          }
      })
    }catch(e){
      return next(ApiError.badRequest(e.message))
    }
    
      
 }
    async executePayment(req: Request,res: Response){
        const { PayerID , paymentId } = req.body
        try{
          const order = await orderService.getOrder(paymentId)
        const execute_payment_json = {
          "payer_id": PayerID,
          "transactions": [{
              "amount": {
                  "currency": order.currency,
                  "total": order.totalPrice
              }
          }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
          if (error) {
              console.log("ERROR",error.response);
              orderService.removeOrder(paymentId)
              throw error;
          } else {
              
              orderService.updateOrder({PayerID,paymentId})
              BasketService.clearUserBasket(order.UserId)

              res.json(order)
          }
        });

        }catch(e){
          return res.json(ApiError.badRequest(e.message))
        }
    } 

    async cancelPayment(req: Request,res: Response){
      res.status(200).json({message: 'Payment successfully canceled',code: 200})
    }

}


module.exports = new paymentController()


