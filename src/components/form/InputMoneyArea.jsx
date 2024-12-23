import { hasFormatNumber } from "@/helper/fomatNum.helper";
import { Input } from "@windmill/react-ui";
import React from "react";
import { useTranslation } from "react-i18next";
const InputMoneyArea = ({
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
  setValue,
  price,
  setPrice,
  ...props
}) => {
  const VND_CURRENCY = "VND";
  const styles = {
    display: "flex",
    alignItems: "center",
    position: "relative",
    backgroundColor: "inherit",
  };
  const { t } = useTranslation();
  // const handlePriceChange = (e) => {
  //   const inputValue = e.target.value;
  //   const numericValue = inputValue.replace(/[^\d]/g, ""); // Remove non-numeric characters
  //   const pattern = /^[0-9\s]*$/;

  //   if (pattern.test(numericValue) || numericValue.trim() === "") {
  //     const formattedPrice = Number(numericValue).toLocaleString("en-US");
  //     setPrice(formattedPrice);
  //   }
  // };

  const normalizeNumber = (v, key) => {
    const inputValue = v;
    const numericValue = inputValue.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const pattern = /^[0-9\s]*$/;

    if (pattern.test(numericValue) || numericValue.trim() === "") {
      const formattedPrice = Number(numericValue).toLocaleString("en-US");
      setValue(key, formattedPrice);
    }
  };
  //   const handlePriceChange = (e) => {
  //       const formattedPrice =  e.target.value.toLocaleString("en-US");
  //       console.log("🚀 ~ file: InputMoneyArea.jsx:39 ~ formattedPrice", formattedPrice)
  //       setPrice(formattedPrice);
  //   };
  return (
    <>
      <div style={styles}>
        <Input
          {...(register
            ? register(`${name}`, {
                required: required ? `${label} ${t("is required!")}` : false,
                onChange: (e) => {
                  normalizeNumber(e.target.value, name);
                  onChange(e.target.value);
                },
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
          {VND_CURRENCY}
        </span>
      </div>
    </>
  );
};

export default InputMoneyArea;
