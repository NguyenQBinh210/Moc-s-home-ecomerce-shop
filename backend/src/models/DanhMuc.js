import mongoose from "mongoose";

const DanhMucSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  ten_danh_muc: { type: String, required: true },
});

const DanhMuc = mongoose.model("DanhMuc", DanhMucSchema);
export default DanhMuc;
