import express from "express";
import products from "./routers/productsRouters.js";
import categories from "./routers/categoriesRouters.js";
import suppliers from "./routers/suppliersRouters.js";
import authRouters from "./routers/authRouters.js";
import auth from "./routers/authRouters.js";
import orderRouter from "./routers/orderRouter.js";
import authMiddleware from "./middleware/authMiddleware.js"; 
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import { createOrder } from "./controllers/orderController.js";
import userRouter from "./routers/userRouter.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const localOrigins = ["http://localhost:5173", "http://localhost:4173"];
const configuredOrigins = (
  process.env.CLIENT_URL ||
  process.env.FRONTEND_URL ||
  ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = [...localOrigins, ...configuredOrigins];

const isAllowedOrigin = (origin) => {
  if (!origin || allowedOrigins.includes(origin)) return true;

  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
};

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.route("/").post(authMiddleware, createOrder);
// CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (isAllowedOrigin(origin)) {
    res.header("Access-Control-Allow-Origin", origin || "*");
  }

  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
});

// Kết nối database
connectDB();

// Routes
app.use("/api/auth", authRouters);
app.use("/auth", auth);
app.use("/api/users", userRouter);
app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/api/suppliers", suppliers);
app.use("/products", products);
app.use("/categories", categories);
app.use("/suppliers", suppliers);
app.use("/api/orders", orderRouter);
// Health check
app.get("/health", (req, res) => {
  res.json({ 
    success: true, 
    message: "Server is running", 
    timestamp: new Date().toISOString() 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
