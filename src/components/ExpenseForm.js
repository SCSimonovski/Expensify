import React, { useState, useEffect } from "react";

import Spinner from "../components/Spinner";

const ExpenseForm = ({ onSubmit, onRemoveButtonClick, expense }) => {
  const [description, setDescription] = useState(
    expense ? expense.description : ""
  );
  const [note, setNote] = useState(expense ? expense.note : "");
  const [amount, setAmount] = useState(expense ? expense.amount / 100 : "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onDescriptionChange = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  const onAmountChange = (e) => {
    const amount = e.target.value;
    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
      setAmount(amount);
    }
  };

  const onNoteChange = (e) => {
    const note = e.target.value;
    setNote(note);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) {
      setError("Please provide the necessary information.");
    } else {
      setLoading(true);
      setError("");
      onSubmit(
        {
          description,
          amount: parseFloat(amount) * 100,
          note,
        },
        expense?.id
      );
    }
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      {loading && <Spinner />}

      <form className="form" onSubmit={onFormSubmit}>
        {error && <p className="form-error">{error}</p>}

        <input
          className="text-input"
          type="text"
          placeholder="Description"
          value={description}
          onChange={onDescriptionChange}
          autoFocus
        />
        <input
          className="text-input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={onAmountChange}
        />

        <textarea
          className="text-area"
          placeholder="Add a note for your expenses (optional)."
          value={note}
          onChange={onNoteChange}
        />

        <div className="buttons-div">
          <button className="blue-button">Save Expense</button>

          {expense && (
            <button
              className="remove-button"
              onClick={() => onRemoveButtonClick()}
            >
              Remove Expense
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default ExpenseForm;
