









import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

//tampil data
export const getAllUser= async(req, res)=>{
 try{
const response= await User.findAll({attributes:['id','uuid', 'name', 'email', 'role', 'nohp']});
 res.status(200).json(response);   
 }catch(error){
 console.error("gagal mengambil data"); res.status(500).json({msg:error.message})
 }
};


// membuat user baru
export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role, nohp } = req.body;
  if (password !== confPassword)
    return res.status(400).json({ msg: "Konfirmasi password tidak sesuai" });

  try {
    // Cek apakah email sudah ada di database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: "Email sudah terdaftar" });
    }

    // Enkripsi password sebelum disimpan
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({ name, email, password: hashPassword, role, nohp });
    res.status(200).json({ msg: "Registrasi Berhasil" });
  } catch (error) {
    console.error("Gagal membuat user baru:", error);
    res.status(500).json({ msg: error.message });
  }
};




// ambil data berdasarkan id
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({attributes:['uuid', 'name', 'email', 'role', 'nohp'] ,where: { uuid: req.params.id } });
    if (!response) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error("Gagal ambil data berdasarkan id:", error);
    res.status(500).json({ msg: error.message });
  }
};


//delete user
export const deleteUser = async (req, res) => {
  const user = await User.findOne({ where: { uuid: req.params.id } });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

  try {
    await User.destroy({ where: { id: user.id } });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.error("error delete");
    res.status(400).json({ msg: error.message });
  }
};


// update data user
// update data user
export const updateUser = async (req, res) => {
  const { id } = req.params; // ini adalah uuid
  const { name, email, password, confPassword, role, nohp } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: id } }); // ganti id jadi uuid
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    let hashPassword = user.password;

    if (password || confPassword) {
      if (password !== confPassword)
        return res.status(400).json({ msg: "Konfirmasi password tidak sesuai" });

      const salt = await bcrypt.genSalt();
      hashPassword = await bcrypt.hash(password, salt);
    }

    await User.update(
      { name, email, password: hashPassword, role, nohp },
      { where: { uuid: id } }
    );

    res.status(200).json({ msg: "User berhasil diperbarui" });
  } catch (error) {
    console.error("Gagal memperbarui user:", error);
    res.status(500).json({ msg: error.message });
  }
};

