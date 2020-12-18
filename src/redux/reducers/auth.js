import { userActionTypes } from "../types/auth";

const INITIAL_STATE = {
  currentUser: null,
  token: null,
  expiration: null,
  error: null,
};

const authReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        token: null,
        expiration: null,
        error: null,
        loading: false,
      };

    case userActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: { ...actions.payload.user },
        token: actions.payload.token,
        expiration: actions.payload.expiration,
        error: null,
        loading: false,
      };

    case userActionTypes.AUTH_FAILURE:
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };

    case userActionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case userActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
