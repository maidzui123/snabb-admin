import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectPermission from "@/components/form/SelectPermission";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import usePermissionSubmit from "@/hooks/usePermissionSubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
import SelectModule from "../form/SelectModule";
import { hasPermission, isDisabledComponent } from "@/helper/permission.helper";
import { useState } from "react";
import CheckBox from "../form/CheckBox";
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

const PermissionDrawer = ({ id }) => {
  const { register, handleSubmit, onSubmit, getValues, errors, isSubmitting } =
    usePermissionSubmit(id);
  const { t } = useTranslation();
  const [namePermission, setNamePermission] = useState("");
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(permissionValue?.map((item) => item?.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  const handleClick = (e) => {
    const { id, checked } = e.target;
    
    setIsCheck([...isCheck, id]);
    console.log(
      "🚀 ~ file: PermissionDrawer.jsx:62 ~ PermissionDrawer ~ isCheck:",
      isCheck
    );
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  const fieldArray = React.useMemo(
    () => [
      {
        label: t("Permission name"),
        name: "name",
        type: "text",
        value: namePermission,
        onChange: (e) => setNamePermission(e.target.value),
        placeholder: t("Permission name"),
        component: InputArea,
      },
      // {
      //   label: t("Module Code"),
      //   name: "code",
      //   type: "text",
      //   placeholder: t("Module Code"),
      //   component: InputArea,
      // },
      {
        label: t("Permission description"),
        name: "description",
        type: "textarea",
        rows: "4",
        placeholder: t("Permission description"),
        component: TextAreaCom,
      },
      {
        label: t("Module"),
        name: "module_id",
        type: "text",
        placeholder: t("Module"),
        component: SelectModule,
      },
    ],
    []
  );
  const permissionValue = [
    {
      id: 1,
      label: "List",
      value: `${namePermission}.list`,
    },
    {
      id: 2,
      label: "View",
      value: `${namePermission}.view`,
    },
    {
      id: 3,
      label: "Delete",
      value: `${namePermission}.delete`,
    },
    {
      id: 4,
      label: "Update",
      value: `${namePermission}.update`,
    },
  ];

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t("Update Permission")}
            description={t("Updated Permission")}
          />
        ) : (
          <Title
            title={t("Add Permission")}
            description={t("Add Permission")}
          />
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
                      <LabelArea label={e?.label} />
                      <div className="col-span-8 sm:col-span-4">
                        <Component
                          register={register}
                          label={e?.label}
                          name={e?.name}
                          type={e?.type}
                          value={e?.value || undefined}
                          onChange={e?.onChange || undefined}
                          placeholder={e?.placeholder}
                          autoFocus={true}
                          disabled={
                            e?.disabled ??
                            isDisabledComponent("permission.update")
                          }
                        />
                        <Error errorName={errors[e?.name]} />
                      </div>
                    </div>
                  );
                })}
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Chọn quyền")} />
                  <div className="flex col-span-8 sm:col-span-4">
                    {/* <Label checkbox className="mr-3">
                      <Input
                        type="checkbox"
                        checked={isCheckAll}
                        onChange={handleSelectAll}
                        className=" border-gray-500"
                      />
                      <span className="ml-2">All</span>
                    </Label> */}
                    {permissionValue?.map((e) => (
                      <>
                        <Label checkbox className="mr-3">
                          <Input
                            {...register(`code`)}
                            id={e?.id}
                            name="code"
                            type="checkbox"
                            value={e?.value}
                            // isChecked={isCheck?.includes(e?.id)}
                            // handleClick={(e) => {
                            //   handleClick(e);
                            // }}
                            className=" border-gray-500"
                          />
                          <span className="ml-2">{e?.label}</span>
                        </Label>
                      </>
                    ))}
                    {/* <Label checkbox className="mr-3">
                      <Input
                        type="checkbox"
                        // onChange={handleAllCheckboxChange}
                        className=" border-gray-500"
                      />
                      <span className="ml-2">All</span>
                    </Label>
                    <Label checkbox className="mr-3">
                      <Input
                        {...register(`code`)}
                        name="code"
                        type="checkbox"
                        value={`${namePermission}.list`}
                        // checked={checkAll}
                        onChange={handleClick}
                        className=" border-gray-500"
                      />
                      <span className="ml-2">List</span>
                    </Label>
                    <Label checkbox className="mr-3">
                      <Input
                        {...register(`code`)}
                        name="code"
                        type="checkbox"
                        value={`${namePermission}.view`}
                        // checked={checkAll}
                        onChange={handleClick}
                        className="border-gray-500"
                      />
                      <span className="ml-2">View</span>
                    </Label>
                    <Label checkbox className="mr-3">
                      <Input
                        {...register(`code`)}
                        name="code"
                        type="checkbox"
                        value={`${namePermission}.delete`}
                        // checked={checkAll}
                        onChange={handleClick}
                        className=" border-gray-500"
                      />
                      <span className="ml-2">Delete</span>
                    </Label>
                    <Label checkbox className="mr-3">
                      <Input
                        {...register(`code`)}
                        name="code"
                        type="checkbox"
                        value={`${namePermission}.update`}
                        // checked={checkAll}
                        onChange={handleClick}
                        className=" border-gray-500"
                      />
                      <span className="ml-2">Update</span>
                    </Label> */}
                  </div>
                </div>
              </div>

              <DrawerButton
                id={id}
                title={t("Permission")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default PermissionDrawer;
