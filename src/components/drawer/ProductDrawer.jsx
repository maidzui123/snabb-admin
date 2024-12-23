import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  Card,
  CardBody,
  Input,
  Label,
  Select,
  Textarea,
} from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectProduct from "@/components/form/SelectProduct";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useProductSubmit from "@/hooks/useProductSubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
import SelectProgram from "../form/SelectProgram";
import SelectProvider from "../form/SelectProvider";
import ProductCategoryServices from "@/services/ProductCategoryServices";
import MultipleSelect from "../form/MultipleSelect";
import HistoryModal from "../modal/HistoryModal";
import ProductHistoryServices from "@/services/ProductHistoryServices";
import SelectIndustry from "../form/SelectIndustry";
import SelectStatus from "../form/SelectStatus";
import InputMoneyArea from "../form/InputMoneyArea";
import SelectPeriod from "../form/SelectPeriod";
import { set } from "immutable";
import { hasPermission } from "@/helper/permission.helper";
import SelectGroupCategory from "../form/SelectGroupCategory";
import GroupCategoryServices from "@/services/GroupCategoryServices";
const ProductDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    selectedDate,
    setSelectedDate,
    selectedDate2,
    setSelectedDate2,
    errors,
    control,
    setValue,
    isSubmitting,

    getValues,
  } = useProductSubmit(id);

  const { t } = useTranslation();

  const fieldArray = [
    {
      label: t("Người cập nhật"),
      type: "text",
      placeholder: t("Người cập nhật"),
      component: InputArea,
      value: getValues("created_by")?.name?.vi,
      labelRequired: false,
      disabled: true,
      required: false,
    },
    {
      label: t("Product name"),
      name: "name",
      type: "text",
      placeholder: t("Product name"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Product description"),
      name: "desc",
      type: "textarea",
      rows: "4",
      placeholder: t("Product description"),
      component: InputArea,
      labelRequired: false,
    },
    {
      label: t("Effective date start"),
      name: "effective_date_start",
      type: "date",
      onChange: (e) => setSelectedDate(e.target.value),
      placeholder: t("Effective date start"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Effective date end"),
      name: "effective_date_end",
      type: "date",
      onChange: (e) => setSelectedDate2(e.target.value),
      placeholder: t("Effective date end"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Program"),
      name: "program_id",
      placeholder: t("Program"),
      component: SelectProgram,
      labelRequired: true,
    },
    {
      label: t("Industry"),
      name: "industry_id",
      placeholder: t("Industry"),
      component: SelectIndustry,
      labelRequired: true,
    },
    {
      label: t("Provider"),
      name: "provider_id",
      placeholder: t("Provider"),
      component: SelectProvider,
      labelRequired: true,
    },
    {
      label: t("Product Category"),
      name: "category",
      placeholder: t("Provider"),
      control: control,
      services: ProductCategoryServices,
      component: MultipleSelect,
      labelRequired: true,
    },
    {
      label: t("Warranty Period"),
      name: "warranty_period",
      placeholder: t("Warranty Period"),
      component: SelectPeriod,
      labelRequired: true,
    },
    {
      label: t("Insured"),
      name: "insured",
      type: "text",
      placeholder: t("Insured"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Coverage"),
      name: "coverage",
      type: "text",
      placeholder: t("Coverage"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Insurance Benefits"),
      name: "insurance_benefits",
      type: "text",
      placeholder: t("Insurance Benefits"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Deductible"),
      name: "deductible",
      type: "text",
      placeholder: t("Deductible"),
      component: InputMoneyArea,
      labelRequired: true,
    },
    {
      label: t("Insurance Amount"),
      name: "insurance_amount",
      type: "text",
      placeholder: t("Insurance Amount"),
      component: InputMoneyArea,
      labelRequired: true,
    },
    {
      label: t("Insurance Premium"),
      name: "insurance_premium",
      type: "text",
      placeholder: t("Insurance Premium"),
      component: InputMoneyArea,
      labelRequired: true,
    },
    {
      label: t("Insurance Rules"),
      name: "insurance_rules",
      type: "string",
      placeholder: t("Insurance Rules"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Cancellation Period"),
      name: "cancellation_period",
      type: "string",
      placeholder: t("Cancellation Period"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Settlement Period"),
      name: "settlement_period",
      type: "string",
      placeholder: t("Settlement Period"),
      component: InputArea,
      labelRequired: true,
    },
    {
      label: t("Approval Limit"),
      name: "approval_limit",
      type: "text",
      placeholder: t("Approval Limit"),
      component: InputMoneyArea,
      labelRequired: true,
    },

    {
      label: t("Other"),
      name: "other",
      type: "string",
      placeholder: t("Other"),
      component: InputArea,
      labelRequired: false,
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
              title={t("Cập nhật sản phẩm")}
              description={t("Updated Product")}
            />
            <HistoryModal id={id} services={ProductHistoryServices} />
          </>
        ) : (
          <Title title={t("Add Product")} description={t("Add Product")} />
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
                          value={e?.value}
                          onChange={e?.onChange}
                          setValue={setValue}
                          control={e?.control}
                          services={e?.services}
                          required={
                            e?.name !== "other" && e?.name !== "desc" && e?.required || true
                          }
                          status={e?.status}
                          getValues={getValues}
                          disabled={e?.disabled ?? !hasPermission("product.update")}

                        />
                        <Error errorName={errors[e?.name]} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <DrawerButton
                id={id}
                title={t("Product")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default ProductDrawer;
