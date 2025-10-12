import mongoose from "mongoose";

const NhaCungCapSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  ten_nha_cung_cap: { type: String, required: true },
  dia_chi: String,
  so_dien_thoai: String,
});

const NhaCungCap = mongoose.model("NhaCungCap", NhaCungCapSchema);
export default NhaCungCap;
