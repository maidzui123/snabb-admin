import React from "react";
import { Select } from '@windmill/react-ui';
import { useTranslation } from "react-i18next";
const SelectUnit = ({ register, name, label, required, disabled }) => {
  const { t } = useTranslation();
  const data = [
    { _id: 1, name: "Meters", value: "meters" },
    { _id: 2, name: "Piece", value: "piece" },
    { _id: 3, name: "Box", value: "box" },
    { _id: 4, name: "Set", value: "set" },
    { _id: 5, name: "Other", value: "other" },
  ];
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
        // onChange={(e) => setProduct && setProduct(e?.target?.value)}
        disabled={disabled}
      >
        <option value="" defaultValue hidden>
          {t("Choose Unit")}
        </option>
        {data?.map((e) => (
          <option value={e?.value} key={e?._id}>
            {t(e?.name)}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectUnit;
