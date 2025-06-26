





import express from "express";

import {Login, getMe, RefreshToken ,Logout} from "../controllers/authController.js";

import {verifyToken} from "../middleware/AuthMiddleware.js"

const router= express.Router();
router.post('/login', Login);

router.get('/token', RefreshToken);

router.get('/me', verifyToken, getMe);

router.delete('/logout', verifyToken, Logout);

export default router;


