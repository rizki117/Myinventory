
import User from "../models/userModel.js"
import Produk from "../models/produkModel.js"
import {Sequelize, Op } from "sequelize";


// Ambil semua data produk

export const getAllProduk = async (req, res) => {
  try {
    const {
      namaBarang = "",
      namaPembuat = "",
      search = "",
      limit = 10,
      offset = 0,
      tanggal,
      bulan,
      tahun,
      startDate,
      endDate
    } = req.query;

    const isAdmin = req.user.role === 'admin';

    let whereConditions = {};
    let includeOptions = [];

    // Admin
    if (isAdmin) {
      if (namaBarang) {
        whereConditions.name = {
          [Op.like]: `%${namaBarang}%`
        };
      }

      includeOptions.push({
        model: User,
        attributes: ['name', 'email', 'role'],
        required: Boolean(namaPembuat),
        ...(namaPembuat && {
          where: {
            name: {
              [Op.like]: `%${namaPembuat}%`
            }
          }
        })
      });
    } 
    // Bukan admin
    else {
      whereConditions.userId = req.user.userId;

      includeOptions.push({
        model: User,
        attributes: ['name', 'email', 'role'],
        required: false
      });
    }

    // Pencarian multi-field (name, nospk, merk, warna)
    if (search) {
      whereConditions[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { nospk: { [Op.like]: `%${search}%` } },
        { merk: { [Op.like]: `%${search}%` } },
        { warna: { [Op.like]: `%${search}%` } }
      ];
    }

    // Filter tanggal
    if (startDate && endDate) {
      whereConditions.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    } else if (tanggal && bulan && tahun) {
      const start = new Date(`${tahun}-${bulan}-${tanggal}T00:00:00`);
      const end = new Date(`${tahun}-${bulan}-${tanggal}T23:59:59`);
      whereConditions.createdAt = {
        [Op.between]: [start, end]
      };
    } else if (bulan && tahun) {
      const start = new Date(`${tahun}-${bulan}-01T00:00:00`);
      const end = new Date(start);
      end.setMonth(end.getMonth() + 1);
      whereConditions.createdAt = {
        [Op.gte]: start,
        [Op.lt]: end
      };
    } else if (tahun) {
      const start = new Date(`${tahun}-01-01T00:00:00`);
      const end = new Date(`${tahun}-12-31T23:59:59`);
      whereConditions.createdAt = {
        [Op.between]: [start, end]
      };
    }

    const produk = await Produk.findAndCountAll({
      attributes: [
        'uuid', 'name', 'price', 'harga', 'description', 'createdAt',
        'merk', 'panjang', 'lebar', 'warna', 'micron', 'nospk', 'oven', 'gudang',
        [Sequelize.literal('price * harga'), 'total']
      ],
      include: includeOptions,
      where: whereConditions,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
    });

    const totalSum = await Produk.findOne({
      attributes: [
        [Sequelize.fn('SUM', Sequelize.literal('price * harga')), 'totalSemua']
      ],
      where: whereConditions,
      include: includeOptions,
      raw: true
    });

    res.status(200).json({
      data: produk.rows,
      totalRows: produk.count,
      totalSemua: totalSum?.totalSemua || 0
    });

  } catch (error) {
    console.error("Gagal ambil data produk:", error);
    res.status(500).json({ msg: error.message });
  }
};



//buat produk atu create produk 
export const createProduk= async(req, res)=>{
 const{name, price, harga, description, merk, panjang, lebar, warna, micron, nospk, oven, gudang}= req.body;
 try{
await Produk.create({name, price, userId:req.user.userId, harga, description, merk, panjang, lebar, warna, micron, nospk, oven, gudang});
res.status(200).json({msg:"Produk Berhasil Dibuat"});     
 }catch(error){
  console.error('gagal membuat produk baru');  res.status(500).json({msg:error.message});
 }
}

//getProdukById 
export const getProdukById = async (req, res) => {
  try {
    const produk = await Produk.findOne({
      where: { uuid: req.params.id }
    });
    if (!produk) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    let response;
    if (req.user.role === "admin") {
      response = await Produk.findOne({
        attributes: ['uuid', 'name', 'price', 'harga', 'description', 'merk', 'panjang', 'lebar', 'warna', 'micron', 'nospk', 'oven', 'gudang'],
        where: { id: produk.id },
        include: [{
          model: User,
          attributes: ['name', 'email']
        }]
      });
    } else {
      response = await Produk.findOne({
        attributes: ['uuid', 'name', 'price', 'harga', 'description', 'merk', 'panjang', 'lebar', 'warna', 'micron', 'nospk', 'oven', 'gudang'],
        where: {
          [Op.and]: [
            { id: produk.id },
            { userId: req.user.userId }
          ]
        },
        include: [{
          model: User,
          attributes: ['name', 'email']
        }]
      });
    }

   
    if (!response) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }
    

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};


//update Produk 
export const updateProduk = async (req, res) => {
  try {
    const produk = await Produk.findOne({
      where: { uuid: req.params.id }
    });
    if (!produk) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const user = await User.findOne({
      where: { id: produk.userId }
    });
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Cek apakah yang mau update punya izin
    if (req.user.role === "user" && (produk.userId !== req.user.userId || user.role === "admin")) {
      return res.status(403).json({ msg: "Akses terlarang" });
    }

    const { name, price, harga, description, merk, panjang, lebar, warna, micron, nospk, oven, gudang} = req.body;

    await Produk.update(
      { name, price, harga, description, merk, panjang, lebar, warna, micron, nospk, oven, gudang},
      { where: { id: produk.id } }
    );

    res.status(200).json({ msg: "Produk berhasil diupdate" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};


// delete Produk
export const deleteProduk = async (req, res) => {
  try {
    const produk = await Produk.findOne({
      where: { uuid: req.params.id }
    });
    if (!produk) {
      return res.status(404).json({ msg: "Data tidak ditemukan" });
    }

    const user = await User.findOne({
      where: { id: produk.userId }
    });
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Cek izin akses
    if (req.user.role === "user") {
      // User biasa tidak boleh hapus produk milik admin, atau produk yang bukan miliknya
      if (produk.userId !== req.user.userId || user.role === "admin") {
        return res.status(403).json({ msg: "Akses terlarang" });
      }
    }

    await Produk.destroy({
      where: { id: produk.id }
    });

    res.status(200).json({ msg: "Produk berhasil dihapus" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: error.message });
  }
};
