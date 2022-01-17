
import  * as yup  from 'yup'


const reviewSchema = yup.object({
    body: yup.object({
        message: yup.string().required(),
        ProductId: yup.number().required(),
       
    }),
    
    
    
    
}
)

module.exports = reviewSchema