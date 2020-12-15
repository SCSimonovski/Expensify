import { expensesActionTypes } from "../types/expenses";
import {
  createExpenseRequest,
  editExpenseRequest,
  setExpensesRequest,
  removeExpenseRequest,
} from "../../api/expenses-api";

// Add new Expense
export const addExpense = (expense) => ({
  type: expensesActionTypes.ADD_EXPENSE,
  expense,
});

export const startAddExpense = (expenseObj = {}) => {
  return async (dispatch, getState) => {
    const auth = getState().auth;
    const owner = auth.currentUser.id;
    const token = auth.token;

    if (!token) {
      throw new Error("You're not authenticated");
    }

    const { description = "", note = "", amount = 0 } = expenseObj;
    const expenseToAdd = { description, note, amount, owner };

    try {
      const expense = await createExpenseRequest(expenseToAdd, token);
      dispatch(addExpense(expense));
    } catch (e) {
      dispatch(expensesFailure(e.message));
    }
  };
};

// Remove one of the expenses
export const removeExpense = (id) => ({
  type: expensesActionTypes.REMOVE_EXPENSE,
  id,
});

export const startRemoveExpense = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    try {
      await removeExpenseRequest(id, token);
      dispatch(removeExpense(id));
    } catch (e) {
      dispatch(expensesFailure(e.message));
    }
  };
};

// Edit one of the expenses
export const editExpense = (update, id) => ({
  type: expensesActionTypes.EDIT_EXPENSE,
  id,
  update,
});

export const startEditExpense = (update, id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      await editExpenseRequest(update, id, token);
      dispatch(editExpense(update, id));
    } catch (e) {
      dispatch(expensesFailure(e.message));
    }
  };
};

//Set expenses from firebase
export const setExpenses = (expenses) => ({
  type: expensesActionTypes.SET_EXPENSES,
  expenses,
});

export const startSetExpenses = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;

    try {
      const expenses = await setExpensesRequest(token);
      dispatch(setExpenses(expenses));
    } catch (e) {
      dispatch(expensesFailure(e.message));
    }
  };
};

// Failure ///////////////////////////////////
export const expensesFailure = (error) => ({
  type: expensesActionTypes.EXPENSES_FAILURE,
  error,
});
