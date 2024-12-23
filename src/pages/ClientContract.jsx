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
import ClientContractServices from "@/services/ClientContractServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import ClientContractTable from "@/components/clientContract/ClientContractTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import ClientContractDrawer from "@/components/drawer/ClientContractDrawer";
import CheckBox from "@/components/form/CheckBox";
import useClientContractFilter from "@/hooks/useClientContractFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";

const ClientContract = () => {
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
  ClientContractServices.getAll({
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
  } = useClientContractFilter(data?.data);

  return (
    <>
      <PageTitle>{t("ClientContracts Management")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} service={ ClientContractServices} />
      <BulkActionDrawer ids={allId} title="ClientContracts" />
      {!serviceData?.length && <MainDrawer>
        <ClientContractDrawer id={serviceId} />
      </MainDrawer>}

      <div className="grid gap-4 md:flex md:justify-between bg-white p-3 m-2 border border-gray-100 rounded-lg">
        <div className="flex justify-start xl:w-1/2 md:w-full">
          {/*<Button iconLeft={FiFilter}
            className={`mr-3 ${showFilter ? 'btn-gray' : ''}`}
            onClick={() => setShowFilter(!showFilter)}
          />*/}
          {/* <UploadManyTwo
            title="ClientContract"
            filename={filename}
            isDisabled={isDisabled}
            totalDoc={data?.totalDoc}
            handleSelectFile={handleSelectFile}
            handleUploadMultiple={handleUploadMultiple}
            handleRemoveSelectFile={handleRemoveSelectFile}
            service={ ClientContractServices}
          /> */}
        </div>

        <div className="grid gap-4 md:flex">
          {/* <div className="w-full md:w-32 lg:w-32 xl:w-32">
            <Button
              disabled={isCheck.length < 1}
              onClick={() => handleUpdateMany(isCheck)}
              className="rounded-md h-10 btn-gray text-gray-600 w-full"
            >
              <span className="mr-2">
                <FiEdit />
              </span>
              {t("BulkAction")}
            </Button>
          </div> */}

          <div className="w-full md:w-32 lg:w-32 xl:w-32">
            <Button
              disabled={isCheck?.length < 1}
              onClick={() => handleDeleteMany(isCheck, data.data)}
              className="rounded-md h-10 bg-red-300 disabled btn-red w-full"
            >
              <span className="mr-2">
                <FiTrash2 />
              </span>

              {t("Delete")}
            </Button>
          </div>

          <div className="w-full md:w-32 lg:w-32 xl:w-32">
            <Button onClick={toggleDrawer} className="rounded-md h-10 w-full">
              <span className="mr-2">
                <FiPlus />
              </span>
               {t("Add")}
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden tb">
        <div className="container1 mx-auto flex justify-center">
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
        </div>

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
                <ClientContractTable
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
                  label="ClientContract Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="Hợp đồng khách hàng " />
          )}
        </div>
      </div>
    </>
  );
};

export default ClientContract;
