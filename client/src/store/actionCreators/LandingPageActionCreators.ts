import {
  WATCH_USER_DETAILS,
  SHOW_LOADER,
  DISABLE_LOADER,
  POST_USER_DETAILS,
  CLEAR_STORE,
  WATCH_UPDATE_USER_DETAILS,
} from "constants/actionTypes";


//saga watchers
export const dispatchWatchUserDetails = ({ userDetails, navigate }: { userDetails: any; navigate: any }) => ({
  type: WATCH_USER_DETAILS,
  payload: {
    userDetails,
    navigate,
  },
});

export const dispatchShowLoader = () => ({
  type: SHOW_LOADER,
});

export const dispatchDisableLoader = () => ({
  type: DISABLE_LOADER,
});

export const dispatchPostUserDetails = ({ userDetails, navigate }: { userDetails: any; navigate: any }) => ({
  type: POST_USER_DETAILS,
  payload: {
    userDetails,
    navigate,
  },
});

export const dispatchClearStore = () => ({
  type: CLEAR_STORE,
});

export const dispatchUpdateUserDetails = ({ userDetails, navigate }: { userDetails: any; navigate: any }) => ({
  type: WATCH_UPDATE_USER_DETAILS,
  payload: {
    userDetails,
    navigate,
  },
});