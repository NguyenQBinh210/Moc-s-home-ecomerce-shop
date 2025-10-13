import express from "express";
import {
  register,
  login,
  verifyToken,
  adminOnly,
  getCurrentUser,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getCurrentUser);

router.get("/test", verifyToken, (req, res) => {
  res.json({
    success: true,
    message: "Token hợp lệ",
    user: req.user,
  });
});

router.get("/admin-test", verifyToken, adminOnly, (req, res) => {
  res.json({
    success: true,
    message: "Chỉ admin mới thấy được",
    user: req.user,
  });
});

export default router;
