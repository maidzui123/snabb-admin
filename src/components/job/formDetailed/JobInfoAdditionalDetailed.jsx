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

const JobInfoAdditionalDetailed = ({
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
  control = {},
}) => {
  const { t } = useTranslation();
  const { isInfoCustomerCollapsed, handleInfoCustomerToggle, currentPage } =
    useContext(SidebarContext);
  const { totalPrice, setTotalPrice } = useJobSubmit(job_id);
  const fieldArray = React.useMemo(() => {
    const baseArray = [
      {
        label: t("Date created"),
        name: "date_created",
        disabled: false,
        value: formatDatetime(dataClient?.createdAt),
        disabled: true
      },
      {
        label: t("Creator"),
        name: "creator",
        disabled: false,
        value: dataJob?.created_by,
        disabled: true

      },
      {
        label: t("Status"),
        name: "status",
        disabled: false,
        value: jobStatus,
        disabled: true

      },
      {
        label: t("Approver"),
        name: "approver",
        disabled: false,
        disabled: true

      },
    ];

    if (jobStatus !== "DRAFT") {
      return [
        ...baseArray,
        {
          label: t("Chọn TTSC"),
          name: "agency_id",
          placeholder: "Chọn TTSC",
          component: SelectSearchName,
          services: AgencyServices,
          control: control,
          labelRequired: true,
          label: t("Chọn TTSC"),
          disabled: !checkTypeCompany("TPA") || jobStepStatus === "choose_accessory_confirm" || jobStatus === "CANCEL" || jobStatus === "FIXING" || jobStatus === "FINISH",
          isMulti: false,
        },
        // {
        //   label: t("Chọn linh kiện"),
        //   name: "accessory_list",
        //   placeholder: "Chọn linh kiện",
        //   component: SelectSearchName,
        //   disabled: !checkTypeCompany("AGENCY") || jobStatus === "FIXING" || jobStatus === "CANCEL" || jobStatus === "FINISh",
        //   services: AccessoryServices.getAllByAgency({
        //     ...getValues(),
        //     page: currentPage,
        //     limit: 5,
        //     job_id: job_id,
        //   }),
        //   control: control,
        //   isMulti: true,
        //   labelRequired: true,
        //   setValue: setValue,
        //   getValues: getValues,
        //   totalPrice: totalPrice,
        //   setTotalPrice: setTotalPrice,
        // },
      ];
    } else {
      return baseArray;
    }
  }, [dataClient, jobStatus]);
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
        {/* <SelectSearch
          options={[
            { name: "Swedish", value: "sv" },
            { name: "English", value: "en" },
            {
              type: "group",
              name: "Group name",
              items: [{ name: "Spanish", value: "es" }],
            },
          ]}
          value="sv"
          name="language"
          placeholder="Choose your language"
          search
        /> */}
        <div className="w-full flex items-center justify-between my-2">
          <h1 className="text-2xl font-bold text-center w-full py-2 mb-4 text-blue-600">
            {t("INFOMATION ADDITIONAL")}
          </h1>
          <div className="icon-container flex justify-end items-center">
            <span className="icon text-2xl" onClick={handleInfoCustomerToggle}>
              {isInfoCustomerCollapsed ? <FcExpand /> : <FcCollapse />}
            </span>
          </div>
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

export default JobInfoAdditionalDetailed;
