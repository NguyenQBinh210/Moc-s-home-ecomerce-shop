import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUserByAdmin,
  deleteUserByAdmin,
  verifyToken,
  adminOnly,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(verifyToken, adminOnly, getAllUsers);

router
  .route("/:id")
  .get(verifyToken, adminOnly, getUserById)
  .put(verifyToken, adminOnly, updateUserByAdmin)
  .delete(verifyToken, adminOnly, deleteUserByAdmin);

export default router;
