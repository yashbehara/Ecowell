import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import HelpCard from "./HelpCard";
import { HELP_CENTER_CARDS } from "constants/constants";
import { APP_ROUTES } from "constants/constants";

// This component have 6 cards, opens a new page based on help type.
const HelpCenterOverview: FC = () => {
  //route protection
  const navigate = useNavigate();
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
  const producthelpClicked = (helpType: string) => {
    // Navigate to the 'help-center' component file
    navigate(`/help-center/${helpType}`); // Update the path as needed
  };

  return (
    <Grid>
      <Stack
        display={"flex"}
        direction="column"
        alignItems="center"
        justifyContent="center"
        ml={10}
        mr={10}
        mt={15}
      >
        <Typography variant="h2" align="left" mt={3} mb={3}>
          Welcome to Help Center
        </Typography>
        <br />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {HELP_CENTER_CARDS.map((props, idx) => {
            return (
              <Grid item key={idx + 1} xs={2} sm={4} md={4}>
                <HelpCard
                  cardColor={props.cardColor}
                  index={idx + 1}
                  title={props.title}
                  redirectFn={producthelpClicked}
                  routeParam={props.routeParam}
                  description={props.description}
                />
              </Grid>
            );
          })}
        </Grid>
      </Stack>
    </Grid>
  );
};

export default HelpCenterOverview;
