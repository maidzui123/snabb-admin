import React, { useContext, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiPlus, FiFilter } from "react-icons/fi";

import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import UploadManyTwo from "@/components/common/UploadManyTwo";
import NotFound from "@/components/table/NotFound";
import ClientServices from "@/services/ClientServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import ClientTable from "@/components/client/ClientTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import ClientDrawer from "@/components/drawer/ClientDrawer";
import CheckBox from "@/components/form/CheckBox";
import useClientFilter from "@/hooks/useClientFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import SearchFrom from "@/components/form/SearchForm";
import { useForm } from "react-hook-form";
import { notifyPromise } from "@/utils/toast";
import ToolbarForm from "@/components/form/ToolbarForm";

const Client = () => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const { t } = useTranslation();
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
    showFilter,
    setShowFilter,
    handleModalOpen,
  } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    control,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { search: "" } });

  const { data, loading } = useAsync(() =>
    notifyPromise(
      ClientServices.getAll({
        ...getValues(),
        page: currentPage,
        limit: limitData,
        // category: category,
        // title: searchText,
        // price: sortedField,
      })
    )
  );

  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "$";
  // console.log("product page", data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.data.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // console.log('productss',products)
  const {
    serviceData,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useClientFilter(data?.data);

  return (
    <>
      <PageTitle>{t("Quản lý khách hàng")}</PageTitle>
      <DeleteModal
        ids={isCheck}
        setIsCheck={setIsCheck}
        title={title}
        service={ClientServices}
      />
      <BulkActionDrawer ids={allId} title="Clients" />
      {!serviceData?.length && (
        <MainDrawer>
          <ClientDrawer id={serviceId} />
        </MainDrawer>
      )}

      {/* {import.meta.env.VITE_APP_NODE_ENV == "dev" && (
      )} */}

      <ToolbarForm
        data={data}
        isCheck={isCheck}
        handleSubmit={handleSubmit}
        handleModalOpen={handleModalOpen}
        handleDeleteMany={handleDeleteMany}
        register={register}
        control={control}
        isDelete={false}
        filterStatus={["ĐANG HOẠT ĐỘNG", "KHÔNG HOẠT ĐỘNG", "BLOCK"]}
      />

      <div className="overflow-hidden tb">
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <TableLoading row={12} col={7} width={160} height={20} />
          ) : serviceData?.length > 0 ? (
            <TableContainer className="mb-8 rounded-b-lg">
              <Table>
                <TableHeader>
                  <tr>
                    {/* <TableCell>
                      <CheckBox
                        type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        isChecked={isCheckAll}
                        handleClick={handleSelectAll}
                      />
                    </TableCell> */}
                    <TableCell>{t("STT")}</TableCell>
                    <TableCell>{t("Legal ID")}</TableCell>
                    <TableCell>{t("Name")}</TableCell>
                    <TableCell>{t("Thông tin liên hệ")}</TableCell>
                    <TableCell>{t("Client description")}</TableCell>
                    <TableCell className="text-center">
                      {t("Trạng thái")}
                    </TableCell>
                    {/* <TableCell className="text-center">
                      {t("PublishedTbl")}
                    </TableCell> */}
                    <TableCell className="text-right">
                      {t("ActionsTbl")}
                    </TableCell>
                  </tr>
                </TableHeader>
                <ClientTable
                  lang={lang}
                  isCheck={isCheck}
                  data={data?.data}
                  setIsCheck={setIsCheck}
                  currency={currency}
                  isSearching={false}
                  currentPage={currentPage}
                  limitData={limitData}
                />
              </Table>
              <TableFooter>
                <Pagination
                  totalResults={data?.totalDoc}
                  resultsPerPage={limitData}
                  onChange={handleChangePage}
                  label="Client Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="Khách hàng" />
          )}
        </div>
      </div>
    </>
  );
};

export default Client;
