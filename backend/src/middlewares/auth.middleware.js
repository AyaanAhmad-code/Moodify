const jwt = require("jsonwebtoken")
const redis = require("../config/cache")

async function authUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

    const isblacklisted = await redis.get(token)

    if(isblacklisted){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

    try {
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
    } catch (error) {
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

    next();
}

module.exports = {authUser}