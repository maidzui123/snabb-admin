import React, { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectAgency from "@/components/form/SelectAgency";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useAgencySubmit from "@/hooks/useAgencySubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
import SelectCity from "../form/SelectCity";
import SelectDistrict from "../form/SelectDistrict";
import SelectWard from "../form/SelectWard";
import AgencyCategoryServices from "@/services/AgencyCategoryServices";
import MultipleSelect from "../form/MultipleSelect";
import HistoryModal from "../modal/HistoryModal";
import AgencyHistoryServices from "@/services/AgencyHistoryServices";
import { hasPermission } from "@/helper/permission.helper";
import SelectStatus from "../form/SelectStatus";
import SelectGroupCategory from "../form/SelectGroupCategory";
import GroupCategoryServices from "@/services/GroupCategoryServices";

const services = AgencyCategoryServices;

const AgencyDrawer = ({ id }) => {
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
  } = useAgencySubmit(id);

  const { t } = useTranslation();
  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^(\+84\d{9}|\d{10})$/;
    return phoneNumberRegex.test(value) ? undefined : "Số điện thoại không hợp lệ";
  };
  const handleGetName = (e) => {
    return getValues(e) ? ", " + getValues(e).split(",")[2] : "";
  };
  const fieldArray = [
    {
      label: t("Agency name"),
      name: "name",
      type: "text",
      placeholder: t("Agency name"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Brand license number"),
      name: "license_number",
      type: "number",
      placeholder: t("Brand license number"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Phone"),
      name: "phone",
      type: "number",
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

      // selectedCity: "selectedCity",
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

      // selectedDistrict: "selectedDistrict",
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
      label: t("Address"),
      name: "address",
      type: "text",
      placeholder: t("Address"),
      component: InputArea,
      value:
        (getValues("detail") || "") +
        handleGetName("ward") +
        handleGetName("district") +
        handleGetName("city"),
      labelRequired: true,
      disabled: true,
    },
    {
      label: t("Category"),
      name: "category",
      placeholder: t("Category"),
      component: MultipleSelect,
      services: AgencyCategoryServices,
      control: control,
      labelRequired: true,
      // setSelected: setSelectedCategory,
    },
    {
      label: t("Phân loại nhóm"),
      name: "group_category",
      placeholder: "Phân loại nhóm",
      component: SelectGroupCategory,
      services: GroupCategoryServices,
      labelRequired: true,
      selectType: "agency",
    },
    {
      label: t("Status"),
      name: "status",
      placeholder: t("Status"),
      component: SelectStatus,
      status: ["ACTIVE", "INACTIVE"],
      labelRequired: true,
    },
  ];
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <>
            <Title
              title={t("Update Agency")}
              description={t("Updated Agency")}
            />
            <HistoryModal id={id} services={AgencyHistoryServices} />
          </>
        ) : (
          <Title title={t("Add Agency")} description={t("Add Agency")} />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full pb-40">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                {fieldArray?.map((e) => {
                  const Component = e?.component || InputArea;
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
                          watch={watch}
                          getValues={getValues}
                          value={e?.value}
                          validation={
                            e?.name === "phone" ? e?.validation : undefined
                          }
                          setValue={setValue}
                          required={e?.name !== "address" && true}
                          readOnly={e?.name === "address" && true}
                          status={e?.status}
                          disabled={e?.disabled ?? !hasPermission("agency.update")}
                          selectType={e?.selectType}
                        />
                        <Error errorName={errors[e?.name]} />
                      </div>
                    </div>
                  );
                })}
                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Agency Category" />
                  <div className="col-span-8 sm:col-span-4">
                    <MultipleSelect
                      register={register}
                      label="Agency Category"
                      name="category"
                      selected={selectedCategory}
                      setSelected={setSelectedCategory}
                      control={control}
                      services={services}
                    />
                    <Error errorName={errors.category} />
                  </div>
                </div> */}
              </div>

              <DrawerButton
                id={id}
                title={t("Agency")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default AgencyDrawer;
