import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import paneer from "./../../assets/abc2.png";
import ToggleLanguage from "./ToggleLanguage";
import loginimage from "./../../assets/loginNew.png";
import image from "./../../assets/worriedNutri.png";
import { APP_ROUTES } from "constants/constants";
import BackgroundImg from "../../assets/Refreshed pics/blog_bg.jpg";

const ProductRecommendationHelp: FC = () => {
  const { t } = useTranslation("common");

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
  const imgStyle = {
    borderRadius: "1.5rem",
    width: "70%",
  };

  return (
    <Box style={{ backgroundImage: `url(${BackgroundImg})` }}>
      <Stack ml={3} mt={4}>
        <Typography variant="h2" mt={10} color={"#581845"}>
          <Stack ml={150}>
            {/* Component called for language toggle */}
            <ToggleLanguage />
          </Stack>
          {t("title2")}
        </Typography>
        <Stack display={"flex"} direction={"row"}>
          <div>
            <Typography variant="h5" mt={5}>
              {t("step21")} <br />
              <br />
              <img src={loginimage} style={imgStyle} width={"70%"} /> <br />
              <br />
              {t("step22")} <br />
              <br />
              <img src={image} style={imgStyle} width={"70%"} /> <br />
              <br />
              {t("step23")} <br />
              <br />
              {t("step24")} <br />
              <br />
              <img src={paneer} style={imgStyle} width={"70%"} /> <br />
              <br />
              {t("step25")} <br />
              <br />
              <br />
              <br />
            </Typography>
          </div>
          <div></div>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductRecommendationHelp;
