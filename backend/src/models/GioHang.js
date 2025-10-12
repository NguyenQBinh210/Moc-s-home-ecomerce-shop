import mongoose from "mongoose";

const GioHangSchema = new mongoose.Schema({
  ma_khach_hang: { type: String, ref: "KhachHang" },
  items: [
    {
      ma_san_pham: { type: String, ref: "SanPham" },
      so_luong: Number,
    },
  ],
});

export default mongoose.model("GioHang", GioHangSchema);
