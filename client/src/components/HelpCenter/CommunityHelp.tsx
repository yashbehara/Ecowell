import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import comm1 from "./../../assets/abcCom.png";
import comm2 from "./../../assets/createNewPost.png";
import ToggleLanguage from "./ToggleLanguage";
import loginimage from "./../../assets/loginNew.png";
import { APP_ROUTES } from "constants/constants";
import BackgroundImg from "../../assets/Refreshed pics/blog_bg.jpg";

// This component is used to display community related help center user HelpGuide.
const CommunityHelp: FC = () => {
  const { t } = useTranslation("common");
  const { helpType } = useParams();
  const imgStyle = {
    borderRadius: "1.5rem", // Add a border radius of 1.5rem to all images
    width: "70%",
  };

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

  return (
    <Box style={{ backgroundImage: `url(${BackgroundImg})` }}>
      <Stack ml={3} mt={4}>
        <Typography variant="h2" mt={10} color={"#581845"}>
          <Stack ml={150}>
            {/* Component called for language toggle */}
            <ToggleLanguage />
          </Stack>
          {t("title5")}
        </Typography>
        <Stack display={"flex"} direction={"row"}>
          <div>
            <Typography variant="h5" mt={5}>
              {t("step51")} <br />
              <br />
              <img src={loginimage} width={"70%"} style={imgStyle} /> <br />
              <br />
              {t("step52")} <br />
              <br />
              <img src={comm1} width={"70%"} style={imgStyle} /> <br />
              <br />
              {t("step53")} <br />
              <br />
              {t("step54")} <br />
              <br />
              <img src={comm2} width={"70%"} style={imgStyle} /> <br />
              <br />
              {t("step55")} <br />
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

export default CommunityHelp;
