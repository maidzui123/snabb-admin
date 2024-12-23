import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectBrand from "@/components/form/SelectBrand";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useBrandSubmit from "@/hooks/useBrandSubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
import SelectCity from "../form/SelectCity";
import SelectDistrict from "../form/SelectDistrict";
import SelectWard from "../form/SelectWard";
import BrandCategoryServices from "@/services/BrandCategoryServices";
import MultipleSelect from "../form/MultipleSelect";
import HistoryModal from "../modal/HistoryModal";
import BrandHistoryServices from "@/services/BrandHistoryServices";
import useAsync from "@/hooks/useAsync";
import SelectStatus from "../form/SelectStatus";
import { hasPermission } from "@/helper/permission.helper";

const BrandDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    control,
    watch,
    getValues,
    setValue,
  } = useBrandSubmit(id);

  const { t } = useTranslation();
  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^(\+84\d{9}|\d{10})$/;
    return phoneNumberRegex.test(value)
      ? undefined
      : "Số điện thoại không hợp lệ";
  };
  const handleGetName = (e) => {
    return getValues(e) ? ", " + getValues(e).split(",")[2] : "";
  };
  const fieldArray = [
    {
      label: t("Brand name"),
      name: "name",
      type: "type",
      placeholder: t("Brand name"),
      component: InputArea,
      labelRequired: true,
      required: true,
    },
    {
      label: t("Brand license number"),
      name: "license_number",
      type: "text",
      placeholder: t("Brand license number"),
      component: InputArea,
      labelRequired: true,
      required: true,
    },
    {
      label: t("Phone"),
      name: "phone",
      type: "text",
      placeholder: t("Phone"),
      component: InputArea,
      labelRequired: true,
      required: true,

      validation: validatePhoneNumber,
    },
    {
      label: t("Email"),
      name: "email",
      type: "text",
      placeholder: t("Email"),
      component: InputArea,
      labelRequired: true,
      required: true,
    },
    {
      label: t("City"),
      name: "city",
      type: "text",
      placeholder: t("City"),
      component: SelectCity,
      value: getValues("city"),
      labelRequired: true,
      required: true,
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
      required: true,
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
      required: true,
    },
    {
      label: t("Detail"),
      name: "detail",
      type: "text",
      placeholder: t("Detail"),
      component: InputArea,
      labelRequired: true,
      required: true,
    },
    {
      label: t("Address"),
      name: "address",
      type: "text",
      placeholder: t("Address"),
      value:
        (getValues("detail") || "") +
        handleGetName("ward") +
        handleGetName("district") +
        handleGetName("city"),
      component: InputArea,
      labelRequired: true,
      required: false,
      disabled: true

    },
    {
      label: t("Category"),
      name: "category",
      placeholder: t("Brand Category"),
      component: MultipleSelect,
      services: BrandCategoryServices,
      control: control,
      labelRequired: true,
      required: false,
    },
    {
      label: t("Status"),
      name: "status",
      placeholder: t("Status"),
      component: SelectStatus,
      status: ["ACTIVE", "INACTIVE"],
      labelRequired: true,
      required: true,
    },
  ];
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <>
            <Title title={t("Update Brand")} description={t("Updated Brand")} />
            <HistoryModal id={id} services={BrandHistoryServices} />
          </>
        ) : (
          <Title title={t("Add Brand")} description={t("Add Brand")} />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full pb-40">
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
                          type={e?.type}
                          placeholder={e?.placeholder}
                          autoFocus={true}
                          services={e?.services}
                          control={control}
                          parentCode={e?.parentCode}
                          parentCity={e?.parentCity}
                          watch={watch}
                          getValues={getValues}
                          value={e?.value}
                          setValue={setValue}
                          required={e?.required}
                          validation={
                            e?.name === "phone" ? e?.validation : undefined
                          }
                          status={e?.status}
                          disabled={
                            e?.disabled ?? !hasPermission("brand.update")
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
                title={t("Brand")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default BrandDrawer;
