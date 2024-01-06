import React from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/store";
import Home from "./containers/Home";
import { APP_ROUTES } from "constants/constants";
import ForumPage from "./containers/ForumPage";
import RecipesPage from "containers/RecipesPage";
import Landing from "./containers/LandingPage";
import SignUp from "containers/SignUp/SignUp";
import ProductDetails from "./components/ProductDetails";
import ProductRecommendations from "./components/ProductRecommendations";
import Navbar from "components/Navbar";
import UpdateUserProfile from "containers/UpdateUserProfile";

//import for Help center routing and sub-routing
import HelpCenterOverview from "components/HelpCenter/HelpCenterOverview";
import HelpGuide from "components/HelpCenter/HelpGuide";

const App: React.FC = () => {
  const store = configureStore();

  return (
    <>
      {/* Redux and Saga Wrapper */}
      <Provider store={store}>
        <Navbar />
        {/* Route based container/component mapping/config */}
        <Routes>
          <Route path={APP_ROUTES.LANDING_ROUTE} element={<Landing />} />
          <Route path={APP_ROUTES.HOMEPAGE_ROUTE} element={<Home />} />
          <Route
            path={APP_ROUTES.PRODUCT_DETAILS_ROUTE}
            element={<ProductDetails />}
          />
          <Route
            path={APP_ROUTES.COMMUNITY_FORUM_ROUTE}
            element={<ForumPage />}
          />
          <Route
            path={`${APP_ROUTES.RECIPES_PAGE_ROUTE}/:productName`}
            element={<RecipesPage />}
          />
          <Route path={APP_ROUTES.SIGNUP_ROUTE} element={<SignUp />} />
          <Route
            path={`${APP_ROUTES.PRODUCT_DETAILS_ROUTE}/:productId`}
            element={<ProductDetails />}
          />
          <Route
            path={`${APP_ROUTES.PRODUCT_RECOMMENDATIONS}/:stringValue`}
            element={<ProductRecommendations />}
          />
          <Route
            path={APP_ROUTES.HELP_CENTER_ROUTE}
            element={<HelpCenterOverview />}
          />
          <Route
            path={`${APP_ROUTES.HELP_CENTER_ROUTE}/:helpType`}
            element={<HelpGuide />}
          />
          <Route
            path={APP_ROUTES.PRODUCT_DETAILS_ROUTE}
            element={<ProductDetails />}
          />
          <Route
            path={APP_ROUTES.COMMUNITY_FORUM_ROUTE}
            element={<ForumPage />}
          />
          <Route
            path={APP_ROUTES.RECIPES_PAGE_ROUTE}
            element={<RecipesPage />}
          />
          <Route path={APP_ROUTES.SIGNUP_ROUTE} element={<SignUp />} />
          <Route
            path={`${APP_ROUTES.PRODUCT_RECOMMENDATIONS}/:stringValue`}
            element={<ProductRecommendations />}
          />
          <Route
            path={APP_ROUTES.HELP_CENTER_ROUTE}
            element={<HelpCenterOverview />}
          />
          <Route
            path={APP_ROUTES.HELP_CENTER_ROUTE_PRODUCTANALYSIS}
            element={<HelpGuide />}
          />

          <Route
            path={APP_ROUTES.UPDATE_PROFILE}
            element={<UpdateUserProfile />}
          />
          {/* Default route to handle wild card routes  */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </Provider>
    </>
  );
};

export default App;
