import { put, call, select } from "redux-saga/effects";
import { postUserProfileDetails as postUserProfileDetailsApi } from "api/postUserProfileDetailsApi";
import {FORM_DATA_MODEL,APP_ROUTES} from "constants/constants";
import {STORE_USER_PROFILE } from "constants/actionTypes";

//saga generator to store user health details
export function* postUserDetails(action: {
  payload: { userDetails: typeof FORM_DATA_MODEL; navigate: any };
}) {
  try {
    const { family_name, given_name, email } = yield select(
      (state) => state.LandingPageReducer.userDetails
    );
    const navigate = action?.payload?.navigate;
    const userDetails = action.payload.userDetails;

    const originalPayload = {
      Personal_Details: {
        First_Name: given_name,
        Last_Name: family_name,
        Email_Address: email,
        Age: parseInt(userDetails.Age),
      },
      Physical_Details: {
        Height: `${userDetails.Height}ft`,
        Weight: `${userDetails.Weight}kg`,
        BP_Level: {
          Upper_Limit: parseInt(userDetails.BP_Upper_Limit),
          Lower_Limit: parseInt(userDetails.BP_Lower_Limit),
        },
        Sugar_Level: {
          Upper_Limit: parseInt(userDetails.Sugar_Upper_Limit),
          Lower_Limit: parseInt(userDetails.Sugar_Lower_Limit),
        },
        Skeletal_Mass:`${userDetails?.Skeletal_Mass}kg`,
        Fat_Mass:`${userDetails.Fat_Mass}kg`,
        Water_Mass:`${userDetails.Water_Mass}kg`,
        Intended_Sugar_Limit:`${userDetails?.Intended_Sugar_Limit}gms`,
        Intended_Fat_Limit:`${userDetails?.Intended_Fat_Limit}gms`,
        Intended_Protein_Limit:`${userDetails?.Intended_Protein_Limit}gms`,
      },
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const { data } = yield call(
      postUserProfileDetailsApi,
      originalPayload,
      headers
    );
    yield put({
      type: STORE_USER_PROFILE,
      payload: {
        userHealthDetails: data,
      },
    });
      navigate(APP_ROUTES.HOMEPAGE_ROUTE);
  } catch (err) {
     return action?.payload?.navigate(APP_ROUTES.LANDING_ROUTE);
  }
}
