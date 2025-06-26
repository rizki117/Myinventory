








import express from "express";

import {getPublicProduk, getPublicProdukById} from "../controllers/publicController.js";

const router= express.Router();

router.get('/public', getPublicProduk);

router.get('/public/:id', getPublicProdukById);

export default router;