import { sequelize } from "../db/postgresDb";
import { Model, DataTypes} from 'sequelize'
import { Container } from 'typedi'
import { IUserBasketInfo, IUserBasketProductInfo } from "../interfaces/userBasket.interface";
export class UserBasketModel extends Model{
    public id: number;
    public ProductId: number;
    public UserId: number;
    public quantity: number;
    public rows:IUserBasketInfo[];
    public totalPrice?: number;
    public Product: IUserBasketProductInfo;
}


UserBasketModel.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 }
    
},{
    tableName: 'user_basket',
    sequelize
})

