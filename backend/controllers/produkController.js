








import User from "../models/userModel.js"
import Produk from "../models/produkModel.js"
import { Op } from "sequelize";


// Ambil semua data produk


export const getAllProduk = async (req, res) => {
  try {
    const {
      namaBarang = "",
      namaPembuat = "",
      search = "",
      limit = 10,
      offset = 0
    } = req.query;

    const isAdmin = req.user.role === 'admin';

    let whereConditions = {};
    let includeOptions = [];

    if (isAdmin) {
      // Admin: filter nama barang (dari tabel produk)
      if (namaBarang) {
        whereConditions.name = {
          [Op.like]: `%${namaBarang}%`
        };
      }

      // Admin: include User dan filter nama pembuat langsung di include
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
    } else {
      // User biasa hanya boleh lihat data sendiri
      whereConditions = {
        userId: req.user.userId
      };

      if (search) {
        whereConditions.name = {
          [Op.like]: `%${search}%`
        };
      }

      // Tetap include User agar bisa ditampilkan
      includeOptions.push({
        model: User,
        attributes: ['name', 'email', 'role'],
        required: false
      });
    }

    const produk = await Produk.findAndCountAll({
      attributes: ['uuid', 'name', 'price', 'harga', 'description', 'createdAt'],
      include: includeOptions,
      where: whereConditions,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']],
      // logging: console.log, // aktifkan jika ingin cek query SQL
    });

    res.status(200).json({
      data: produk.rows,
      totalRows: produk.count,
    });

  } catch (error) {
    console.error("Gagal ambil data produk:", error);
    res.status(500).json({ msg: error.message });
  }
};



//buat produk atu create produk 
export const createProduk= async(req, res)=>{
 const{name, price, harga, description}= req.body;
 try{
await Produk.create({name:name, price:price, userId:req.user.userId, harga:harga, description:description});
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
        attributes: ['uuid', 'name', 'price', 'harga', 'description'],
        where: { id: produk.id },
        include: [{
          model: User,
          attributes: ['name', 'email']
        }]
      });
    } else {
      response = await Produk.findOne({
        attributes: ['uuid', 'name', 'price', 'harga', 'description'],
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

    const { name, price, harga, description } = req.body;

    await Produk.update(
      { name, price, harga, description},
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
