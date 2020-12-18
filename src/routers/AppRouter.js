import React, { useEffect, lazy, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import { signOutStart } from "../redux/actions/auth";

import AuthPage from "../components/AuthPage";

import PageNotFound from "../components/PageNotFound";
import Spinner from "../components/Spinner";

import PrivateRoute from "./PrivateRoute";

const Dashboard = lazy(() => import("../components/Dashboard"));
const EditExpense = lazy(() => import("../components/EditExpense"));
const AddExpense = lazy(() => import("../components/AddExpense"));

const createHistory = require("history").createBrowserHistory;
export const history = createHistory();

const AppRouter = () => {
  const dispatch = useDispatch();
  const expiration = useSelector((state) => state.auth.expiration);
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (expiration && new Date(expiration).getTime() < new Date().getTime()) {
      dispatch(signOutStart());
    }
  }, [expiration, dispatch]);

  return (
    <Router history={history}>
      <div>
        {loading && <Spinner />}
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/" component={AuthPage} exact={true} />

            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create" component={AddExpense} />
            <PrivateRoute path="/edit/:id" component={EditExpense} />
            <Route component={PageNotFound} />
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.token,
});

export default connect(mapStateToProps)(AppRouter);
