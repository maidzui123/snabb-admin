import React from "react";
import useAsync from "@/hooks/useAsync";
import { useTranslation } from "react-i18next";
import { Controller } from "react-hook-form";
import { Select } from "antd";
import { useState } from "react";
import { hasFormatNumber } from "@/helper/fomatNum.helper";
import { useForm } from "react-hook-form";
import InputArea from "./InputArea";
import Error from "@/components/form/Error";
import { HelperText } from "@windmill/react-ui";
import { checkTypeCompany } from "@/helper/permission.helper";

const SelectReportCol = ({
  name,
  register,
  label,
  required,
  disabled,
  control,
  services,
  setValue,
  getValues = () => {},
  isMulti,
  totalPrice,
  setTotalPrice,
  className,
  placeholder,
  watch,
  optionLabel = "name",
  optionValue = "_id",
}) => {
  const { t } = useTranslation();

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Controller
        control={control}
        name={name}
        // rules={{ required: checkTypeCompany("TPA") ? true : false }}
        render={({ field, fieldState, formState }) => (
          <Select
            className=" h-12 text-sm outline-none block w-full  dark:bg-white border-transparent focus:bg-white"
            showSearch
            mode="tags"
            placeholder={placeholder}
            optionFilterProp="children"
            filterOption={filterOption}
            onChange={(value) => {
              field.onChange(value);
            }}
            value={field.value}
            disabled={disabled}
          />
        )}
      />
    </>
  );
};
export default SelectReportCol;
