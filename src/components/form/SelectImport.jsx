import useAsync from "@/hooks/useAsync";
import React from "react";
import { Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { notifyError } from "@/utils/toast";
const SelectImport= ({ register, name, label, services, required, type }) => {
  const { data, loading } =  type ? 
  useAsync(() => services.getAll({
    type: type,
  })) : useAsync(services?.getAll);
  const { t } = useTranslation();
  return (
    <>
      <Select
        className="flex-grow border h-12 text-sm focus:outline-none bg-gray-100 border-transparent focus:bg-white"
        {...(register &&
          register(`${name}`, {
            required: required
              ? t("{{label}} is required!", { label: label })
              : false,
          }))}
        name={name}
        // onChange={(e) => setProduct && setProduct(e?.target?.value)}
        // disabled={disabled}
      >
        <option value="" defaultValue hidden>
          {t("Chọn theo ")} {t(`${label}`)}
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

export default SelectImport;
