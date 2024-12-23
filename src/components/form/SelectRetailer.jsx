import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '@/hooks/useAsync';
import RetailerServices from '@/services/RetailerServices';
import { useTranslation } from "react-i18next";

const SelectRetailer = ({ setRetailer, value, register, name, label, disabled, required }) => {
  const { data, loading } = useAsync(RetailerServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: required ? t("{{label}} is required!", { label: label }) : false,
        })}
        onChange={(e) => setRetailer && setRetailer(e?.target?.value)}
        disabled={disabled}
        value={value}
      >
        <option value="" defaultValue hidden>
          {t("Chọn TT bán hàng")}
        </option>
        { data?.data?.map(e => (
          <option value={e?._id} key={e?._id}>{e?.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectRetailer;
