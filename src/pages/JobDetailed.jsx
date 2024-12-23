import React, { useState } from "react";
import { Card, CardBody, Label, Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiChevronLeft, FiChevronsUp } from "react-icons/fi";

import useAsync from "@/hooks/useAsync";
import JobServices from "@/services/JobServices";
import { Link, useParams } from "react-router-dom";
import JobInfoCustomer from "@/components/job/form/JobInfoCustomer";
import JobInfoContract from "@/components/job/form/JobInfoContract";
import JobInfoDevice from "@/components/job/form/JobInfoDevice";
import JobInfoReceived from "@/components/job/form/JobInfoReceived";
import useJobSubmit from "@/hooks/useJobSubmit";
import JobInfoAdditionalDetailed from "@/components/job/formDetailed/JobInfoAdditionalDetailed";
import { useRef } from "react";
import { Timeline } from "antd";
import useToggleJobStepModal from "@/hooks/useToggleJobStepModal";
import { formatDatetimeWithSec } from "@/utils/date.helper";
import AdminFixConfirmModal from "@/components/modal/AdminFixConfirmModal";
import BlockControl from "@/components/control/BlockControl";
import { useHistory } from "react-router-dom";
import { checkTypeCompany } from "@/helper/permission.helper";
import JobInfoAgencyDiagnoseDetailed from "@/components/job/formDetailed/JobInfoAgencyDiagnoseDetailed";
import JobInfoPriceQuoteDetailed from "@/components/job/formDetailed/JobInfoPriceQuoteDetailed";
import AddAccessoryModal from "@/components/modal/AddAccessoryModal";

