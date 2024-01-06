import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { List, ListItem, ListItemText, Paper } from "@mui/material";

import * as ProductDetailsService from "../../services/productDetailsService";
import ProductInfo from "models/productInfoModel";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { APP_ROUTES } from "constants/constants";
import backgroundImg from "../../assets/Refreshed pics/product_details_bg.png";
import product_not_found from "../../assets/Refreshed pics/empty_recipe.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

let status_verbose: any = "";
let product: any = {};
let nutritionValues = {
  carbohydrates: 0,
  energy: 0,
  fat: 0,
  fiber: 0,
  proteins: 0,
  salt: 0,
  saturated_fat: 0,
  sugars: 0,
};

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [statusVerbose, setStatusVerbose] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();
  //route protection

  const userHealthDetails = useSelector(
    (state: any) => state.UserHealthDetailsReducer.userHealthDetails || {}
  );
  useEffect(() => {
    if (
      localStorage.getItem("account-details") == null ||
      Object.keys(userHealthDetails).length == 0
    ) {
      navigate(APP_ROUTES.LANDING_ROUTE);
    }
  }, [navigate, userHealthDetails]);

  useEffect(() => {
    ProductDetailsService.getProductData(productId).then(
      (data: ProductInfo) => {
        ({ status_verbose, product } = data);

        if (status_verbose === "product not found") {
          setStatusVerbose(status_verbose);
        } else {
          if (product?.nutriments) {
            const {
              carbohydrates,
              energy,
              fat,
              fiber,
              proteins,
              salt,
              saturated_fat,
              sugars,
            } = product?.nutriments;

            // Updating the nutritionValues object with the extracted data
            nutritionValues = {
              carbohydrates: carbohydrates || nutritionValues.carbohydrates,
              energy: energy || nutritionValues.energy,
              fat: fat || nutritionValues.fat,
              fiber: fiber || nutritionValues.fiber,
              proteins: proteins || nutritionValues.proteins,
              salt: salt || nutritionValues.salt,
              saturated_fat: saturated_fat || nutritionValues.saturated_fat,
              sugars: sugars || nutritionValues.sugars,
            };
          }
        }
        setLoaded(true);
      }
    );
  }, []);

  //redirect to recommendations component
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const productRecommendationClicked = () => {
    if (product.categories) {
      const categoriesArray = product?.categories?.split(",");
      const category = categoriesArray[0]?.trim();
      navigate(`/product-recommendation/${category}`);
    } else {
      setSnackbarMessage("No similar categories are available!!");
      setOpenSnackbar(true);
    }
  };

  //nutrition based color indicators
  const getBorderColorClass = (level: string) => {
    switch (level) {
      case "low":
        return "low-border";
      case "moderate":
        return "moderate-border";
      case "high":
        return "high-border";
      default:
        return "";
    }
  };

  //product details component
  return (
    <>
      <div style={{ backgroundSize: "cover", minHeight: "100vh" }}>
        {loaded ? (
          <div>
            {statusVerbose === "product not found" ? (
              // Display Card component when product not found
              <Card style={{ marginTop: "6rem", textAlign: "center" }}>
                <CardContent>
                  <img
                    src={`${product_not_found}`}
                    alt="Product Not Found"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Product not found!
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              loaded && (
                // Display product details when loaded
                <div
                  style={{
                    backgroundImage: `url(${backgroundImg})`,
                    backgroundColor: "#fff",
                  }}
                >
                  <div
                    id="product-details-container"
                    className="product-details-container"
                  >
                    <Container
                      maxWidth="md"
                      style={{
                        backgroundColor: "#9ea58c",
                        padding: "20px",
                        borderRadius: "1.5em",
                        width: "600px",
                        border: "2px solid black",
                      }}
                    >
                      <Paper
                        elevation={3}
                        className="product-paper"
                        style={{
                          borderColor: "#fef5da",
                          borderRadius: "1.5em",
                          padding: "20px",
                          marginTop: "20px",
                          transition: "transform 0.3s",
                        }}
                      >
                        <Grid container spacing={2}>
                          {/* Left side - Image */}
                          <Grid item xs={12} md={6}>
                            <img
                              src={`${product.image_url}`}
                              alt="Product"
                              style={{
                                width: "200px",
                                height: "300px",
                                borderRadius: "1.5em",
                              }}
                            />
                          </Grid>

                          {/* Right side - Product Details */}
                          <Grid
                            item
                            xs={12}
                            md={6}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              className="margin-botton-10"
                              variant="h5"
                              gutterBottom
                            >
                              {product.product_name}
                            </Typography>

                            <Typography
                              className="margin-botton-10"
                              variant="body1"
                            >
                              <strong>Barcode:</strong> {product.code}
                            </Typography>

                            <Typography
                              className="margin-botton-10"
                              variant="body1"
                            >
                              <strong>Quantity:</strong>{" "}
                              {product.product_quantity}
                            </Typography>

                            <Typography
                              className="margin-botton-10"
                              variant="body1"
                            >
                              <strong>Categories:</strong> {product.categories}
                            </Typography>

                            <Typography variant="body1">
                              <strong>Available in:</strong> {product.countries}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Container>
                  </div>

                  <div
                    className="nutrient-levels-container"
                    style={{ margin: "20px 0" }}
                  >
                    <Container
                      maxWidth="md"
                      style={{
                        backgroundColor: "#9ea58c",
                        padding: "20px",
                        borderRadius: "1.5em",
                        border: "2px solid black",
                      }}
                    >
                      <>
                        <Typography variant="h4" gutterBottom>
                          Nutrient Levels
                        </Typography>

                        <Grid container spacing={2}>
                          {Object.entries(product.nutrient_levels).map(
                            ([nutrient, level]: [any, any]) => (
                              <Grid item xs={12} sm={4} key={nutrient}>
                                <Card
                                  className={`product-paper ${getBorderColorClass(
                                    level
                                  )}`}
                                  style={{
                                    borderRadius: "1.5em",
                                    transition: "transform 0.3s",
                                  }}
                                >
                                  <CardContent>
                                    <Typography
                                      variant="h6"
                                      component="div"
                                      gutterBottom
                                    >
                                      {nutrient}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {level}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            )
                          )}
                        </Grid>
                      </>
                    </Container>
                  </div>

                  {product?.ingredients && (
                    <div
                      className="ingredients-container"
                      style={{ margin: "50px 0" }}
                    >
                      <Container
                        maxWidth="md"
                        style={{
                          backgroundColor: "#9ea58c",
                          padding: "20px",
                          borderRadius: "1.5em",
                          border: "2px solid black",
                        }}
                      >
                        <>
                          <Typography variant="h4" gutterBottom>
                            Ingredients
                          </Typography>

                          <Grid container spacing={2}>
                            {product.ingredients &&
                              [...product.ingredients].map(
                                (ingredient, index) => (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    key={index}
                                  >
                                    <List>
                                      <ListItem>
                                        <ListItemText
                                          primary={`${
                                            index + 1
                                          }. ${ingredient.id.slice(3)} (${
                                            ingredient.vegetarian === "yes"
                                              ? "Vegetarian"
                                              : "Non-vegetarian"
                                          })`}
                                        />
                                      </ListItem>
                                    </List>
                                  </Grid>
                                )
                              )}
                          </Grid>
                        </>
                      </Container>
                    </div>
                  )}

                  <div
                    className="nutrition-facts-container"
                    style={{ margin: "50px 0" }}
                  >
                    <Container
                      maxWidth="md"
                      style={{
                        backgroundColor: "#9ea58c",
                        padding: "20px",
                        borderRadius: "1.5em",
                        border: "2px solid black",
                      }}
                    >
                      <>
                        <Typography variant="h4" gutterBottom>
                          Nutrition Facts
                        </Typography>

                        <TableContainer
                          className="product-paper"
                          style={{
                            borderRadius: "1.5em",
                            transition: "transform 0.3s",
                          }}
                          component={Paper}
                        >
                          <Table>
                            <TableHead style={{ backgroundColor: "#c3cfa1" }}>
                              <TableRow>
                                <TableCell>Nutrition Facts</TableCell>
                                <TableCell>Quantity per 100g</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {Object.entries(nutritionValues).map(
                                ([nutrient, value]) => (
                                  <TableRow key={nutrient}>
                                    <TableCell>{nutrient}</TableCell>
                                    <TableCell>{value.toFixed(2)}</TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </>
                    </Container>
                  </div>

                  <div
                    className="similar-products-container"
                    style={{ margin: "50px 0" }}
                  >
                    <Container
                      maxWidth="md"
                      style={{
                        backgroundColor: "#9ea58c",
                        padding: "20px",
                        borderRadius: "1.5em",
                        border: "2px solid black",
                      }}
                    >
                      <Typography variant="h4" gutterBottom>
                        Get Similar Products
                      </Typography>

                      {/* Material-UI Button */}
                      <Button
                        variant="contained"
                        color="success"
                        onClick={productRecommendationClicked}
                      >
                        Get Similar Product Recommendations
                      </Button>
                    </Container>
                  </div>
                </div>
              )
            )}
          </div>
        ) : (
          // loader based on content fetch
          <Card style={{ marginTop: "6rem", textAlign: "center" }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Loading...
              </Typography>
            </CardContent>
          </Card>
        )}
        
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleSnackbarClose}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default ProductDetails;
