import { Input } from "@windmill/react-ui";
import React from "react";
import { useTranslation } from "react-i18next";
const InputVatArea = ({
  register,
  defaultValue,
  required,
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  disabled,
  setValue,
  readOnly,
  validation,
  onChange,
  vat,
  setVat,
  ...props
}) => {
  const PERCENT = "%";

  const styles = {
    display: "flex",
    alignItems: "center",
    position: "relative",
    backgroundColor: "inherit",
  };
  const { t } = useTranslation();

  const handleVATChange = (v, key) => {
    const inputValue = v;
    const numericValue = inputValue.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const pattern = /^[0-9\s]*$/;

    if (pattern.test(numericValue) || numericValue.trim() === "") {
      setValue(key, numericValue);
    }
  };
  return (
    <>
      <div style={styles}>
        <Input
          {...(register
            ? register(`${name}`, {
                required: required ? `${label} ${t("is required!")}` : false,
                onChange: (e) => handleVATChange(e.target.value, name),
              })
            : {})}
          defaultValue={defaultValue}
          type={type}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
          disabled={disabled}
          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
          readOnly={readOnly}
          {...props}
        />
        <span className="absolute right-0 mr-3 top-1/2 translate-x-1/2 text-gray-700 text-sm">
          {PERCENT}
        </span>
      </div>
    </>
  );
};

export default InputVatArea;
