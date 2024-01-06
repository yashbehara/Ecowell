import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import favImg from "./../../assets/abc1.png";
import home from "./../../assets/abcSans.png";
import ToggleLanguage from "./ToggleLanguage";
import loginimage from "./../../assets/loginNew.png";
import image from "./../../assets/product_id .png";
import { APP_ROUTES } from "constants/constants";
import BackgroundImg from "../../assets/Refreshed pics/blog_bg.jpg";

const FavouriteRecipe: FC = () => {
  const { t } = useTranslation("common");
  const { helpType } = useParams();
  const imgStyle = {
    borderRadius: "1.5rem",
    width: "70%",
  };

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

  //favorite recipe component
  return (
    <Box style={{ backgroundImage: `url(${BackgroundImg})` }}>
      <Stack ml={3} mt={4}>
        <Typography variant="h2" mt={10} color={"#581845"}>
          <Stack ml={150}>
            {/* Component called for language toggle */}
            <ToggleLanguage />
          </Stack>
          {t("title3")}
        </Typography>
        <Stack display={"flex"} direction={"row"}>
          <div>
            <Typography variant="h5" mt={5}>
              {t("step31")} <br />
              <br />
              <img src={loginimage} width={"70%"} style={imgStyle} /> <br />
              {t("step32")} <br />
              <br />
              <img src={favImg} width={"70%"} style={imgStyle} /> <br />
              <br />
              {t("step33")} <br />
              <br />
              {t("step34")} <br />
              <br />
              <img src={home} width={"70%"} style={imgStyle} /> <br />
              <br />
              {t("step35")} <br />
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

export default FavouriteRecipe;
