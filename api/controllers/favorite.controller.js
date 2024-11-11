import Favorite from "../models/favorite.model.js";
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const addFavorite = async (req, res, next) => {
  try {
    const existingFavorite = await Favorite.findOne({
      userId: req.user.id,
      postId: req.params.postId,
    });
    if (existingFavorite) {
      return next(errorHandler(400, "Ya has marcado esta publicación como favorita"));
    }

    const newFavorite = new Favorite({
      userId: req.user.id,
      postId: req.params.postId,
    });
    const savedFavorite = await newFavorite.save();
    res.status(201).json(savedFavorite);
  } catch (error) {
    next(error);
  }
};

export const removeFavorite = async (req, res, next) => {
  try {
    const deletedFavorite = await Favorite.findOneAndDelete({
      userId: req.user.id,
      postId: req.params.postId,
    });
    if (!deletedFavorite) {
      return next(errorHandler(404, "No se encontró el favorito"));
    }
    res.status(200).json("El favorito ha sido eliminado");
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (req, res, next) => {
  try {
    const favorites = await Favorite.find({ userId: req.user.id });
    const postIds = favorites.map((fav) => fav.postId);
    const favoritePosts = await Post.find({ _id: { $in: postIds } });
    res.status(200).json(favoritePosts);
  } catch (error) {
    next(error);
  }
};
