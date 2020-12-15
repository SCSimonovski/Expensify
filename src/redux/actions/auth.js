import { userActionTypes } from "../types/auth";
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOutRequest,
  signUpRequest,
} from "../../api/auth-api";

export const signInWithEmailStart = (emailAndPassword) => {
  return async (dispatch) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        emailAndPassword
      );
      dispatch(signInSuccess(userCredentials));
    } catch (e) {
      dispatch(authFailure(e.message));
    }
  };
};

export const signInWithGoogleStart = (tokenId) => {
  return async (dispatch) => {
    try {
      const userCredentials = await signInWithGoogle(tokenId);
      dispatch(signInSuccess(userCredentials));
    } catch (e) {
      dispatch(authFailure(e.message));
    }
  };
};

export const signInSuccess = (userCredentials) => {
  userCredentials.expiration = new Date(
    new Date().getTime() + 60 * 60 * 1000
  ).toISOString();
  return {
    type: userActionTypes.SIGN_IN_SUCCESS,
    payload: userCredentials,
  };
};

// // SIGN OUT ////////////////////////////////////////

export const signOutStart = () => {
  return async (dispatch, getState) => {
    const { token, currentUser } = getState().auth;
    try {
      if (!token) {
        throw new Error("There's no authenticated user");
      }

      await signOutRequest(currentUser.id, token);
      dispatch(signOutSuccess());
    } catch (e) {
      dispatch(authFailure(e.message));
    }
  };
};

export const signOutSuccess = () => ({
  type: userActionTypes.SIGN_OUT_SUCCESS,
});

// // SIGN UP /////////////////////////////////////////

export const signUpStart = (newUser) => {
  return async (dispatch) => {
    try {
      const userCredentials = await signUpRequest(newUser);
      dispatch(signUpSuccess(userCredentials));
      dispatch(signInSuccess(userCredentials));
    } catch (e) {
      dispatch(authFailure(e.message));
    }
  };
};

export const signUpSuccess = (userCredentials) => ({
  type: userActionTypes.SIGN_UP_SUCCESS,
  payload: userCredentials,
});

// FAILURE ////////////////////////////////////////////

export const authFailure = (error) => {
  return {
    type: userActionTypes.AUTH_FAILURE,
    payload: error,
  };
};

// CLEAR ERROR ////////////////////////////////////////

export const clearError = () => ({
  type: userActionTypes.CLEAR_ERROR,
});
