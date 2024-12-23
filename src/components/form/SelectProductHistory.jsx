import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '@/hooks/useAsync';
import ProductHistoryServices from '@/services/ProductHistoryServices';
import { useTranslation } from "react-i18next";

const SelectProductHistory = ({ setProductHistory, register, name, label, disabled, required }) => {
  const { data, loading } = useAsync(ProductHistoryServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: required ? t("{{label}} is required!", { label: label }) : false,
        })}
        onChange={(e) => setProductHistory && setProductHistory(e?.target?.value)}
        disabled={disabled}
      >
        <option value="" defaultValue hidden>
          {t("Choose ProductHistory")}
        </option>
        { data?.data?.map(e => (
          <option value={e?._id} key={e?._id}>{e?.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectProductHistory;
