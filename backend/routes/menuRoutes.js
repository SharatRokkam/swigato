import { Router } from "express";
import auth from "../middleware/auth.js";
import { addMenuItem, getMenu } from "../controllers/menuController.js";

const router = Router();

router.post("/:restaurantId/menu", auth, addMenuItem);
router.get("/:restaurantId/menu", getMenu);

export default router;
