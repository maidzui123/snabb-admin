import React from "react";
import { Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
const SelectStatusAccessory = ({ setStatus, register, name, label }) => {
  const { t } = useTranslation();
  return (
    <>
      <Select
        onChange={(e) => setStatus(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`)}
        defaultValue="INSTOCK"
      >
        <option value="" disabled hidden>
          {t("INSTOCK")}
        </option>
        <option value="INSTOCK">{t("INSTOCK")}</option>
        <option value="OUTSTOCK">{t("OUTSTOCK")}</option>
        <option value="OUTDATE">{t("OUTDATE")}</option>
      </Select>
    </>
  );
};

export default SelectStatusAccessory;
