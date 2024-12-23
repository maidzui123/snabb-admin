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
import ImportHistoryServices from "@/services/ImportHistoryServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import ImportHistoryTable from "@/components/importHistory/ImportHistoryTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import ImportHistoryDrawer from "@/components/drawer/ImportHistoryDrawer";
import CheckBox from "@/components/form/CheckBox";
import useImportHistoryFilter from "@/hooks/useImportHistoryFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import { useForm } from "react-hook-form";
import ToolbarForm from "@/components/form/ToolbarForm";


const ImportHistory = () => {
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
    setShowFilter
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
  ImportHistoryServices.getAll({
     ...getValues(),
    page: currentPage,
    limit: limitData,
    // category: category,
    // title: searchText,
    // price: sortedField,
  })
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
  } = useImportHistoryFilter(data?.data);

  return (
    <>
      <PageTitle>{t("Lịch sử Import")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} service={ ImportHistoryServices} />
      <BulkActionDrawer ids={allId} title="ImportHistorys" />
      {!serviceData?.length && <MainDrawer>
        <ImportHistoryDrawer id={serviceId} />
      </MainDrawer>}

      <ToolbarForm
        data={data}
        isCheck={isCheck}
        setValue={setValue}
        handleSubmit={handleSubmit}
        //handleModalOpen={handleModalOpen}
        handleDeleteMany={handleDeleteMany}
        register={register}
        control={control}
        selectFilter={[
          // { name: "product", services: ProductServices, label: "Product" },
          // { name: "agency", services: AgencyServices, label: "Agency" },
        ]}
        filterStatus={["ERROR", "SUCCESS"]}
        filterType={["ACCESSORY", "AGENCY"]}
        isAdd={false}
        isDelete={false}
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
                    <TableCell>{t("Tên file")}</TableCell>
                    <TableCell>{t("Ngày nhập")}</TableCell>
                    <TableCell>{t("Người nhập")}</TableCell>
                    <TableCell className="text-center">{t("Số lượng nhập")}</TableCell>
                    <TableCell className="text-center">{t("Status")}</TableCell>
                    <TableCell>{t("")}</TableCell>

                    {/* <TableCell className="text-center">
                      {t("PublishedTbl")}
                    </TableCell>
                    <TableCell className="text-right">{t("ActionsTbl")}</TableCell> */}
                  </tr>
                </TableHeader>
                <ImportHistoryTable
                  lang={lang}
                  isCheck={isCheck}
                  data={data?.data}
                  setIsCheck={setIsCheck}
                  currency={currency}
                  currentPage={currentPage}
                  limitData={limitData}
                />
              </Table>
              <TableFooter>
                <Pagination
                  totalResults={data?.totalDoc}
                  resultsPerPage={limitData}
                  onChange={handleChangePage}
                  label="ImportHistory Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="ImportHistory" />
          )}
        </div>
      </div>
    </>
  );
};

export default ImportHistory;
