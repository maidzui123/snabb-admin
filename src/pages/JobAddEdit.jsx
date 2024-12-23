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
import JobInfoAdditional from "@/components/job/form/JobInfoAdditional";
import { useRef } from "react";
import { formatDatetimeWithSec } from "@/utils/date.helper";
import BlockControl from "@/components/control/BlockControl";
import { useHistory } from "react-router-dom";
import { checkTypeCompany } from "@/helper/permission.helper";
import { store } from "@/store/store";

const JobAddEdit = () => {
  const { id } = useParams();
  console.log(store?.getState()?.appState?.auth?.type);
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    getValues,
    isSubmitting,
    dataClient,
    setDataClient,
    dataContract,
    setDataContract,
    files,
    setFiles,
    status,
    // handleSaveDraft,
    handlePublish,
  } = useJobSubmit(id);

  const { t } = useTranslation();

  const history = useHistory();

  const headerPageRef = useRef(null);

  const customerRef = useRef(null);
  //   const bodyElement = document.body;

  const receivedRef = useRef(null);
  const contractRef = useRef(null);
  const deviceRef = useRef(null);
  const cardBodyRef = useRef(null);
  const handleScrollToComponent = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };


  return (
    <>
      <div className="bg-gray-50 flex mb-2 w-full">
        {/* <div className=" w-60 mt-8">
          <Label className="text-center p-2 mb-4 text-xl text-blue-600 font-bold">
            {t("Timeline")}
          </Label>
          <Steps
            size="default"
            direction="vertical"
            current={jobData?.current_step}
            onChange={steps[jobData?.current_step + 1]?.onChange}
            className="site-navigation-steps "
            items={items}
          />
        </div> */}

        <div className=" flex-1 w-full bg-gray-50 ">
          <div className=" sticky bg-gray-50 top-0 left-0 z-10">
            <div className="  items-center flex justify-between w-full p-3 m-3 ml-0 text-red-500 hover:text-red-600 cursor-pointer">
              <Link className=" w-1/3 flex items-center" to="/job">
                <FiChevronLeft className="text-2xl" />
                <span>Trở lại</span>
              </Link>
              <Label className=" w-1/3 pt-10 text-center p-2 text-3xl text-blue-600 font-bold">
                {id ? "Cập nhật Job" : "Thêm Job"}
              </Label>
              <div className=" w-1/3 bg-gray-50 gap-2 flex items-center justify-end rounded-lg">
                <Button
                  type="submit"
                  className=" flex-grow-1"
                  onClick={handleSubmit(
                    handlePublish(() => history.push("/job"), "DRAFT")
                  )}
                  disabled={
                    status === "PUBLIC" || status === "PROCESSING"
                      ? true
                      : false
                  }
                >
                  {id ? t("Update Draft") : t("Save Draft")}
                </Button>
                {isSubmitting && !id ? (
                  <Button disabled={true} type="button" className="flex-grow">
                    <img
                      src={spinnerLoadingImage}
                      alt="Loading"
                      width={20}
                      height={10}
                    />{" "}
                    <span className="font-serif ml-2 font-light">
                      {t("Processing ...")}
                    </span>
                  </Button>
                ) : (
                  <Button
                    className="flex-grow-1"
                    type="submit"
                    onClick={handleSubmit(
                      handlePublish(() => history.push("/job"), "PUBLIC")
                    )}
                  >
                    {id ? t("Update Publish Jobcard") : t("Publish")}
                  </Button>
                )}
              </div>
            </div>

            <nav className="w-full bg-gray-50 dark:bg-gray-700">
              <div className="px-4 py-3 mx-auto">
                <div className="flex items-center justify-center pb-3 border-b-2 w-full">
                  <ul className="flex flex-row font-medium mt-0 space-x-2 xl:space-x-6 lg:space-x-6 md:space-x-2 sm:space-x-2 rtl:space-x-reverse text-sm">
                    <li
                      onClick={() => handleScrollToComponent(customerRef)}
                      className="text-gray-500 border-b-2 border-blue-500 rounded-md font-semibold dark:text-white hover:bg-gray-200 sm:px-2 px-4 py-3 outline-none cursor-pointer"
                    >
                      {t("Thông tin khách hàng ")}
                    </li>
                    <li
                      onClick={() => handleScrollToComponent(contractRef)}
                      className="text-gray-500 border-b-2 border-blue-500 rounded-md font-semibold dark:text-white hover:bg-gray-200 sm:px-2 px-4 py-3 outline-none cursor-pointer"
                    >
                      {t("Thông tin hợp đồng ")}
                    </li>
                    <li
                      onClick={() => handleScrollToComponent(deviceRef)}
                      className="text-gray-500 border-b-2 border-blue-500 rounded-md font-semibold dark:text-white hover:bg-gray-200 sm:px-2 px-4 py-3 outline-none cursor-pointer"
                    >
                      {t("Thông tin thiết bị ")}
                    </li>
                    <li
                      onClick={() => handleScrollToComponent(receivedRef)}
                      className="text-gray-500 border-b-2 border-blue-500 rounded-md font-semibold dark:text-white hover:bg-gray-200 sm:px-2 px-4 py-3 outline-none cursor-pointer"
                    >
                      {t("Thông tin ghi nhận ")}
                    </li>
                    {/* <li
                      onClick={() =>
                        handleScrollToComponent(additionRef)
                      }
                      className="text-gray-500 border-b-2 border-blue-500 rounded-md font-semibold dark:text-white hover:bg-gray-200 sm:px-2 px-4 py-3 outline-none cursor-pointer"
                    >
                      {t("Infomation Additional")}
                    </li> */}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <Card ref={cardBodyRef} className="flex-grow w-full ">
            <CardBody className="">
              <div
                ref={customerRef}
                className="px-6 pt-8 flex-grow w-full max-h-full"
              >
                <JobInfoCustomer
                  register={register}
                  errors={errors}
                  dataClient={dataClient}
                  setDataClient={setDataClient}
                />
              </div>

              <div
                ref={contractRef}
                className="px-6 pt-8 flex-grow w-full max-h-full"
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
                ref={deviceRef}
                className="px-6 pt-8 flex-grow w-full max-h-full"
              >
                <JobInfoDevice
                  dataContract={dataContract}
                  register={register}
                  errors={errors}
                />
              </div>

              <div
                ref={receivedRef}
                className="px-6 pt-8 flex-grow w-full max-h-full"
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
            </CardBody>
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

export default JobAddEdit;
