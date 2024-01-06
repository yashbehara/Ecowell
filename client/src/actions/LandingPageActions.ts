import { put, call, select } from "redux-saga/effects";
import { STORE_USER_DETAILS, STORE_USER_PROFILE } from "constants/actionTypes";
import { fetchUserProfileDetails as fetchUserProfileDetailsApi } from "api/getUserProfileApi";
import {APP_ROUTES} from 'constants/constants';

//saga generator to store user details from google o auth
export function* storeUserDetails(action: {
  payload: { userDetails: any; navigate: any };
}) {
  yield put({
    type: STORE_USER_DETAILS,
    payload: {
      userDetails: action?.payload?.userDetails,
    },
  });
  yield call(getUserProfile, action?.payload?.navigate);
}

export function* getUserProfile(navigate: (arg0: string) => void) {
  try {
    const { family_name, given_name, email } = yield select(
      (state) => state.LandingPageReducer.userDetails
    );
    const { data } = yield call(fetchUserProfileDetailsApi, {
      firstName: given_name,
      lastName: family_name,
      email,
    }) || [];
    yield put({
      type: STORE_USER_PROFILE,
      payload: {
        userHealthDetails: data,
      },
    });
  if (data.length != 0) {
      navigate(APP_ROUTES.HOMEPAGE_ROUTE);
    } else {
      navigate(APP_ROUTES.SIGNUP_ROUTE);
    }  
  } catch (err) {
    yield console.error(err);
  }
}
