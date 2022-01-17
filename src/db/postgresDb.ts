require('dotenv').config();
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
   
    process.env.SQL_DB_NAME,
    process.env.SQL_DB_USER,
    process.env.SQL_DB_PASSWORD,
    {
        dialect: 'postgres',
        host: '127.0.0.1',
        port: Number( process.env.SQL_DB_PORT)
    }
    
)
