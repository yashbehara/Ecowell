import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignUpForm from "components/SignUpForm";
import { APP_ROUTES } from "constants/constants";

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  //route protection
  const userHealthDetails = useSelector(
    (state: any) => state.UserHealthDetailsReducer.userHealthDetails
  );
  useEffect(() => {
    if (
      localStorage.getItem("account-details") == null ||
      Object.keys(userHealthDetails).length == 0
    ) {
      navigate(APP_ROUTES.LANDING_ROUTE);
    }
  }, [navigate, userHealthDetails]);
  //user profile update container
  return Object.keys(userHealthDetails).length != 0 ? (
    <div>
      <SignUpForm origin={"update"} />
    </div>
  ) : (
    <span></span>
  );
};

export default UpdateUserProfile;
