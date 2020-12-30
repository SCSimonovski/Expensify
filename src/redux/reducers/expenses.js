import { expensesActionTypes } from "../types/expenses";
import { userActionTypes } from "../types/auth";

const INITIAL_STATE = {
  userExpenses: [],
  error: null,
};

// Expenses reducer function
const expensesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case expensesActionTypes.ADD_EXPENSE:
      return {
        ...state,
        error: null,
        userExpenses: [...state.userExpenses, action.expense],
      };

    case expensesActionTypes.REMOVE_EXPENSE:
      return {
        ...state,
        error: null,
        userExpenses: state.userExpenses.filter(
          (expense) => expense.id !== action.id
        ),
      };

    case expensesActionTypes.EDIT_EXPENSE:
      return {
        ...state,
        error: null,
        userExpenses: state.userExpenses.map((expense) => {
          if (action.id === expense.id) {
            return {
              ...expense,
              ...action.update,
            };
          }
          return expense;
        }),
      };

    case expensesActionTypes.SET_EXPENSES:
      return {
        ...state,
        error: null,
        userExpenses: action.expenses,
      };

    case expensesActionTypes.EXPENSES_FAILURE:
      return {
        ...state,
        error: action.error,
      };

    case userActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        userExpenses: [],
        error: null,
      };

    default:
      return state;
  }
};

export default expensesReducer;
