import React, { useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import { signOutStart } from "../redux/actions/auth";

import AuthPage from "../components/AuthPage";

import Dashboard from "../components/Dashboard";
import EditExpense from "../components/EditExpense";
import AddExpense from "../components/AddExpense";
import PageNotFound from "../components/PageNotFound";

import PrivateRoute from "./PrivateRoute";

const createHistory = require("history").createBrowserHistory;
export const history = createHistory();

const AppRouter = () => {
  const dispatch = useDispatch();
  const expiration = useSelector((state) => state.auth.expiration);

  useEffect(() => {
    if (expiration && new Date(expiration).getTime() < new Date().getTime()) {
      dispatch(signOutStart());
    }
  }, [expiration, dispatch]);

  return (
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" component={AuthPage} exact={true} />

          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/create" component={AddExpense} />
          <PrivateRoute path="/edit/:id" component={EditExpense} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(AppRouter);
