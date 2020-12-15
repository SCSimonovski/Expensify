import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVisibleExpenses } from "../selectors/expenses";
import selectExpensesTotal from "../selectors/selectExpensesTotal";
import numeral from "numeral";

export const ExpensesSummary = ({ expenses, expensesCount }) => {
  const expensesTotal = numeral(expenses / 100).format(" $0,0.00");
  const expensesWord = expensesCount === 1 ? "expense" : "expenses";
  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header_title">
          Viewing <span>{expensesCount}</span> {expensesWord} totalling
          <span>{expensesTotal}</span>
        </h1>
        <div className="page-header_actions">
          <Link className={"blue-button page-header_button"} to="/create">
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const visibleExpenses = getVisibleExpenses(
    state.expenses.userExpenses,
    state.filters
  );
  return {
    expenses: selectExpensesTotal(visibleExpenses),
    expensesCount: visibleExpenses.length,
  };
};
export default connect(mapStateToProps)(ExpensesSummary);
