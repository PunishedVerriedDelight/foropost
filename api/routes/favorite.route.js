import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { addFavorite, removeFavorite, getFavorites } from "../controllers/favorite.controller.js";

const router = express.Router();

router.post("/addFavorite/:postId", verifyToken, addFavorite);
router.delete("/removeFavorite/:postId", verifyToken, removeFavorite);
router.get("/getFavorites", verifyToken, getFavorites);

export default router;
