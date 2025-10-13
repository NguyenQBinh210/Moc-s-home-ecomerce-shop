import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  ten_dang_nhap: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mat_khau: { type: String, required: true },
  ten_hoc_ten: { type: String, required: true },
  so_dien_thoai: { type: String, required: true },
  dia_chi: { type: String },
  anh_dai_dien: { type: String },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("mat_khau")) return next();
  this.mat_khau = await bcrypt.hash(this.mat_khau, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.mat_khau);
};

const User = mongoose.model("User", UserSchema);
export default User;
