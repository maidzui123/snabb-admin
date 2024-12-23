import React, { useContext, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import NotFound from "@/components/table/NotFound";
import ProviderServices from "@/services/ProviderServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import ProviderTable from "@/components/provider/ProviderTable";
import MainDrawer from "@/components/drawer/MainDrawer";
import ProviderDrawer from "@/components/drawer/ProviderDrawer";
import CheckBox from "@/components/form/CheckBox";
import useProviderFilter from "@/hooks/useProviderFilter";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import SearchFrom from "@/components/form/SearchForm";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import ProgramServices from "@/services/ProgramServices";
import { useForm } from "react-hook-form";
import { notifyPromise } from "@/utils/toast";
import ToolbarForm from "@/components/form/ToolbarForm";
const Provider = () => {
  const {
    title,
    allId,
    serviceId,
    handleDeleteMany,
    handleModalOpen,
    handleUpdateMany,
  } = useToggleDrawer();

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
      ProviderServices.getAll({
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

  const {
    serviceData,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useProviderFilter(data?.data);

  return (
    <>
      <PageTitle>{t("Quản lý nhà cung cấp bảo hiểm")}</PageTitle>
      {isCheck?.length < 2 ? (
        <DeleteModal
          id={serviceId}
          setIsCheck={setIsCheck}
          title={title}
          service={ProviderServices}
        />
      ) : (
        <DeleteModal
          ids={isCheck}
          setIsCheck={setIsCheck}
          title={title}
          service={ProviderServices}
        />
      )}
      <BulkActionDrawer ids={allId} title="Providers" />
      {!serviceData?.length && (
        <MainDrawer>
          <ProviderDrawer id={serviceId} />
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
          { name: "program", services: ProgramServices, label: "Program" },
        ]}
        filterStatus={["ACTIVE", "INACTIVE"]}
      />

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
                    <TableCell>{t("STT")}</TableCell>

                    <TableCell>{t("Mã NCC")}</TableCell>
                    <TableCell>{t("Tên NCC")}</TableCell>
                    {/* <TableCell>{t("Provider code")}</TableCell> */}
                    <TableCell>{t("Thông tin liên hệ")}</TableCell>
                    <TableCell>{t("Chương trình BH")}</TableCell>
                    <TableCell className="text-center">
                      {t("Trạng thái")}
                    </TableCell>
                    {/* <TableCell>{t("Email")}</TableCell>
                    <TableCell>{t("Address")}</TableCell>
                    <TableCell>{t("Program")}</TableCell>
                    <TableCell>{t("Category")}</TableCell> */}
                    {/* <TableCell className="text-center">
                      {t("PublishedTbl")}
                    </TableCell> */}
                    <TableCell className="text-right">
                      {t("ActionsTbl")}
                    </TableCell>
                  </tr>
                </TableHeader>
                <ProviderTable
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
                  label="Provider Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="Nhà cung cấp" />
          )}
        </div>
      </div>
    </>
  );
};

export default Provider;
