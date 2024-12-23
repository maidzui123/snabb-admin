import React from "react";
import { useContext, useEffect, useState } from "react";
import useAsync from "@/hooks/useAsync";
import { useTranslation } from "react-i18next";
import { MultiSelect } from "react-multi-select-component";
import { Controller } from "react-hook-form";

const MultipleSelect = ({
  name,
  label,
  required,
  control,
  services,
  options,
  className,
  watch,
  optionLabel = "name",
  optionValue = "_id",
}) => {
  const { data, loading } = useAsync(services && services?.getAll);
  const {t} = useTranslation();
  //const [ selectedCategory, setSelectedCategory] = useState([]);
  //console.log(getValue(Category));
  return (
    <>
      {/* <MultiSelect

              className={
                className ??
                "border h-12 text-sm focus:outline-none block w-full dark:bg-white border-transparent focus:bg-white"
              }
              name={name}
              {...register(`${name}`, {
                required: required
                  ? t("{{label}} is required!", { label: label })
                  : false,
              })}
              // onChange={(e) => setMultiAgencyCategory && setMultiAgencyCategory(e?.target?.value)}
              options={
                options ??
                data?.data?.map((e) => ({
                  value: e[optionValue],
                  label: e[optionLabel],
                })) ??
                []
              }
              disabled={disabled}
              value={selectedCategory
                // value?.map((e) => ({
                //   value: e[optionValue],
                //   label: e[optionLabel],
                // }))
                //value || []
              }
              onChange={setSelectedCategory}
              labelledBy="Select"
            /> */}
      <Controller
        control={control}
        name={name}
        rules={{
          required: required
            ? t(`{{label}} ${t("is required!")}`, { label: label })
            : false,
        }}
        render={({ field: { onChange, onBlur, ref, value, disabled } }) => (
          <>
            <MultiSelect
              className={
                className ??
                "border h-12 text-sm focus:outline-none block w-full dark:bg-white border-transparent focus:bg-white"
              }
              name={name}
              // onChange={(e) => setMultiAgencyCategory && setMultiAgencyCategory(e?.target?.value)}
              options={
                options?.map((e) => ({
                  value: e[optionValue],
                  label: e[optionLabel],
                  key: e?.key,
                })) ??
                data?.data?.map((e) => ({
                  value: e[optionValue],
                  label: e[optionLabel],
                })) ??
                []
              }
              disabled={disabled}
              //const values = {value.map(option => ({ value: option._id, label: option.name }))}
              value={value != undefined ? value : []}
              onChange={onChange}
              labelledBy="Chọn loại"
              defaultIsOpen={true}
            />
          </>
        )}
      />
    </>
  );
};

export default MultipleSelect;
