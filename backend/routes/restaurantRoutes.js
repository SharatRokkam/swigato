import express from "express";
import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant,
} from "../controllers/restaurantController.js";

export const router = express.Router();

router.post("/", auth, createRestaurant);
router.get("/", getRestaurants);
router.get("/:id", getRestaurant);
router.patch("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;