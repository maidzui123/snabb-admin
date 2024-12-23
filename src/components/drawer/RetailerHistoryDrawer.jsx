import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectRetailerHistory from "@/components/form/SelectRetailerHistory";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useRetailerHistorySubmit from "@/hooks/useRetailerHistorySubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";

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

const RetailerHistoryDrawer = ({ id }) => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useRetailerHistorySubmit(id);

  const { t } = useTranslation();

  const fieldArray = React.useMemo(
    () => [
      {
        label: t("RetailerHistory name"),
        name: "name",
        type: "text",
        placeholder: t("RetailerHistory name"),
        component: "TextArea",
      },
      {
        label: t("RetailerHistory description"),
        name: "description",
        type: "textarea",
        rows: "4",
        placeholder: t("RetailerHistory description"),
        component: "TextAreaCom",
      },
    ],
    []
  );

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t("Update RetailerHistory")}
            description={t("Updated RetailerHistory")}
          />
        ) : (
          <Title
            title={t("Add RetailerHistory")}
            description={t("Add RetailerHistory")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                {fieldArray?.map((e) => {
                  const Component =
                    componentArray[e.component] || componentArray.InputArea;
                  return (
                    <div
                      className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                      key={e?.name}
                    >
                      <LabelArea label={e?.label} />
                      <div className="col-span-8 sm:col-span-4">
                        <Component
                          register={register}
                          label={e?.label}
                          name={e?.name}
                          type={e?.type}
                          placeholder={e?.placeholder}
                          autoFocus={true}
                        />
                        <Error errorName={errors[e?.name]} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <DrawerButton
                id={id}
                title={t("RetailerHistory")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default RetailerHistoryDrawer;
