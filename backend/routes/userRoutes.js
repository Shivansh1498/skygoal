import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import {
  loginUser,
  registerUser,
  deleteUser,
} from "../controllers/userControllers.js";

const router = express.Router();

// Protected Routes
router.delete("/deleteUser", protectedRoute, deleteUser);

// Public Routes
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
