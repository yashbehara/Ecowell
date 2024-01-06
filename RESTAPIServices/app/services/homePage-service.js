import HomePage from "../models/homePage.js";
import userDetailsModel from "../models/userDetailsModel.js";
import favoritesModel from "../models/favorites.js";
import ForumPostModel from "../models/forumpost.js";

export const search = async (params = {}) => {
  // By default, the mongoose functions are not async..hence we are using exec funct to convert it to promise
  const homePageData = await HomePage.find(params).exec();
  const counts = [
    {
      "Total Users": (await userDetailsModel.countDocuments()) || 0,
      "Community Posts": (await ForumPostModel.countDocuments()) || 0,
      "Total Recipes": (await favoritesModel.countDocuments()) || 0,
    },
  ];

  return counts;
};

export const save = async (newSubscription) => {
  const newSubscriber = new Subscriber(newSubscription);
  console.log("New Subscriber", newSubscriber);
  await newSubscriber.save();
  return "You have successfully subscribed to the newsletter";
};
