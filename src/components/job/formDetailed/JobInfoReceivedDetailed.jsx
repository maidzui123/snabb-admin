import SectionTitle from "@/components/Typography/SectionTitle";
import BlockControl from "@/components/control/BlockControl";
import Error from "@/components/form/Error";
import InputArea from "@/components/form/InputArea";
import LabelArea from "@/components/form/LabelArea";
import RenderForm from "@/components/form/RenderForm";
import TextAreaCom from "@/components/form/TextAreaCom";
import { Button, Card, CardBody, Label } from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

const JobInfoReceivedDetailed = ({  register, errors, files, dataClient }) => {
  const { t } = useTranslation();
  const fieldArray = React.useMemo(
    () => [
      {
        label: t("Description of damage"),
        name: "damaged_desc",
        placeholder: t("Description of damage"),
        disabled: false,
        value: dataClient?.damaged_desc || ""
      },
      {
        label: t("Location where the damage occurred"),
        name: "damaged_location",
        placeholder: t("Input location"),
        disabled: false,
        value: dataClient?.damaged_location || ""

      },
      {
        label: t("Time damage occurs"),
        name: "damaged_date",
        type: "date",
        disabled: false,
        value: dayjs(dataClient?.damaged_date).format("YYYY-MM-DD") || ""
      },
    ],
    [dataClient]
  );
  const listFile = [...(files ?? [])];

  return (
    <Card
      className={`min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 `}
      // ${isBasicInfoCollapsed ? "collapsed" : ""}
      // style={{
      //   height: isBasicInfoCollapsed ? "60px" : "auto",
      //   overflow: isBasicInfoCollapsed ? "hidden" : "visible",
      // }}
    >
      <CardBody>
        <div className="w-full flex items-center justify-between my-2">
          <h1 className="text-2xl font-bold text-center w-full py-2 mb-4 text-blue-600">
            {t("INFOMATION RECEIVED")}
          </h1>
          <div className="icon-container flex justify-end items-center">
            {/* <span className="icon text-2xl" onClick={handleBasicInfoToggle}>
              {isBasicInfoCollapsed ? (
                <FcExpand />
              ) : (
                <FcCollapse />
              )}
            </span> */}
          </div>
        </div>

        <div className="mb-2 py-2 gap-4 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <RenderForm
            fieldArray={fieldArray}
            register={register}
            errors={errors}
          />
        </div>

        <Label className="font-semibold pb-2">{t("File uploaded")}</Label>
        <div className="border p-4 py-6 border-dashed gap-6 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 rounded-lg">
          {listFile.length > 0 ? (
            listFile?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col p-3 items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg bg-red-50 dark:hover:bg-bray-800"
              >
                <Label className="flex flex-col items-center justify-center w-full">
                  {t("File name:")}
                </Label>
                <Label className="flex flex-col items-center justify-center w-full font-semibold">
                  {item?.originalname.substring(0, 15)}...
                </Label>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 w-full">
                  <div className="flex items-center justify-between w-full px-3">
                    <Label>{t("File size:")}</Label>
                    <Label className="font-semibold">{item?.size}</Label>
                  </div>
                  <div className="flex items-center justify-between w-full px-3">
                    <Label>{t("Type: ")}</Label>
                    <Label className="font-semibold">{item?.mimetype}</Label>
                  </div>
                  <div className="flex items-center justify-between w-full px-3">
                    <Label>{t("Time Upload: ")}</Label>
                    <Label className="font-semibold">{item?.timeUpload}</Label>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="text-sm">{t("No file")}</span>
          )}
        </div>

        {/* <div className="w-full md:w-1/4 lg:w-1/5 mx-auto my-2">
          <BlockControl>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">
                      {t("Click to upload")}
                    </span>{" "}
                    {t("or drag and drop")}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF, DOCX, PNG, JPG, JPEG
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={e => {formatFileUpload(e)}}
                />
              </label>
            </div>
          </BlockControl>
        </div> */}
      </CardBody>
    </Card>
  );
};

export default JobInfoReceivedDetailed;
