import Category from "../models/categorie.model.js";
import { errorHandler } from "../utils/error.js";

export const createCategory = async (req, res, next) => {
    const { name, description } = req.body;

    if (!name) {
        return next(errorHandler(400, 'El nombre de la categoría es requerido'));
    }

    const newCategory = new Category({ name, description });

    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
};

export const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

export const deleteCategory = async (req, res, next) => {
    const { categoryId } = req.params;

    try {
        await Category.findByIdAndDelete(categoryId);
        res.status(200).json('Categoría eliminada');
    } catch (error) {
        next(error);
    }
};
