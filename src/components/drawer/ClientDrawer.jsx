import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectClient from "@/components/form/SelectClient";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useClientSubmit from "@/hooks/useClientSubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
import SelectCity from "../form/SelectCity";
import SelectDistrict from "../form/SelectDistrict";
import SelectWard from "../form/SelectWard";
import SelectStatus from "../form/SelectStatus";
import { hasPermission } from "@/helper/permission.helper";
const componentArray = {
  TextAreaCom: TextAreaCom,
  InputArea: InputArea,
};

const fieldArray = [
  {
    label: "User Name",
    name: "name",
    type: "text",
    placeholder: "User name",
    component: "TextArea",
  },
  {
    label: "User Description",
    name: "description",
    type: "textarea",
    rows: "4",
    component: "TextAreaCom",
  },

  {
    label: "User Address",
    name: "address",
    type: "textarea",
    rows: "4",
    component: "TextAreaCom",
  },

  {
    label: "User Email",
    name: "email",
    type: "text",
    placeholder: "User name",
    component: "TextArea",
  },
];

const ClientDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    onSubmit,
    watch,
    errors,
    isSubmitting,
  } = useClientSubmit(id);

  const { t } = useTranslation();
  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^(\+84\d{9}|\d{10})$/;
    return phoneNumberRegex.test(value) ? undefined : "Số điện thoại không hợp lệ";
  };
  const validateLegalID = (value) => {
    return (value.length != 12 && value.length != 9)  ? "CMND/CCCD không hợp lệ" : undefined;
  };

  const handleGetName = (e) => {
    return getValues(e) ? ", " + getValues(e).split(",")[2] : "";
  };
  const fieldArray = [
    {
      label: t("Legal ID"),
      name: "legal_id",
      type: "text",
      placeholder: t("Legal ID"),
      component: InputArea,
      labelRequired: true,
      validation: validateLegalID,
    },
    {
      label: t("Client name"),
      name: "full_name",
      type: "text",
      placeholder: t("Client name"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Ngày sinh"),
      name: "birthday",
      type: "date",
      value: getValues("birthday"),
      placeholder: t("Ngày sinh"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Phone"),
      name: "phone",
      type: "text",
      placeholder: t("Phone"),
      component: InputArea,
      labelRequired: true,
      validation: validatePhoneNumber,
    },
    {
      label: t("Email"),
      name: "email",
      type: "text",
      placeholder: t("Email"),
      component: InputArea,
      labelRequired: true,
      // validation: validateEmail,
    },

    {
      label: t("City"),
      name: "city",
      type: "text",
      placeholder: t("City"),
      component: SelectCity,
      value: getValues("city"),
      labelRequired: true,
    },
    {
      label: t("District"),
      name: "district",
      type: "text",
      parentCode:
        getValues("city") != undefined ? getValues("city").split(",")[1] : "",
      placeholder: t("District"),
      value: getValues("district"),
      component: SelectDistrict,
      labelRequired: true,
    },

    {
      label: t("Ward"),
      name: "ward",
      type: "text",
      parentCode:
        getValues("district") != undefined
          ? getValues("district").split(",")[1]
          : "",
      placeholder: t("Ward"),
      value: getValues("ward"),
      component: SelectWard,
      labelRequired: true,
    },

    {
      label: t("Detail"),
      name: "detail",
      type: "text",
      placeholder: t("Detail"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Client address"),
      name: "address",
      type: "text",
      value:
        (getValues("detail") || "") +
        handleGetName("ward") +
        handleGetName("district") +
        handleGetName("city"),

      placeholder: t("Client address"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Client description"),
      name: "description",
      type: "text",
      placeholder: t("Client description"),
      component: InputArea,
    },
    {
      label: t("Status"),
      name: "status",
      placeholder: t("Status"),
      component: SelectStatus,
      status: ["HOẠT ĐỘNG", "KHÔNG HOẠT ĐỘNG", "BLOCK"],
      labelRequired: true,
    },
  ];

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title={t("Update Client")} description={t("Updated Client")} />
        ) : (
          <Title title={t("Add Client")} description={t("Add Client")} />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                {fieldArray?.map((e) => {
                  const Component = e.component || InputArea;
                  return (
                    <div
                      className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                      key={e?.name}
                    >
                      <LabelArea
                        label={e?.label}
                        labelRequired={e?.labelRequired}
                      />
                      <div className="col-span-8 sm:col-span-4">
                        <Component
                          register={register}
                          label={e?.label}
                          name={e?.name}
                          setValue={setValue}
                          getValues={getValues}
                          type={e?.type}
                          value={e?.value}
                          parentCode={e?.parentCode}
                          parentCity={e?.parentCity}
                          placeholder={e?.placeholder}
                          autoFocus={true}
                          watch={watch}
                          status={e?.status}
                          required={e?.name !== "address" && true}
                          readOnly={e?.name === "address" && true}
                          validation={e?.validation || undefined}
                          disabled={
                            e?.disabled ?? !hasPermission("client.update")
                          }
                        />
                        <Error errorName={errors[e?.name]} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <DrawerButton
                id={id}
                title={t("Client")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default ClientDrawer;
