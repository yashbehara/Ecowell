import RecipeInfo from "models/recipeInfoModel";
import { RecipeFilters } from "components/RecipeFilter/RecipeFilter";
import {
  RECIPES_ACCESS_POINT,
  RECIPES_API_KEY,
  RECIPES_APP_ID,
} from "constants/constants";

/* Service to fetch recipe data */
export const getRecipeData = async (
  recipeName: string,
  filters: RecipeFilters
): Promise<RecipeInfo> => {
  const queryParams = new URLSearchParams({
    type: "public",
    q: recipeName,
    app_id: RECIPES_APP_ID,
    app_key: RECIPES_API_KEY,
  });

  Object.entries(filters).forEach(([key, values]: [string, string[]]) => {
    values.forEach((value: string) => queryParams.append(key, value));
  });

  const response = await fetch(`${RECIPES_ACCESS_POINT}?${queryParams}`);
  const data: RecipeInfo = await response.json();
  return data;
};


/* Service to fetch recipe data by Uri */
export const getRecipeByUri = async (uri: string): Promise<RecipeInfo> => {
  const encodedUri = encodeURIComponent(uri);
  let apiUrl = `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodedUri}&app_id=${RECIPES_APP_ID}&app_key=${RECIPES_API_KEY}`;
  const fields = [
    "uri",
    "label",
    "image",
    "images",
    "yield",
    "dietLabels",
    "healthLabels",
    "calories",
    "totalCO2Emissions",
    "cautions",
    "totalTime",
    "cuisineType",
    "mealType",
    "dishType",
    "totalNutrients",
    "ingredientLines",
  ];
  fields.forEach((field) => {
    apiUrl += `&field=${field}`;
  });
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: RecipeInfo = await response.json();
  return data;
};
