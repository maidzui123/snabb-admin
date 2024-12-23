import React, { useContext } from "react";
import { Select } from "@windmill/react-ui";

//internal import
import { notifySuccess, notifyError } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";
import { useTranslation } from "react-i18next";

const SelectStatus = ({
  register,
  name,
  label,
  required,
  disabled,
  status = [],
  setValue,
}) => {
  // console.log('id',id ,'order',order)
  // const { setIsUpdate } = useContext(SidebarContext);
  // const handleChangeStatus = (id, status) => {
  //   // return notifyError("CRUD operation is disabled for this option!");
  //   OrderServices.updateOrder(id, { status: status })
  //     .then((res) => {
  //       notifySuccess(res.message);
  //       setIsUpdate(true);
  //     })
  //     .catch((err) => notifyError(err.message));
  // };
  const { t } = useTranslation();
  return (
    <>
      <Select
        {...register(`${name}`, {
          required: required
            ? t(`{{label}} ${t("is required!")}`, { label: label })
            : false,
          onChange: (e) => setValue(name, e?.target?.value),
        })}
        disabled={disabled}
        className="border h-12 text-sm focus:outline-none block bg-gray-100 dark:bg-white border-transparent focus:bg-white"
      >
        <option value="" defaultValue hidden>
          {t("Chọn Trạng thái")}
        </option>
        <option value="" defaultValue>
          {t("Tất cả")}
        </option>

        {status?.map((e) => {
          return (
            <option value={e} key={e}>
              {e == "ACTIVE" ? "Hoạt động" :
              e == "INACTIVE" ? "Vô hiệu" :
              e == "INSTOCK" ? "Còn hàng" :
              e == "OUTSTOCK" ? "Hết hàng" :
              e == "OUTDATE" ? "Hết hạn" :
              e == "DRAFT" ? "Nháp" :
              e == "PUBLIC" ? "Chờ duyệt" :
              e == "PROCESSING" ? "Đang xử lý" :
              e == "FIXING" ? "Đang sửa chữa" :
              e == "FINISH" ? "Hoàn thành" :
              e == "CANCEL" ? "Đã hủy" :
              e}
            </option>
          );
        })}
      </Select>
    </>
  );
};

export default SelectStatus;
