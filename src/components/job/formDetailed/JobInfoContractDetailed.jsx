import SectionTitle from "@/components/Typography/SectionTitle";
import BlockControl from "@/components/control/BlockControl";
import Error from "@/components/form/Error";
import InputArea from "@/components/form/InputArea";
import LabelArea from "@/components/form/LabelArea";
import RenderForm from "@/components/form/RenderForm";
import TextAreaCom from "@/components/form/TextAreaCom";
import InfoContractModal from "@/components/modal/InfoContractModal";
import { SidebarContext } from "@/context/SidebarContext";
import useToggleInfoContractModal from "@/hooks/useToggleInfoContractModal";
import { Button, Card, CardBody, Label } from "@windmill/react-ui";
import dayjs from "dayjs";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FcCollapse, FcExpand } from "react-icons/fc";

const JobInfoContractDetailed = ({
  register,
  errors,
  dataClient,
  dataContract,
}) => {
  const { t } = useTranslation();

  const fieldArray = React.useMemo(
    () => [
      {
        label: t("Contract ID"),
        name: "contract_id",
        placeholder: t("Customer's contract ID"),
        disabled: false,
        value: dataContract?.code || "",
      },
      {
        label: t("Contract start date"),
        name: "contract_start_date",
        type: "date",
        disabled: false,
        value: dayjs(dataContract?.start_date).format("YYYY-MM-DD") || "",
      },
      {
        label: t("Contract end date"),
        name: "contract_end_date",
        type: "date",
        disabled: false,
        value: dayjs(dataContract?.end_date).format("YYYY-MM-DD") || "",
      },
      {
        label: t("Insurance price"),
        name: "insurance_price",
        disabled: false,
        value: `${dataContract?.insurance_price?.toLocaleString() || ""}`,
      },
      {
        label: t("Remaining price"),
        name: "remain_price",
        disabled: false,
        value: `${dataContract?.remain_price?.toLocaleString() || ""}`,
      },
      {
        label: t("Number of compensation documents"),
        name: "num_compensation",
        disabled: false,
        value: dataContract?.num_compensation || "",
      },
    ],
    [dataContract, dataClient]
  );

  const { isInfoContractCollapsed, handleInfoContractToggle } =
    useContext(SidebarContext);
  const { handeSearchInfo } = useToggleInfoContractModal();

  return (
    <>
      <Card
        className={`min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 ${
          isInfoContractCollapsed ? "collapsed" : ""
        }`}
        style={{
          height: isInfoContractCollapsed ? "80px" : "auto",
          overflow: isInfoContractCollapsed ? "hidden" : "visible",
        }}
      >
        <CardBody>
          <div className="w-full flex items-center justify-between my-2">
            <h1 className="text-2xl font-bold text-center w-full py-2 mb-4 text-blue-600">
              {t("CONTRACT'S INFOMATION DETAILED")}
            </h1>
            <div className="icon-container flex justify-end items-center">
              <span
                className="icon text-2xl"
                onClick={handleInfoContractToggle}
              >
                {isInfoContractCollapsed ? <FcExpand /> : <FcCollapse />}
              </span>
            </div>
          </div>

          <div className="mb-2 py-2 gap-4 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            <RenderForm
              fieldArray={fieldArray}
              register={register}
              errors={errors}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default JobInfoContractDetailed;
