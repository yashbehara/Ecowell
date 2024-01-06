import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { CardMedia, Stack } from "@mui/material";
import commImg from "assets/community.png";

/* Community Forum component */
const CommunityForum: FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
      margin={5}
      maxWidth={800}
      marginX="auto"
    >
      <CardMedia
        component="img"
        height="140"
        image={commImg}
        alt="Community Image"
      />
      <Typography variant="h3" mt={4} mb={2} textAlign="center">
        Join our Community!
      </Typography>
      <Typography variant="body1" mb={4} textAlign="center">
        Connect with others, ask questions, and share your knowledge!
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/community-forum"
        
      >
        Join Now
      </Button>
    </Box>
  );
};

export default CommunityForum;
