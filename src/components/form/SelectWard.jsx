import React, { useContext, useEffect, useState } from "react";
import { Select } from "@windmill/react-ui";
import useAsync from "@/hooks/useAsync";
import { useTranslation } from "react-i18next";
import WardServices from "@/services/WardServices";
import { set } from "react-hook-form";
import spinnerLoadingImage from "@/assets/img/spinner.gif";

const SelectWard = ({
  register,
  name,
  label,
  required,
  parentCode,
  value,
  parentCity,
  disabled,
  watch,
}) => {
  // watch()
  const { t } = useTranslation();
  const { data, loading } = useAsync(WardServices.getAll);

  // const handleChange = async () => {
  //   try {
  //     const res = WardServices.getAll({ parent_code: parentCode });
  //     if (res) {
  //       let datas = [];
  //       res.then((item) => {datas.push(item.data);
  //         setData(datas)
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   ((parentCode) && handleChange()) && ((parentCity) && setData([]));
  // }, [ parentCode, parentCity ]);
  return (
    <>
      <Select
        {...register(`${name}`, {
          required: required && data?.data?.filter((e) => e?.parent_code === parentCode).length === 0
            ? t(`{{label}} ${t("is required!")}`, { label: label })
            : false,
        })}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        value={value}
        disabled={disabled}
      >
        <option value="" defaultValue hidden>
          {t("Choose Ward")}
        </option>
        {data?.data?.map(
          (e) =>
            e?.parent_code === parentCode && 
            (
              <option
                value={[e?._id, e?.code, e?.name]}
                key={e?._id}
                // selected={e?.code == defaultValue}
              >
                {e?.name}
              </option>
            )
        )}
      </Select>
    </>
  );
};

export default SelectWard;
