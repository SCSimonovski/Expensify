export const sendRequest = async (
  url,
  method = "GET",
  headers,
  body = null
) => {
  try {
    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers,
    });

    if (response.status === 401) {
      //   store.dispatch(signOutSuccess());
    }

    if (response.headers.get("Content-Length") === "0") {
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

// CREATE EXPENSE REQUEST /////////////////////////////

export const createExpenseRequest = async (expense, token) => {
  const data = await sendRequest(
    "http://localhost:5000/expenses",
    "POST",
    { "Content-Type": "application/json", Authorization: "Bearer " + token },
    expense
  );

  return data;
};

// EDIT EXPENSE /////////////////////////////////////////

export const editExpenseRequest = async (expense, expenseId, token) => {
  const data = await sendRequest(
    `http://localhost:5000/expenses/${expenseId}`,
    "PATCH",
    { "Content-Type": "application/json", Authorization: "Bearer " + token },
    expense
  );

  return data;
};

// GET ALL EXPENSES //////////////////////////////////////

export const setExpensesRequest = async (token) => {
  const data = await sendRequest(`http://localhost:5000/expenses`, "GET", {
    Authorization: "Bearer " + token,
  });

  return data;
};

// REMOVE EXPENSE //////////////////////////////////////////

export const removeExpenseRequest = async (id, token) => {
  const data = await sendRequest(
    `http://localhost:5000/expenses/${id}`,
    "DELETE",
    {
      Authorization: "Bearer " + token,
    }
  );

  return data;
};
