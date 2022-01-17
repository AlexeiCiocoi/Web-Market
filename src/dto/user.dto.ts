// const yup = require('yup')
import  * as yup  from 'yup'


export const userSchema = yup.object({
    body: yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
        name: yup.string().required(),
    })
   

})
export const userProfileSchema = yup.object({
    body: yup.object({
      
        lastName: yup.string(),
        phoneNumber: yup.string(),
        birthDate: yup.date(),
        gender: yup.string(),
        language:  yup.string(),
    })
  
  
})

const orderProductDto = yup.object({
    name: yup.string().required(),
    price: yup.string().required(),
    quantity: yup.number().required(),
    productId: yup.number().required(),
})

export const orderDto = yup.object({
    body: yup.object({
        description: yup.string().required(),
        products: yup.array(orderProductDto),
        currency: yup.string().required(),
       
    })
})




