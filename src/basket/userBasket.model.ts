// import { sequelize } from "../db/postgresDb";
// import { Model, DataTypes} from 'sequelize'

// export class UserBasket extends Model{
//     public id: number;
//     public products:number[];
//     public UserId: number;
// }


// UserBasket.init({
//     id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     products: {type:DataTypes.ARRAY(DataTypes.JSON),allowNull: false,defaultValue: []},
  
// },{
//     tableName: 'user_basket',
//     sequelize
// })