import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import * as jwtDecode from "jwt-decode";
import {
  dispatchWatchUserDetails,
  dispatchShowLoader,
} from "store/actionCreators/LandingPageActionCreators";

const GoogleOAuthHandler: React.FC = () => {
  interface GoogleOAuthResponse {
    credential?: string;
  }

  interface GoogleOAuthError {
    error: string;
    details: string;
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const responseMessage = (response: GoogleOAuthResponse) => {
    const token = response?.credential;
    if (token) {
      //redux action dispatcher and saga listener
      dispatch(dispatchShowLoader());
      const userDetails = jwtDecode.jwtDecode(token);
      //local storage
      localStorage.setItem("account-details", JSON.stringify(userDetails));
      dispatch(dispatchWatchUserDetails({ userDetails, navigate }));
    } else {
      console.error("Token not found in Google OAuth response");
    }
  };
  const errorMessage = (error: GoogleOAuthError) => {
    console.log(error);
  };

  //google oauth component
  return (
    <div>
      <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
    </div>
  );
};
export default GoogleOAuthHandler;
