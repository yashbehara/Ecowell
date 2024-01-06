import { produce } from "immer";
import { CLEAR_STORE, STORE_USER_PROFILE } from "constants/actionTypes";

//user login details reducer
const initialState = {
  userHealthDetails: {},
  showLoader: false,
};

const UserHealthDetailsReducer = produce((draft, action) => {
  switch (action.type) {
    case STORE_USER_PROFILE:
      return {
        ...draft,
        userHealthDetails: action?.payload?.userHealthDetails,
      };
    case CLEAR_STORE:
        return {...initialState}  
    default:
      return draft;
  }
}, initialState);

export default UserHealthDetailsReducer;
