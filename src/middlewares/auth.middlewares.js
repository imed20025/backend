import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import handleError from "./errors/handleError.js";

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;

const isAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return handleError(res, null, "Access denied, no token provided", 401) // Unauthorized
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return handleError(res, null, "Invalid or expired token", 401) // Unauthorized
    }
}

export default isAuth