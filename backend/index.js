import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";

import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://your-frontend.vercel.app"],
    credentials: true
  })
);

// connect to DB
connectDB();

// Routes
app.use("/auth", authRoutes);

app.use("/restaurants", restaurantRoutes);
app.use("/restaurants", menuRoutes);


app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);




// root route
app.get("/", (req, res) => {
  res.json({ message: "Food Delivery API - Day 1" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
