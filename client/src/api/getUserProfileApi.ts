import { call } from "redux-saga/effects";
import { BACKEND_HOST, BACKEND_PATHS } from "constants/constants";
import request from "helpers/request";

//api wrapper to get user health profile
export function* fetchUserProfileDetails(parameters: { firstName: string; lastName: string; email: string; }):any {
  try {
    return yield call(
      request.get,
      `${BACKEND_HOST.LOCAL_HOST}${BACKEND_PATHS.USER_DETAILS}?first_name=${parameters?.firstName}&last_name=${parameters?.lastName}&email=${parameters?.email}`
    );
  } catch (err) {
    console.error(err);
  }
}
