
import { IOrder } from '../interfaces/payment.interfaces'
import { Order } from '../models/order.model'

class OrderService{

    public async createOrder(order:IOrder):Promise<Order>{
        const newOrder = await Order.create(order)  
       
        return newOrder
    }

    public async getOrder(paymentId){
        return await Order.findOne({
            where:{
                paymentId
            }
        })   
    }

    public async updateOrder(data){
        const { PayerID ,paymentId } = data
        await Order.update({
            payerId: PayerID,
            status: 'Complete'
        },{
            where:{paymentId} 
        }
      )    
    }

    public async removeOrder(paymentId){
        return await Order.destroy({
            where:{
                paymentId
            }
        })   
    }


}

module.exports = new OrderService()