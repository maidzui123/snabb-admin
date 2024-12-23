import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectProvider from "@/components/form/SelectProvider";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useProviderSubmit from "@/hooks/useProviderSubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
import ProviderCategoryServices from "@/services/ProviderCategoryServices";
import SelectProgram from "../form/SelectProgram";
import SelectCity from "../form/SelectCity";
import SelectDistrict from "../form/SelectDistrict";
import SelectWard from "../form/SelectWard";
import MultipleSelect from "../form/MultipleSelect";
import HistoryModal from "../modal/HistoryModal";
import ProviderHistoryServices from "@/services/ProviderHistoryServices";
import { useState } from "react";
import TagsInputComponent from "../common/TagsInputComponent";
import SelectStatus from "../form/SelectStatus";
import CityServices from "@/services/CityServices";
import { hasPermission, isDisabledComponent } from "@/helper/permission.helper";
import { has } from "immutable";
import SelectGroupCategory from "../form/SelectGroupCategory";
import GroupCategoryServices from "@/services/GroupCategoryServices";
const ProviderDrawer = ({ id }) => {
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
  } = useProviderSubmit(id);

  const { t } = useTranslation();
  // const [getCity, setGetCity] = useState("");
  // // console.log("🚀 ~ file: ProviderDrawer.jsx:50 ~ ProviderDrawer ~ getCity:", getCity)
  // const handleCityChange = (e) => {
  //   const selectCity = e?.target?.value;
  //   console.log(
  //     "🚀 ~ file: ProviderDrawer.jsx:53 ~ handleCityChange ~ selectCity:",
  //     selectCity
  //   );
  //   setGetCity(selectCity);
  // };
  const handleGetName = (e) => { 
    return getValues(e) ? ", " + getValues(e).split(",")[2]: "";
  } 
  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^(\+84\d{9}|\d{10})$/;
    return phoneNumberRegex.test(value) ? undefined : "Số điện thoại không hợp lệ";
  };
  const fieldArray = [
    {
      label: t("Provider name"),
      name: "name",
      type: "text",
      placeholder: t("Provider name"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Provider code"),
      name: "code",
      type: "text",
      placeholder: t("Provider code"),
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
      label: t("Address"),
      name: "address",
      type: "text",
      placeholder: t("Address"),
      value: (getValues("detail") || "") + handleGetName("ward") + handleGetName("district") + handleGetName("city"),
      component: InputArea,
      labelRequired: false,
      disabled: true,
    },
    {
      label: t("Program"),
      name: "program_id",
      type: "text",
      placeholder: t("Program"),
      component: SelectProgram,
      labelRequired: true,
    },
    {
      label: t("Category"),
      name: "category",
      placeholder: "Provider Category",
      component: MultipleSelect,
      services: ProviderCategoryServices,
      control: control,
      labelRequired: true,
    },

    {
      label: t("Phân loại nhóm"),
      name: "group_category",
      placeholder: "Phân loại nhóm",
      component: SelectGroupCategory,
      services: GroupCategoryServices,
      labelRequired: true,
      selectType: "provider"
    },

    {
      label: t("Whitelist IP"),
      name: "whitelist_ip",
      placeholder: "Whitelist IP",
      component: TagsInputComponent,
      control: control,
    },
    {
      label: t("Danh sách email"),
      name: "email_list",
      placeholder: "Danh sách email",
      component: TagsInputComponent,
      control: control,
    },
    {
      label: t("Cài đặt"),
      name: "setting",
      placeholder: "Cài đặt",
      component: TextAreaCom,
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
              title={t("Update Provider")}
              description={t("Updated Provider")}
            />
            <HistoryModal id={id} services={ProviderHistoryServices} />
          </>
        ) : (
          <Title title={t("Add Provider")} description={t("Add Provider")} />
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
                      key={e?.name}
                      className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                    >
                      <LabelArea
                        label={e?.label}
                        labelRequired={e?.labelRequired}
                      />
                      <div className="col-span-8 sm:col-span-4">
                        <Component
                          register={register}
                          name={e?.name}
                          label={e?.label}
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
                          onChange={e?.onChange}
                          setValue={setValue}
                          required={e?.name !== "address" && true}
                          readOnly={e?.name === "address" && true}
                          validation={
                            e?.name === "phone" ? e?.validation : undefined
                          }
                          status={e?.status}
                          disabled={e?.disabled ?? isDisabledComponent("provider.update") }
                          selectType={e?.selectType}
                        />
                        <Error errorName={errors[e?.name]} />
                      </div>
                    </div>
                  );
                })}
                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Program" />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectProgram register={register} label="Program" name="program_id" />
                    <Error errorName={errors.program_id} />
                  </div>
                </div> */}
              </div>

              <DrawerButton
                id={id}
                title={t("Provider")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default ProviderDrawer;
