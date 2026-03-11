const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function registerUser(req,res){
    const {username,email,password} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"user already exists with this following username and email"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        email,
        username,
        password:hash
    })

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    return res.status(201).json({
        message:"User registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

async function loginUser(req,res){
    const {email,username,password} = req.body

    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }

    const isPasswordMatch = await bcrypt.compare(password,user.password)

    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }

    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    return res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

async function getMeUser(req,res){
    const user = await userModel.findById(req.user.id)

    return res.status(200).json({
        message:"User fetched Successfully",
        user
    })
}

async function logoutUser(req,res){

    const token = req.cookies.token

    res.clearCookie("token")

    await redis.set(token,Date.now().toString(),"EX",60*60*24)

    return res.status(200).json({
        message:"User logout successfully"
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMeUser,
    logoutUser
}