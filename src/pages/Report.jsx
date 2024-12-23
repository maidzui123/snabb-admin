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
import ReportServices from "@/services/ReportServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import ReportTable from "@/components/report/ReportTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import ReportDrawer from "@/components/drawer/ReportDrawer";
import CheckBox from "@/components/form/CheckBox";
import useReportFilter from "@/hooks/useReportFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import { useForm } from "react-hook-form";
import ToolbarForm from "@/components/form/ToolbarForm";


const Report = () => {
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
    handleModalOpen,
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
  ReportServices.getAll({
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
  } = useReportFilter(data?.data);

  return (
    <>
      <PageTitle>{t("Quản lý báo cáo")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} service={ ReportServices} />
      <BulkActionDrawer ids={allId} title="Reports" />
      {!serviceData?.length && <MainDrawer>
        <ReportDrawer id={serviceId} />
      </MainDrawer>}

      <ToolbarForm
        data={data}
        isCheck={isCheck}
        handleSubmit={handleSubmit}
        handleModalOpen={handleModalOpen}
        handleDeleteMany={handleDeleteMany}
        register={register}
        control={control}
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
                    <TableCell>
                      <CheckBox
                        type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        isChecked={isCheckAll}
                        handleClick={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>{t("Name")}</TableCell>
                    <TableCell>{t("Code")}</TableCell>
                    <TableCell>{t("Cột")}</TableCell>
                    <TableCell>{t("Câu truy vấn")}</TableCell>
                    {/* <TableCell className="text-center">
                      {t("PublishedTbl")}
                    </TableCell> */}
                    <TableCell className="text-right">{t("ActionsTbl")}</TableCell>
                  </tr>
                </TableHeader>
                <ReportTable
                  lang={lang}
                  isCheck={isCheck}
                  data={data?.data}
                  setIsCheck={setIsCheck}
                  currency={currency}
                />
              </Table>
              <TableFooter>
                <Pagination
                  totalResults={data?.totalDoc}
                  resultsPerPage={limitData}
                  onChange={handleChangePage}
                  label="Report Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="Báo Cáo" />
          )}
        </div>
      </div>
    </>
  );
};

export default Report;
