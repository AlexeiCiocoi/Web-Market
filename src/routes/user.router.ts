const userRouter = require('express')
const UserRouter = new userRouter()
const authorization = require('../../middleware/authorization')
const validateDto = require('../../middleware/validate-dto')
const UserController = require('../controllers/user.controller')
import { userSchema , userProfileSchema } from '../dto/user.dto'

UserRouter.post('/registration',validateDto(userSchema), UserController.register)
UserRouter.post('/login', UserController.login)
UserRouter.get('/auth', authorization, UserController.checkAuth)
UserRouter.put('/profile/edit',
    validateDto(userProfileSchema),
    authorization,
    UserController.addProfile)

module.exports = UserRouter