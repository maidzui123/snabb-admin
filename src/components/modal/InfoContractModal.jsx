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
} from "@windmill/react-ui";
import TableLoading from "../preloader/TableLoading";

import React, { useContext, useEffect } from "react";
import { FiCheck, FiSearch, FiTrash2, FiX } from "react-icons/fi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

//internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import { SidebarContext } from "@/context/SidebarContext";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { notifyError, notifySuccess } from "@/utils/toast";
import { Tooltip } from "react-tooltip";
import InputArea from "../form/InputArea";
import { useForm } from "react-hook-form";
import JobServices from "@/services/JobServices";
import { AdminContext } from "@/context/AdminContext";
import Error from "../form/Error";
import useAsync from "@/hooks/useAsync";
import ClientContractServices from "@/services/ClientContractServices";
import PolicyServices from "@/services/PolicyServices";
import Loading from "../preloader/Loading";
import NotFound from "../table/NotFound";
import dayjs from "dayjs";
import PolicyTable from "../policy/PolicyTable";

const InfoContractModal = ({ dataClient, setDataContract }) => {
  const { 
    currentPage,
    limitData,
    searchInput,
    isInfoContractModalOpen, 
    closeInfoContractModal, 
    lang, 
    handleChangePage 
  } = useContext(SidebarContext);
  const { t } = useTranslation();
  const { data, loading } = useAsync(() =>
    PolicyServices.getAllByLegalID(
      {
        legal_id: !isInfoContractModalOpen ? "" : dataClient?.legal_id,
        page: currentPage,
        limit: limitData,
        search: searchInput,
      }
    )
  );
  // useEffect(() => {
  //   if (data.data) setDataContract(data.data)
  // }, [data])
  const handleSelectContract = (item) => {
    setDataContract(item);
    notifySuccess(t("Chọn hợp đồng thành công!"));
    closeInfoContractModal();
  };

  return (
    <Modal isOpen={isInfoContractModalOpen} onClose={closeInfoContractModal}>
      <ModalBody className="text-center px-4 pt-2 pb-6">
        <div className="flex py-2 pb-4 items-center justify-between w-full text-center">
          <h2 className="text-2xl font-semibold mt-2 text-blue-600 uppercase w-full text-center">
            {t("Select the customer's contract")}
          </h2>
        </div>
        {/* <h2 className="text-lg font-medium">{t("Infomation of customer")}</h2> */}
        {/* <div className="text-justify grid-cols-2 grid gap-4">
          <div className="py-2 mt-4 col-span-1">
            <Label className="">{t("Full name")}</Label>
            <InputArea
              name="full_name"
              placeholder={t("Input full name ...")}
              disabled
              value={dataClient?.full_name}
            />
          </div>

          <div className="py-2 mt-4 col-span-1">
            <Label className="">{t("Legal ID")}</Label>
            <InputArea
              name="legal_id"
              placeholder={t("Input legal id ...")}
              disabled
              value={dataClient?.legal_id}
            />
          </div>
        </div> */}

        <h2 className="text-lg font-medium mt-4 mb-4">
          {t("List of customer contracts")}
        </h2>

        {/* {loading ?
          <Loading loading={loading} />
          : data?.data?.length > 0 ? (
            <ul className="mt-4 w-full divide-y divide-gray-200 dark:divide-gray-700">
              {data?.data?.map((item, i) => (
                <li className="sm:pb-4 hover:bg-gray-300 p-3 rounded-lg cursor-pointer" key={i} onClick={() => handleSelectContract(item)}>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {item?.code}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {t("Start date: ")} {dayjs(item?.start_date).format('DD/MM/YYYY')}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {t("End date: ")} {dayjs(item?.end_date).format('DD/MM/YYYY')}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-green-600 dark:text-white">
                      {item?.insurance_price?.toLocaleString()} VND
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) :
            <NotFound />
        } */}
        {loading ? (
          <TableLoading row={12} col={7} width={160} height={20} />
        ) : data?.data?.length > 0 ? (
          <TableContainer className="mb-8 rounded-b-lg">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell className="text-right">
                    {t("ActionsTbl")}
                  </TableCell>
                  {/* <TableCell className=" text-center">{t("Thông tin KH")}</TableCell> */}
                  <TableCell className=" text-center" >{t("Thông tin thiết bị")}</TableCell>
                  <TableCell className=" text-center">{t("Thông tin hợp đồng")}</TableCell>
                </tr>
              </TableHeader>
              <PolicyTable
                lang={lang}
                data={data?.data}
                isSearching={true}
                handleSelectContract={handleSelectContract}
              />
            </Table>
            <TableFooter>
              <Pagination
                totalResults={data?.totalDoc}
                resultsPerPage={data?.limit}
                onChange={handleChangePage}
                label="Client Page Navigation"
              />
            </TableFooter>
          </TableContainer>
        ) : (
          <NotFound title="Hợp đồng của khách hàng" />
        )}
      </ModalBody>

      <ModalFooter className="justify-center items-center flex">
        <Button
          className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
          layout="outline"
          onClick={closeInfoContractModal}
        >
          {t("Cancel")}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default React.memo(InfoContractModal);
