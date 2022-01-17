import { Model ,DataTypes } from "sequelize";
import { sequelize } from '../db/postgresDb'


export class Order extends Model{
    public id: number;
    public status: string;
    public totalPrice: string;
    public currency:  string;
    public paymentId: string;
    public payerId?: string;
    public method: string;
    public UserId: string
}


Order.init({
    id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    paymentId:{type:DataTypes.STRING,allowNull: false},
    currency:{type:DataTypes.STRING,allowNull: false},
    payerId: { type:DataTypes.STRING },
    status: { type:DataTypes.STRING,allowNull: false},
    method: {type: DataTypes.STRING,allowNull: false},
    totalPrice: {type: DataTypes.STRING,allowNull: false}
   
},{
    tableName:'user_orders',
    sequelize
}
)