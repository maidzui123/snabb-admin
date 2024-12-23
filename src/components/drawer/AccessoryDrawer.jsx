import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectAccessory from "@/components/form/SelectAccessory";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useAccessorySubmit from "@/hooks/useAccessorySubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
import SelectProduct from "../form/SelectProduct";
import SelectAgency from "../form/SelectAgency";
import SelectStatusAccessory from "../form/SelectStatusAccessory";
import AccessoryCategoryServices from "@/services/AccessoryCategoryServices";
import MultipleSelect from "../form/MultipleSelect";
import HistoryModal from "../modal/HistoryModal";
import AccessoryHistoryServices from "@/services/AccessoryHistoryServices";
import { useState } from "react";
import SelectUnit from "../form/SelectUnit";
import InputMoneyArea from "../form/InputMoneyArea";
import InputVatArea from "../form/InputVatArea";
import { hasPermission } from "@/helper/permission.helper";
const AccessoryDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    selectedDate1,
    selectedDate2,
    setSelectedDate1,
    setSelectedDate2,
    control,
    isSubmitting,
    getValues,
    setValue,
  } = useAccessorySubmit(id);

  const { t } = useTranslation();

  const fieldArray = React.useMemo(
    () => [
      {
        label: t("Accessory name"),
        name: "name",
        type: "text",
        placeholder: t("Accessory name"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Code"),
        name: "code",
        type: "text",
        placeholder: t("Code"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Accessory description"),
        name: "desc",
        type: "text",
        rows: "4",
        placeholder: t("Accessory description"),
        component: TextAreaCom,
        labelRequired: false,
      },
      {
        label: t("Price"),
        name: "price",
        type: "text",
        placeholder: t("Price"),
        component: InputMoneyArea,
        labelRequired: true,
      },
      {
        label: t("VAT"),
        name: "VAT",
        type: "number",
        placeholder: t("VAT"),
        component: InputVatArea,
        labelRequired: true,
      },
      {
        label: t("Unit"),
        name: "unit",
        type: "text",
        placeholder: t("Unit"),
        component: SelectUnit,
        labelRequired: true,
      },
      {
        label: t("Status"),
        name: "status",
        type: "text",
        placeholder: t("Status"),
        component: SelectStatusAccessory,
        labelRequired: true,
      },
      {
        label: t("Product"),
        name: "product_id",
        type: "text",
        placeholder: t("Product"),
        component: SelectProduct,
        labelRequired: true,
      },
      {
        label: t("Agency"),
        name: "agency_id",
        type: "text",
        placeholder: t("Agency"),
        component: SelectAgency,
        labelRequired: true,
      },
      {
        label: t("Accessory Category"),
        name: "category",
        placeholder: t("Accessory Category"),
        component: MultipleSelect,
        services: AccessoryCategoryServices,
        control: control,
        labelRequired: true,

        // setSelected: setSelectedCategory,
      },
    ],
    []
  );

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <>
            <Title
              title={t("Update Accessory")}
              description={t("Updated Accessory")}
            />
            <HistoryModal id={id} services={AccessoryHistoryServices} />
          </>
        ) : (
          <Title title={t("Add Accessory")} description={t("Add Accessory")} />
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
                    <>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea
                          label={e?.label}
                          labelRequired={e?.labelRequired}
                        />
                        <div className="col-span-8 sm:col-span-4">
                          <div>
                            <Component
                              register={register}
                              label={e?.label}
                              name={e?.name}
                              type={e?.type}
                              placeholder={e?.placeholder}
                              getValues={getValues}
                              // value={getValues(e?.name)}
                              setValue={setValue}
                              disabled={
                                e?.disabled ??  !hasPermission("accessory.update")
                              }
                              autoFocus={true}
                              required={e?.name !== "desc" && true}
                              control={control}
                              services={e?.services}
                            />
                          </div>
                          <Error errorName={errors[e?.name]} />
                        </div>
                      </div>
                    </>
                  );
                })}
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Valid date")} labelRequired={true} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      onChange={(e) => setSelectedDate1(e.target.value)}
                      register={register}
                      label={t("Valid date")}
                      name="valid_from"
                      value={selectedDate1}
                      type="date"
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder={t("Validdate ")}
                      required={false}
                      disabled={
                         !hasPermission("accessory.update")
                      }
                    />
                    <Error errorName={errors.valid_from} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea
                    label={t("Valid date end")}
                    labelRequired={false}
                  />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      onChange={(e) => setSelectedDate2(e.target.value)}
                      register={register}
                      label={t("Valid date end")}
                      name="valid_to"
                      value={selectedDate2}
                      type="date"
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder={t("Validdate end")}
                      required={false}
                      disabled={
                        !hasPermission("accessory.update")
                     }
                    />
                    <Error errorName={errors.valid_to} />
                  </div>
                </div>
                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Valid to" />
                  <div className="col-span-8 _sm:col-span-4">
                    <Input
                      onChange={(e) => setSelectedDate2(e.target.value)}
                      register={register}
                      label="Valid to"
                      name="valid_to"
                      value={selectedDate2}
                      type="date"
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder={t("Valid date")}
                    />
                    <Error errorName={errors.valid_to} />
                  </div>
                </div> */}
                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Status")} />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectStatusAccessory 
                    register={register} label="Status" name="status" />
                    <Error errorName={errors.status} />
                  </div>
                </div> */}
                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Product")} />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectProduct register={register} label="Product" name="product_id" />
                    <Error errorName={errors.product_id} />
                  </div>
                </div> */}
                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Agency")} />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectAgency register={register} label="Agency" name="agency_id" />
                    <Error errorName={errors.agency_id} />
                  </div>
                </div> */}
                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Accessory Category")} />
                  <div className="col-span-8 sm:col-span-4">
                    <MultipleSelect
                      register={register}
                      label={t("Accessory Category")}
                      name="category"
                      control={control}
                      services= {AccessoryCategoryServices}
                    />
                    <Error errorName={errors.category} />
                  </div>
                </div> */}
              </div>
              <DrawerButton
                id={id}
                title={t("Accessory")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default AccessoryDrawer;
