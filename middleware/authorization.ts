import { Request ,Response } from 'express'
import { IUserInfo, UserCustomReq } from '../src/interfaces/user.interfaces'


const ApiError = require('../error/apiError')
const jwt = require('jsonwebtoken')


module.exports = function( req: UserCustomReq, res: Response , next: Function){
    
    const token = req.headers.authorization.split(' ')[1]
   
    if(!token) {
      
        return  res.json(ApiError.badRequest('Authorization failure'))
        
    }
    try{
        const userInfo: IUserInfo = jwt.verify(token,process.env.TOKEN_SECRET_KEY)
        req.user = userInfo
        req.token = token
        next()
    }catch(e){
       
        return res.json(ApiError.badRequest(e))
    }

}