import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import paneer from "./../../assets/palakPaneer.png";
import image from "./../../assets/worriedNutri.png";
import loginimage from "./../../assets/loginNew.png";
import paneerimage from "./../../assets/abc3.png";
import ToggleLanguage from "./ToggleLanguage";
import { APP_ROUTES } from "constants/constants";
import BackgroundImg from "../../assets/Refreshed pics/blog_bg.jpg";

const HelpProductAnalysis: FC = () => {
  const navigate = useNavigate();

  const userHealthDetails = useSelector(
    (state: any) => state.UserHealthDetailsReducer.userHealthDetails
  );
  //route protection
  useEffect(() => {
    if (
      localStorage.getItem("account-details") == null ||
      Object.keys(userHealthDetails).length == 0
    ) {
      navigate(APP_ROUTES.LANDING_ROUTE);
    }
  }, [navigate, userHealthDetails]);

  const { t } = useTranslation("common");
  const { helpType } = useParams();

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
          {t("title1")}
        </Typography>
        <Stack display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <div style={{ flex: 1 }}>
            <Typography variant="h5" mt={5}>
              {t("step1")} <br />
              <br />
              <img src={loginimage} alt="Login Step" style={imgStyle} /> <br />
              <br />
              {t("step2")} <br />
              <br />
              <img src={image} alt="Image Step" style={imgStyle} /> <br />
              <br />
              {t("step3")} <br />
              <br />
              {t("step4")} <br />
              <br />
              <img src={paneerimage} alt="Paneer Step" style={imgStyle} />{" "}
              <br />
              <br />
              {t("step5")} <br />
              <br />
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HelpProductAnalysis;
