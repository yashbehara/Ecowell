import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Typography,
  Checkbox as MuiCheckbox,
  CircularProgress,
  Card,
  CardMedia,
  Checkbox,
  CardContent,
  Box,
} from "@mui/material";
import "./ProductCard.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as ProductRecommendationService from "../../services/productRecommendationService";
import ProductRecommendation from "models/productRecommendationModel";
import ProductInfo from "models/productInfoModel";
import { APP_ROUTES } from "constants/constants";
import backgroundImg from "../../assets/Refreshed pics/prod_rec_bg.png";

const ProductCard = () => {
  let { stringValue } = useParams();
  const navigate = useNavigate();
  const [productRecommendationData, setProductRecommendationData] = useState<
    ProductInfo["product"][]
  >([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [noRecommendations, setNoRecommendations] = useState(false);

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
    // Ensure the string value is not undefined before making the API call
    if (stringValue) {
      setLoading(true); // Start loading

      ProductRecommendationService.getProductRecommendationsData(stringValue)
        .then((data: ProductRecommendation) => {
          if (data.products.length === 0) {
            setNoRecommendations(true);
          } else {
            setProductRecommendationData(data.products);
          }
          // Handle the data or update the component state as needed
          setLoading(false); // Stop loading
        })
        .catch((error: any) => {
          console.error("Error fetching product recommendations data:", error);
          setLoading(false); // Stop loading on error
          // Handle errors if needed
        });
    }

    // Cleanup function to clear outdated effect dependencies
    return () => {
      stringValue = ""; // Clear stringValue when component unmounts or when stringValue changes
    };
  }, []); // Add stringValue as a dependency

  const handleCheckboxChange = (product_name: string) => {
    if (selectedItems.includes(product_name)) {
      // If already selected, remove from the list
      setSelectedItems(selectedItems.filter((item) => item !== product_name));
    } else {
      // If not selected, add to the list
      setSelectedItems([...selectedItems, product_name]);
    }
  };

  const handleGenerateRecipe = () => {
    // Use selectedItems for further processing (e.g., sending to an API)
    navigate(`${APP_ROUTES.RECIPES_PAGE_ROUTE}/${selectedItems[0]}`);
    // Clear selected items if needed
    // setSelectedItems([]);
  };

  //product card component
  return (
    <div style={{ marginTop: "8em" }}>
      {loading ? ( // Show CircularProgress while loading
        <CircularProgress style={{ marginLeft: "800px" }} />
      ) : noRecommendations ? (
        // Display Card component when no recommendations found
        <Card>
          <CardContent>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No Product recommendations found
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <div>
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            style={{
              backgroundImage: `url(${backgroundImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "blur(8px) brightness(0.5)",
              zIndex: -1,
            }}
          />
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5vh",
              alignItems: "center",
              border: "1px solid black",
              borderRadius: "5px",
            }}
          >
            <br />
            <Typography style={{ color: "wheat" }} variant="h3">
              Recommended Products
            </Typography>
            {/* recommended products carousel */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: "60vh",
                width: "60vw",
                gap: "2.2vw",
                overflowY: "auto",
              }}
            >
              {productRecommendationData.map((eachItem, id) => (
                <Card key={id} className="card">
                  <CardMedia
                    className="card-image"
                    component="img"
                    alt={eachItem?.product_name}
                    sx={{ height: 200, width: 200, marginTop: 5 }}
                    image={eachItem?.image_url}
                  />

                  <CardContent style={{ width: "200px" }}>
                    <Typography
                      style={{
                        fontFamily: "Papyrus",
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                      }}
                      variant="h6"
                    >
                      {eachItem?.product_name}
                    </Typography>
                    <br />
                    <Typography
                      style={{ fontFamily: "Papyrus", fontSize: "1.3rem" }}
                      variant="body1"
                    >
                      Grade : {eachItem.nutriscore_grade.toUpperCase()}
                    </Typography>
                    <br />
                    {/* check box selector for each product */}
                    <Checkbox
                      style={{ display: "flex", alignItems: "center" }}
                      checked={selectedItems.includes(eachItem?.product_name)}
                      onChange={() =>
                        handleCheckboxChange(eachItem?.product_name)
                      }
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </span>
          <div
            style={{
              marginTop: "4%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" onClick={handleGenerateRecipe}>
              Generate Recipe
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
