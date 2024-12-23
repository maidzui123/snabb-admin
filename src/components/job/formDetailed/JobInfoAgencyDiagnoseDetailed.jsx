import SectionTitle from "@/components/Typography/SectionTitle";
import BlockControl from "@/components/control/BlockControl";
import Error from "@/components/form/Error";
import InputArea from "@/components/form/InputArea";
import LabelArea from "@/components/form/LabelArea";
import RenderForm from "@/components/form/RenderForm";
import TextAreaCom from "@/components/form/TextAreaCom";
import { SidebarContext } from "@/context/SidebarContext";
import { Button, Card, CardBody, Label } from "@windmill/react-ui";
import { FcExpand, FcCollapse } from "react-icons/fc";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { formatDatetime } from "@/utils/date.helper";
import AgencyServices from "@/services/AgencyServices";
import SelectSearchName from "@/components/form/SelectSearchName";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import MultipleSelect from "@/components/form/MultipleSelect";
import AccessoryServices from "@/services/AccessoryServices";
import { useState } from "react";
import useJobSubmit from "@/hooks/useJobSubmit";
import { checkTypeCompany } from "@/helper/permission.helper";
import SelectReplaceType from "@/components/form/SelectReplaceType";
const JobInfoAgencyDiagnoseDetailed = ({
  job_id,
  getValues = () => {},
  register,
  isDisabled,
  setValue,
  errors,
  limitData,
  dataClient,
  jobStatus,
  jobStepStatus,
  dataJob,
  replaceType,
  setReplaceType,
  control = {},
}) => {
  const { t } = useTranslation();
  const { isInfoCustomerCollapsed, handleInfoCustomerToggle, currentPage } =
    useContext(SidebarContext);
  const { totalPrice, setTotalPrice } = useJobSubmit(job_id);
  const fieldArray = React.useMemo(() => 
    [
      {
        label: t("Nguyên nhân hư hỏng"),
        name: "cause_damage",
        placeholder: "Nguyên nhân hư hỏng",
        disabled: false,
        required: true,
      },
      {
        label: t("Triệu chứng"),
        name: "symptom",
        placeholder: "Triệu chứng",
        disabled: false,
        required: true,

      },
      {
        label: t("Loại thay thế"),
        placeholder: "Loại thay thế",
        name: "replace_type",
        disabled: false,
        setReplaceType: setReplaceType,
        component: SelectReplaceType,
        required: true,

      },
      {
        label: t("Mã linh kiện thu hồi"),
        name: "recall_accessory_code",
        placeholder: "Mã linh kiện thu hồi",
        disabled: replaceType === "replace_device" ? true : false,
        required: replaceType === "replace_device" ? false : true,

      },
      {
        label: t("Nhận xét / Giải pháp đề xuất"),
        name: "proposed_solution",
        disabled: false,
        placeholder: "Nhận xét / Giải pháp đề xuất",
        component: TextAreaCom,

      },
    ]
  , [dataClient, replaceType]);
  // console.log();

  return (
    <Card
      className={`min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 ${
        isInfoCustomerCollapsed ? "collapsed" : ""
      }`}
      style={{
        height: isInfoCustomerCollapsed ? "60px" : "auto",
        overflow: isInfoCustomerCollapsed ? "hidden" : "visible",
      }}
    >
      <CardBody>
       
        <div className="w-full flex items-center justify-between my-2">
          <h1 className="text-2xl font-bold text-center w-full py-2 mb-4 text-blue-600">
            {t("THÔNG TIN CHẨN ĐOÁN")}
          </h1>
          {/* <div className="icon-container flex justify-end items-center">
            <span className="icon text-2xl" onClick={handleInfoCustomerToggle}>
              {isInfoCustomerCollapsed ? <FcExpand /> : <FcCollapse />}
            </span>
          </div> */}
        </div>

        <div className="mb-2 py-2 gap-2 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <RenderForm
            fieldArray={fieldArray}
            register={register}
            errors={errors}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default JobInfoAgencyDiagnoseDetailed;
