import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOutStart } from "../redux/actions/auth";
import { HiCash } from "react-icons/hi";

export const Header = ({ startLogout }) => {
  return (
    <div className="header">
      <div className="content-container">
        <div className="header_content">
          <Link className="header_title" to="/dashboard">
            <HiCash className="header_title-icon" />
            <h1 className="header_title-text">Expensify</h1>
          </Link>
          <button
            className="blue-button blue-button--link"
            onClick={startLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => {
      dispatch(signOutStart());
    },
  };
};

export default connect(undefined, mapDispatchToProps)(Header);
