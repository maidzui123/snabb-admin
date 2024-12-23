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
import { Link } from "react-router-dom";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import UploadManyTwo from "@/components/common/UploadManyTwo";
import NotFound from "@/components/table/NotFound";
import AccessoryServices from "@/services/AccessoryServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import AccessoryImportTable from "@/components/accessory/AccessoryImportTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import AccessoryDrawer from "@/components/drawer/AccessoryDrawer";
import CheckBox from "@/components/form/CheckBox";
import useAccessoryFilter from "@/hooks/useAccessoryFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import SearchFrom from "@/components/form/SearchForm";
import ProductServices from "@/services/ProductServices";
import AgencyServices from "@/services/AgencyServices";
import AccessoryCategoryServices from "@/services/AccessoryCategoryServices";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import { useForm } from "react-hook-form";
import { notifyPromise } from "@/utils/toast";
import ToolbarForm from "@/components/form/ToolbarForm";
import ImportForm from "@/components/form/ImportForm";
const AccessoryImport = () => {
  const {
    title,
    allId,
    serviceId,
    handleDeleteMany,
    handleModalOpen,
    handleUpdateMany,
  } = useToggleDrawer();
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
  } = useContext(SidebarContext);

  const { data, loading } = useAsync(() =>
    notifyPromise(
      AccessoryServices.getAll({
        ...getValues(),
        page: currentPage,
        limit: limitData,
        // category: category,
        // search: searchText,
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

  // console.log("selectFilter", selectFilter);
  // console.log('productss',products)
  const {
    serviceData,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    selectedFileData,
    handleRemoveSelectFile,
    handleViewData,
    check,
  } = useAccessoryFilter(data?.data);


  const handleDelete = (data, isCheck) => {
    if (isCheck?.length > 1) {
      handleDeleteMany(isCheck, data.data);
    } else {
      const product = data?.data?.find((item) => item?._id === isCheck[0]);
      handleModalOpen(product?._id, product?.name);
    }
  };
  return (
    <>
      <PageTitle>{t("Nhập linh kiện")}</PageTitle>
      {/* {isCheck?.length < 2 ? (
        <DeleteModal
          id={serviceId}
          setIsCheck={setIsCheck}
          title={title}
          service={AccessoryServices}
        />
      ) : (
        <DeleteModal
          ids={allId}
          setIsCheck={setIsCheck}
          title={title}
          service={AccessoryServices}
        />
      )} */}
      <BulkActionDrawer ids={allId} title="Accessorys" />
      {!serviceData?.length && (
        <MainDrawer>
          <AccessoryDrawer id={serviceId} />
        </MainDrawer>
      )}
      <Card className="gap-4 md:justify-between bg-white p-3 m-2 border border-gray-100 rounded-lg">
      {/* <UploadManyTwo
        title="Linh kiện"
        filetemplate = {"file_mau_linh_kien.xlsx"}
        filename={filename}
        isDisabled={isDisabled}
        totalDoc={data?.totalDoc}
        handleSelectFile={handleSelectFile}
        handleUploadMultiple={handleUploadMultiple}
        handleRemoveSelectFile={handleRemoveSelectFile}
        handleViewData={handleViewData}
        service={AccessoryServices}
        check={check}
      /> */}
      <ImportForm
        title="Linh kiện"
        filetemplate = {"file_mau_linh_kien.xlsx"}
        filename={filename}
        isDisabled={isDisabled}
        totalDoc={data?.totalDoc}
        handleSelectFile={handleSelectFile}
        handleUploadMultiple={handleUploadMultiple}
        handleRemoveSelectFile={handleRemoveSelectFile}
        handleViewData={handleViewData}
        service={AccessoryServices}
        check={check}
        data={data}
        isCheck={isCheck}
        setValue={setValue}
        handleSubmit={handleSubmit}
        handleModalOpen={handleModalOpen}
        handleDeleteMany={handleDeleteMany}
        register={register}
        control={control}
        selectImport={[
          { name: "product", services: ProductServices, label: "Product" },
          { name: "agency", services: AgencyServices, label: "Agency" },
          { name: "agencycategory", services: AccessoryCategoryServices, label: "Accessory Category" },
        ]}
      />
      </Card>
      <div className="overflow-hidden tb">
        {/* <div className="container1 mx-auto flex justify-center">
          {showFilter && (
            <div className="w-1/6 mr-4">
              <form onSubmit={handleSubmitForAll}>
                <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
                  <CardBody>
                    <p>Filter by</p>
                  </CardBody>
                </Card >
              </form >
            </div>
          )}
        </div> */}
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <TableLoading row={12} col={7} width={160} height={20} />
          ) : selectedFileData?.length > 0 ? (
            <TableContainer className="mb-8 rounded-b-lg">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>{t("STT")}</TableCell>
                    <TableCell>{t("Name")}</TableCell>
                    <TableCell>{t("Code")}</TableCell>
                    <TableCell>{t("Description")}</TableCell>
                    <TableCell>{t("Price")}</TableCell>
                    <TableCell>{t("VAT")}</TableCell>
                    <TableCell>{t("Ngày hiệu lực")}</TableCell>
                    <TableCell>{t("Status")}</TableCell>
                    <TableCell>{t("Kiểm tra")}</TableCell>
                    {/* <TableCell className="text-right">
                      {t("ActionsTbl")}
                    </TableCell> */}
                  </tr>
                </TableHeader>
                <AccessoryImportTable
                  lang={lang}
                  isCheck={isCheck}
                  data={selectedFileData.length !== 0 ? selectedFileData : []}
                  setIsCheck={setIsCheck}
                  currency={currency}
                  check={check}
                />
              </Table>
              <TableFooter>
                <Pagination
                  totalResults={selectedFileData.length}
                  resultsPerPage={limitData}
                  onChange={handleChangePage}
                  label="Accessory Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title=" file linh kiện" />
          )}
        </div>
      </div>
    </>
  );
};

export default AccessoryImport;
