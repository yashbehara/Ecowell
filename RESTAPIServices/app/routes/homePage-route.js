import express from 'express';
import * as homePageController from '../controllers/homePage-controller.js';

const router = express.Router();

// Routes for home page data
  // @route         GET /
  // @desc          Get home page data
  // @access        public
router.route('/')
    .get(homePageController.find);

router.route('/subscribe')
    .post(homePageController.post);


// router.route('/:id')
//     .get(homePageController.get)
//     .put(homePageController.put)

export default router;