import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { signOutStart } from "../redux/actions/auth";

import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpensesSummary from "./ExpensesSummary";

const Dashboard = () => {
  const dispatch = useDispatch();
  const expiration = useSelector((state) => state.auth.expiration);

  useEffect(() => {
    if (new Date(expiration).getTime() < new Date().getTime()) {
      dispatch(signOutStart());
    }
  }, [expiration, dispatch]);

  return (
    <div>
      <ExpensesSummary />
      <ExpenseListFilters />
      <ExpenseList />
    </div>
  );
};

export default Dashboard;
