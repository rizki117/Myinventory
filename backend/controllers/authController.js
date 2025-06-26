




// controllers/Auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User  from '../models/userModel.js';
import UserSession from '../models/sessionModel.js';

export const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user) return res.status(401).json({ msg: "User Tidak Ditemukan" });

    const passwordValid = await bcrypt.compare(req.body.password, user.password);
    if (!passwordValid) return res.status(401).json({ msg: "Password salah" });

    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.AKSES_TOKEN,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { userId: user.id, name: user.name, email: user.email, role: user.role },
      process.env.REFRESH_TOKEN,
      { expiresIn: '1d' }
    );

    // Simpan refresh token
    const existingSession = await UserSession.findOne({ where: { userId: user.id } });

    if (existingSession) {
      await UserSession.update(
        { refres_token: refreshToken },
        { where: { userId: user.id } }
      );
    } else {
      await UserSession.create({
        userId: user.id,
        refres_token: refreshToken
      });
    }

    // Set cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: false
    });
 res.status(200).json({ 
 accessToken, 
 user:{
      name:user.name,
      email:user.email,
      role:user.role
        } 
     });
     
  } catch (error) {
    console.error('Gagal Login', error);
    res.status(500).json({ msg: error.message });
  }
};

//Refresh Token
export const RefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const session = await UserSession.findOne({
      where: { refres_token: refreshToken }
    });

    if (!session) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { userId: decoded.userId, role: decoded.role },
        process.env.AKSES_TOKEN,
        { expiresIn: '30s' }
      );
      res.json({ accessToken});
    });
  } catch (error) {
    console.error('Gagal Refresh Token', error);
    res.status(500).json({ msg: error.message });
  }
};





//MeOnly
export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.userId },
      attributes: ["uuid", "name", "email", "role"],
    });

    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error("Gagal mengambil data user:", err);
    return res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data user" });
  }
};


//logout
export const Logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json({mag:"Tidak ada Token "});

    // Cari sesi berdasarkan refresh token
    const session = await UserSession.findOne({ where: { refres_token: refreshToken } });
    if (!session) return res.status(401).json({msg:'Tidak Ada Session'});

    // Hapus dari database
    await UserSession.destroy({ where: { refres_token: refreshToken } });

    // Hapus cookie di browser
    res.clearCookie('refreshToken');
    res.status(200).json({msg:'Logout Berhasil'}); // Logout berhasil
  } catch (error) {
    console.error('Gagal Logout:', error);
    res.status(500).json({ msg: error.message });
  }
};
