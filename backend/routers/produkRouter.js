








import express from "express"


import {getAllProduk, createProduk, getProdukById, updateProduk, deleteProduk} from "../controllers/produkController.js"

import {verifyToken} from "../middleware/AuthMiddleware.js"

const router= express.Router();

router.get('/produk', verifyToken ,getAllProduk);
router.post('/produk', verifyToken, createProduk);
router.get('/produk/:id', verifyToken, getProdukById);
router.patch('/produk/:id', verifyToken, updateProduk);
router.delete('/produk/:id', verifyToken, deleteProduk);

export default router;
