import DonHang from "../models/DonHang.js";
import SanPham from "../models/Products.js";
import mongoose from "mongoose";

// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const userId = req.user._id;
  const { dia_chi_giao_hang, ghi_chu, items } = req.body;
  try {
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Giỏ hàng của bạn đang trống.",
      });
    }
    const chi_tiet = items.map((item) => {
      const thanh_tien = item.gia * item.quantity;

      return {
        ma_san_pham: item._id,
        ten_san_pham: item.ten_san_pham,
        so_luong: item.quantity,
        gia: item.gia,
        thanh_tien: thanh_tien,
        hinh_anh:
          item.hinh_anh && item.hinh_anh.length > 0 ? item.hinh_anh[0] : null,
      };
    });

    const tong_tien = chi_tiet.reduce((sum, item) => sum + item.thanh_tien, 0);

    const donHang = new DonHang({
      user: req.user._id,
      chi_tiet: chi_tiet,
      tong_tien: tong_tien,
      dia_chi_giao_hang: dia_chi_giao_hang,
      ghi_chu: ghi_chu || "",
      trang_thai: "đang xử lý",
      ngay_dat: new Date(),
    });

    const savedOrder = await donHang.save({ session });
    const stockUpdates = items.map((item) => {
      return SanPham.findByIdAndUpdate(
        item._id,
        {
          $inc: { so_luong: -item.quantity },
        },
        { session }
      );
    });
    await Promise.all(stockUpdates);
    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Đặt hàng thành công!",
      data: savedOrder,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Lỗi khi tạo đơn hàng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi tạo đơn hàng",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

// Lấy tất cả đơn hàng (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", trang_thai = "" } = req.query;

    const filter = {};
    if (trang_thai) {
      filter.trang_thai = trang_thai;
    }
    if (search) {
      filter.$or = [
        { dia_chi_giao_hang: { $regex: search, $options: "i" } },
        { ghi_chu: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await DonHang.find(filter)
      .populate("user", "ten_hoc_ten email so_dien_thoai")
      .sort({ ngay_dat: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await DonHang.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
      },
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

// Lấy chi tiết đơn hàng
export const getOrderById = async (req, res) => {
  try {
    const order = await DonHang.findById(req.params.id).populate(
      "user",
      "ten_hoc_ten email so_dien_thoai dia_chi"
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
  try {
    const { trang_thai } = req.body;
    const orderId = req.params.id;

    const validStatuses = [
      "đang xử lý",
      "đang giao",
      "giao thành công",
      "đã hủy",
    ];

    if (!validStatuses.includes(trang_thai)) {
      return res.status(400).json({
        success: false,
        message: "Trạng thái không hợp lệ",
      });
    }

    const order = await DonHang.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    order.trang_thai = trang_thai;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Cập nhật trạng thái thành công",
      data: order,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

// Xóa đơn hàng
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await DonHang.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy đơn hàng",
      });
    }

    await DonHang.findByIdAndDelete(orderId);

    res.status(200).json({
      success: true,
      message: "Xóa đơn hàng thành công",
    });
  } catch (error) {
    console.error("Lỗi khi xóa đơn hàng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
