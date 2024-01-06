import userDetailsModel from "../models/userDetailsModel.js";

// service to save a user profile created 
export const createNewUserProfile = async (newUserProfile) => {
  console.log("newUserProfile", newUserProfile);
  const newProfile = new userDetailsModel(newUserProfile);
  return await newProfile.save();
};

// service to update a user profile 
export const updateUserProfile = async (
  personalDetails,
  updatedUserProfile
) => {
  const { First_Name, Last_Name, Email_Address } = personalDetails;
  const updatedProfile = await userDetailsModel
    .findOneAndUpdate(
      {
        "Personal_Details.First_Name": First_Name,
        "Personal_Details.Last_Name": Last_Name,
        "Personal_Details.Email_Address": Email_Address,
      },
      updatedUserProfile,
      { new: true }
    )
    .exec();
  return updatedProfile;
};

// service to fetch a user profile 
export const getUserProfile = async (personalDetails) => {
  const { First_Name, Last_Name, Email_Address } = personalDetails;
  const foundProfile = await userDetailsModel
    .findOne({
      "Personal_Details.First_Name": First_Name,
      "Personal_Details.Last_Name": Last_Name,
      "Personal_Details.Email_Address": Email_Address,
    })
    .exec();
  return foundProfile;
};
