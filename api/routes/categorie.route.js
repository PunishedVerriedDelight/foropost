import express from "express";
import { createCategory, getCategories, deleteCategory } from "../controllers/categorie.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.delete("/:categoryId", deleteCategory);

export default router;
