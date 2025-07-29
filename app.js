import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRoute from './route/userRoute.js'


const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
//routes 
app.use('/api/user',userRoute)

export default app