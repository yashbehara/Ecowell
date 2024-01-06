import React from "react";
import { Typography, Grid, Box, Paper } from "@mui/material";
import CountUp from "react-countup";
import Users from "../../../assets/Refreshed pics/users.png";
import Recipes from "../../../assets/Refreshed pics/rename.png";
import Posts from "../../../assets/Refreshed pics/posts.png";

interface FastFactsProps {
  livePageData: {
    "Total Users": number;
    "Community Posts": number;
    "Total Recipes": number;
  }[];
}

type MetricKeys = "Total Users" | "Total Recipes" | "Community Posts";

const assignIcon: { [key in MetricKeys]: string } = {
  "Total Users": Users,
  "Total Recipes": Recipes,
  "Community Posts": Posts,
};

const MetricCard = ({
  iconUrl,
  title,
  data,
}: {
  iconUrl: string;
  title: string;
  data?: number;
}) => {
  if (!iconUrl) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        textAlign: "center",
      }}
    >
      <div style={{ flex: "50%" }}>
        <img src={iconUrl} alt={title} width={200} height={130} />
      </div>
      <div style={{ flex: "50%", paddingLeft: "1rem" }}>
        <Typography variant="h6" sx={{ marginTop: 1 }}>
          {title}
        </Typography>
        <Typography variant="body1">
          <CountUp start={0} end={data || 0} duration={10} delay={5} />
        </Typography>
      </div>
    </Box>
  );
};

//live count component
const FastFacts: React.FC<FastFactsProps> = ({ livePageData }) => {
  type DataKey = keyof FastFactsProps["livePageData"][number];
  const metrics =
    livePageData && livePageData[0]
      ? Object.keys(livePageData[0]).map((key) => ({
          metric: key,
          data: livePageData[0][key as DataKey],
        }))
      : [];

  return (
    <Box position="relative" padding={4}>
      <Grid container spacing={6} justifyContent="center">
        {metrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              elevation={3}
              style={{ padding: 10, backgroundColor: "#FFFFF5" }}
            >
              <MetricCard
                iconUrl={assignIcon[metric.metric as MetricKeys]}
                title={metric.metric}
                data={metric.data}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FastFacts;
