import DonHang from "../models/DonHang.js";

export const createOrder = async (req, res) => {
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

    const savedOrder = await donHang.save();

    res.status(201).json({
      success: true,
      message: "Đặt hàng thành công!",
      data: savedOrder,
    });
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi tạo đơn hàng",
      error: error.message,
    });
  }
};
