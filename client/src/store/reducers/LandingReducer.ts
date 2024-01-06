import { produce } from "immer";
import { STORE_USER_DETAILS, SHOW_LOADER, CLEAR_STORE } from "constants/actionTypes";

//landing page reducer
const initialState = {
  userDetails: {},
  showLoader: false,
};

const LandingPageReducer = produce((draft, action) => {
  switch (action.type) {
    case STORE_USER_DETAILS:
      return {
        ...draft,
        userDetails: action?.payload?.userDetails,
      };
    // case SHOW_LOADER:
    //   return { ...draft, showLoader: true };
    case CLEAR_STORE:
      return {...initialState}
    default:
      return draft;
  }
}, initialState);

export default LandingPageReducer;
