import React from "react";
import { Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
const SelectReplaceType = ({
  register,
  name,
  label,
  required,
  disabled,
  setReplaceType,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: required
            ? t("{{label}} is required!", { label: label })
            : false,
        })}
        onChange={(e) => setReplaceType(e?.target?.value)}
        disabled={disabled}
      >
        <option value="replace_accessory" defaultValue hidden>
          {t("Thay thế linh kiện")}
        </option>
        <option value="replace_accessory">{t("Thay thế linh kiện")}</option>
        <option value="replace_device">{t("Thay thế máy")}</option>
      </Select>
    </>
  );
};

export default SelectReplaceType;
