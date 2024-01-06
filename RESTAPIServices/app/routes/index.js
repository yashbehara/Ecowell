import homePageRouter from "./homePage-route.js";
import forumPostRouter from "../routes/forumpost-route.js";
import userDetailsRouter from "./userdetails-route.js";
import feedbackRouter from './feedback-routes.js';
import favoriteRouter from './favorite-routes.js';

// Register the routes
export default (app) => {
  app.use("/homePageData", homePageRouter);
  app.use("/community-forum/posts", forumPostRouter);
  app.use("/user-details", userDetailsRouter);
  app.use('/feedback',feedbackRouter);
  app.use('/favorites',favoriteRouter);
   
}



//make first last and email non editable after creation as they are the PK combo
