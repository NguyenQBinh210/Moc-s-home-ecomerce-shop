import mongoose from "mongoose";

const SanPhamSchema = new mongoose.Schema({
  ten_san_pham: { type: String, required: true },
  mo_ta: String,
  gia: Number,
  so_luong: Number,
  trang_thai: { type: String, default: "còn hàng" },
  created_at: { type: Date, default: Date.now },
  ma_danh_muc: { type: String, ref: "DanhMuc" },
  ma_nha_cung_cap: { type: String, ref: "NhaCungCap" },
  hinh_anh: [{ type: String }], // mảng ảnh sản phẩm
});

const SanPham = mongoose.model("SanPham", SanPhamSchema);
export default SanPham;
