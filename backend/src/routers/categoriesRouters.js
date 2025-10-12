import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoriesController.js";

const router = express.Router();

// GET /categories - Lấy tất cả danh mục với filter và pagination
router.get("/", getAllCategories);

// GET /categories/:id - Lấy danh mục theo ID
router.get("/:id", getCategoryById);

// POST /categories - Tạo danh mục mới
router.post("/", createCategory);

// PUT /categories/:id - Cập nhật danh mục
router.put("/:id", updateCategory);

// DELETE /categories/:id - Xóa danh mục
router.delete("/:id", deleteCategory);

export default router;
