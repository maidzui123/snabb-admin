import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody } from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import DrawerButton from "@/components/form/DrawerButton";
import useProgramSubmit from "@/hooks/useProgramSubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
import ProgramCategoryServices from "@/services/ProgramCategoryServices";
import MultipleSelect from "../form/MultipleSelect";
import HistoryModal from "../modal/HistoryModal";
import ProgramHistoryServices from "@/services/ProgramHistoryServices";
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

const ProgramDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    control,
    setValue,
  } = useProgramSubmit(id);

  const { t } = useTranslation();

  const fieldArray = React.useMemo(
    () => [
      {
        label: t("Program Name"),
        name: "name",
        type: "text",
        placeholder: t("Program Name"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Program Code"),
        name: "code",
        type: "text",
        placeholder: t("Program Code"),
        component: InputArea,
        labelRequired: true,
      },
      {
        label: t("Description"),
        name: "desc",
        type: "text",
        rows: "4",
        placeholder: t("Description"),
        component: TextAreaCom,
        labelRequired: false,
      },
      {
        label: t("Category"),
        name: "category",
        placeholder: "Program Category",
        component: MultipleSelect,
        services: ProgramCategoryServices,
        control: control,
        labelRequired: true,

        // setSelected: setSelectedCategory,
      },
      {
        label: t("Status"),
        name: "status",
        placeholder: t("Status"),
        component: SelectStatus,
        status: ["ACTIVE", "INACTIVE"],
        labelRequired: true,
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
              title={t("Update Program")}
              description={t("Updated Program")}
            />
            <HistoryModal id={id} services={ProgramHistoryServices} />
          </>
        ) : (
          <Title title={t("Add Program")} description={t("Add Program")} />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                {fieldArray?.map((e) => {
                  const Component = e.component || componentArray.InputArea;
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
                          required={e?.name !== "desc" && true}
                          setValue={setValue}
                          status={e?.status}
                          disabled={e?.disabled ??  !hasPermission("program.update")}

                        />
                        <Error errorName={errors[e?.name]} />
                      </div>
                    </div>
                  );
                })}
                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Program Category" />
                  <div className="col-span-8 sm:col-span-4">
                    <MultipleSelect register={register} label="Agency Program" name="category" selected={selectedCategory} setSelected={setSelectedCategory} control={control} services={services}/>
                    <Error errorName={errors.category} />
                  </div>
                </div> */}
              </div>

              <DrawerButton
                id={id}
                title={t("Program")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default ProgramDrawer;
