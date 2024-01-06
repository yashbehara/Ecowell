import express from "express";
import * as FavoritesController from "../controllers/favorites-controller.js";

const router = express.Router();

// Routes for user favorites
router
  // @route         POST / DELETE /
  // @desc          Create and delete a new user profile
  // @access        public
  .route("/")
  .post(FavoritesController.addFavoriteRecipe)
  .delete(FavoritesController.removeFavoriteRecipe);

  // @route         GET /
  // @query-params  userId
  // @desc          Get a user profile
router.route("/:userId")
      .get(FavoritesController.getFavoriteRecipes);
export default router;
