import React from "react";

const InputForm = ({ label, value, ...otherProps }) => (
  <div className="input-form">
    <input className="input-form__input" {...otherProps} />
    <label
      className={
        value ? "input-form__label input-form__shrink" : `input-form__label`
      }
    >
      {label}
    </label>
  </div>
);

export default InputForm;
