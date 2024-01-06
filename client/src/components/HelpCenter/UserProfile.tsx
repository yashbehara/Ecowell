import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import image from "./../../assets/abcProfileUp.png";
import image1 from "./../../assets/abcicone.png";
import ToggleLanguage from "./ToggleLanguage";
import loginimage from "./../../assets/loginNew.png";
import { APP_ROUTES } from "constants/constants";
import BackgroundImg from "../../assets/Refreshed pics/blog_bg.jpg";

const UserProfile: FC = () => {
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
          {t("title6")}
        </Typography>
        <Stack>
          <div>
            <Typography variant="h5" mt={5}>
              {t("step61")} <br />
              <br />
              <img src={loginimage} width={"70%"} style={imgStyle} /> <br />
              <br />
              {t("step62")} <br />
              <br />
              <img src={image1} style={imgStyle} /> <br /> <br />
              {t("step63")} <br />
              <br />
              {t("step64")} <br />
              <br />
              <img src={image} width={"65%"} style={imgStyle} /> <br />
              <br />
              {t("step65")} <br />
              <br />
              <br />
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserProfile;
