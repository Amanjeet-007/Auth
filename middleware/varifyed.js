import { varifyToken } from "../utils/jwt"
const varify = async (req,res,next) =>{
    const token = req.cookie.token 
    if(!token){
        return res.status(400).json({message:"not authenticated"})
    }
    try{
        const decode = varifyToken(token,process.env.JWT_SECRET_KEY)
        req.userId = decode.id
        next()
    }catch(err){
        console.log("Varification error :>",err)
        res.status(500).json({message:"Internal error"})
    }
}
// first export it if you want to use this
//we can use this as middleware for protected route like >    todoRoute('/gettodo',varify,getTodoController)