import * as homePageService from "../services/homePage-service.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

// Controller to set up the home page data
export const find = async (request, response) => {
  try {
    const params = { ...request.query };
    const homePageData = await homePageService.search(params);
    setResponse(homePageData, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};

export const post = async (request, response) => {
  try {
    const mailSubscription = { ...request.body };
    const subscriberData = await homePageService.save(mailSubscription);
    setResponse(subscriberData, response);
  } catch (err) {
    setErrorResponse(err, response);
  }
};
