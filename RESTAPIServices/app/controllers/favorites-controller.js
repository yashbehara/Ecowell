import * as FavoritesService from "../services/favorites-service.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

// Controller to handle adding a favorite recipe
export const addFavoriteRecipe = async (request, response) => {
  try {
    const { userId, recipeUri } = request.body;
    const favorite = await FavoritesService.addFavorite(userId, recipeUri);
    setResponse(favorite, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller to handle fetching user's favorite recipes
export const getFavoriteRecipes = async (request, response) => {
  try {
    const userId  = request.params.userId;
    const favorites = await FavoritesService.getFavorites(userId);
    setResponse(favorites, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

// Controller to handle removing a favorite recipe
export const removeFavoriteRecipe = async (request, response) => {
  try {
    const { userId, recipeUri } = request.body; // Extract userId and recipeUri from the body
    const favorite = await FavoritesService.removeFavorite(userId, recipeUri);
    setResponse(favorite, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

