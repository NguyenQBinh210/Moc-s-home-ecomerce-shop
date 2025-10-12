import mongoose from "mongoose";

const NhanVienSchema = new mongoose.Schema({
  ten_nhan_vien: { type: String, required: true },
  ten_dang_nhap: { type: String, required: true, unique: true },
  so_dien_thoai: String,
  mat_khau: String,
  role: { type: String, enum: ["admin", "staff"], default: "staff" },
  anh_dai_dien: { type: String }, // ảnh đại diện nhân viên
});

const NhanVien = mongoose.model("NhanVien", NhanVienSchema);
export default NhanVien;
