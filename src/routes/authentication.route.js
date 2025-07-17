import express from "express";
import authenticationController from "../controllers/authentication.controller.js";

const router = express.Router();

router.post('/signup', authenticationController.singUp)
router.post('/login', authenticationController.login)

export default router