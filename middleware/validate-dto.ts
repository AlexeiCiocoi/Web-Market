import { Request, Response } from "express"
const dtoValidation = function(schema){
        return async (req: Request,res: Response,next: Function) =>{
            try{   
                const validation = await schema.validate({
                    body: req.body,
                    params: req.params
                })
                req.body = validation.body
                next()
            }catch(e){
                console.log(e)
                return res.status(404).json({status: 404 , message: e.errors})
            }
        }
        
} 

module.exports = dtoValidation  