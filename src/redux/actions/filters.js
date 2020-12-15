//Set text filter properties
export const setTextFilter = (text = "") => ({
  type: "SET_TEXT",
  text
});

// Set sortByDate
export const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

// Set sortByAmount
export const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

// Set start date filter propertie
export const setStartDate = date => ({
  type: "SET_START_DATE",
  date
});

// Set end date filter propertie
export const setEndDate = date => ({
  type: "SET_END_DATE",
  date
});
