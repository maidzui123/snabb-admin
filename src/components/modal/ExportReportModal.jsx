import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Select,
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  Pagination,
  TableContainer,
  TableBody,
  TableRow,
} from "@windmill/react-ui";
import CheckBox from "@/components/form/CheckBox";
import { Scrollbars } from "react-custom-scrollbars-2";
import TableLoading from "@/components/preloader/TableLoading";

import React, { useContext, useEffect, useRef, useState } from "react";
import { FiCheck, FiX, FiSearch, FiArrowLeft } from "react-icons/fi";
import { useTranslation } from "react-i18next";

//internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import { SidebarContext } from "@/context/SidebarContext";

import Tooltip from "@/components/tooltip/Tooltip";
import InputArea from "../form/InputArea";
import { useForm } from "react-hook-form";
import SelectAgency from "../form/SelectAgency";
import AgencyServices from "@/services/AgencyServices";
import useAsync from "@/hooks/useAsync";
import Status from "../table/Status";
import NotFound from "../table/NotFound";
import useAgencyFilter from "@/hooks/useAgencyFilter";
import SettingServices from "@/services/SettingServices";
const ExportReportModal = ({}) => {
  const { isExportReportModalOpen, closeExportReportModal } =
    useContext(SidebarContext);
  const {
    register,
    formState: { errors },
  } = useForm({ defaultValues: { search: "" } });
  //   const { data, loading } = useAsync(() =>
  //     AgencyServices.getAll({
  //       ...getValues(),
  //       page: currentPage,
  //       limit: limitData,
  //     })
  //   );
  //   const {
  //     serviceData,
  //     filename,
  //     isDisabled,
  //     handleSelectFile,
  //     handleUploadMultiple,
  //     handleRemoveSelectFile,
  //   } = useAgencyFilter(data?.data);

  const { t } = useTranslation();

  return (
    <Modal isOpen={isExportReportModalOpen} onClose={closeExportReportModal}>
      <form>
        <ModalBody
          style={{
            maxHeight: "80vh",
            marginBottom: "0px",
            paddingBottom: "0px",
          }}
          className="text-center px-4 pt-2 pb-6 overflow-scroll"
        >
          <div className="flex py-2 pb-4 items-center justify-between w-full text-center">
            <h2 className="text-2xl font-semibold mt-2 text-blue-600 uppercase w-full text-center">
              {t("NHẬP VÀO EMAIL CỦA BẠN")}
            </h2>
          </div>
          <div className="w-full">
            <InputArea
              register={register}
              name="email"
              type="text"
              placeholder={t("Email ...")}
              // onChange={() => setIsUpdate(true)}
            />
          </div>
        </ModalBody>

        <ModalFooter className="justify-center items-center flex">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeExportReportModal}
          >
            {t("Đóng")}
          </Button>
          <Button
            className="flex items-center w-full sm:w-auto px-4 gap-2"
            type="submit"
          >
            <FiCheck className="text-lg" />
            {t("Tải xuống")}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default React.memo(ExportReportModal);
