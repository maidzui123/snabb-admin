import { Textarea } from "@windmill/react-ui";
import React from "react";

const TextAreaCom = ({
  register,
  name,
  label,
  placeholder,
  required,
  type,
  value,
  rows,
  readOnly,
  disabled,
}) => {
  return (
    <>
      <Textarea
        className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
        {...(register
          ? register(`${name}`, {
              required: required ? `${label} is required!` : false,
            })
          : {})}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        rows={rows || "4"}
        spellCheck="false"
        readOnly={readOnly}
        disabled={disabled}
      />
    </>
  );
};

export default TextAreaCom;
