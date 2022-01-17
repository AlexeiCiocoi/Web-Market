const jwt = require('jsonwebtoken')
import { Request, Response } from "express"
import { PERMISSION_DENIED } from "../src/constants/user.constants"
import { IUserInfo, UserCustomReq } from "../src/interfaces/user.interfaces"
const ApiError = require('../error/apiError')
const checkRole = (...roles) =>{
    const allowRoles = new Set(roles)
    return (req: UserCustomReq,res: Response,next: Function)=>{
        const user: IUserInfo = req.user
        if(!permission(allowRoles,user.role.toUpperCase())){
             next(ApiError.forbidden(PERMISSION_DENIED))
        }
        next()
    }
}

const permission = (allowRoles,currentRole) => {
    
    return allowRoles.has(currentRole)
 }

 module.exports = checkRole