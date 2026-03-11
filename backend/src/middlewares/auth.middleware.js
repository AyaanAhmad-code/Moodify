import jwt from "jsonwebtoken";
import redis from "../config/cache.js"; // The crucial .js extension!

export async function authUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }

    const isblacklisted = await redis.get(token);

    if (isblacklisted) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (error) {
        return res.status(401).json({
            message: "Invalid Token"
        });
    }

    next();
}