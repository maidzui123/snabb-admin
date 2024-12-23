import React, { useContext } from "react";
import { Input, Select } from "@windmill/react-ui";

//internal import
import { notifySuccess, notifyError } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import { useTranslation } from "react-i18next";

const SelectPeriod = ({ 
  register,
  name,
  label,
  required,
  type = ["Ngày", "Tháng", "Năm"], 
  setValue
  }) => {
  const { t } = useTranslation();
  return (
    <>
       <div className="flex">
        <Input
          type="number"
          //name={`${name}_number`}
          required={required}
          {...register(`${name}_number`, {
            required: required ? `${label} ${t("is required!")}` : false
          })}
          className="border h-12 text-sm focus:outline-none block w-1/2 bg-gray-100 dark:bg-white border-transparent focus:bg-white mr-2"
        />
        <Select
          required={required}
          {...register(`${name}_select`, {
            required: required ? t(`{{label}} ${t("is required!")}`, { label: label }) : false
          })}
          onChange={(e) => setValue(name, e?.target?.value)}
          className="border h-12 text-sm focus:outline-none block w-1/2 bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        >
          {type?.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </Select>
      </div>
    </>
  );
};

export default SelectPeriod;
