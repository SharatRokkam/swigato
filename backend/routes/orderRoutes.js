import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createOrder,
  getUserOrders,
  updateOrderStatus
} from "../controllers/orderController.js";

const router = Router();

router.post("/", auth, createOrder);
router.get("/", auth, getUserOrders);
router.patch("/:orderId/status", auth, updateOrderStatus);

export default router;
