import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '@/hooks/useAsync';
import AdminRoleServices from '@/services/AdminRoleServices';
import { useTranslation } from "react-i18next";

const SelectAdminRole = ({ setAdminRole, register, name, label, disabled, required }) => {
  const { data, loading } = useAsync(AdminRoleServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        onChange={(e) => {setAdminRole && setAdminRole(e?.target?.value),
          console.log(e?.target?.value)
        }
        }
        disabled={disabled}
      >
        <option value="" defaultValue hidden>
          {t("Choose AdminRole")}
        </option>
        { data?.data?.map(e => (
          <option value={e?._id} key={e?._id}>{e?.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectAdminRole;
