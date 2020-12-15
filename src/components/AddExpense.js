import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../redux/actions/expenses";

const AddExpense = ({ startAddExpense }) => {
  const history = useHistory();

  const onSubmit = (expense) => {
    startAddExpense(expense);
    history.push("/dashboard");
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header_title">Add Expense</h1>
        </div>
      </div>

      <div className="content-container">
        <ExpenseForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense)),
});
export default connect(undefined, mapDispatchToProps)(AddExpense);
