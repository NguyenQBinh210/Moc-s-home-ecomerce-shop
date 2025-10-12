import mongoose from "mongoose";

const DonHangSchema = new mongoose.Schema({
  ma_khach_hang: { type: String, ref: "KhachHang" },
  ma_nhan_vien: { type: String, ref: "NhanVien" },
  ngay_dat: { type: Date, default: Date.now },
  trang_thai: { type: String, default: "đang xử lý" },
  dia_chi_giao_hang: String,
  tong_tien: Number,
  ghi_chu: String,
  chi_tiet: [
    {
      ma_san_pham: { type: String, ref: "SanPham" },
      so_luong: Number,
      thanh_tien: Number,
    },
  ],
});

export default mongoose.model("DonHang", DonHangSchema);
