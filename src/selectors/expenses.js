import moment from "moment";

//Get visible expenses function
export const getVisibleExpenses = (
  expenses,
  { sortBy, text, startDate, endDate }
) => {
  expenses = expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate
      ? moment(startDate).isBefore(createdAtMoment)
      : true;
    const endDateMatch = endDate
      ? moment(endDate).isAfter(createdAtMoment)
      : true;

    const textMatch = expense.description
      .toLowerCase()
      .includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  });

  if (sortBy === "date") {
    expenses.sort((a, b) => a.createdAt - b.createdAt);
  } else {
    expenses.sort((a, b) => a.amount - b.amount);
  }

  return expenses;
};
