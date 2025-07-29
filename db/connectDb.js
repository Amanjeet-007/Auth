import mongoose from "mongoose";

const DatabaseName = "Auth"

const connectDb = async ()=>{
    try{    
        await mongoose.connect(`${process.env.MONGODB_KEY}/${DatabaseName}`)
        console.log(":Database is connected.👍")
    }catch(err){
        console.log("Database Connection error", err)
    }
} 

export default connectDb