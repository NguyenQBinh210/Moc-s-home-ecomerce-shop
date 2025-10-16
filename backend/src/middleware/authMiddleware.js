import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Không có token xác thực" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); 
    // console.log("decoded:", decoded);
    if (!user) {
      return res.status(401).json({ message: "User không tồn tại" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Hãy đăng nhập để đặt hàng" });
  }
};

export default authMiddleware;
