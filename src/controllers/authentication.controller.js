// import User from '../models/user.model.js';
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import handleError from '../middlewares/errors/handleError.js';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;


const singUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return handleError(res, null, 'Email already exists', 409);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword,   isAdmin: isAdmin || false,});
        await user.save()


        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, SECRET_KEY, { expiresIn: '1d' });
        return res.status(201).json({
        user,
        token,
         })

        // const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1d' })
        // return res.status(201).json({
        //     user,
        //     token
        // })

    } catch (error) {
        handleError(res, error, 'Error in SingUp', 500)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return handleError(res, null, 'Invalid Email or Password', 400)
        }
        const isMatched = await bcrypt.compare(password, existingUser.password)

        if (!isMatched) {
            return handleError(res, null, 'Invalid Email or Password', 400)
        }


         const token = jwt.sign({ id: existingUser._id, isAdmin: existingUser.isAdmin }, SECRET_KEY, { expiresIn: '1d' });
        return res.status(200).json({
            existingUser,
            token
        });

        // const token = jwt.sign({userId: existingUser._id}, SECRET_KEY, {expiresIn: '1d'})
        // return res.status(200).json({
        //     existingUser,
        //     token
        // })

    } catch (error) {
        handleError(res, error, 'Error in Login', 500)
    }
}


const authenticationController = {
    singUp,
    login
}

export default authenticationController