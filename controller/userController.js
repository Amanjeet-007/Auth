import {User} from '../model/user.js'
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/jwt.js";


function check(str){
    if(!str){
        console.log(`please fill ${str}. it's required while creating account`)
        return res.status(400).json({message:`Please fill ${str}`})
    }else{
        return str
    }
}

const register = async (req,res)=>{
    //get data from frontend by request
    const {name,email,password}  = req.body
    check(name)
    check(email)
    check(password)
    try{
        //check Is User is already resisterd.
        const isEmailExists = await User.findOne({email});
        if(isEmailExists){
           return res.status(401).json({message:`Your email is already exist : ${email}`, now: "please try login" })
        }
        //encypt the password
       const encPass = await bcrypt.hash(password,10);
        // Create new User and save in DB
        const newUser = new User({name,email,password:encPass})
        await newUser.save()

        //resister token
        const token = generateToken(newUser._id)

        return res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            maxAge:7*24*60*60*1000,
            sameSite:'strict'
        }).status(201).json({message:"Signup successful",user:{name:newUser.name,email:newUser.email}})
    }catch(err){
        console.log("While creating New User :",err)
        res.status(500).json({message:"getting some error while creating User.",now:"Please try sometime later."})
    }

}
const login = async (req,res)=>{
    //getting data from frontend
    const {email,password} = req.body
    check(email) //check is users sending email
    check(password) //check is user sending password
    try{
        // search for user
        const isUserExist = await User.findOne({email});
        if(!isUserExist){
            return res.status(400).json({message:"User is not registred.",now:"try to signup"}) //if user not Found
        }
        const isPassSame = await bcrypt.compare(password,isUserExist.password) //compare password
        if(!isPassSame){
            return res.status(400).json({message:"Password is Incorrect",now:"try to forget password."}) //if password not match
        }

        // if email and password is correct then create token and send it to frontend
        const token = generateToken(isUserExist._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            // sameSite: 'strict'
        })
        return res.status(200).json({message:"Login successful",user:{name:isUserExist.name,email:isUserExist.email}})
    }catch(err){
        console.log("getting error while login",err)
        return res.status(500).json({message:"error accured"})
    }
}
const logout = async (req,res)=>{
    try{
        res.clearCookie('token')
        return res.status(200).json({message:"Logout successful"})
    }catch(err){
        console.log("Error while logout :>",err)
    }
}

export {register,login,logout}