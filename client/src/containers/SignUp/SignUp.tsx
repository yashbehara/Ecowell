import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignUpForm from "components/SignUpForm";
import { APP_ROUTES } from "constants/constants";

const SignUp = () => {
  //route protection
  const userDetails =
    useSelector((state: any) => state.LandingPageReducer.userDetails) || {};
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("account-details") == null ||
      Object.keys(userDetails).length == 0
    ) {
      navigate(APP_ROUTES.LANDING_ROUTE);
    }
  }, [navigate]);
  //user sign up container
  return Object.keys(userDetails).length != 0 ? (
    <div>
      <SignUpForm origin={"signup"} />
    </div>
  ) : (
    <span></span>
  );
};

export default SignUp;
