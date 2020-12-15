// import { store } from "../redux/store";
// import { signOutSuccess } from "../redux/actions/auth";

export const sendRequest = async (
  url,
  method = "GET",
  headers,
  body = null
) => {
  try {
    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers,
    });

    if (response.status === 205) {
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

//////////////////////////////////////////////////////////////
// SIGN IN ///////////////////////////////////////////////////

export const signInWithEmailAndPassword = async (user) => {
  const data = await sendRequest(
    "http://localhost:5000/users/login",
    "POST",
    { "Content-Type": "application/json" },
    user
  );

  return data;
};

export const signInWithGoogle = async (tokenId) => {
  const data = await sendRequest(
    "http://localhost:5000/users/login/google",
    "POST",
    { "Content-Type": "application/json" },
    { tokenId }
  );

  return data;
};

///////////////////////////////////////////////////////////////
// CREATE USER ////////////////////////////////////////////////

export const signUpRequest = async (user) => {
  const data = await sendRequest(
    "http://localhost:5000/users",
    "POST",
    { "Content-Type": "application/json" },
    user
  );

  return data;
};

////////////////////////////////////////////////////////////////
// SIGN OUT ////////////////////////////////////////////////////

export const signOutRequest = async (id, token) => {
  return await sendRequest(
    "http://localhost:5000/users/logout",
    "POST",
    { "Content-Type": "application/json" },
    { id, token }
  );
};
