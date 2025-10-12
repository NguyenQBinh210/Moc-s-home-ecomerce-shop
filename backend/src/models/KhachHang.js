import mongoose from "mongoose";

const KhachHangSchema = new mongoose.Schema({
  ten_khach_hang: { type: String, required: true },
  dien_thoai: { type: String, required: true },
  dia_chi: String,
  anh_dai_dien: { type: String }, // URL ảnh đại diện
});

export default mongoose.model("KhachHang", KhachHangSchema);
