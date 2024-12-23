import React from "react";
import { Select } from "@windmill/react-ui";
import useAsync from "@/hooks/useAsync";
import BrandServices from "@/services/BrandServices";
import { useTranslation } from "react-i18next";

const SelectBrand = ({
  setBrand,
  register,
  name,
  label,
  disabled,
  required,
}) => {
  const { data, loading } = useAsync(BrandServices.getAll);
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
        })}
        onChange={(e) => setBrand && setBrand(e?.target?.value)}
        disabled={disabled}
      >
        <option value="" defaultValue hidden>
          {t("Choose Brand")}
        </option>
        {data?.data?.map((e) => (
          <option value={e?._id} key={e?._id}>
            {e?.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectBrand;
