import React , {useState} from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { Select } from "@windmill/react-ui";

//internal import

import Error from "@/components/form/Error";
import Title from "@/components/form/Title";
import InputArea from "@/components/form/InputArea";
import useStaffSubmit from "@/hooks/useStaffSubmit";
import DrawerButton from "@/components/form/DrawerButton";
import LabelArea from "@/components/form/LabelArea";
import Uploader from "@/components/image-uploader/Uploader";
import SelectType from "@/components/form/SelectType";
import SelectAgency from "../form/SelectAgency";
import SelectRetailer from "../form/SelectRetailer";
import SelectProvider from "../form/SelectProvider";
import MultipleSelect from "../form/MultipleSelect";
import RoleServices from "@/services/RoleServices";
import ActiveButton from "../form/ActiveButton";
import PermissionServices from "@/services/PermissionServices";
import useAsync from "@/hooks/useAsync";
import SelectStatus from "../form/SelectStatus";
import { hasPermission, isDisabledComponent } from "@/helper/permission.helper";
import { get } from "immutable";

const StaffDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    selectedDate,
    setSelectedDate,
    selectedType,
    setSelectedType,
    handleSelectAll,
    getValues,
    handleSelectLanguage,
    control,
    setValue,
    tapValue,
    handleProductTap,
    handleSelectPermit,
    generatedPassword,
    setGeneratedPassword,
    sendMailChecked,
    setSendMailChecked,
  } = useStaffSubmit(id);
  const { t } = useTranslation();

  const { data, loading } = useAsync(() => PermissionServices.getByModule());
  const checkPermission = isDisabledComponent("ourstaff.update");
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedType(value);
  };
  const validatePhoneNumber = (value) => {
    const phoneNumberRegex = /^(\+84\d{9}|\d{10})$/;
    return phoneNumberRegex.test(value) ? undefined : "Số điện thoại không hợp lệ";
  };

  const generateRandomPassword = () => {
    const newPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2);
    setGeneratedPassword(newPassword);
    setValue("password", generatedPassword)
  };

  const handleSendMailChange = () => {
    setSendMailChecked(!sendMailChecked);
  };

  
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateStaff")}
            description={t("UpdateStaffdescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddStaffTitle")}
            description={t("AddStaffdescription")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue={"Staff"}
                label={"Thông tin tài khoản"}
                handleProductTap={handleProductTap}
                disabled={checkPermission}
              />
            </li>
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Permission"
                label={"Phân quyền"}
                handleProductTap={handleProductTap}
                disabled={checkPermission}
              />
            </li>
          </ul>
        </div>
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full pb-40">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                {tapValue === "Staff" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Staff Image")} />
                      <div className="col-span-8 sm:col-span-4">
                        <Uploader
                          imageUrl={imageUrl}
                          setImageUrl={setImageUrl}
                          folder="admin"
                          disabled={checkPermission}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Name")} />
                      <div className="col-span-8 sm:col-span-4">
                        <InputArea
                          required={true}
                          register={register}
                          label={t("Name")}
                          name="name"
                          type="text"
                          autoComplete="username"
                          placeholder={t("Staff name")}
                          disabled={checkPermission}
                        />
                        <Error errorName={errors.name} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Email")} />
                      <div className="col-span-8 sm:col-span-4">
                        <InputArea
                          required={true}
                          register={register}
                          label={t("Email")}
                          name="email"
                          type="text"
                          autoComplete="username"
                          // pattern={
                          //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                          // }
                          placeholder={t("Email")}
                          disabled={checkPermission}
                        />
                        <Error errorName={errors.email} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Password")} />
                      <div className="flex gap-4 grid-flow-row grid-cols-4 col-span-8 sm:col-span-4 relative">
                        <InputArea
                          // required={true}
                          register={register}
                          label={t("Password")}
                          name="password"
                          //type="password"
                          getValues={getValues}
                          autoComplete="new-password"
                          placeholder={t("Password")}
                          disabled={checkPermission}
                          //value={generatedPassword??generatedPassword}
                        />

                        <button
                          type="button"
                          onClick={generateRandomPassword}
                          className="  w-32 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                          Khởi tạo
                        </button>

                        <Error errorName={errors.password} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("")} />
                      <div className="flex gap-4 grid-flow-row grid-cols-4 col-span-8 sm:col-span-4 relative">
                          <InputArea
                            register={register}
                            name="send_mail"
                            type="checkbox"
                            checked={id ? false : sendMailChecked}
                            disabled={checkPermission}
                            className="h-4 w-4"
                            onChange={handleSendMailChange}
                          />
                          <label htmlFor="send_mail" className="cursor-pointer text-sm">
                            {t("Gửi link đổi mật khẩu")}
                          </label>
                        <Error errorName={errors.send_mail} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Contact Number")} />
                      <div className="col-span-8 sm:col-span-4">
                        <InputArea
                          required={true}
                          register={register}
                          label={t("Contact Number")}
                          name="phone"
                          // pattern={/^[+]?\d*$/}
                          minLength={6}
                          maxLength={15}
                          validation={validatePhoneNumber}
                          type="text"
                          placeholder={t("Phone number")}
                          disabled={checkPermission}
                        />
                        <Error errorName={errors.phone} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Joining Date")} />
                      <div className="col-span-8 sm:col-span-4">
                        <InputArea
                          required={true}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          label={t("Joining Date")}
                          name="joiningDate"
                          value={selectedDate}
                          type="date"
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                          placeholder={t("StaffJoiningDate")}
                          disabled={checkPermission}
                        />
                        <Error errorName={errors.joiningDate} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Staff type")} />
                      <div className="col-span-8 sm:col-span-4">
                        <Select
                          onChange={(e) => {
                            const value = e.target.value;
                            setSelectedType(value);
                          }}
                          className="border h-12 text- focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                          name="type"
                          register={register}
                          value={selectedType}
                          required={true}
                          disabled={checkPermission}
                        >
                          <option value="" defaultValue>
                            {t("Staff Type")}
                          </option>
                          <option value="TPA">TPA</option>
                          <option value="AGENCY">AGENCY</option>
                          <option value="PROVIDER">PROVIDER</option>
                          <option value="RETAILER">RETAILER</option>
                        </Select>
                      </div>
                    </div>
                    {selectedType === "AGENCY" && (
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label={t("Agency")} />
                        <div className="col-span-8 sm:col-span-4">
                          <SelectAgency
                            required={true}
                            register={register}
                            label={t("Agency")}
                            name="agency_id"
                            disabled={checkPermission}
                          />
                          <Error errorName={errors.agency_id} />
                        </div>
                      </div>
                    )}
                    {selectedType === "PROVIDER" && (
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label={t("Provider")} />
                        <div className="col-span-8 sm:col-span-4">
                          <SelectProvider
                            required={true}
                            register={register}
                            label="Provider"
                            name="provider_id"
                            disabled={checkPermission}
                          />
                          <Error errorName={errors.Provider_id} />
                        </div>
                      </div>
                    )}
                    {selectedType === "RETAILER" && (
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label={t("Retailer")} />
                        <div className="col-span-8 sm:col-span-4">
                          <SelectRetailer
                            required={true}
                            register={register}
                            label={t("Retailer")}
                            name="retailer_id"
                            disabled={checkPermission}
                          />
                          <Error errorName={errors.Retailer_id} />
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Staff Role")} />
                      <div className="col-span-8 sm:col-span-4">
                        <MultipleSelect
                          required={true}
                          register={register}
                          setValue={setValue}
                          control={control}
                          services={RoleServices}
                          label="Role"
                          name="role_id"
                          disabled={checkPermission}
                        />
                        <Error errorName={errors.role} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Call Center ID")} />
                      <div className="col-span-8 sm:col-span-4">
                        <InputArea
                          required={true}
                          register={register}
                          label={t("Call Center ID")}
                          name="callcenter_id"
                          type="text"
                          autoComplete="username"
                          placeholder={t("Call Center ID")}
                          disabled={checkPermission}
                        />
                        <Error errorName={errors.name} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Status")} />
                      <div className="col-span-8 sm:col-span-4">
                        <SelectStatus
                          required={true}
                          register={register}
                          label={t("Status")}
                          name="status"
                          type="text"
                          autoComplete="username"
                          status={["ACTIVE", "INACTIVE"]}
                          setValue={setValue}
                          disabled={checkPermission}
                        />
                        <Error errorName={errors.name} />
                      </div>
                    </div>
                  </>
                )}
                {tapValue === "Permission" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <div className="col-span-8 sm:col-span-4">
                        <Label radio className="mr-3">
                          <Input
                            name="selectall"
                            type="radio"
                            value="allow all"
                            onChange={() => {
                              handleSelectAll("allow", data);
                            }}
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
                          />
                          <span className="ml-2">{t("Inherrit all")}</span>
                        </Label>
                      </div>
                    </div>

                    {data?.data?.map((value, i) => {
                      return (
                        <div
                          key={i + 1}
                          className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
                        >
                          <div className="col-span-8 sm:col-span-4">
                            <div className="font-bold	">{value?._id?.name}</div>
                          </div>
                          {value?.permit_id.map((item, index) => {
                            return (
                              <div
                                key={index + 1}
                                className="col-span-8 sm:col-span-4 "
                              >
                                <div className="ml-6 col-span-8 sm:col-span-4 ">
                                  {item?.code}
                                </div>
                                <div className="ml-12 col-span-8 sm:col-span-4 mt-4">
                                  <Label radio className="mr-3">
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
                                  <Label radio className="mr-3">
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
                                  <Label radio className="mr-3">
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
              <DrawerButton id={id} title={t("Staff")} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default StaffDrawer;
