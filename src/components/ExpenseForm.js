import React, { useState } from "react";
// import "react-dates/initialize";
// import moment from "moment";
// import { SingleDatePicker } from "react-dates";

const ExpenseForm = ({ onSubmit, onRemoveButtonClick, expense }) => {
  const [description, setDescription] = useState(
    expense ? expense.description : ""
  );
  const [note, setNote] = useState(expense ? expense.note : "");
  const [amount, setAmount] = useState(expense ? expense.amount / 100 : "");
  const [error, setError] = useState(null);
  //   const [createdAt, setCreatedAt] = useState(null);
  //   const [calendarFocused, setCalendarFocused] = useState(false);

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

  //   const onDateChange = (createdAt) => {
  //     if (createdAt) {
  //       setCreatedAt(createdAt);
  //     }
  //   };

  //   const onFocusChange = ({ focused }) => {
  //     setCalendarFocused(focused);
  //   };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) {
      setError("Please privde the necessary information!");
    } else {
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

  return (
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
      {/* <SingleDatePicker
        date={createdAt}
        onDateChange={onDateChange}
        focused={calendarFocused}
        onFocusChange={onFocusChange}
        numberOfMonths={1}
        isOutsideRange={() => false}
      /> */}

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
  );
};

export default ExpenseForm;

// class ExpenseForm extends React.Component {
//   state = {
//     description: this.props.expense ? this.props.expense.description : "",
//     note: this.props.expense ? this.props.expense.note : "",
//     amount: this.props.expense
//       ? (this.props.expense.amount / 100).toString()
//       : "",
//     createdAt: this.props.expense
//       ? moment(this.props.expense.createdAt)
//       : moment(),
//     calendarFocused: false,
//     error: "",
//   };

//   onDescriptionChange = (e) => {
//     const description = e.target.value;
//     this.setState(() => ({ description }));
//   };

//   onAmountChange = (e) => {
//     const amount = e.target.value;
//     if (amount.match(/^\d*(\.\d{0,2})?$/)) {
//       this.setState(() => ({ amount }));
//     }
//   };

//   onNoteChange = (e) => {
//     const note = e.target.value;
//     this.setState(() => ({ note }));
//   };

//   onDateChange = (createdAt) => {
//     if (createdAt) {
//       this.setState(() => ({
//         createdAt,
//       }));
//     }
//   };

//   onFocusChange = ({ focused }) =>
//     this.setState(() => ({
//       calendarFocused: focused,
//     }));

//   onSubmit = (e) => {
//     e.preventDefault();
//     if (!this.state.description || !this.state.amount) {
//       this.setState(() => ({
//         error: "Please privde the necessary information!",
//       }));
//     } else {
//       this.setState(() => ({ error: "" }));
//       this.props.onSubmit({
//         description: this.state.description,
//         amount: parseFloat(this.state.amount) * 100,
//         createdAt: this.state.createdAt.valueOf(),
//         note: this.state.note,
//       });
//     }
//   };
//   render() {
//     return (
//       <form className="form" onSubmit={this.onSubmit}>
//         {this.state.error && <p className="form-error">{this.state.error}</p>}

//         <input
//           className="text-input"
//           type="text"
//           placeholder="Description"
//           value={this.state.description}
//           onChange={this.onDescriptionChange}
//           autoFocus
//         />
//         <input
//           className="text-input"
//           type="number"
//           placeholder="Amount"
//           value={this.state.amount}
//           onChange={this.onAmountChange}
//         />
//         <SingleDatePicker
//           date={this.state.createdAt}
//           onDateChange={this.onDateChange}
//           focused={this.state.calendarFocused}
//           onFocusChange={this.onFocusChange}
//           numberOfMonths={1}
//           isOutsideRange={() => false}
//         />

//         <textarea
//           className="text-area"
//           placeholder="Add a note for your expenses (optional)."
//           value={this.state.note}
//           onChange={this.onNoteChange}
//         />

//         <div className="buttons-div">
//           <button className="blue-button">Save Expense</button>

//           {this.props.expense && (
//             <button
//               className="remove-button"
//               onClick={() => this.props.onClick()}
//             >
//               Remove Expense
//             </button>
//           )}
//         </div>
//       </form>
//     );
//   }
// }
