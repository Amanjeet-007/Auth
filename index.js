import dotenv from 'dotenv'
import app from './app.js'
import connectDb from './db/connectDb.js'

dotenv.config({path:'./.env'})

async function startServer(){
    try{
        await connectDb()
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    }catch(err){
        console.log("Server starting error",err)
    }
}

startServer()





