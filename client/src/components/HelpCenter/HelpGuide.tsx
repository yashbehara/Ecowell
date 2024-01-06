import React, { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HelpProductAnalysis from "./HelpProductAnalysis";
import ProductRecommendationHelp from "./ProductRecommendationHelp";
import FavouriteRecipe from "./FavouriteRecipe";
import CommunityHelp from "./CommunityHelp";
import UserProfile from "./UserProfile";
import ExportHelp from "./ExportHelp";

// This function determines help type and based on it redirects the specific component
const HelpGuide: FC = () => {
  const { helpType } = useParams();
  return helpType === "product-analysis" ? (
    <HelpProductAnalysis />
  ) : helpType === "product-recommendations" ? (
    <ProductRecommendationHelp />
  ) : helpType === "favourite-recipes" ? (
    <FavouriteRecipe />
  ) : helpType === "export-details" ? (
    <ExportHelp />
  ) : helpType === "community-forum" ? (
    <CommunityHelp />
  ) : (
    <UserProfile />
  );
};

export default HelpGuide;
