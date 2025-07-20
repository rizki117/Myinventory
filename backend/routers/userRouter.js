









import express from "express";
import {getAllUser, createUser, getUserById,deleteUser, updateUser} from "../controllers/userController.js";


import {verifyToken, isAdmin} from "../middleware/AuthMiddleware.js";


const router= express.Router();

router.get('/user', verifyToken, isAdmin, getAllUser);

router.post('/user', createUser);

router.get('/user/:id', verifyToken, isAdmin, getUserById);

router.delete('/user/:id', verifyToken, isAdmin, deleteUser);

router.patch('/user/:id', verifyToken, isAdmin, updateUser);

export default router;


