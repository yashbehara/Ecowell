import { call } from "redux-saga/effects";
import { BACKEND_HOST, BACKEND_PATHS } from "constants/constants";
import request from "helpers/request";

//api wrapper to update user health details
export function* updateUserProfileDetails(parameters: any, headers: any): any {
  try {
    return yield call(
      request.put,
      `${BACKEND_HOST.LOCAL_HOST}${BACKEND_PATHS.USER_DETAILS}?first_name=${parameters?.Personal_Details?.First_Name}&last_name=${parameters?.Personal_Details?.Last_Name}&email=${parameters?.Personal_Details?.Email_Address}`,
      parameters,
      headers
    );
  } catch (err) {
  }
}
