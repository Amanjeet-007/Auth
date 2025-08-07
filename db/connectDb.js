import mongoose from "mongoose";

const DatabaseName = "Auth" //change the name as your data base name in local env & if you have cloud url so remove this

const connectDb = async ()=>{
    try{    
        await mongoose.connect(`${process.env.MONGODB_KEY}/${DatabaseName}`) // mongodb url 
        console.log(":Database is connected.👍")
    }catch(err){
        console.log("Database Connection error", err)
    }
} 

export default connectDb
