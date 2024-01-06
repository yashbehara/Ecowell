import { takeLatest } from "redux-saga/effects";
import {
  WATCH_USER_DETAILS,
  POST_USER_DETAILS,
  WATCH_UPDATE_USER_DETAILS,
} from "constants/actionTypes";
import { storeUserDetails } from "actions/LandingPageActions";
import { postUserDetails } from "actions/UserSignUpActions";
import { updateUserProfileDetails } from "actions/HomePageActions";

//landingpage saga
export function* watchLandingPageSaga() {
  yield takeLatest([WATCH_USER_DETAILS], storeUserDetails);
}

export function* watchUserSignUpSaga() {
  yield takeLatest([POST_USER_DETAILS], postUserDetails);
}

export function* watchUserProfileUpdateSaga() {
  yield takeLatest([WATCH_UPDATE_USER_DETAILS], updateUserProfileDetails);
}
