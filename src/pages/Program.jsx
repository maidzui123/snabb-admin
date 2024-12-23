import React, { useContext, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import NotFound from "@/components/table/NotFound";
import ProgramServices from "@/services/ProgramServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import ProgramTable from "@/components/program/ProgramTable";
import MainDrawer from "@/components/drawer/MainDrawer";
import ProgramDrawer from "@/components/drawer/ProgramDrawer";
import CheckBox from "@/components/form/CheckBox";
import useProgramFilter from "@/hooks/useProgramFilter";
import { FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import SearchFrom from "@/components/form/SearchForm";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import { useForm } from "react-hook-form";
import { notifyPromise } from "@/utils/toast";
import SelectStatus from "@/components/form/SelectStatus";
import ToolbarForm from "@/components/form/ToolbarForm";

const Program = () => {
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
      ProgramServices.getAll({
        ...getValues(),
        page: currentPage,
        limit: limitData,
        // category: category,
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
  } = useProgramFilter(data?.data);

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
      <PageTitle>{t("Quản lý chương trình bảo hiểm")}</PageTitle>
      {isCheck?.length < 2 ? (
        <DeleteModal
          id={serviceId}
          setIsCheck={setIsCheck}
          title={title}
          service={ProgramServices}
        />
      ) : (
        <DeleteModal
          ids={isCheck}
          setIsCheck={setIsCheck}
          title={title}
          service={ProgramServices}
        />
      )}
      <BulkActionDrawer ids={allId} title="Programs" />
      {!serviceData?.length && (
        <MainDrawer>
          <ProgramDrawer id={serviceId} />
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
                    <TableCell>{t("Code")}</TableCell>
                    <TableCell>{t("Name")}</TableCell>
                    {/* <TableCell>{t("Description")}</TableCell> */}
                    {/* <TableCell>{t("Category")}</TableCell> */}
                    <TableCell className="text-center">
                      {t("Trạng thái")}
                    </TableCell>
                    <TableCell className="text-right">
                      {t("ActionsTbl")}
                    </TableCell>
                  </tr>
                </TableHeader>
                <ProgramTable
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
                  label="Program Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="Chương trình BH" />
          )}
        </div>
      </div>
    </>
  );
};

export default Program;
