import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '@/hooks/useAsync';
import ModuleServices from '@/services/ModuleServices';
import { useTranslation } from "react-i18next";

const SelectModule = ({ setModule, register, name, label, disabled, required ,defaultValue}) => {

  const { data, loading } = useAsync(ModuleServices.getAll);

  const { t } = useTranslation();

  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: required ? t("{{label}} is required!", { label: label }) : false,
        })}
        onChange={(e) => setModule && setModule(e?.target?.value)}
        disabled={disabled}
      >
        <option value="" defaultValue = {defaultValue} hidden>
          {t("Choose Module")}
        </option>
        { data?.data?.map(e => (
          <option value={e?._id} key={e?._id}>{e?.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectModule;
