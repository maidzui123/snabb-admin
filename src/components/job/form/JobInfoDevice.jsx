import SectionTitle from "@/components/Typography/SectionTitle";
import BlockControl from "@/components/control/BlockControl";
import Error from "@/components/form/Error";
import InputArea from "@/components/form/InputArea";
import LabelArea from "@/components/form/LabelArea";
import RenderForm from "@/components/form/RenderForm";
import TextAreaCom from "@/components/form/TextAreaCom";
import { Button, Card, CardBody, Label } from "@windmill/react-ui";
import React from "react";
import { useTranslation } from "react-i18next";

const JobInfoDevice = ({ isDisabled, register, errors, dataContract }) => {
  const { t } = useTranslation();
  const fieldArray = React.useMemo(
    () => [
      {
        label: t("Device type name"),
        name: "device_type",
        placeholder: t("Device type ..."),
        value: dataContract?.device_type,
        disabled: isDisabled,
      },
      {
        label: t("IMEI"),
        name: "imei",
        placeholder: t("IMEI"),
        value: dataContract?.device_imei,
        disabled: isDisabled,
      },
      {
        label: t("Serial number"),
        name: "serial_number",
        placeholder: t("Serial number"),
        value: dataContract?.device_serial_number,
        disabled: isDisabled,
      },
      {
        label: t("Hãng sản xuất"),
        name: "brand",
        placeholder: t("Hãng sản xuất"),
        value: dataContract?.device_brand,
        disabled: isDisabled,
      },
      {
        label: t("Model"),
        name: "model",
        placeholder: t("Model name ..."),
        value: dataContract?.device_model,
        disabled: isDisabled,
      },
      {
        label: t("Type of insurance product"),
        name: "type_insurance_product",
        placeholder: t("Type of insurance product"),
        value: dataContract?.insurance_product_code,
        disabled: isDisabled,
      },
      {
        label: t("Effective start date"),
        name: "device_effective_start_date",
        type: "date",
        disabled: isDisabled,
      },
      {
        label: t("Effective end date"),
        name: "device_effective_end_date",
        type: "date",
        disabled: isDisabled,
      },
    ],
    [dataContract]
  );

  return (
    <Card
      className={`min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 `}
      // ${isBasicInfoCollapsed ? "collapsed" : ""}
      // style={{
      //   height: isBasicInfoCollapsed ? "60px" : "auto",
      //   overflow: isBasicInfoCollapsed ? "hidden" : "visible",
      // }}
    >
      <CardBody>
        <div className="w-full flex items-center justify-between my-2">
          <h1 className="text-2xl font-bold text-center w-full py-2 mb-4 text-blue-600">
            {t("DEVICE'S INFOMATION DETAILED")}
          </h1>
          <div className="icon-container flex justify-end items-center">
            {/* <span className="icon text-2xl" onClick={handleBasicInfoToggle}>
              {isBasicInfoCollapsed ? (
                <FcExpand />
              ) : (
                <FcCollapse />
              )}
            </span> */}
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

export default JobInfoDevice;
