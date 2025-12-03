import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";



const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect to DB
connectDB();

// Routes
app.use("/auth", authRoutes);

// root route
app.get("/", (req, res) => {
  res.json({ message: "Food Delivery API - Day 1" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
