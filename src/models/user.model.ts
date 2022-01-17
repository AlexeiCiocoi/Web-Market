import { sequelize } from "../db/postgresDb";
import { Model, Optional, DataTypes} from 'sequelize'
import { UserBasketModel } from "./userBasket.model";
import { ProductReview } from "./review.model";
import { Order } from "./order.model";
import { UserAttributes } from "../interfaces/user.interfaces";




interface UserCreationAttr extends Optional<UserAttributes , 'id' |'role'>{}

export class User extends Model<UserAttributes,UserCreationAttr>
    implements UserAttributes {

    declare id: number;
    declare email: string;
    declare name: string;
    declare password: string;
    declare role: string;

    declare readonly updatedAt: Date;
    declare readonly createdAt: Date;
}

User.init({
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING,allowNull: false},
    role: {type: DataTypes.STRING,allowNull: false,defaultValue: 'User'}
},{
    tableName: 'users',
    sequelize
})




export class UserProfile extends Model{
    public id: number;
    public lastName?: string;
    public phoneNumber?: string;
    public birthDate?: Date;
    public gender?: string;
    public language?: string;
    public UserId: number;
    public img?: any;

}

UserProfile.init({
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: { type: DataTypes.STRING },
    lastName: {type: DataTypes.STRING},
    phoneNumber: {type: DataTypes.STRING, unique: true},
    birthDate: {type: DataTypes.DATEONLY},
    gender: {type: DataTypes.STRING},
    language: {type: DataTypes.STRING,defaultValue: 'RU'},
    
},{
    tableName: 'user_profile',
    sequelize
})

User.hasMany(UserProfile,{as: 'profile'})
UserProfile.belongsTo(User)

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(UserBasketModel)
UserBasketModel.belongsTo(User)

User.hasMany(ProductReview)
ProductReview.belongsTo(User)

// module.exports = new User