import Favorites from '../models/favorites.js';

// service to add a recipe to a user's favorites
export const addFavorite = async (userId, recipeUri) => {
  let favorite = await Favorites.findOne({ userId });

  if (!favorite) {
    // Create new favorite record if it doesn't exist
    favorite = new Favorites({ userId, recipeUris: [recipeUri] });
  } else if (!favorite.recipeUris.includes(recipeUri)) {
    // Add to existing favorites
    favorite.recipeUris.push(recipeUri);
  }

  const savedFavorite = await favorite.save();
  return savedFavorite;
};

// service to get all favorite recipes of a user
export const getFavorites = async (userId) => {
  const favorites = await Favorites.findOne({ userId });
  return favorites ? favorites.recipeUris : [];
};

// service to remove a recipe from a user's favorites
export const removeFavorite = async (userId, recipeUri) => {
  const favorite = await Favorites.findOne({ userId });

  if (favorite) {
    favorite.recipeUris = favorite.recipeUris.filter(uri => uri !== recipeUri);
    await favorite.save();
  }
};
