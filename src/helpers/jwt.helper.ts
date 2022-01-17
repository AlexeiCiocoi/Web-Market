const jwt = require('jsonwebtoken')

export default (data:any): string  => {
    return jwt.sign(data,process.env.TOKEN_SECRET_KEY,{expiresIn: '24h'})
}