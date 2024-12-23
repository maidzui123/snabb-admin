import React, { useEffect, useContext, useState } from "react";
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
import GroupCategoryServices from "@/services/GroupCategoryServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import GroupCategoryTable from "@/components/groupCategory/GroupCategoryTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import GroupCategoryDrawer from "@/components/drawer/GroupCategoryDrawer";
import CheckBox from "@/components/form/CheckBox";
import useGroupCategoryFilter from "@/hooks/useGroupCategoryFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import SearchFrom from "@/components/form/SearchForm";
import useQuery from "@/hooks/useQuery";
import useGroupCategorySubmit from "@/hooks/useGroupCategorySubmit";
import SelectType from "@/components/form/SelectType";

const GroupCategory = () => {
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
    triggerRecallAPI
  } = useContext(SidebarContext);

  const query = useQuery();
  const type_code = query.get("type");
  console.log(type_code);
  const { data, loading } = useAsync(() =>  
    GroupCategoryServices.getAll({
      type: type_code,
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

  useEffect(() => {
    triggerRecallAPI();
  }, [type_code]);
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
  } = useGroupCategoryFilter(data?.data);
  return (
    <>
      <PageTitle>{t("Quản lý nhóm")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} service={ GroupCategoryServices} />
      <BulkActionDrawer ids={allId} title="GroupCategorys" />
      {!serviceData?.length && <MainDrawer>
        <GroupCategoryDrawer id={serviceId} />
      </MainDrawer>}

      {/* <div className="grid gap-4 md:flex md:justify-between bg-white p-3 m-2 border border-gray-100 rounded-lg">
        <div className="flex justify-start xl:w-1/2 md:w-full">
          <Button iconLeft={FiFilter}
            className={`mr-3 ${showFilter ? 'btn-gray' : ''}`}
            onClick={() => setShowFilter(!showFilter)}
          />
          <UploadManyTwo
            title="GroupCategory"
            filename={filename}
            isDisabled={isDisabled}
            totalDoc={data?.totalDoc}
            handleSelectFile={handleSelectFile}
            handleUploadMultiple={handleUploadMultiple}
            handleRemoveSelectFile={handleRemoveSelectFile}
            service={ GroupCategoryServices}
          />
        </div>
      </div> */}
      <AddDeleteCard data={data} isCheck={isCheck} />
      {/* <SearchFrom handleSubmit={handleSubmit} register={register} /> */}

      <div className="overflow-hidden p-1">
      

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
                    <TableCell className="text-center">
                      {t("PublishedTbl")}
                    </TableCell>
                    <TableCell className="text-right">{t("ActionsTbl")}</TableCell>
                  </tr>
                </TableHeader>
                <GroupCategoryTable
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
                  label="GroupCategory Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="GroupCategory" />
          )}
        </div>
      </div>
    </>
  );
};

export default GroupCategory;
