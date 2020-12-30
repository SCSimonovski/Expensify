import React from "react";

const InputForm = ({ label, value, refInput, ...otherProps }) => {
  return (
    <div className="input-form">
      <input className="input-form__input" ref={refInput} {...otherProps} />
      <label
        className={
          value ? "input-form__label input-form__shrink" : `input-form__label`
        }
      >
        {label}
      </label>
    </div>
  );
};

export default InputForm;
