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

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.route("/").post(authMiddleware, createOrder);
// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Kết nối database
connectDB();

// Routes
app.use("/api/users", authRouters);
app.use("/auth", auth);
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
