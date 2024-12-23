import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '@/hooks/useAsync';
import GroupCategoryServices from '@/services/GroupCategoryServices';
import { useTranslation } from "react-i18next";

const SelectGroupCategory = ({ setGroupCategory, register, name, label, disabled, required, selectType }) => {
  const { data, loading } = useAsync(() =>  
    GroupCategoryServices.getAll({
      type: selectType
    })
  );
  const { t } = useTranslation();
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: required ? t("{{label}} is required!", { label: label }) : false,
        })}
        onChange={(e) => setGroupCategory && setGroupCategory(e?.target?.value)}
        disabled={disabled}
      >
        <option value="" defaultValue hidden>
          {t("Chọn phân loại nhóm")}
        </option>
        { data?.data?.map(e => (
          <option value={e?._id} key={e?._id}>{e?.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectGroupCategory;
