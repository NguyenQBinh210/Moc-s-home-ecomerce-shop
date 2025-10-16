import mongoose from "mongoose";

const DonHangSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Thay thế ma_khach_hang và ma_nhan_vien
  ngay_dat: { type: Date, default: Date.now },
  trang_thai: { type: String, default: "đang xử lý" },
  dia_chi_giao_hang: String,
  tong_tien: Number,
  ghi_chu: String,
  chi_tiet: [
    {
      ma_san_pham: { type: String, ref: "SanPham" },
      ten_san_pham: String,
      so_luong: Number,
      gia: Number,
      thanh_tien: Number,
      hinh_anh: String,
    },
  ],
});

const DonHang = mongoose.model("DonHang", DonHangSchema);
export default DonHang
