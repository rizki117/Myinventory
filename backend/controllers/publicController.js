









import User from "../models/userModel.js"
import Produk from "../models/produkModel.js"
import { Op } from "sequelize";

export const getPublicProduk = async (req, res) => {
  try {
    const produk = await Produk.findAll({
      attributes: ['uuid', 'name', 'price'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      order: [['createdAt', 'DESC']], // urutkan berdasarkan waktu dibuat, terbaru duluan
    });

    res.status(200).json(produk);
  } catch (error) {
    console.error("Gagal ambil data produk publik:", error.message);
    res.status(500).json({ msg: error.message });
  }
};

//get produk ById
export const getPublicProdukById = async (req, res) => {
  try {
    const produk = await Produk.findOne({
      where: { uuid: req.params.uuid },
      attributes: ['uuid', 'name', 'price'],
      include: [
        {
          model: User,
          attributes: ['name'], // hanya tampilkan nama pembuat
        },
      ],
    });

    if (!produk) {
      return res.status(404).json({ msg: "Produk tidak ditemukan" });
    }

    res.status(200).json(produk);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
