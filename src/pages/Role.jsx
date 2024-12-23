import React, { useContext, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";

import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import NotFound from "@/components/table/NotFound";
import RoleServices from "@/services/RoleServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import RoleTable from "@/components/role/RoleTable";
import MainDrawer from "@/components/drawer/MainDrawer";
import RoleDrawer from "@/components/drawer/RoleDrawer";
import CheckBox from "@/components/form/CheckBox";
import useRoleFilter from "@/hooks/useRoleFilter";
import { FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";

import { hasPermission } from "@/helper/permission.helper";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import SearchFrom from "@/components/form/SearchForm";
import { useForm } from "react-hook-form";
import { notifyPromise } from "@/utils/toast";
import ToolbarForm from "@/components/form/ToolbarForm";
const Role = () => {
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

  const { data, loading, setIsUpdate } = useAsync(() =>
    notifyPromise(
      RoleServices.getAll({
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

  const { serviceData, handleAddRole } = useRoleFilter(data?.data);
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
      <PageTitle>{t("Quản lý vai trò")}</PageTitle>
      {isCheck?.length < 2 ? (
        <DeleteModal
          id={serviceId}
          setIsCheck={setIsCheck}
          title={title}
          service={RoleServices}
        />
      ) : (
        <DeleteModal
          ids={isCheck}
          setIsCheck={setIsCheck}
          title={title}
          service={RoleServices}
        />
      )}
      <BulkActionDrawer ids={allId} title="Roles" />
      {!serviceData?.length && (
        <MainDrawer>
          <RoleDrawer id={serviceId} />
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
                    <TableCell>{t("STT")}</TableCell>
                    <TableCell>{t("Name")}</TableCell>
                    <TableCell>{t("Description")}</TableCell>

                    {/* <TableCell className="text-center">
                      {t("PublishedTbl")}
                    </TableCell> */}
                    <TableCell className="text-right">
                      {t("ActionsTbl")}
                    </TableCell>
                  </tr>
                </TableHeader>
                <RoleTable
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
                  label="Role Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="Vai trò " />
          )}
        </div>
      </div>
    </>
  );
};

export default Role;
