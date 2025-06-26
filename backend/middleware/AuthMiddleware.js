



import jwt from 'jsonwebtoken';


//verifyToken

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: "Anda belum login" });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.AKSES_TOKEN, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ msg: "Token kadaluarsa" });
      } else {
        return res.status(403).json({ msg: "Token salah" });
      }
    }
req.user={
    userId: decoded.userId,
    role: decoded.role
    };
    
    
    next();
  });
};


//adminOnly 

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ msg: "Akses hanya untuk Admin" });
  next();
};


