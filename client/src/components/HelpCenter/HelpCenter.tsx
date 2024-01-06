import React, { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { CardMedia, Stack } from "@mui/material";

import BackgroundImg from "assets/Help.png";

// This Component is placed on the personal Homepage on click of button> Opens Help center overview page(with 6 help cards)

const HelpCenter: FC = () => {
  const navigate = useNavigate();

  const accessHelpClicked = () => {
    // Navigate to the 'help-center' component file
    navigate(`/help-center`);
  };

  return (
    <Box height={500}>
      <Box mt={4}>
        <Typography
          variant="h3"
          mt={10}
          mb={4}
          textAlign="center"
          color="black"
        >
          Confused? Navigate to our Help Center!
        </Typography>
        <CardMedia
          image={BackgroundImg}
          sx={{
            marginLeft: 20,
            paddingLeft: "50",
            width: "50%",
            height: 400,
            align: "center",
          }}
        />
        <Card
          sx={{
            margin: "auto",
            maxWidth: 300,
            position: "relative",
            marginTop: -35,
            marginRight: 40,
           
          }}
        >
          <CardContent >
            <Box mt={3}  alignItems="center">
              <Button
                variant="contained"
                onClick={accessHelpClicked}
                sx={{ width: "100%", mb: 2 }}
              >
                Access our Help center
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default HelpCenter;
