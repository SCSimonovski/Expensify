import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import ExpenseForm from "./ExpenseForm";
import {
  startEditExpense,
  startRemoveExpense,
} from "../redux/actions/expenses";

const EditExpense = ({ startEditExpense, startRemoveExpense, expense }) => {
  const history = useHistory();

  const onClick = () => {
    startRemoveExpense(expense.id);
    history.push("/dashboard");
  };

  const onSubmit = (expense, id) => {
    startEditExpense(expense, id);
    history.push("/dashboard");
  };

  return (
    <div>
      <div className="page-header">
        <div className="content-container">
          <h1 className="page-header_title">Edit Expense</h1>
        </div>
      </div>

      <div className="content-container">
        <ExpenseForm
          expense={expense}
          onSubmit={onSubmit}
          onRemoveButtonClick={onClick}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => ({
  expense: state.expenses.userExpenses.find(
    (expense) => expense.id === props.match.params.id
  ),
});

const mapDispatchToProps = (dispatch, props) => ({
  startRemoveExpense: (id) => {
    dispatch(startRemoveExpense(id));
  },
  startEditExpense: (id, expense) => {
    dispatch(startEditExpense(id, expense));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpense);
