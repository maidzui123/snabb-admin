import useAsync from "@/hooks/useAsync";
import React from "react";
import { Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
const SelectFilter = ({ register, name, label, services, required }) => {
  const { data, loading } = useAsync(services?.getAll);
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
          {t("Lọc theo ")} {t(`${label}`)}
        </option>
        <option value="">{t("Tất cả")}</option>
        {data?.data?.map((e) => (
          <option value={e?._id} key={e?._id}>
            {e?.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectFilter;
