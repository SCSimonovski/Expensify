import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import { getVisibleExpenses } from "../selectors/expenses";

export const ExpenseList = ({ expenses }) => (
  <div className="content-container list-content">
    <div className="list-header">
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
      <div className="show-for-mobile">Expenses</div>
    </div>
    {expenses.length === 0 ? (
      <p className="no-expenses">No expenses</p>
    ) : (
      expenses.map((expense) => (
        <ExpenseListItem key={expense.id} {...expense} />
      ))
    )}
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: getVisibleExpenses(state.expenses.userExpenses, state.filters),
  };
};

export default connect(mapStateToProps)(ExpenseList);
