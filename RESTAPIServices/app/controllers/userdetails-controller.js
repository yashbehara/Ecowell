import * as UserDetailsService from "../services/userdetails-service.js";
import * as ErrorHandlers from "./response-handler.js";

// Controller to create a new user profile
export const createNewUserProfile = async (req, res) => {
  try {
    const newProfileData = { ...req.body };
    if (Object.keys(newProfileData).length === 0) {
      return ErrorHandlers.invalidRequestFromClient(res);
    }
    const existingProfile = await UserDetailsService.getUserProfile(
      newProfileData?.Personal_Details
    );
    if (existingProfile != null) {
      return ErrorHandlers.resourceAlreadyExists(res);
    }
    const createdProfile = await UserDetailsService.createNewUserProfile(
      newProfileData
    );
    ErrorHandlers.setResponse(createdProfile, res);
  } catch (err) {
    console.log(err);
    ErrorHandlers.setErrorResponse(err, res);
  }
};

// Controller to fetch a user profile
export const getUserProfile = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.query;
    if (!first_name || !last_name || !email) {
      return ErrorHandlers.invalidRequestFromClient(res);
    }
    const personalDetailsFromQuery = {
      First_Name: first_name,
      Last_Name: last_name,
      Email_Address: email,
    };
    const fetchedProfile = await UserDetailsService.getUserProfile(
      personalDetailsFromQuery
    );
    if (!fetchedProfile) {
      return ErrorHandlers.setResponse([], res);
    }
    ErrorHandlers.setResponse(fetchedProfile, res);
  } catch (err) {
    ErrorHandlers.setErrorResponse(err, res);
  }
};

// Controller to update a user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.query;
    const updatedProfileData = { ...req.body };
    if (
      !first_name ||
      !last_name ||
      !email ||
      Object.keys(updatedProfileData).length === 0
    ) {
      return ErrorHandlers.invalidRequestFromClient(res);
    }
    const personalDetailsFromQuery = {
      First_Name: first_name,
      Last_Name: last_name,
      Email_Address: email,
    };

    const updatedProfile = await UserDetailsService.updateUserProfile(
      personalDetailsFromQuery,
      updatedProfileData
    );

    if (!updatedProfile) {
      return ErrorHandlers.notFoundResponse(res);
    }

    ErrorHandlers.setResponse(updatedProfile, res);
  } catch (err) {
    ErrorHandlers.setErrorResponse(err, res);
  }
};
