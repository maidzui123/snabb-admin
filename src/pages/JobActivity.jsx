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
import JobActivityServices from "@/services/JobActivityServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import JobActivityTable from "@/components/jobActivity/JobActivityTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import JobActivityDrawer from "@/components/drawer/JobActivityDrawer";
import CheckBox from "@/components/form/CheckBox";
import useJobActivityFilter from "@/hooks/useJobActivityFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import SearchFrom from "@/components/form/SearchForm";

const JobActivity = () => {
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

  const { data, loading } = useAsync(() =>
  JobActivityServices.getAll({
    page: currentPage,
    limit: limitData,
    // category: category,
    title: searchText,
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
  } = useJobActivityFilter(data?.data);

  return (
    <>
      <PageTitle>{t("JobActivitys Management")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} service={ JobActivityServices} />
      <BulkActionDrawer ids={allId} title="JobActivitys" />
      {!serviceData?.length && <MainDrawer>
        <JobActivityDrawer id={serviceId} />
      </MainDrawer>}

      <div className="grid gap-4 md:flex md:justify-between bg-white p-3 m-2 border border-gray-100 rounded-lg">
        <div className="flex justify-start xl:w-1/2 md:w-full">
          {/*<Button iconLeft={FiFilter}
            className={`mr-3 ${showFilter ? 'btn-gray' : ''}`}
            onClick={() => setShowFilter(!showFilter)}
          />*/}
          <UploadManyTwo
            title="JobActivity"
            filename={filename}
            isDisabled={isDisabled}
            totalDoc={data?.totalDoc}
            handleSelectFile={handleSelectFile}
            handleUploadMultiple={handleUploadMultiple}
            handleRemoveSelectFile={handleRemoveSelectFile}
            service={ JobActivityServices}
          />
        </div>
      </div>
      <AddDeleteCard data={data} isCheck={isCheck} />
      <SearchFrom handleSubmit={handleSubmit} register={register} />

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
                    <TableCell>{t("Description")}</TableCell>
                    <TableCell className="text-center">
                      {t("PublishedTbl")}
                    </TableCell>
                    <TableCell className="text-right">{t("ActionsTbl")}</TableCell>
                  </tr>
                </TableHeader>
                <JobActivityTable
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
                  label="JobActivity Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="JobActivity" />
          )}
        </div>
      </div>
    </>
  );
};

export default JobActivity;
