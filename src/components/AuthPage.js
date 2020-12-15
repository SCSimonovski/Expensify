import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { HiCash } from "react-icons/hi";

import CustomButton from "./CustomButton";
import InputForm from "./InputForm";
import {
  signUpStart,
  signInWithEmailStart,
  signInWithGoogleStart,
  clearError,
} from "../redux/actions/auth";
import { startSetExpenses } from "../redux/actions/expenses";

import GoogleLogin from "react-google-login";
import { AiFillGoogleSquare } from "react-icons/ai";

const AuthPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const httpError = useSelector((state) => state.auth.error);

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(startSetExpenses());
      history.push("/dashboard");
    }
  }, [isAuthenticated, history, dispatch]);

  useEffect(() => {
    if (httpError) {
      const error = isSignUpMode
        ? "Unable to create an account"
        : "Unable to login";
      setError(error);
    }

    return () => {
      dispatch(clearError());
    };
  }, [httpError, dispatch, isSignUpMode]);

  const toggleMode = () => {
    document.querySelector(".box-layout__form").reset();

    setDisplayName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");

    setIsSignUpMode(!isSignUpMode);
  };

  const handleChange = (e) => {
    error && setError(null);

    const { value, name } = e.target;
    switch (name) {
      case "setDisplayName":
        setDisplayName(value);
        return;
      case "setEmail":
        setEmail(value);
        return;
      case "setPassword":
        setPassword(value);
        return;
      case "setConfirmPassword":
        setConfirmPassword(value);
        return;
      default:
        return;
    }
  };

  const handleSignInClick = () => {
    if (!email || !password) {
      setError("You must enter email and password!");
      return;
    }
    dispatch(signInWithEmailStart({ email, password }));
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();

    if (!displayName || !displayName || !password || !confirmPassword) {
      setError("You need to provide all necessary information");
      return;
    }

    if (password === confirmPassword) {
      setError(null);
      dispatch(signUpStart({ email, password, name: displayName }));
    } else {
      setError("Passwords don't match!");
    }
  };

  const responseGoogle = ({ tokenId }) => {
    dispatch(signInWithGoogleStart(tokenId));
  };

  const responseGoogleFailure = (error) => {
    setError("Unable to login with Google");
  };
  return (
    <div className="box-layout">
      <div className="box-layout__box">
        <div className="box-layout__logo">
          <HiCash className="box-layout__title-icon" />
          <h1 className="box-layout__title">Expensify</h1>
        </div>

        <p>
          It's time to get your expense <br></br> under control.
        </p>

        <form className="box-layout__form">
          {isSignUpMode && (
            <InputForm
              onChange={handleChange}
              name="setDisplayName"
              value={displayName}
              type="text"
              label="Display Name"
              required
            />
          )}
          <InputForm
            onChange={handleChange}
            name="setEmail"
            value={email}
            type="text"
            label="Email"
            required
          />
          <InputForm
            onChange={handleChange}
            name="setPassword"
            value={password}
            type="password"
            label="Password"
            required
          />
          {isSignUpMode && (
            <InputForm
              onChange={handleChange}
              value={confirmPassword}
              name="setConfirmPassword"
              type="password"
              label="Confirm Password"
              required
            />
          )}
          {error && <span className="box-layout__error">{error}</span>}

          <div className="box-layout__buttons">
            {isSignUpMode ? (
              <CustomButton
                handleClick={handleSignUpClick}
                classValue="blue"
                value="SIGN UP"
              />
            ) : (
              <>
                <CustomButton handleClick={handleSignInClick} value="SIGN IN" />
                <GoogleLogin
                  clientId="984150868553-82r2b5f57nuo4u129tpk5i4288ejgag2.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className={`button blue google-button`}
                    >
                      <AiFillGoogleSquare className="google-button__icon" />
                      <span className="google-button__text">
                        Login with Google
                      </span>
                    </button>
                  )}
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogleFailure}
                  cookiePolicy={"single_host_origin"}
                />
              </>
            )}
          </div>
        </form>

        <button className="box-layout__mode-button" onClick={toggleMode}>
          {isSignUpMode
            ? "Don't have an account? Sign Up"
            : "You already have an account? Sign In"}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
