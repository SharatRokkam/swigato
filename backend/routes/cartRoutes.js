import { Router } from "express";
import auth from "../middleware/auth.js";
import { addToCart, getCart, clearCart } from "../controllers/cartController.js";

const router = Router();

router.post("/", auth, addToCart);
router.get("/", auth, getCart);
router.delete("/", auth, clearCart);

export default router;
