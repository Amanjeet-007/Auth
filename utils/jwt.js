import jwt from 'jsonwebtoken'

const generateToken = async (userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET_KEY,{expiresIn:"7d"})
}
const varifyToken = async (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET_KEY)
}
export {generateToken , varifyToken}