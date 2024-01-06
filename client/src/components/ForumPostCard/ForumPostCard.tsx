import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import forumPostCardModel from "models/forumPostCardModel";

/* Forum Post Card component */
const ForumPostCard: React.FC<forumPostCardModel> = ({
  post,
  handleDelete,
  handleEdit,
  isExpanded,
  handleExpandClick,
  userId,
}) => {
  if (!post) {
    return null;
  }

  const renderImage = () => {
    if (!post.image) {
      return undefined; 
    }

    if (typeof post.image === "string") {
      return post.image;
    } else if ("data" in post.image) {
      return `data:${post.image.contentType};base64,${Buffer.from(
        post.image.data
      ).toString("base64")}`;
    }

    return undefined;
  };
  const showEditDelete = post.authorId === userId;
  return (
    <Card
      sx={{
        marginBottom: 2,
        boxShadow: 1,
        borderRadius: "8px",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(103, 58, 183, 0.25)",
        },
        backgroundColor: "#F3E5F5",
      }}
    >
      {/* CardMedia for post image */}
      {post.image && (
        <CardMedia
          component="img"
          image={renderImage()}
          alt={post.postTitle}
          sx={{
            height: 140,
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />
      )}
      {/* Content */}
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#EDE7F6",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", color: "#5E35B1" }}
        >
          {post.postTitle}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "0.875rem",
            marginTop: "0.5rem",
            color: "#3F51B5",
          }}
        >
          {isExpanded
            ? post.postDescription
            : `${post.postDescription.substring(0, 100)}...`}
        </Typography>
        <Typography
          variant="caption"
          display="block"
          sx={{ color: "text.secondary" }}
        >
          By {post.authorName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Last updated:{" "}
          {post.lastUpdatedDate
            ? new Date(post.lastUpdatedDate).toLocaleDateString()
            : "Not available"}
        </Typography>
      </CardContent>
      {/* Actions */}
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0.5rem",
          backgroundColor: "#E8EAF6",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {showEditDelete && handleEdit && (
            <Tooltip title="Edit">
              <IconButton
                aria-label="edit"
                sx={{ color: "#303F9F" }}
                onClick={() => handleEdit(post)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {showEditDelete && handleDelete && (
            <Tooltip title="Delete">
              <IconButton
                aria-label="delete"
                sx={{ color: "#303F9F" }}
                onClick={() => handleDelete(post._id as string)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Tooltip title="Expand">
          <IconButton
            onClick={() => handleExpandClick(post._id as string)}
            aria-expanded={isExpanded}
            aria-label="show more"
            sx={{
              transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.3s",
              color: "#5C6BC0", 
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ForumPostCard;
