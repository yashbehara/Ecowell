import React from "react";
import { Typography, Paper, Container, Grid } from "@mui/material";
import GoogleOAuthHandler from "components/GoogleOAuthHandler";
interface LivePageData {
  "Total Users": number;
  "Community Posts": number;
  "Total Recipes": number;
}

interface UserSignUpProps {
  livePageData: LivePageData[];
}

//user sign up section component
const UserSignUpCard: React.FC<UserSignUpProps> = ({ livePageData }) => {
  const userMetric =
    livePageData.length > 0 ? livePageData[0]["Total Users"] : "Loading...";

  return (
    <Container
      maxWidth="md"
      style={{ position: "relative", minHeight: "30vh" }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
          background: "rgba(255, 255, 255, 0.9)",
        }}
      >
        {/* <img src={SmallImage} alt="Small Image" style={{ width: "50px", marginBottom: "1rem" }} /> */}
        <Typography variant="h4" sx={{ mt: 2, color: "#581845" }}>
          Join Our Community
        </Typography>
        <Typography variant="h6" sx={{ color: "#581845" }}>
          Be part of the eco-friendly movement
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <GoogleOAuthHandler />
          </Grid>
          {/* <Grid item xs={12}>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              Already have an account? <a href="/login">Log in</a>
            </Typography>
          </Grid> */}
        </Grid>
        {/* <Typography variant="body1" sx={{ mt: 4 }}>
          Total Users: {userMetric}
        </Typography> */}
      </Paper>
    </Container>
  );
};

export default UserSignUpCard;
