import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

//application footer component
const Footer = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundColor: "#8f5d74",
        padding: "20px",
        color: "white",
        justifyContent: "center",
      }}
    >
      <Grid
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        item
        xs={12}
        md={4}
      >
        <Typography variant="h6" sx={{ color: "#fff" }}>
          EcoWell
        </Typography>
        <Typography variant="body2">
          Your source for eco-friendly living.
        </Typography>
      </Grid>
      <Grid
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        item
        xs={12}
        md={4}
      >
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Quick Links
        </Typography>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          <li>
            <Typography style={{ color: "white", textDecoration: "none" }}>
              About Us
            </Typography>
          </li>
          <li>
            <Typography style={{ color: "white", textDecoration: "none" }}>
              Contact Us
            </Typography>
          </li>
        </ul>
      </Grid>
      <Grid
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        item
        xs={12}
        md={4}
      >
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Connect with Us
        </Typography>
        <div>
          <IconButton
            component={Link}
            to="//twitter.com"
            target="_blank"
            style={{ color: "white" }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            component={Link}
            to="//facebook.com"
            target="_blank"
            style={{ color: "white" }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            component={Link}
            to="//instagram.com"
            target="_blank"
            style={{ color: "white" }}
          >
            <InstagramIcon />
          </IconButton>
        </div>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" sx={{ textAlign: "center", color: "#fff" }}>
          © {new Date().getFullYear()} EcoWell. All Rights Reserved.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
