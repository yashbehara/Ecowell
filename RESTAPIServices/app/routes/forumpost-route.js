import express, { request } from "express";

// Import controllers
import * as ForumPostController from "../controllers/forumpost-controller.js";

const router = express.Router();

// Routes for community forum posts
  // @route         POST / GET /
  // @desc          Create and get community forum posts
  // @access        public
router.route("/").get(ForumPostController.find).post(ForumPostController.post);

  // @route         POST / GET /
  // @desc          get community forum post by postId
  // @access        public
router
  .route("/:postId")
  .put(ForumPostController.put)
  .delete(ForumPostController.remove)
  .get(ForumPostController.findById);
export default router;
