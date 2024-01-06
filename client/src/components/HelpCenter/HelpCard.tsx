import React, { FC, ReactElement } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { Stack } from "@mui/material";

type Props = {
  index: number;
  title: string;
  cardColor: any;
  description: string;
  redirectFn: any;
  routeParam: string;
};

//help card component
const HelpCard: FC<Props> = (props: Props): ReactElement => {
  return (
    <Card
      sx={{
        minWidth: 275,
        borderTop: 10,
        mb: 3,
        mr: 3,
        color: props.cardColor,
        cursor: "pointer",
        "&:hover": {
          background: "#E7E7E7",
        },
      }}
    >
      <CardContent>
        <Stack display={"flex"} direction="row">
          <Typography variant="h3" component="div">
            {props.index}
          </Typography>
          <Typography variant="h5" component="div" ml={2} mt={2}>
            {props.title}
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => props.redirectFn(props.routeParam)}>
          Show more
        </Button>
      </CardActions>
    </Card>
  );
};

export default HelpCard;
