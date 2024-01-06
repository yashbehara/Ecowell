import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Feedback from "components/Feedback";
import CommunityForum from "components/CommunityForum";
import HelpCenter from "components/HelpCenter";
import { APP_ROUTES } from "constants/constants";
import NutritionalAnalysis from "components/NutritionalAnalysis";
import Export from "components/Export";
import Analytics from "components/Analytics";
import Footer from "components/Footer";
import RecipeCarousel from "components/RecipeCarousel/RecipeCarousel";
import Recipe from "models/recipe";

/* This is the home page for registered users, provides nutritional analysis, favourites, export, feedback , community forum and help center features. */
const Home = () => {
  const navigate = useNavigate();
  const [recipesInfo, setRecipesInfo] = useState<Recipe[]>([]);

  const handleUpdateRecipesDetails = (newRecipes: Recipe[]) => {
    setRecipesInfo(newRecipes);
  };

  //route protection
  const userHealthDetails = useSelector(
    (state: any) => state.UserHealthDetailsReducer.userHealthDetails
  );
  useEffect(() => {
    if (
      localStorage.getItem("account-details") == null ||
      Object.keys(userHealthDetails).length == 0
    ) {
      navigate(APP_ROUTES.LANDING_ROUTE);
    }
  }, [navigate, userHealthDetails]);
  //user homepage container
  return (
    <>
      <NutritionalAnalysis></NutritionalAnalysis>
      <RecipeCarousel
        updateRecipesDetails={handleUpdateRecipesDetails}
      ></RecipeCarousel>
      <Analytics recipesDetails={recipesInfo}></Analytics>
      <Export recipesDetails={recipesInfo}></Export>
      <CommunityForum></CommunityForum>
      <Feedback></Feedback>
      <HelpCenter></HelpCenter>
      <Footer></Footer>
    </>
  );
};
export default Home;
