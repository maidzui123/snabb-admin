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
import JobServices from "@/services/JobServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import JobTable from "@/components/job/JobTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import JobDrawer from "@/components/drawer/JobDrawer";
import CheckBox from "@/components/form/CheckBox";
import useJobFilter from "@/hooks/useJobFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import SearchFrom from "@/components/form/SearchForm";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import { useForm } from "react-hook-form";
import { notifyPromise } from "@/utils/toast";
import { hasPermission } from "@/helper/permission.helper";
import ToolbarForm from "@/components/form/ToolbarForm";

const Job = () => {
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
      JobServices.getAll({
        ...getValues(),
        page: currentPage,
        limit: limitData,
        // search: searchText,
      })
    )
  );
  console.log("🚀 ~ Job ~ data:", data);

  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "$";

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
  } = useJobFilter(data?.data);
  return (
    <>
      <PageTitle>{t("Quản lý Job Card")}</PageTitle>
      <DeleteModal
        ids={allId}
        setIsCheck={setIsCheck}
        title={title}
        service={JobServices}
      />

      {/* <BulkActionDrawer ids={allId} title="Jobs" /> */}

      {/* <MainDrawer fullWidth>
        <JobDrawer id={serviceId} />
      </MainDrawer> */}

      {!data?.length && (
        <MainDrawer fullWidth>
          <JobDrawer id={serviceId} />
        </MainDrawer>
      )}
      <ToolbarForm
        data={data}
        isCheck={isCheck}
        isJob={true}
        handleSubmit={handleSubmit}
        handleModalOpen={handleModalOpen}
        handleDeleteMany={handleDeleteMany}
        register={register}
        control={control}
        filterStatus={["DRAFT", "PUBLIC", "PROCESSING", "FIXING", "FINISH", "CANCEL"]}
      />
      {/* <AddDeleteCard data={data} isCheck={isCheck} />
      <SearchFrom
        handleSubmit={handleSubmit}
        register={register}
        filterStatus={["DRAFT", "PUBLIC", "PROCESSING", "FINISH", "CANCEL"]}
      /> */}
      <div className="overflow-hidden tb">
        {/* <div className="container1 mx-auto flex justify-center">
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
        </div> */}

        <div className="flex-1 overflow-hidden">
          {loading ? (
            <TableLoading row={12} col={7} width={160} height={20} />
          ) : serviceData?.length > 0 && hasPermission("job.list") ? (
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
                    <TableCell className="">{t("STT")}</TableCell>

                    <TableCell className="">{t("Mã")}</TableCell>

                    <TableCell className="">{t("Thông tin ca")}</TableCell>
                    {/* <TableCell>{t("Customer's name")}</TableCell> */}
                    <TableCell className="">{t("Thông tin KH")}</TableCell>
                    {/* <TableCell className="">
                      {t("Phone number")}
                    </TableCell>
                    <TableCell className="">{t("Email")}</TableCell> */}

                    <TableCell className="">
                      {t("Thông tin hợp đồng BH")}
                    </TableCell>
                    {/* <TableCell className="">{t("Job type")}</TableCell> */}
                    <TableCell className="text-center">{t("Status")}</TableCell>
                    <TableCell className="text-right">
                      {t("ActionsTbl")}
                    </TableCell>
                  </tr>
                </TableHeader>
                <JobTable
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
                  label="Job Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="Job" />
          )}
        </div>
      </div>
    </>
  );
};

export default Job;
