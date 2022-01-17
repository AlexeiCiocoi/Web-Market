
import { NextFunction, Request, Response } from 'express'
import { User , UserProfile} from "../models/user.model";
import  * as constants from '../constants/user.constants'
import { IUserInfo, IUserLoginRes, UserCustomReq } from '../interfaces/user.interfaces'
const bcrypt = require('bcrypt')
import jwtHelper from '../helpers/jwt.helper';
const userService = require('../services/user.service')
const ApiError = require('../../error/apiError')


class UserController {

    async register( req: Request , res: Response, next: NextFunction){
        const { email , password , name } = req.body
        let newUser: IUserInfo;
        try{
            let checkUser: boolean = await userService.checkExistingUser(email)
            if(checkUser){
                return res.json(ApiError.badRequest(constants.EMAIL_IN_USE))
            }
            const hashPassword: string = await bcrypt.hash(password,5)
            newUser = await userService.register({
                email,
                password:hashPassword,
                name
            })
            const token: string = await jwtHelper(newUser)
            return res.json({token})
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async login( req: Request , res: Response, next: NextFunction){
        const { email , password} = req.body
        
        let user: IUserLoginRes = await userService.login(email)
       
        try{
            if(!user) res.json(ApiError.badRequest(constants.INCORRECT_EMAIL))
            const comparePassword: string = await bcrypt.compareSync(password ,user.password)
            if(!comparePassword) res.json(ApiError.badRequest(constants.INCORRECT_PASSWORD))
            const token: string = jwtHelper({
                name: user.name,
                role: user.role,
                id: user.id,
                email: user.email
            })
            return res.json({token})
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }

    async checkAuth( req: UserCustomReq , res: Response ){
        const { email } = req.user
        const user: IUserLoginRes = await userService.login(email)
        return res.json({token:req.token, user: user})
    }

    async addProfile( req: UserCustomReq , res: Response, next: NextFunction ){
        const { id } = req.user
        try{
            const profileData: UserProfile = await userService.addProfileData({...req.body, UserId: id})
            return res.json(profileData)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}


module.exports = new UserController()