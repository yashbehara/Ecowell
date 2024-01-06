import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import image from "./../../assets/abcExpHome.png";
import image1 from "./../../assets/abcEx.png";
import ToggleLanguage from "./ToggleLanguage";
import loginimage from "./../../assets/loginNew.png";
import { APP_ROUTES } from "constants/constants";
import BackgroundImg from "../../assets/Refreshed pics/blog_bg.jpg";

// This component is called from 4th help card export
const ExportHelp: FC = () => {
  const { t } = useTranslation("common");
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
          {t("title4")}
        </Typography>
        <Stack>
          <div>
            <Typography variant="h5" mt={5}>
              {t("step41")} <br />
              <br />
              <img src={loginimage} width={"70%"} style={imgStyle} /> <br />
              <br />
              {t("step42")} <br />
              <br />
              <img
                src={image}
                width={1030}
                height={500}
                style={imgStyle}
              />{" "}
              <br />
              <br />
              {t("step43")} <br />
              <br />
              {t("step44")} <br />
              <br />
              {t("step45")} <br />
              <br />
              <img
                src={image1}
                width={1030}
                height={"20%"}
                style={imgStyle}
              />{" "}
              <br /> <br />
              <br />
              <br />
            </Typography>
          </div>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ExportHelp;
