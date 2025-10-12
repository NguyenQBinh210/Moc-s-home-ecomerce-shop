import mongoose from "mongoose";

const KhuyenMaiSchema = new mongoose.Schema({
  ten_khuyen_mai: String,
  mo_ta: String,
  ngay_bat_dau: Date,
  ngay_ket_thuc: Date,
  giam_gia: Number,
  loai_giam: { type: String, enum: ["percent", "fixed"], default: "percent" },
  trang_thai: { type: String, default: "đang hoạt động" },
});

const KhuyenMai = mongoose.model("KhuyenMai", KhuyenMaiSchema);
export default KhuyenMai;
