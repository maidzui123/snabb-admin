import { React, useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";
import { Select } from "@windmill/react-ui";
import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectRole from "@/components/form/SelectRole";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useRoleSubmit from "@/hooks/useRoleSubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
import ActiveButton from "../form/ActiveButton";
import useAsync from "../../hooks/useAsync";
import PermissionServices from "../../services/PermissionServices";
import { isDisabledComponent } from "@/helper/permission.helper";

const RoleDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    handleSelectPermit,
    handleSelectAll,
    onSubmit,
    errors,
    isSubmitting,
    tapValue,
    handleProductTap,
    selectType,
    setselectType,
    getValues,
    watch,
  } = useRoleSubmit(id);
  const { data, loading } = useAsync(() => PermissionServices.getByModule());
  const checkPermission = isDisabledComponent("permission.update");
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title={t("Update Role")} description={t("Updated Role")} />
        ) : (
          <Title title={t("Add Role")} description={t("Add Role")} />
        )}
      </div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
        {/* <SwitchToggleForCombination
          product
          handleProcess={handleIsCombination}
          processOption={isCombination}
        /> */}

        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue={"role"}
              label={"Vai trò"}
              handleProductTap={handleProductTap}
              disabled={checkPermission}
            />
          </li>
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="permission"
              label={"Phân quyền"}
              handleProductTap={handleProductTap}
              disabled={checkPermission}
            />
          </li>
          {/* <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Member"
                handleProductTap={handleProductTap}
              />
            </li> */}
        </ul>
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                {tapValue === "role" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Tên vai trò")} />
                      <div className="col-span-8 sm:col-span-4">
                        <InputArea
                          register={register}
                          label={t("Tên vai trò")}
                          name="name"
                          type="text"
                          placeholder={t("Tên vai trò")}
                          autoFocus={true}
                          disabled={checkPermission}
                          required={true}
                        />
                        <Error errorName={errors.name} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Description")} />
                      <div className="col-span-8 sm:col-span-4">
                        <TextAreaCom
                          className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                          register={register}
                          name="description"
                          placeholder={t("Description")}
                          rows="4"
                          disabled={checkPermission}
                        />
                        <Error errorName={errors.description} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Chức vụ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <Select
                          onChange={(e) => {
                            const value = e.target.value;
                            setselectType(value);
                          }}
                          className="border h-12 text- focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                          name="type"
                          register={register}
                          value={selectType}
                          required={true}
                        >
                          <option value="" defaultValue>
                            {t("Chọn chức vụ")}
                          </option>
                          <option value="MANAGER">Quản lý</option>
                          <option value="STAFF">Nhân viên</option>
                        </Select>
                      </div>
                    </div>
                  </>
                )}
                {tapValue === "permission" && (
                  <>
                    <div className=" gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <div className=" grid grid-cols-3">
                        <Label radio className="mr-3">
                          <Input
                            name="selectall"
                            type="radio"
                            value="allow all"
                            onChange={() => {
                              handleSelectAll("allow", data);
                            }}
                            checked={data?.data?.every((e) =>
                              e?.permit_id?.every(
                                (el) => getValues(el?.code) == "allow"
                              )
                            )}
                            className="ml-3 border-gray-500"
                          />

                          <span className="ml-2">{t("Allow all")}</span>
                        </Label>
                        <Label radio className="mr-3">
                          <Input
                            name="selectall"
                            type="radio"
                            value="deny all"
                            className="ml-3 border-gray-500"
                            onChange={() => {
                              handleSelectAll("deny", data);
                            }}
                            checked={data?.data?.every((e) =>
                              e?.permit_id?.every(
                                (el) => getValues(el?.code) == "deny"
                              )
                            )}
                          />
                          <span className="ml-2">{t("Deny all")}</span>
                        </Label>
                        <Label radio className="mr-3">
                          <Input
                            name="selectall"
                            type="radio"
                            value="inherit all"
                            className="ml-3 border-gray-500"
                            onChange={() => {
                              handleSelectAll("inherit", data);
                            }}
                            checked={data?.data?.every((e) =>
                              e?.permit_id?.every(
                                (el) => getValues(el?.code) == "inherit"
                              )
                            )}
                          />
                          <span className="ml-2">{t("Inherrit all")}</span>
                        </Label>
                      </div>
                    </div>

                    {data?.data?.map((value, i) => {
                      return (
                        <div
                          key={i + 1}
                          className="grid gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                        >
                          <div className="">
                            <div className="font-bold	">{value?._id?.name}</div>
                          </div>
                          {value?.permit_id.map((item, index) => {
                            return (
                              <div key={index + 1} className="">
                                <div className="ml-4">{item?.code}</div>
                                <div className="grid grid-cols-4 my-2">
                                  <Label radio className="col-start-2">
                                    <Input
                                      {...register(`${item?.code}`)}
                                      name={`${item?.code}`}
                                      type="radio"
                                      value="allow"
                                      onChange={() => {
                                        handleSelectPermit(
                                          "allow",
                                          item?._id,
                                          item?.code
                                        );
                                      }}
                                      className="ml-3 border-gray-500"
                                    />
                                    <span className="ml-2">{t("Allow")}</span>
                                  </Label>
                                  <Label radio className="">
                                    <Input
                                      {...register(`${item?.code}`)}
                                      name={`${item?.code}`}
                                      type="radio"
                                      value="deny"
                                      //checked={item?._id?.status === "deny"}
                                      onChange={() => {
                                        handleSelectPermit(
                                          "deny",
                                          item?._id,
                                          item?.code
                                        );
                                      }}
                                      className="ml-3 border-gray-500"
                                    />
                                    <span className="ml-2">{t("Deny")}</span>
                                  </Label>
                                  <Label radio className="">
                                    <Input
                                      {...register(`${item?.code}`)}
                                      name={`${item?.code}`}
                                      type="radio"
                                      value="inherit"
                                      // checked={item?._id?.status === "inherit"}
                                      onChange={() => {
                                        handleSelectPermit(
                                          "inherit",
                                          item?._id,
                                          item?.code,
                                          item?.code
                                        );
                                      }}
                                      className="ml-3 border-gray-500"
                                    />
                                    <span className="ml-2">
                                      {t("Inherrit")}
                                    </span>
                                  </Label>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              <DrawerButton
                id={id}
                title={t("Role")}
                isSubmitting={isSubmitting}
              />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default RoleDrawer;
