import React, { useContext, useEffect, useState } from "react";
import { Select } from "@windmill/react-ui";
import useAsync from "@/hooks/useAsync";
import { useTranslation } from "react-i18next";
import DistrictServices from "@/services/DistrictServices";
import { set } from "react-hook-form";
import { SidebarContext } from "@/context/SidebarContext";

const SelectDistrict = ({
  register,
  name,
  label,
  required,
  watch,
  value,
  parentCode,
  disabled,
}) => {
  // console.log("🚀 ~ file: SelectDistrict.jsx:18 ~ value:", value)
  watch();
  const { t } = useTranslation();
  const { data, loading } = useAsync(DistrictServices.getAll);

  // const [data, setData] = useState([]);
  // const handleChange = async () => {
  //   try {
  //     const res = DistrictServices.getAll({});
  //     if (res) {
  //       let datas = [];
  //       res.then((item) => {datas.push(item.data);
  //       setData(datas)
  //       });
  //     }
  //   }
  //   catch (error) {
  //     console.log(error);
  //     }
  //   };
  //   useEffect(() => {
  //     parentCode && handleChange();
  //   }, [parentCode]);

  return (
    <>
      <Select
        {...register(`${name}`, {
          required: required
            ? t(`{{label}} ${t("is required!")}`, { label: label })
            : false,
        })}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        value={value}
        disabled={disabled}
      >
        <option value="" defaultValue hidden>
          {t("Choose District")}
        </option>
        {data?.data?.map(
          (e) =>
            e?.parent_code === parentCode && (
              <option value={[e?._id, e?.code, e?.name]} key={e?._id}>
                {e?.name}
              </option>
            )
        )}
      </Select>
    </>
  );
};

export default SelectDistrict;
