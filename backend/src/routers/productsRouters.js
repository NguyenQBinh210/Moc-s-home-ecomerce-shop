import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  // getProductById, 
} from "../controllers/productsController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", upload.array("hinh_anh", 5), createProduct);
router.put("/:id", upload.array("hinh_anh", 5), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
