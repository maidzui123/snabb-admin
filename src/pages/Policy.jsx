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
import PolicyServices from "@/services/PolicyServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import PolicyTable from "@/components/policy/PolicyTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import PolicyDrawer from "@/components/drawer/PolicyDrawer";
import CheckBox from "@/components/form/CheckBox";
import usePolicyFilter from "@/hooks/usePolicyFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import SearchFrom from "@/components/form/SearchForm";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import { useForm } from "react-hook-form";
import ProductServices from "@/services/ProductServices";
import ProviderServices from "@/services/ProviderServices";
import { notifyPromise } from "@/utils/toast";
import ToolbarForm from "@/components/form/ToolbarForm";

const Policy = () => {
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
      PolicyServices.getAll({
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
  } = usePolicyFilter(data?.data);

  return (
    <>
      <PageTitle>{t("Quản lý hợp đồng bảo hiểm")}</PageTitle>
      <DeleteModal
        ids={allId}
        setIsCheck={setIsCheck}
        title={title}
        service={PolicyServices}
      />
      {/* <BulkActionDrawer ids={allId} title="Policys" /> */}
      {!serviceData?.length && (
        <MainDrawer>
          <PolicyDrawer id={serviceId} />
        </MainDrawer>
      )}

      <ToolbarForm
        data={data}
        isCheck={isCheck}
        handleSubmit={handleSubmit}
        handleModalOpen={handleModalOpen}
        handleDeleteMany={handleDeleteMany}
        register={register}
        control={control}
        selectFilter={[
          {
            name: "product",
            label: "Sản phẩm BH",
            services: ProductServices,
          },
          {
            name: "provider",
            label: "Nhà cung cấp BH",
            services: ProviderServices,
          },
        ]}
        isDelete={false}
        isAdd={true}
      />

      <div className="overflow-hidden tb">
        <div className="container1 mx-auto flex justify-center">
          {showFilter && (
            <div className="w-1/6 mr-4">
              <form onSubmit={handleSubmitForAll}>
                <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
                  <CardBody>
                    <p>Filter by</p>
                  </CardBody>
                </Card>
              </form>
            </div>
          )}
        </div>

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
                    <TableCell>{t("Thông tin khách hàng")}</TableCell>
                    <TableCell>{t("Thông tin thiết bị")}</TableCell>
                    <TableCell>{t("Thông tin hợp đồng")}</TableCell>
                    {/* <TableCell className="text-center">
                      {t("PublishedTbl")}
                    </TableCell> */}
                    <TableCell className="text-right">
                      {t("ActionsTbl")}
                    </TableCell>
                  </tr>
                </TableHeader>
                <PolicyTable
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
                  label="Policy Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="Policy" />
          )}
        </div>
      </div>
    </>
  );
};

export default Policy;
