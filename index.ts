
import 'reflect-metadata';
require('dotenv').config();
import { sequelize } from "./src/db/postgresDb";
const cookieParser = require("cookie-parser");
const express = require('express')
const routes = require('./src/routes/main.router')
const cors = require('cors')
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const path = require('path');
const errorHandler = require('./error/apiErrorHandler')
const PORT = process.env.SERVER_PORT

const app = express();


app.use(cors())
app.use(cookieParser())

app.use(express.json())
app.use(express.static(path.resolve(__dirname,'src','static')));

app.use(fileUpload());
app.use(bodyParser.json())
app.use('/api', routes)

app.use(errorHandler)

const start = async () => {
    try{
       
         await sequelize.authenticate()
         await sequelize.sync()

         app.listen(PORT,()=> console.log(`all good ${PORT}`))
        
    }catch(e) {
        console.log(e)
    }
}

start()
