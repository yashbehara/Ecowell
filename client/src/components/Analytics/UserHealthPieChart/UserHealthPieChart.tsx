import React, { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type GraphDataItem = {
  id: number;
  value: number;
  label: string;
};

const UserHealthPieChart = () => {
  const [graphData, setGraphData] = useState<GraphDataItem[]>([]);
  //get user health data from reducer
  const userHealthDetails = useSelector(
    (state: any) => state.UserHealthDetailsReducer.userHealthDetails
  );

  const extractNumericValue = (str: string) => {
    return parseInt(str.replace(/kg$/, ""));
  };

  useEffect(() => {
    if (userHealthDetails?.Physical_Details) {
      setGraphData([
        {
          id: 1,
          value: extractNumericValue(
            userHealthDetails.Physical_Details.Skeletal_Mass
          ),
          label: "Skeletal Mass",
        },
        {
          id: 2,
          value: extractNumericValue(
            userHealthDetails.Physical_Details.Fat_Mass
          ),
          label: "Fat Mass",
        },
        {
          id: 3,
          value: extractNumericValue(
            userHealthDetails.Physical_Details.Water_Mass
          ),
          label: "Water Mass",
        },
      ]);
    }
  }, [userHealthDetails]);

  //health based pie chart component
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="#f2f2f2"
      borderRadius="8px"
      padding="16px"
    >
      <Typography variant="h6" color="#333" gutterBottom>
        Health Composition
      </Typography>
      <PieChart
        series={[
          {
            data: graphData,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={200}
      />
    </Box>
  );
};

export default UserHealthPieChart;
