import React, { FC, MouseEvent, ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { CardMedia, Stack } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import BackgroundImg from "assets/healthy.avif";

const initialState = "";

const NutritionalAnalysis: FC = () => {
  const navigate = useNavigate();
  const [productId, updateProductId] = useState(initialState);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  //redirect to recommendations handler
  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (productId.trim() !== "") {
      navigate(`/product-details/${productId}`);
    } else {
      setSnackbarMessage("Product ID cannot be empty.");
      setOpenSnackbar(true);
    }
  };

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateProductId(event.target.value);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  //nutritional analysis component
  return (
    <>
      <Box height={1000}>
        <Stack direction="column" alignItems="center" justifyContent="center">
          <CardMedia
            image={BackgroundImg}
            sx={{
              paddingBottom: "100px",
              width: "100%",
              height: 1000,
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              mt={"200px"}
              textAlign="center"
              color="black"
              mb={2}
              ml={50}
            >
              Worried about your Nutrition?
            </Typography>
            <Typography
              variant="h4"
              textAlign="center"
              color="#581845"
              mt={3}
              ml={50}
              fontWeight={"bold"}
            >
              Check nutritional details of your product
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              marginTop={3}
              ml={50}
            >
              <FormControl
                sx={{ width: "25ch", justifyContent: "center", mr: 3 }}
              >
                <OutlinedInput
                  placeholder="Enter product barcode"
                  type="number"
                  value={productId}
                  onChange={handleTextFieldChange}
                />
              </FormControl>
              <Button variant="contained" onClick={handleButtonClick}>
                Submit
              </Button>
            </Stack>
          </CardMedia>
        </Stack>
      </Box>
      {/* snackbar for user feedback */}
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

export default NutritionalAnalysis;
