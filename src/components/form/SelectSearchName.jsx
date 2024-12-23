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

const SelectSearchName = ({
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
  const { data, loading } = !isMulti
    ? useAsync(services && services?.getAll)
    : useAsync(() => services);
  const { t } = useTranslation();

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  const handleTotalPrice = (value) => {
    const filteredArray = data?.data?.filter((item) =>
      value.includes(item._id)
    );
    const totalPrice = filteredArray.reduce(
      (total, item) => total + item?.price + (item?.price * item?.VAT) / 100,
      0
    );
    setValue("price_quote", totalPrice);
    setTotalPrice(totalPrice);
  };
  return (
    <>
      <InputArea
        register={register}
        type="hidden"
        name="price_quote"
        defaultValue={totalPrice}
      />
      <Controller
        control={control}
        name={name}
        rules={{ required: checkTypeCompany("AGENCY") ? true : false}}
        render={({ field, fieldState, formState }) =>
          isMulti ? (
            <>
              <Select
                className="border h-12 text-sm focus:outline-none block w-full  dark:bg-white border-transparent focus:bg-white"
                showSearch
                mode="multiple"
                suffixIcon={
                  <div>
                    <span>{hasFormatNumber(getValues("price_quote"))} VNĐ</span>
                  </div>
                }
                placeholder={placeholder}
                optionFilterProp="children"
                filterOption={filterOption}
                options={data?.data?.map((option) => ({
                  ...option,
                  label: option.name,
                  value: option._id,
                }))}
                onChange={(value) => {
                  field.onChange(value);
                  handleTotalPrice(value);
                }}
                value={field.value}
                disabled={disabled}
              />
              {formState?.errors?.accessory_list?.type === "required" && (
                <HelperText valid={false} className=" text-sm font-semibold mt-2">Linh kiện là bắt buộc!</HelperText>
              )}
            </>
          ) : (
            <>
              <Select
                className="border h-12 text-sm focus:outline-none block w-full  dark:bg-white border-transparent focus:bg-white"
                showSearch
                placeholder={placeholder}
                optionFilterProp="children"
                filterOption={filterOption}
                options={data?.data?.map((option) => ({
                  ...option,
                  label: option.name,
                  value: option._id,
                }))}
                onChange={(value) => {
                  field.onChange(value);
                }}
                value={field.value}
                disabled={disabled}
              />
            </>
          )
        }
      />
    </>
  );
};
export default SelectSearchName;
