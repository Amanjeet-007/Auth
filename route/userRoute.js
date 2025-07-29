import express from 'express'
import { register , login , logout } from '../controller/userController.js'

const userRoute = express.Router()

userRoute.post('/register',register)
userRoute.post('/login',login)
userRoute.post('/logout',logout)

export default userRoute