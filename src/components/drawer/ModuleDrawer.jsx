import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectModule from "@/components/form/SelectModule";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useModuleSubmit from "@/hooks/useModuleSubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
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

const ModuleDrawer = ({ id }) => {
  const { register, handleSubmit, onSubmit, errors, isSubmitting } =
    useModuleSubmit(id);

  const { t } = useTranslation();

  const fieldArray = React.useMemo(
    () => [
      {
        label: t("Module name"),
        name: "name",
        type: "text",
        placeholder: t("Module name"),
        component: "TextArea",
      },
      {
        label: t("Module description"),
        name: "description",
        type: "textarea",
        rows: "4",
        placeholder: t("Module description"),
        component: "TextAreaCom",
      },
      {
        label: t("Client url"),
        name: "client_url",
        type: "text",
        placeholder: t("Client url"),
        component: "TextArea",
      },
      {
        label: t("Server url"),
        name: "server_url",
        type: "text",
        placeholder: t("server_url"),
        component: "TextArea",
      },
    ],
    []
  );

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title={t("Update Module")} description={t("Updated Module")} />
        ) : (
          <Title title={t("Add Module")} description={t("Add Module")} />
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
                    <>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label={e?.label} />
                        <div className="col-span-8 sm:col-span-4">
                          <Component
                            register={register}
                            label={e?.label}
                            name={e?.name}
                            type={e?.type}
                            placeholder={e?.placeholder}
                            autoFocus={true}
                            disabled={
                              e?.disabled ?? !hasPermission("module.update")
                            }
                          />
                          <Error errorName={errors[e?.name]} />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>

              <DrawerButton
                id={id}
                title={t("Module")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default ModuleDrawer;
