// authController.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const register = async (req, res) => {
  try {
    const { ten_dang_nhap, email, mat_khau, ten_hoc_ten, so_dien_thoai } =
      req.body;

    if (
      !ten_dang_nhap ||
      !email ||
      !mat_khau ||
      !ten_hoc_ten ||
      !so_dien_thoai
    ) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ các trường bắt buộc.",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ ten_dang_nhap }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập hoặc email đã được sử dụng.",
      });
    }

    const user = new User({
      ten_dang_nhap,
      email,
      mat_khau,
      ten_hoc_ten,
      so_dien_thoai,
    });

    await user.save();
    res.status(201).json({
      success: true,
      message: "Đăng ký tài khoản thành công! Vui lòng đăng nhập.",
    });
  } catch (error) {
    console.error("Lỗi khi đăng ký:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi đăng ký tài khoản.",
    });
  }
};

export const login = async (req, res) => {
  try {
    // SỬA ĐỔI: Chấp nhận cả email hoặc tên đăng nhập
    const { loginIdentifier, mat_khau } = req.body;

    if (!loginIdentifier || !mat_khau) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập thông tin đăng nhập và mật khẩu",
      });
    }

    // SỬA ĐỔI: Tìm người dùng bằng ten_dang_nhap hoặc email
    const user = await User.findOne({
      $or: [{ ten_dang_nhap: loginIdentifier }, { email: loginIdentifier }],
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không đúng",
      });
    }

    const isPasswordValid = await user.comparePassword(mat_khau);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Tên đăng nhập hoặc mật khẩu không đúng",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        ten_dang_nhap: user.ten_dang_nhap,
        email: user.email,
        ten_hoc_ten: user.ten_hoc_ten,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi đăng nhập",
    });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Không có token",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Hãy đăng nhập để đặt hàng",
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Chỉ admin mới có quyền truy cập",
    });
  }
  next();
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-mat_khau");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy người dùng",
      });
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
