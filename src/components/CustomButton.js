import React from "react";

const CustomButton = ({ value, classValue, handleClick }) => {
  return (
    <button
      type="button"
      onClick={(e) => handleClick(e)}
      className={`${classValue} button`}
    >
      {value}
    </button>
  );
};

export default CustomButton;
