import React from "react";

const ActiveButton = ({ tapValue, activeValue, label, handleProductTap, disabled }) => {
  return (
    <button
      className={`inline-block px-4 py-2 text-base ${
        tapValue === activeValue &&
        "text-green-600 border-green-600 dark:text-green-500 dark:border-green-500 rounded-t-lg border-b-2"
      } focus:outline-none`}
      aria-current="page"
      onClick={() => handleProductTap(activeValue, false, tapValue)}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ActiveButton;
