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
import { FiDownload } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import UploadManyTwo from "@/components/common/UploadManyTwo";
import NotFound from "@/components/table/NotFound";
import RetailerServices from "@/services/RetailerServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import RetailerTable from "@/components/retailer/RetailerTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import RetailerDrawer from "@/components/drawer/RetailerDrawer";
import CheckBox from "@/components/form/CheckBox";
import useRetailerFilter from "@/hooks/useRetailerFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import SearchFrom from "@/components/form/SearchForm";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import BrandServices from "@/services/BrandServices";
import { useForm } from "react-hook-form";
import { notifyPromise } from "@/utils/toast";
import ToolbarForm from "@/components/form/ToolbarForm";
import { useParams } from "react-router-dom/cjs/react-router-dom";
const Retailer = () => {
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
  const { importId } = useParams();
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
      RetailerServices.getAll({
        ...getValues(),
        page: currentPage,
        limit: limitData,
        import_id: importId ? importId : undefined
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
      { importId == undefined ? 
        (<PageTitle>{t("Quản lý trung tâm bán hàng")}</PageTitle>) :
        (<PageTitle>{t("Chi tiết nhập trung tâm bán hàng")}</PageTitle>)
      }
      {isCheck?.length < 2 ? (
        <DeleteModal
          id={serviceId}
          setIsCheck={setIsCheck}
          title={title}
          service={RetailerServices}
        />
      ) : (
        <DeleteModal
          ids={isCheck}
          setIsCheck={setIsCheck}
          title={title}
          service={RetailerServices}
        />
      )}
      { importId == undefined ? 
        (<div className="w-full md:w-32 lg:w-32 xl:w-32">
          <Link to="/retailerimport">
            <div className="lg:flex-1 md:flex-1 mr-3  sm:flex-none">
              <button className="border flex justify-center items-center h-10 w-20 hover:text-yellow-400  border-gray-300 dark:text-gray-300 cursor-pointer  py-2 hover:border-yellow-400 rounded-md focus:outline-none">
                <FiDownload className="mr-2" />
                <span className="text-xs">Nhập</span>
              </button>
            </div>
          </Link>
        </div>) : <></>
      }
      <BulkActionDrawer ids={allId} title="Retailers" />
      {!serviceData?.length && (
        <MainDrawer>
          <RetailerDrawer id={serviceId} />
        </MainDrawer>
      )}
      { importId == undefined ? 
        (
        <>
          <ToolbarForm
            data={data}
            isCheck={isCheck}
            handleSubmit={handleSubmit}
            handleModalOpen={handleModalOpen}
            handleDeleteMany={handleDeleteMany}
            register={register}
            control={control}
            selectFilter={[
              { name: "brand", services: BrandServices, label: "Brand" },
            ]}
            filterStatus={["ACTIVE", "INACTIVE"]}
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
          </div>
        </>
        ) : <></>
      }
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
                    <TableCell>{t("Code")}</TableCell>
                    <TableCell>{t("Thông tin liên hệ")}</TableCell>
                    <TableCell>{t("Representative")}</TableCell>
                    <TableCell>{t("Brand")}</TableCell>
                    <TableCell>{t("Category")}</TableCell>

                    <TableCell className="text-center">{t("Status")}</TableCell>
                    <TableCell className="text-right">
                      {t("ActionsTbl")}
                    </TableCell>
                  </tr>
                </TableHeader>
                <RetailerTable
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
                  label="Retailer Page Navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <NotFound title="TT bán hàng " />
          )}
        </div>
      
    </>
  );
};

export default Retailer;
