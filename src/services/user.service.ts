
import  * as constants from '../constants/user.constants'
const ApiError = require('../../error/apiError')
import { User ,UserProfile } from "../models/user.model";
import { IUserRegisterForm ,IUserInfo ,IUserOrder, IUserLoginRes  } from '../interfaces/user.interfaces'

export class UserService {
    
    public async register(user:IUserRegisterForm): Promise<IUserInfo>{
        const newUser: User = await User.create(user)
        const userProfile: UserProfile = await UserProfile.create({
            UserId: newUser.id,
        })
        return (({id,name,email,role}) => ({id,name,email,role}))(newUser)
    }

    public async login(email: string): Promise<User>{
        const userLogin =  await User.findOne({
            where:{
                email
            }
        })
        return userLogin
    }

    public async addProfileData(data: UserProfile): Promise<UserProfile>{
        const { UserId } = data
        const profile: UserProfile = await UserProfile.findOne({where:{UserId}});
        const updatedProfile: UserProfile = await profile.update(data)
        return updatedProfile
    }

    public async checkExistingUser(email: string): Promise<boolean>{
        const existingUser: User = await User.findOne({where:{email}})
        if(existingUser){
            return true
        }
        return false
    }


    
}


module.exports = new UserService()