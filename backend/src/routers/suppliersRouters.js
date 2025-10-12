import express from "express";
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} from "../controllers/suppliersController.js";

const router = express.Router();

// GET /suppliers - Lấy tất cả nhà cung cấp với filter và pagination
router.get("/", getAllSuppliers);

// GET /suppliers/:id - Lấy nhà cung cấp theo ID
router.get("/:id", getSupplierById);

// POST /suppliers - Tạo nhà cung cấp mới
router.post("/", createSupplier);

// PUT /suppliers/:id - Cập nhật nhà cung cấp
router.put("/:id", updateSupplier);

// DELETE /suppliers/:id - Xóa nhà cung cấp
router.delete("/:id", deleteSupplier);

export default router;
