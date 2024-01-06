import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import FlaskIcon from "@mui/icons-material/Science";
import DataIcon from "@mui/icons-material/Assessment";
import MortgageIcon from "@mui/icons-material/AccountBalance";
import SpeedIcon from "@mui/icons-material/FlashOn";
import Product_Scan from "assets/Refreshed pics/Product_Scan.png";
import Product_Rec from "assets/Refreshed pics/prod_rec.png";
import Personalised_Recipe from "assets/Refreshed pics/personalised_recipes.png";
import Analytics from "assets/Refreshed pics/analytics.png";

const FeatureCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "300px",
    }}
  >
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        flex: 1,
        borderRadius: "1.5rem",
      }}
    ></div>

    <div style={{ padding: "8px" }}>
      <Typography variant="h6" sx={{ marginTop: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
    </div>
  </div>
);

type FeatureCardData = {
  title: string;
  description: string;
  image: string;
};

const featureCards: FeatureCardData[] = [
  {
    title: "Check Product Details",
    description:
      "Dont know how healthy a product is for you? Give us the QR code and we will help you with all the necessary info",
    image: Product_Scan,
  },
  {
    title: "Get Personalised Recommendations",
    description:
      "Get personalised product recommendations based on the products you scan. Why settle with the ordinary variant when you can choose the healthier side!",
    image: Product_Rec,
  },
  {
    title: "Get Personalised Recipes",
    description:
      "Now you can choose from 1000+ available recipes and get both tastier and healthier recipes. Sounds like a dream come true",
    image: Personalised_Recipe,
  },
  {
    title: "Health-based Analytics",
    description:
      "Get to know all the necessary health-related informatics while you are here. We got you!",
    image: Analytics,
  },
];

//feature card component
const FeatureGrid: React.FC = () => {
  return (
    <Box position="relative" padding={4}>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      />
      <Typography
        variant="h4"
        justifyContent="center"
        textAlign="center"
        marginBottom={4}
        color="#581845"
      >
        What EcoWell can do for you?
      </Typography>
      <Grid container spacing={6} justifyContent="center">
        {featureCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Paper
              elevation={3}
              style={{
                padding: 10,
                backgroundColor: "#FFFFF5",
                height: "100%",
                borderRadius: "1.5rem",
              }}
            >
              <FeatureCard
                title={card.title}
                description={card.description}
                image={card.image}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeatureGrid;
