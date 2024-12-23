import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '@/hooks/useAsync';
import AccessoryCategoryServices from '@/services/AccessoryCategoryServices';
import { useTranslation } from "react-i18next";

const SelectAccessoryCategory = ({ setAccessoryCategory, register, name, label, disabled, required }) => {
  const { data, loading } = useAsync(AccessoryCategoryServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: required ? t("{{label}} is required!", { label: label }) : false,
        })}
        onChange={(e) => setAccessoryCategory && setAccessoryCategory(e?.target?.value)}
        disabled={disabled}
      >
        <option value="" defaultValue hidden>
          {t("Choose AccessoryCategory")}
        </option>
        { data?.data?.map(e => (
          <option value={e?._id} key={e?._id}>{e?.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectAccessoryCategory;
