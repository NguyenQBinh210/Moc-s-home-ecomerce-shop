import mongoose from "mongoose";

const ChiTietKhuyenMaiSchema = new mongoose.Schema({
  ma_khuyen_mai: { type: String, ref: "KhuyenMai" },
  ma_san_pham: { type: String, ref: "SanPham" },
  hinh_thuc_khuyen_mai: String,
});

const ChiTietKhuyenMai = mongoose.model(
  "ChiTietKhuyenMai",
  ChiTietKhuyenMaiSchema
);
export default ChiTietKhuyenMai;
