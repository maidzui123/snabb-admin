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
import dayjs from "dayjs";

const JobInfoDeviceDetailed = ({ dataClient, register, errors }) => {
  const { t } = useTranslation();

  const fieldArray = React.useMemo(
    () => [
      {
        label: t("Device type name"),
        name: "device_type",
        placeholder: t("Device type ..."),
        disabled: false,
        value: dataClient?.device_type || ""
      },
      {
        label: t("IMEI"),
        name: "imei",
        placeholder: t("IMEI"),
        disabled: false,
        value: dataClient?.imei || ""
      },
      {
        label: t("Serial number"),
        name: "serial_number",
        placeholder: t("Serial number"),
        disabled: false,
        value: dataClient?.serial_number || ""
      },
      {
        label: t("Brand"),
        name: "brand",
        placeholder: t("Input brand"),
        disabled: false,
        value: dataClient?.brand || ""

      },
      {
        label: t("Model"),
        name: "model",
        placeholder: t("Model name ..."),
        disabled: false,
        value: dataClient?.model || ""
      },
      {
        label: t("Type of insurance product"),
        name: "type_insurance_product",
        disabled: false,
        value: dataClient?.type_insurance_product || ""
      },
      {
        label: t("Effective start date"),
        name: "device_effective_start_date",
        type: "date",
        disabled: false,
        value: dayjs(dataClient?.device_effective_start_date).format("YYYY-MM-DD") || ""
      },
      {
        label: t("Effective end date"),
        name: "device_effective_end_date",
        type: "date",
        disabled: false,
        value: dayjs(dataClient?.device_effective_end_date).format("YYYY-MM-DD") || ""
      },
    ],
    [dataClient]
  );

  return (
    <Card
      className={`min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 `}
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

        <div className="mb-2 py-2 gap-4 w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          <RenderForm
            fieldArray={fieldArray}
            register={register}
            errors={errors}
            disabled
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default JobInfoDeviceDetailed;
