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

const JobInfoContract = ({
  register,
  errors,
  dataClient,
  dataContract,
  setDataContract,
}) => {
  const { t } = useTranslation();
  const fieldArray = React.useMemo(
    () => [
      {
        label: t("Contract ID"),
        name: "contract_id",
        placeholder: t("Customer's contract ID"),
        disabled: true,
        value: dataContract?.policy_code || "",
      },
      {
        label: t("Contract start date"),
        name: "contract_start_date",
        type: "date",
        disabled: true,
        value: dayjs(dataContract?.start_date).format("YYYY-MM-DD") || "",
      },
      {
        label: t("Contract end date"),
        name: "contract_end_date",
        type: "date",
        disabled: true,
        value: dayjs(dataContract?.end_date).format("YYYY-MM-DD") || "",
      },
      {
        label: t("Insurance price"),
        placeholder: t("Số tiền bảo hiểm"),
        name: "insurance_price",
        disabled: true,
        value: `${dataContract?.insurance_premium?.toLocaleString() || ""}`,
      },
      {
        label: t("Remaining price"),
        placeholder: "Số tiền còn lại",
        name: "remain_price",
        disabled: true,
        value: `${dataContract?.remain_price?.toLocaleString() || ""}`,
      },
      {
        label: t("Number of compensation documents"),
        name: "num_compensation",
        placeholder: "Số lượng hồ sơ bồi thường",
        disabled: true,
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
      <InfoContractModal
        dataClient={dataClient}
        setDataContract={setDataContract}
      />
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
          <div className="w-full flex flex-col items-center justify-between my-2">
            <h1 className="text-2xl font-bold text-center w-full py-2 mb-4 text-blue-600">
              {t("CONTRACT'S INFOMATION DETAILED")}
            </h1>
            
            <div className="w-1/5 mx-auto my-2">
              <BlockControl>
                <Button className="flex-grow" onClick={handeSearchInfo}>
                  {t("Search contract's information")}
                </Button>
              </BlockControl>
            </div>
            
          </div>

          <div className="mb-2 py-2 gap-2 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
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

export default JobInfoContract;
