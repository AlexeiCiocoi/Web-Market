const ApiError = require('./apiError')
import { Request, Response } from 'express'
module.exports = function(err,req: Request,res: Response,next: Function){
    
    if(err instanceof ApiError){
      
       return res.status(err.status).json(err.message)

    }

    return res.status(500).json(err.message)


}