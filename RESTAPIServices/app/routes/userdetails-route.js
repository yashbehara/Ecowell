import express from "express";
import * as userDetailsController from "../controllers/userdetails-controller.js";

const router = express.Router();

router
  .route("/")
  // @route         POST /
  // @desc          Create a new user profile
  // @access        public
  .post(userDetailsController.createNewUserProfile)

  // @route         GET /
  // @query-params  first_name,last_name,email
  // @desc          Get a user profile
  // @access        public
  .get(userDetailsController.getUserProfile)

  // @route         PUT /
  // @query-params  first_name,last_name,email
  // @desc          Update a user profile
  // @access        private
  .put(userDetailsController.updateUserProfile);

export default router;
