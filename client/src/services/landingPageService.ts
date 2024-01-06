import LandingPage from "../models/landingPageModel";
import * as restService from "../services/baseService";

const courseResourcePath = "/homePageData/";

/* Service to fetch home page data */
export const getHomePageData = async (): Promise<LandingPage> => {
  const landingPageData = await restService.getData<LandingPage>(
    courseResourcePath,
    {}
  );
  return landingPageData;
};
