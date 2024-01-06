import * as restService from "services/baseService";

const favoritesResourcePath = "/favorites/";
const favoritesServiceGetURL = "/favorites/{userId}";

/* Service to fetch user's favorite recipes */
export const getFavoriteRecipes = async (userId: string): Promise<string[]> => {
  try {
    const path = favoritesServiceGetURL.replace("{userId}", userId); 
    const favorites = await restService.getDataById<string[]>(path, userId, {}); 
    return favorites;
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    throw error;
  }
};


/* Service to add a recipe to user's favorite */
export const addFavoriteRecipe = async (
  userId: string,
  recipeUri: string
): Promise<string[]> => {
  try {
    const path = `${favoritesResourcePath}`;
    return restService.postData<string[]>(path, { userId, recipeUri });
  } catch (error) {
    console.error("Error adding a recipe to favorites:", error);
    throw error;
  }
};


/* Service to remove a recipe from user's favorite recipes */
export const removeFavoriteRecipe = async (
  userId: string,
  recipeUri: string
): Promise<void> => {
  try {
    const path = `${favoritesResourcePath}`;
    const requestBody = { userId, recipeUri };
    await restService.deleteDataByJSON<string[]>(path, requestBody);
  } catch (error) {
    console.error("Error removing a recipe from favorites:", error);
    throw error;
  }
};
