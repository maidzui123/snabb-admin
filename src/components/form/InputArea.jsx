import React from "react";
import { Input } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
const InputArea = ({
  register,
  defaultValue,
  required,
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  disabled,
  readOnly,
  validation,
  onChange,
  getValues,
  onBlur,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Input
        {...(register &&
          register(`${name}`, {
            required: required ? `${label} ${t("is required!")}` : false,
            pattern:
              name === "email"
                ? {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email không hợp lệ"
                  }
                : {},
            validate:
              name === "effective_date_end"
                ? (value) => {
                    const startDateObj = new Date(
                      getValues("effective_date_start")
                    );
                    const endDateObj = new Date(
                      getValues("effective_date_end")
                    );
                    return (
                      startDateObj < endDateObj ||
                      t("End date must be greater than start date")
                    );
                  }
                : name === "confirm_password" && getValues("password")
                ? (value) => {
                    return (
                      value === getValues("password") ||
                      "Mật khẩu chưa khớp nhau!"
                    );
                  }
                : validation || false,
            //validate: validate? validate : validation ? validation : validate,
            onChange: onChange,
            onBlur: onBlur,
          }))}
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
    </>
  );
};

export default InputArea;
