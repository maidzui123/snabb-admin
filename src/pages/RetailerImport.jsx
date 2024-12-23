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
import RetailerServices from "@/services/RetailerServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import AccessoryImportTable from "@/components/accessory/AccessoryImportTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import AccessoryDrawer from "@/components/drawer/AccessoryDrawer";
import CheckBox from "@/components/form/CheckBox";
import useRetailerFilter from "@/hooks/useRetailerFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import SearchFrom from "@/components/form/SearchForm";
import BrandServices from "@/services/BrandServices";
import RetailerCategoryServices from "@/services/RetailerCategoryServices";
import GroupCategoryServices from "@/services/GroupCategoryServices";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import { useForm } from "react-hook-form";
import { notifyPromise } from "@/utils/toast";
import RetailerImportTable from "@/components/retailer/RetailerImportTable";
import ImportForm from "@/components/form/ImportForm";
const RetailerImport = () => {
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
    limitData,
  } = useContext(SidebarContext);

  const { data, loading } = useAsync(() =>
    notifyPromise(
      RetailerServices.getAll({
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
  } = useRetailerFilter(data?.data);


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
      <PageTitle>{t("Nhập trung tâm bán hàng")}</PageTitle>
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
      <ImportForm
        title="Trung tâm bán hàng"
        filetemplate = {"file_mau_linh_kien.xlsx"}
        filename={filename}
        isDisabled={isDisabled}
        totalDoc={data?.totalDoc}
        handleSelectFile={handleSelectFile}
        handleUploadMultiple={handleUploadMultiple}
        handleRemoveSelectFile={handleRemoveSelectFile}
        handleViewData={handleViewData}
        service={RetailerServices}
        check={check}
        //data={data}
        isCheck={isCheck}
        setValue={setValue}
        handleSubmit={handleSubmit}
        // handleModalOpen={handleModalOpen}
        // handleDeleteMany={handleDeleteMany}
        register={register}
        control={control}
        selectImport={[
           { name: "brand", services: BrandServices, label: "Brand" },
           { name: "groupcategory", services: GroupCategoryServices, type: "retailer", label: "Phân loại nhóm" },
           { name: "category", services: RetailerCategoryServices, label: "Loại TT bán hàng" },
        //   { name: "agency", services: AgencyServices, label: "Agency" },
        //   { name: "agencycategory", services: AccessoryCategoryServices, label: "Accessory Category" },
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
                    <TableCell>{t("Name")}</TableCell>
                    <TableCell>{t("Description")}</TableCell>
                    <TableCell>{t("Phone")}</TableCell>
                    <TableCell>{t("Email")}</TableCell>
                    <TableCell>{t("Address")}</TableCell>
                    <TableCell>{t("Representative")}</TableCell>
                    <TableCell>{t("Status")}</TableCell>
                    <TableCell>{t("Kiểm tra")}</TableCell>
                    {/* <TableCell className="text-right">
                      {t("ActionsTbl")}
                    </TableCell> */}
                  </tr>
                </TableHeader>
                <RetailerImportTable
                  lang={lang}
                  isCheck={isCheck}
                  data={selectedFileData.length !== 0 ? selectedFileData : []}
                  setIsCheck={setIsCheck}
                  currency={currency}
                  check={check}
                  currentPage={currentPage}
                  limitData={limitData}
                />
              </Table>
              <TableFooter>
                <Pagination
                  totalResults={data?.totalDoc}
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

export default RetailerImport;
