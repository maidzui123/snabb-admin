import React from "react";
import { Select } from "@windmill/react-ui";
import useAsync from "@/hooks/useAsync";
import { useTranslation } from "react-i18next";
import CityServices from "@/services/CityServices";
import { set } from "react-hook-form";

const SelectCity = ({
  register,
  name,
  label,
  required,
  watch,
  onChange,
  value,
  disabled,
  setValue,
}) => {
  const { data, loading } = useAsync(CityServices.getAll);
  const { t } = useTranslation();
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: required
            ? t(`{{label}} ${t("is required!")}`, { label: label })
            : false,
          // onChange: (e) => {
          //   console.log(e.target.value);
          //   onChange && onChange(e.target.value);
          // }
        })}
        value={value}
        disabled={disabled}
        // onChange = {(e) => setValue("city", e?.target?.value) || setValue("district", "")}
      >
        <option value="" defaultValue hidden>
          {t("Choose City")}
        </option>
        {data?.data?.map((e) => (
          <option value={[e?._id, e?.code, e?.name]} key={e?._id}>
            {e?.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectCity;
