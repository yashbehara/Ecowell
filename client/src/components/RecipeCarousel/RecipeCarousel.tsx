import { FC, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import {
  getFavoriteRecipes,
  removeFavoriteRecipe,
} from "services/favoriteService";
import { getRecipeByUri } from "services/recipesDataService";
import { useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Recipe from "models/recipe";
import recipeInfo from "models/recipeInfoModel";
import emptyRecipe from "../../assets/Refreshed pics/empty_recipe.png"

/* interface for RecipeCarouselProps */
interface RecipeCarouselProps {
  updateRecipesDetails: (recipes: Recipe[]) => void;
}

/* Favorite Recipe Carousel on home page component */
const RecipeCarousel: FC<RecipeCarouselProps> = ({ updateRecipesDetails }) => {
  const [recipesDetails, setRecipesDetails] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /* Get user details from redux store */
  const userId = useSelector(
    (state: any) => state.UserHealthDetailsReducer.userHealthDetails._id
  );

  /* add to favorite recipes */
  const handleFavoriteClick = async (recipeUri: string) => {
    try {
      await removeFavoriteRecipe(userId, recipeUri);
      setRecipesDetails(
        recipesDetails.filter((recipe) => recipe.recipe.uri !== recipeUri)
      );
    } catch (error) {
      console.error("Error removing recipe from favorites:", error);
    }
  };

  useEffect(() => {
    /* fetch favorite recipes */
    const fetchFavoriteRecipes = async () => {
      try {
        setLoading(true);
        const favorites = await getFavoriteRecipes(userId);
        const nonNullUris = favorites.filter((uri) => uri != null);
        const fetchedRecipes: Recipe[] = [];

        for (const uri of nonNullUris) {
          const detail: recipeInfo = await getRecipeByUri(uri);
          if (detail && detail.hits) {
            fetchedRecipes.push(...detail.hits);
          }
        }

        setRecipesDetails(fetchedRecipes);
        updateRecipesDetails(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching recipes details:", error);
        setError("Failed to fetch recipes details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteRecipes();
  }, [userId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ bgcolor: "#f2f2f2", padding: 4, marginTop: 12 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" mb={4} textAlign="center" color="#581845">
          Explore Your Favorite Recipes
        </Typography>

        {recipesDetails.length > 0 && (
          <Carousel sx={{height: "560px"}} animation="fade" indicators={false} navButtonsAlwaysVisible={true}>
            {recipesDetails.map((recipe, index) => (
              <Card key={index} sx={{ marginLeft: 50, maxWidth: 400, borderRadius: 16, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <CardMedia
                  component="img"
                  image={recipe.recipe.image}
                  alt={recipe.recipe.label}
                  sx={{ height: 300 }}
                />
                <CardContent>
                  <Typography variant="h5" mb={2} textAlign="center" color="#581845">
                    {recipe.recipe.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Calories: {recipe.recipe.calories.toFixed(2)} kcal
                    <br />
                    Protein: {recipe.recipe.totalNutrients.PROCNT.quantity.toFixed(2)} g
                    <br />
                    Fat: {recipe.recipe.totalNutrients.FAT.quantity.toFixed(2)} g
                    <br />
                    Carbs: {recipe.recipe.totalNutrients.CHOCDF.quantity.toFixed(2)} g
                  </Typography>
                  <Box mt={2} display="flex" justifyContent="center">
                    <IconButton
                      sx={{ color: 'red' }}
                      onClick={() => handleFavoriteClick(recipe.recipe.uri)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Carousel>
        )}

        {recipesDetails.length === 0 && (
          <Box textAlign="center" my={4}>
          <img src={`${emptyRecipe}`} alt="Empty Carousel" style={{ width: '250px', height: '250px', objectFit: 'cover', marginBottom:"10px", borderRadius: "1.5rem" }} />
          <Typography variant="body1">
            Add recipes to your favorites to see them in the carousel.
          </Typography>
        </Box>
       )}
      
      </Container>
    </Box>
  );
};

export default RecipeCarousel;
