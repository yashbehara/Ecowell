import React, { FC, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import CommunityForumLogo from "assets/cforum latest.png";
import {
  createForumPost,
  getForumPosts,
  updateForumPost,
  deleteForumPost,
} from "services/forumPost";
import forumPostModel from "models/forumPostModel";
import ForumPostCard from "components/ForumPostCard";
import { APP_ROUTES } from "constants/constants";

/* Community Forum Page where users can view all the posts, delete his own posts and update , create a post */
const ForumPage: FC = () => {
  /* set states */
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState<forumPostModel[]>([]);
  const [currentPost, setCurrentPost] = useState<forumPostModel | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [viewOwnPosts, setViewOwnPosts] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState<forumPostModel[]>([]);
  const navigate = useNavigate();

  /* get user details */
  const userHealthDetails = useSelector(
    (state: any) => state.UserHealthDetailsReducer.userHealthDetails || {}
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

  /* get user details from redux store */
  const userId = useSelector(
    (state: any) => state.UserHealthDetailsReducer.userHealthDetails._id
  );

  const userFirstName = useSelector(
    (state: any) =>
      state.UserHealthDetailsReducer.userHealthDetails.Personal_Details
        .First_Name
  );

  const userLastName = useSelector(
    (state: any) =>
      state.UserHealthDetailsReducer.userHealthDetails.Personal_Details
        .Last_Name
  );

  const userName = userFirstName + " " + userLastName;
  const userEmail = useSelector(
    (state: any) =>
      state.UserHealthDetailsReducer.userHealthDetails.Personal_Details
        .Email_Address
  );

  /* function to handle editing a forum post */
  const handleClickOpen = (postToEdit?: forumPostModel) => {
    setCurrentPost(
      postToEdit || {
        authorId: userId,
        authorName: userEmail,
        postTitle: "",
        postDescription: "",
        image: "",
      }
    );
    setOpen(true);
  };

  /* function to handle closing a forum post */
  const handleClose = () => {
    setOpen(false);
    setCurrentPost(null);
  };

  /* function to handle view all forum posts and user's posts */
  const toggleViewPosts = () => {
    if (viewOwnPosts) {
      /* If currently viewing own posts, show all posts */
      setFilteredPosts(posts);
    } else {
      /* If currently viewing all posts, filter to user's posts */
      setFilteredPosts(posts.filter((post) => post.authorId === userId));
    }
    setViewOwnPosts(!viewOwnPosts);
  };

  /* function to handle creating or updating a forum post */
  const handleNewOrUpdatePost = async () => {
    if (currentPost) {
      const postToSubmit = {
        ...currentPost,
        authorId: userId,
        authorName: userName,
        image: currentPost.image || "",
      };

      try {
        let updatedPost: any;
        if (currentPost._id) {
          updatedPost = await updateForumPost(currentPost._id, postToSubmit);
        } else {
          updatedPost = await createForumPost(postToSubmit);
        }

        /* Update posts state */
        const newPosts = currentPost._id
          ? posts.map((p) => (p._id === currentPost._id ? updatedPost : p))
          : [...posts, updatedPost];
        setPosts(newPosts);

        /* Update filteredPosts state */
        const newFilteredPosts = viewOwnPosts
          ? newPosts.filter((p) => p.authorId === userId)
          : newPosts;
        setFilteredPosts(newFilteredPosts);

        handleClose();
      } catch (error) {
        console.error("Error in post creation/update:", error);
      }
    }
  };

  /* function to handle deleting a forum post */
  const handleDeletePost = async (postId: string) => {
    try {
      await deleteForumPost(postId);
      const updatedPosts = posts.filter((post) => post._id !== postId);
      setPosts(updatedPosts);

      const updatedFilteredPosts = filteredPosts.filter(
        (post) => post._id !== postId
      );
      setFilteredPosts(updatedFilteredPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  /* function to handle expanding a forum post */
  const handleViewPost = (postId: string) => {
    setExpandedPostId((prevExpandedPostId) =>
      prevExpandedPostId === postId ? null : postId
    );
  };

  /* function to handle uploading image in a forum post */
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const base64Image = e.target.result as string;
          setCurrentPost((prevPost) => {
            if (prevPost) {
              return {
                ...prevPost,
                image: base64Image, // Store the image as base64
              };
            }
            return {
              authorId: "",
              authorName: "",
              postTitle: "",
              postDescription: "",
              image: base64Image,
            };
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getImageUrl = (image: any) => {
    if (typeof image === "string") {
      return image;
    } else if (image && image.data) {
      const base64Data =
        typeof image.data === "string"
          ? image.data
          : Buffer.from(image.data).toString("base64");
      return `data:${image.contentType};base64,${base64Data}`;
    }
    return "";
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts: forumPostModel[] = await getForumPosts();
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts); // Initially show all posts
    };
    fetchPosts();
  }, []);

  //form page container
  return (
    <div style={{ backgroundColor: "#cf9ecf" }}>
      <Container
        style={{ maxWidth: "xl", borderRadius: "1.5rem" }}
        sx={{ overflow: "hidden" }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          style={{ backgroundColor: "#7a347a", height: "500px" }}
        >
          {/* Image on the left */}
          <Grid item xs={12} md={6}>
            <img
              src={CommunityForumLogo}
              alt="Community Forum"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid>

          {/* Community title and buttons on the right */}
          <Grid item xs={12} md={6} style={{ textAlign: "center" }}>
            <Typography
              component="h1"
              variant="h3"
              color="#FFFFFF"
              gutterBottom
            >
              Ecowell Community
            </Typography>
            <Typography variant="h5" color="#FFFFFF" gutterBottom>
              Build the future of health and nutrition together
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={() => handleClickOpen()}
            >
              Create Post
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={toggleViewPosts}
            >
              {viewOwnPosts ? "View All Posts" : "View My Posts"}
            </Button>
          </Grid>
        </Grid>
        {/* Top Banner */}
        {/* Welcome Message */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to Ecowell Community Forum!
          </Typography>
          <Typography variant="subtitle1" align="center">
            This is the spot to ask questions, share ideas and swap stories with
            other community members.
          </Typography>
        </Box>

        {/* Feature Icons and Descriptions */}
        <Grid container spacing={4} justifyContent="center">
          {/* Icon and description #1 */}
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center"></Box>
          </Grid>

          {/* Icon and description #2 */}
        </Grid>
        {/* Posts List */}
        <Grid container spacing={4}>
          {filteredPosts.map((post) => (
            <Grid item xs={12} key={post._id}>
              <ForumPostCard
                post={post}
                handleDelete={handleDeletePost}
                handleEdit={() => handleClickOpen(post)}
                isExpanded={expandedPostId === post._id}
                handleExpandClick={() => handleViewPost(post._id as string)}
                userId={userId}
                lastUpdatedDate={post.lastUpdatedDate as Date}
              />
            </Grid>
          ))}
        </Grid>

        {/* Dialog for creating/updating a post */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            {currentPost?._id ? "Edit Post" : "New Post"}
          </DialogTitle>
          <DialogContent>
            <TextField required
              label="Post Title"
              fullWidth
              margin="normal"
              value={currentPost?.postTitle || ""}
              onChange={(e) =>
                setCurrentPost(
                  currentPost
                    ? {
                        ...currentPost,
                        postTitle: e.target.value,
                      }
                    : {
                        _id: "",
                        authorId: userId,
                        authorName: userName,
                        postTitle: e.target.value,
                        postDescription: "",
                        image: "",
                      }
                )
              }
            />

            <TextField required
              label="Post Description"
              fullWidth
              multiline
              rows={4}
              margin="normal"
              value={currentPost?.postDescription || ""}
              onChange={(e) =>
                setCurrentPost(
                  currentPost
                    ? {
                        ...currentPost,
                        postDescription: e.target.value,
                      }
                    : {
                        _id: "",
                        authorId: userId,
                        authorName: userName,
                        postTitle: "",
                        postDescription: e.target.value,
                        image: "",
                      }
                )
              }
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="contained" color="primary" component="span">
                Upload Image
              </Button>
            </label>
            {currentPost?.image && (
              <img
                src={getImageUrl(currentPost.image)}
                alt="Uploaded"
                style={{ maxWidth: "200px", height: "200px" }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="success">
              Cancel
            </Button>
            <Button onClick={handleNewOrUpdatePost} color="success">
              {currentPost?._id ? "Update" : "Post"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default ForumPage;
