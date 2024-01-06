import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Container, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import UserHealthPieChart from "./UserHealthPieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import Recipe from "models/recipe";

interface AnalyticsProps {
  recipesDetails: Recipe[];
}

const Analytics: FC<AnalyticsProps> = ({ recipesDetails }) => {
  const cardStyle = {
    width: "100%",
  };

  // Check if recipesDetails is available and has the expected structure
  const shouldRenderChart = recipesDetails && recipesDetails.length > 0;

  let recipesNames: string[] = [];
  let caloriesData: number[] = [];

  if (shouldRenderChart) {
    recipesNames = recipesDetails
      .slice(0, 3)
      .map((recipe) => recipe.recipe.label || "Unknown");
    caloriesData = recipesDetails
      .slice(0, 3)
      .map((recipe) => recipe.recipe.calories);
  }

  let carbsData: number[] = [],
    proteinData: number[] = [],
    fatData: number[] = [],
    recipeNames: string[] = [];

  if (shouldRenderChart) {
    // Extract data only if each required nutrient is present
    carbsData = recipesDetails
      .slice(0, 3)
      .map((recipe) =>
        recipe.recipe.totalNutrients.CHOCDF
          ? parseFloat(recipe.recipe.totalNutrients.CHOCDF.quantity.toFixed(2))
          : 0
      );
    proteinData = recipesDetails
      .slice(0, 3)
      .map((recipe) =>
        recipe.recipe.totalNutrients.PROCNT
          ? parseFloat(recipe.recipe.totalNutrients.PROCNT.quantity.toFixed(2))
          : 0
      );
    fatData = recipesDetails
      .slice(0, 3)
      .map((recipe) =>
        recipe.recipe.totalNutrients.FAT
          ? parseFloat(recipe.recipe.totalNutrients.FAT.quantity.toFixed(2))
          : 0
      );
    recipeNames = recipesDetails
      .slice(0, 3)
      .map((recipe) => recipe.recipe.label || "Unknown"); // Default to "Unknown" if label is missing
  }

  //analytics component to render graphs.
  return (
    <Container maxWidth="lg" style={{ padding: 0, margin: 0 }}>
      <Box mt={4}>
        <Typography
          sx={{ width: "100vw" }}
          variant="h3"
          mb={4}
          textAlign="center"
          color="primary"
        >
          Profile Analytics
        </Typography>
        <Grid
          sx={{ width: "100vw" }}
          container
          spacing={4}
          justifyContent="center"
        >
          {/* user health details pie chart */}
          <Grid item xs={12} md={4}>
            <Card style={cardStyle}>
              <CardContent>
                <UserHealthPieChart />
              </CardContent>
            </Card>
          </Grid>

          {/* recipe and calories details line chart */}
          {shouldRenderChart && (
            <Grid item xs={12} md={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <BarChart
                    xAxis={[{ scaleType: "band", data: recipeNames }]}
                    series={[{ data: caloriesData, label: "Kcal" }]}
                    width={480}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Grid item for BarChart */}
          {/* Conditional rendering for BarChart */}
          {shouldRenderChart && (
            <Grid item xs={12} md={4}>
              <Card style={cardStyle}>
                <CardContent>
                  <BarChart
                    xAxis={[{ scaleType: "band", data: recipeNames }]}
                    series={[
                      { data: carbsData, label: "Carbs" },
                      { data: proteinData, label: "Protein" },
                      { data: fatData, label: "Fat" },
                    ]}
                    width={480}
                    height={300}
                  />
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Analytics;
