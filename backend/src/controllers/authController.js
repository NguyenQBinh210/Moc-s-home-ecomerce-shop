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
    const { loginIdentifier, mat_khau } = req.body;

    if (!loginIdentifier || !mat_khau) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng nhập thông tin đăng nhập và mật khẩu",
      });
    }
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

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Không có token",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User không tồn tại",
      });
    }
    req.user = user;
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
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { ten_dang_nhap: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { ten_hoc_ten: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const users = await User.find(filter)
      .select("-mat_khau") 
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-mat_khau");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

export const updateUserByAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const { ten_hoc_ten, so_dien_thoai, dia_chi, role, mat_khau } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    }
    if (ten_hoc_ten !== undefined) user.ten_hoc_ten = ten_hoc_ten;
    if (so_dien_thoai !== undefined) user.so_dien_thoai = so_dien_thoai;
    if (dia_chi !== undefined) user.dia_chi = dia_chi;

    if (role !== undefined) {
      if (!["user", "admin"].includes(role)) {
        return res
          .status(400)
          .json({ success: false, message: "Vai trò không hợp lệ." });
      }
      user.role = role;
    }

    if (mat_khau !== undefined && mat_khau !== "") {
      user.mat_khau = mat_khau;
    }

    await user.save();

    const updatedUser = await User.findById(userId).select("-mat_khau");

    res.status(200).json({
      success: true,
      message: "Cập nhật thành công",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

// DELETE /api/users/:id - Xóa người dùng bởi Admin
export const deleteUserByAdmin = async (req, res) => {
  try {
    const userId = req.params.id;
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    }


    await User.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ success: true, message: "Xóa người dùng thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa người dùng:", error);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};
      export const changePassword = async (req, res) => {
        try {
          const { oldPassword, newPassword, confirmPassword } = req.body;
          const userId = req.user.id;
          if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
              success: false,
              message: "Vui lòng điền đầy đủ thông tin.",
            });
          }

          if (newPassword !== confirmPassword) {
            return res.status(400).json({
              success: false,
              message: "Mật khẩu mới không khớp.",
            });
          }
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({
              success: false,
              message: "Không tìm thấy người dùng.",
            });
          }

          const isPasswordValid = await user.comparePassword(oldPassword);
          if (!isPasswordValid) {
            return res.status(400).json({
              success: false,
              message: "Mật khẩu cũ không chính xác.",
            });
          }

          user.mat_khau = newPassword;
          await user.save();

          res.status(200).json({
            success: true,
            message: "Đổi mật khẩu thành công.",
          });
        } catch (error) {
          console.error("Lỗi khi đổi mật khẩu:", error);
          res.status(500).json({
            success: false,
            message: "Lỗi server khi đổi mật khẩu.",
          });
        }
      };