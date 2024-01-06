import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Divider, Grid } from "@mui/material";
import { dispatchClearStore } from "store/actionCreators/LandingPageActionCreators";
import * as landingPageService from "../../services/landingPageService";
import FeaturesCard from "./FeaturesCard";
import FastFacts from "./FastFacts";
import UserSignUpCard from "./UserSignUpCard/UserSignUpCard";
import Footer from "components/Footer";
import backGroundImg from "assets/Refreshed pics/background_img.png";

interface LandingPageData {
  "Total Users": number;
  "Community Posts": number;
  "Total Recipes": number;
}

const initialState: LandingPageData[] = [
  {
    "Total Users": 0,
    "Community Posts": 0,
    "Total Recipes": 0,
  },
];

const LandingPage = () => {
  const dispatch = useDispatch();
  const [livePageData, setLivePageData] =
    useState<LandingPageData[]>(initialState);
  const loaderStatus = useSelector(
    (state: any) => state?.LandingPageReducer?.showLoader
  );

  //reset redux store
  useEffect(() => {
    dispatch(dispatchClearStore());
  }, [dispatch]);

  useEffect(() => {
    landingPageService
      .getHomePageData()
      .then((data: LandingPageData[] | LandingPageData) => {
        if (Array.isArray(data) && data.length > 0) {
          setLivePageData(data);
        } else if (!Array.isArray(data)) {
          setLivePageData([]);
        }
      });
  }, []);

  //landing page container
  return (
    <div
      style={{
        backgroundImage: `url(${backGroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
      }}
    >
      <Container
        sx={{
          marginTop: "4rem",
          maxHeight: "calc(100vh - 4.5rem)",
          overflowY: "auto",
          maxWidth: "100vw !important",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="stretch"
          direction="column"
          sx={{ gap: "5vh" }}
        >
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <FeaturesCard />
          </Grid>
          <Divider variant="fullWidth" />
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <FastFacts livePageData={livePageData} />
          </Grid>
          <Divider variant="fullWidth" />
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <UserSignUpCard livePageData={livePageData} />
          </Grid>
          <Divider variant="fullWidth" />
          <Grid item>
            <Footer />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LandingPage;