const JobDetailed = () => {
  // const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
  //   useToggleDrawer();
  const { id } = useParams();
  const history = useHistory();

  const { data, loading } = useAsync(() => JobServices.getById(id));

  const jobData = data?.data;
  const dataActivity = data?.jobActivity || [];
  const items = dataActivity.map((item, index) => ({
    label: formatDatetimeWithSec(item?.createdAt),
    children: (
      <>
        <div className="mb-10">
          {item?.description}
          <br />
          Bởi {item?.admin_name?.name?.vi}
        </div>
      </>
    ),
  }));
  const {
    register,
    handleSubmit,
    errors,
    watch,
    setValue,
    getValues,
    isSubmitting,
    dataClient,
    setDataClient,
    dataContract,
    setDataContract,
    files,
    setFiles,
    handlePublish,
    handleUpdateJob,
    handleConfirm,
    control,
    listAccessory,
    setListAccessory,
  } = useJobSubmit(id);

  const { t } = useTranslation();
  const [replaceType, setReplaceType] = useState("replace_accessory");

  const headerPageRef = useRef(null);

  const customerDetailedRef = useRef(null);
  const receivedDetailedRef = useRef(null);
  const contractDetailedRef = useRef(null);
  const deviceDetailedRef = useRef(null);
  const additionDetailedRef = useRef(null);
  const cardBodyRef = useRef(null);

  const handleScrollToComponent = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { handleAdminFixConfirm, handleAddAccessory } = useToggleJobStepModal();

  return (
    <>
      <AdminFixConfirmModal
        register={register}
        errors={errors}
        current={jobData?.current_step}
        handleSubmit={handleSubmit}
        handleConfirm={handleConfirm}
      />
      <AddAccessoryModal
        register={register}
        errors={errors}
        job_id={id}
        handleSubmit={handleSubmit}
        handleConfirm={handleConfirm}
        listAccessory={listAccessory}
        setListAccessory={setListAccessory}
      />
      <div ref={headerPageRef} className="bg-gray-50 p-2 flex mb-2 w-full">
        <div className=" flex-1 w-full bg-gray-50">
          <div className=" sticky bg-gray-50 top-0 left-0 z-10">
            <div className="  items-center flex justify-between w-full p-2 m-2 ml-0 text-red-500 hover:text-red-600 cursor-pointer">
              <Link className=" w-1/3 flex items-center" to="/job">
                <FiChevronLeft className="text-2xl" />
                <span>Trở lại</span>
              </Link>
              <Label className=" w-1/3 text-center p-2 text-3xl text-blue-600 font-bold">
                {id ? "Cập nhật Job" : "Thêm Job"}
              </Label>
              <div className=" w-1/3 bg-gray-50 gap-2 flex items-center justify-end rounded-lg">
                {jobData?.status === "DRAFT" && (
                  <>
                    <Button
                      type="submit"
                      className=" flex-grow-1"
                      onClick={handleSubmit(
                        handlePublish(() => history.push("/job"), "DRAFT")
                      )}
                    >
                      {id ? t("Update Draft") : t("Save Draft")}
                    </Button>

                    <Button
                      className="flex-grow-1"
                      type="submit"
                      onClick={handleSubmit(
                        handlePublish(() => history.push("/job"), "PUBLIC")
                      )}
                    >
                      {id ? t("Update Publish Jobcard") : t("Publish")}
                    </Button>
                  </>
                )}

                {(jobData?.status === "PUBLIC" ||
                  jobData?.status === "PROCESSING") &&
                  (checkTypeCompany("TPA") || checkTypeCompany("AGENCY")) && (
                    <>
                      {checkTypeCompany("TPA") && (
                        <>
                          <Button
                            className="flex-grow-1 btn-red"
                            onClick={handleSubmit(
                              handleConfirm(
                                () => history.push("/job"),
                                "CANCEL"
                              )
                            )}
                            type="submit"
                          >
                            Hủy Job
                          </Button>
                          <Button
                            className="flex-grow-1"
                            onClick={handleSubmit(
                              handleUpdateJob(() => history.push("/job"))
                            )}
                            type="submit"
                          >
                            Cập nhật Job
                          </Button>
                        </>
                      )}
                      {checkTypeCompany("AGENCY") && (
                        <Button
                          className="flex-grow-1"
                          onClick={handleSubmit(
                            handleUpdateJob(
                              () => history.push("/job"),
                              listAccessory
                            )
                          )}
                          type="submit"
                        >
                          Báo giá
                        </Button>
                      )}
                      {checkTypeCompany("TPA") &&
                        jobData?.step_status === "choose_accessory_confirm" && (
                          <Button
                            className="flex-grow-1"
                            onClick={() => handleAdminFixConfirm()}
                            type="submit"
                          >
                            Duyệt sửa chữa
                          </Button>
                        )}
                    </>
                  )}
                {checkTypeCompany("PROVIDER") &&
                  jobData?.status === "PASSING" && (
                    <Button
                      className="flex-grow-1"
                      onClick={() => handleAdminFixConfirm()}
                      type="submit"
                    >
                      Duyệt vuợt cấp
                    </Button>
                  )}
                {checkTypeCompany("AGENCY") && jobData?.status === "FIXING" && (
                  <>
                    <Button
                      className="flex-grow-1 btn-red"
                      onClick={handleSubmit(
                        handleConfirm(() => history.push("/job"), "FINISH")
                      )}
                      type="submit"
                    >
                      HOÀN THÀNH
                    </Button>
                  </>
                )}
              </div>
            </div>

            <nav className=" flex w-full dark:bg-gray-700">
              <div className="w-1/5"></div>
              <div className=" mx-auto px-4 py-3">
                <div className="flex items-center justify-center pb-3 border-b-2 w-full">
                  <ul className="flex flex-row font-medium mt-0 space-x-2 xl:space-x-6 lg:space-x-6 md:space-x-2 sm:space-x-2 rtl:space-x-reverse text-sm">
                    <li
                      onClick={() =>
                        handleScrollToComponent(customerDetailedRef)
                      }
                      className="text-gray-500 border-b-2 border-blue-500 rounded-md font-semibold dark:text-white hover:bg-gray-200 sm:px-2 px-4 py-3 outline-none cursor-pointer"
                    >
                      {t("Customer Detailed")}
                    </li>
                    <li
                      onClick={() =>
                        handleScrollToComponent(contractDetailedRef)
                      }
                      className="text-gray-500 border-b-2 border-blue-500 rounded-md font-semibold dark:text-white hover:bg-gray-200 sm:px-2 px-4 py-3 outline-none cursor-pointer"
                    >
                      {t("Contract's Infomation Detailed")}
                    </li>
                    <li
                      onClick={() => handleScrollToComponent(deviceDetailedRef)}
                      className="text-gray-500 border-b-2 border-blue-500 rounded-md font-semibold dark:text-white hover:bg-gray-200 sm:px-2 px-4 py-3 outline-none cursor-pointer"
                    >
                      {t("Device's Infomation Detailed")}
                    </li>
                    {!checkTypeCompany("AGENCY") && (
                      <li
                        onClick={() =>
                          handleScrollToComponent(receivedDetailedRef)
                        }
                        className="text-gray-500 border-b-2 border-blue-500 rounded-md font-semibold dark:text-white hover:bg-gray-200 sm:px-2 px-4 py-3 outline-none cursor-pointer"
                      >
                        {t("Infomation Received")}
                      </li>
                    )}
                    <li
                      onClick={() =>
                        handleScrollToComponent(additionDetailedRef)
                      }
                      className="text-gray-500 border-b-2 border-blue-500 rounded-md font-semibold dark:text-white hover:bg-gray-200 sm:px-2 px-4 py-3 outline-none cursor-pointer"
                    >
                      {t("Infomation Additional")}
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <Card className="flex-grow relative w-full mb-10 ">
            <div className="flex ">
              <div className=" w-1/5 p-4 bg-gray-50">
                <Label className="text-center p-2 mb-4 text-xl text-blue-600 font-bold">
                  {t("Timeline")}
                </Label>
                <Timeline items={items} mode="left" />
              </div>
              <CardBody className="w-4/5  ">
                <div
                  ref={customerDetailedRef}
                  className="px-2 pt-2 flex-grow w-full max-h-full"
                >
                  <JobInfoCustomer
                    isDisabled={!checkTypeCompany("TPA")}
                    register={register}
                    errors={errors}
                    dataClient={dataClient}
                    setDataClient={setDataClient}
                  />
                </div>

                <div
                  ref={contractDetailedRef}
                  className="px-2 pt-2 flex-grow w-full max-h-full"
                >
                  <JobInfoContract
                    register={register}
                    errors={errors}
                    dataClient={dataClient}
                    dataContract={dataContract}
                    setDataContract={setDataContract}
                  />
                </div>

                <div
                  ref={deviceDetailedRef}
                  className="px-2 pt-2 flex-grow w-full max-h-full"
                >
                  <JobInfoDevice
                    isDisabled={!checkTypeCompany("TPA")}
                    dataContract={dataContract}
                    register={register}
                    errors={errors}
                  />
                </div>

                <div
                  ref={receivedDetailedRef}
                  className="px-2 pt-2 flex-grow w-full max-h-full"
                >
                  <JobInfoReceived
                    isShowing={
                      checkTypeCompany("TPA") || checkTypeCompany("RETAILER")
                    }
                    register={register}
                    errors={errors}
                    files={files}
                    setFiles={setFiles}
                  />
                </div>
                <div
                  ref={additionDetailedRef}
                  className="px-2 pt-2 flex-grow w-full max-h-full"
                >
                  <JobInfoAdditionalDetailed
                    job_id={id}
                    setValue={setValue}
                    getValues={getValues}
                    register={register}
                    errors={errors}
                    dataJob={jobData}
                    dataClient={data?.data?.client_id}
                    jobStatus={data?.data?.status}
                    jobStepStatus={data?.data?.step_status}
                    control={control}
                  />
                </div>
                {(checkTypeCompany("AGENCY") ||
                  jobData?.step_status === "choose_accessory_confirm") && (
                  <>
                    <div className="px-2 pt-2 flex-grow w-full max-h-full">
                      <JobInfoAgencyDiagnoseDetailed
                        job_id={id}
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                        errors={errors}
                        dataJob={jobData}
                        dataClient={data?.data?.client_id}
                        jobStatus={data?.data?.status}
                        jobStepStatus={data?.data?.step_status}
                        control={control}
                        replaceType={replaceType}
                        setReplaceType={setReplaceType}
                      />
                    </div>
                    <div className="px-2 pt-2 flex-grow w-full max-h-full">
                      <JobInfoPriceQuoteDetailed
                        job_id={id}
                        setValue={setValue}
                        getValues={getValues}
                        register={register}
                        errors={errors}
                        dataJob={jobData}
                        dataClient={data?.data?.client_id}
                        jobStatus={data?.data?.status}
                        jobStepStatus={data?.data?.step_status}
                        control={control}
                        replaceType={replaceType}
                        handleAddAccessory={handleAddAccessory}
                        listAccessory={listAccessory}
                        setListAccessory={setListAccessory}
                        watch={watch}
                      />
                    </div>
                  </>
                )}
              </CardBody>
            </div>
          </Card>
        </div>
      </div>
      <div
        onClick={() => handleScrollToComponent(headerPageRef)}
        className=" text-blue-500 w-12 h-12 flex justify-center cursor-pointer hover:bg-blue-100 items-center dark:bg-blue-500 absolute bottom-2 right-1 border-blue-500 border rounded-full"
      >
        <FiChevronsUp />
      </div>
    </>
  );
};

export default JobDetailed;
