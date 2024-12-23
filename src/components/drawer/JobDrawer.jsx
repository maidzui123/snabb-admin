import React, { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Textarea,
} from "@windmill/react-ui";

import Title from "@/components/form/Title";
import Error from "@/components/form/Error";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import SelectJob from "@/components/form/SelectJob";
import DrawerButton from "@/components/form/DrawerButton";
import Uploader from "@/components/image-uploader/Uploader";
import useJobSubmit from "@/hooks/useJobSubmit";
import { useTranslation } from "react-i18next";
import TextAreaCom from "@/components/form/TextAreaCom";
import JobInfoCustomer from "../job/form/JobInfoCustomer";
import BlockControl from "../control/BlockControl";
import { SidebarContext } from "@/context/SidebarContext";
import JobInfoContract from "../job/form/JobInfoContract";
import JobInfoDevice from "../job/form/JobInfoDevice";
import JobInfoAdditional from "../job/form/JobInfoAdditional";
import JobInfoReceived from "../job/form/JobInfoReceived";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import JobServices from "@/services/JobServices";
import InfoCustomerModal from "../modal/InfoCustomerModal";
import useAsync from "@/hooks/useAsync";
import { useParams } from "react-router-dom";
const JobDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    dataClient,
    setDataClient,
    dataContract,
    setDataContract,
    files,
    setFiles,
    status,
    setStatus,
    // handleSaveDraft,
    handlePublish,
  } = useJobSubmit(id);
  
  const { closeDrawer } = useContext(SidebarContext);
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full text-center relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t("Edit Job Card")}
            className="text-center font-bold uppercase text-2xl"
          />
        ) : (
          <Title
            title={t("Add Job Card")}
            className="text-center font-bold uppercase text-2xl"
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form>
              <div className="w-full lg:w-1/4 md:ml-auto my-2 md:mr-6">
                <BlockControl>
                  <Button className="btn-red flex-grow" onClick={closeDrawer}>
                    {t("Cancel")}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-grow"
                    onClick={handleSubmit(handlePublish)}
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
                      className="flex-grow"
                      type="submit"
                      onClick={handleSubmit(handlePublish)}
                    >
                      {id ? t("Update Publish Jobcard") : t("Publish")}
                    </Button>
                  )}
                </BlockControl>
              </div>

              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
                <JobInfoCustomer
                  register={register}
                  errors={errors}
                  dataClient={dataClient}
                  setDataClient={setDataClient}
                />
              </div>

              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
                <JobInfoContract
                  register={register}
                  errors={errors}
                  dataClient={dataClient}
                  dataContract={dataContract}
                  setDataContract={setDataContract}
                />
              </div>

              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
                <JobInfoDevice
                  register={register}
                  dataContract={dataContract}
                  errors={errors}
                />
              </div>

              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full">
                <JobInfoReceived
                  register={register}
                  errors={errors}
                  files={files}
                  setFiles={setFiles}
                />
              </div>

              <div className="w-full lg:w-1/4 md:ml-auto my-2 md:mr-6">
                <BlockControl>
                  <Button className="btn-red flex-grow" onClick={closeDrawer}>
                    {t("Cancel")}
                  </Button>
                  <Button
                    type="submit"
                    className="flex-grow"
                    onClick={handleSubmit(handlePublish)}
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
                      className="flex-grow"
                      type="submit"
                      onClick={handleSubmit(handlePublish)}
                    >
                      {id ? t("Update Publish Jobcard") : t("Publish")}
                    </Button>
                  )}
                </BlockControl>
              </div>
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default JobDrawer;
