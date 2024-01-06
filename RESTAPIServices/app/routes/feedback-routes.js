import express from 'express';
import * as feedbackController from '../controllers/feedback-controllers.js';

const router= express.Router();

// Routes for user feedback
  // @route         POST / GET /
  // @desc          Create and get user feedback
  // @access        public
router.route('/')
    .get(feedbackController.get)
    .post(feedbackController.post)
    

//id for delete- for future use case
  // @route         GET /
  // @desc          Get a specific user feedback by id
  // @access        public
router.route('/:id')
    .delete(feedbackController.remove);

export default router;