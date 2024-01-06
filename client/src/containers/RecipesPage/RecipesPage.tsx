import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRecipeData } from "services/recipesDataService";
import * as favoritesService from "services/favoriteService";
import { useNavigate } from "react-router-dom";
import "./Recipes.css";
import RecipeFilter from "components/RecipeFilter";
import { useParams } from "react-router-dom";
import { APP_ROUTES } from "constants/constants";
import { RecipeFilters } from "components/RecipeFilter/RecipeFilter";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Recipe from "models/recipe";

/* This is the recipe page for registered users where in all recipes are displayed 
for a product which can be further filtered down,
provides nutritional analysis, scope to add recipes to favourites */
const RecipesPage: React.FC = () => {
  /* set state */
  const { productName } = useParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeFilters, setActiveFilters] = useState<RecipeFilters>({
    diet: [],
    health: [],
    cuisineType: [],
    mealType: [],
    dishType: [],
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedFavorites, setSelectedFavorites] = useState<string[]>([]);
  const navigate = useNavigate();

  /* get user details */
  const userId = useSelector(
    (state: any) => state.UserHealthDetailsReducer.userHealthDetails._id
  );

  const userHealthDetails = useSelector(
    (state: any) => state.UserHealthDetailsReducer.userHealthDetails || {}
  );

  //route protection
  useEffect(() => {
    if (
      localStorage.getItem("account-details") == null ||
      Object.keys(userHealthDetails).length == 0
    ) {
      navigate(APP_ROUTES.LANDING_ROUTE);
    }
  }, [navigate, userHealthDetails]);

  useEffect(() => {
    /* fetch recipes data */
    const fetchRecipesData = async () => {
      try {
        if (productName) {
          const recipeData: any = await getRecipeData(
            productName,
            activeFilters
          );
          setRecipes(recipeData.hits);
        }
      } catch (error) {
        console.error("Error while fetching recipes", error);
      }
    };

    fetchRecipesData();
  }, [activeFilters]);

  const renderHealthLabels = (labels: string[]) => {
    return labels.map((label, index) => (
      <span key={index} className="health-label">
        {label}
      </span>
    ));
  };

  /* function to add recipes to favorites */
  const handleAddToFavorite = async (recipeUri: string) => {
    try {
      const response = await favoritesService.addFavoriteRecipe(
        userId,
        recipeUri
      );

      if (response) {
        /* Update the list of favorites in state */
        setFavorites([...favorites, recipeUri]);
        setSelectedFavorites([...selectedFavorites, recipeUri]);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const onApplyFilters = (filters: RecipeFilters) => {
    setActiveFilters(filters);
  };

  /* Add to favorites */
  const handleToggleFavorite = async (recipeUri: string) => {
    const isFavorite = selectedFavorites.includes(recipeUri);

    try {
      let newFavorites;
      if (isFavorite) {
        /* Call API to remove from favorites */
        await favoritesService.removeFavoriteRecipe(userId, recipeUri);
        newFavorites = selectedFavorites.filter((uri) => uri !== recipeUri);
      } else {
        /* Call API to add to favorites */
        await favoritesService.addFavoriteRecipe(userId, recipeUri);
        newFavorites = [...selectedFavorites, recipeUri];
      }
      setSelectedFavorites(newFavorites);
    } catch (error) {
      console.error(
        isFavorite
          ? "Error removing from favorites:"
          : "Error adding to favorites:",
        error
      );
    }
  };

  //recipes page container
  return (
    <>
     <h1>Recipes Page</h1>
      <RecipeFilter onApplyFilters={onApplyFilters} />
      <div className="recipes-container">
        {recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <div className="recipe-card-header">
              <IconButton
                aria-label={
                  selectedFavorites.includes(recipe.recipe.uri)
                    ? "remove from favorites"
                    : "add to favorites"
                }
                className={`favorite-icon ${
                  selectedFavorites.includes(recipe.recipe.uri)
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleToggleFavorite(recipe.recipe.uri)}
              >
                {selectedFavorites.includes(recipe.recipe.uri) ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </div>
            <img
              src={recipe.recipe.image}
              alt={recipe.recipe.label}
              className="recipe-image"
            />
            <div className="recipe-details">
              <h2>{recipe.recipe.label}</h2>
              <div className="recipe-health-labels">
                {renderHealthLabels(recipe.recipe.healthLabels)}
              </div>
              <div className="recipe-footer">
                <div className="recipe-serving">
                  <span className="nutrient-name">Servings: </span>
                  <span className="nutrient-value">{recipe.recipe.yield}</span>
                </div>
                <div className="recipe-nutrients">
                  <div className="nutrient-info">
                    <span className="nutrient-name">Protein: </span>
                    <span className="nutrient-value">
                      {recipe.recipe.totalNutrients.PROCNT.quantity.toFixed(2)} g
                    </span>
                  </div>
                  <div className="nutrient-info">
                    <span className="nutrient-name">Fat: </span>
                    <span className="nutrient-value">
                      {recipe.recipe.totalNutrients.FAT.quantity.toFixed(2)} g
                    </span>
                  </div>
                  <div className="nutrient-info">
                    <span className="nutrient-name">Carbs: </span>
                    <span className="nutrient-value">
                      {recipe.recipe.totalNutrients.CHOCDF.quantity.toFixed(2)} g
                    </span>
                  </div>
                </div>
                <div className="recipe-calories">
                  <span className="nutrient-name">Total Calories: </span>
                  <span>{Math.round(recipe.recipe.calories)} kcal</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecipesPage;
