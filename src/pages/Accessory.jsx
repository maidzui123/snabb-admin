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
import AccessoryServices from "@/services/AccessoryServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import AccessoryTable from "@/components/accessory/AccessoryTable";
import SelectCategory from "@/components/form/SelectCategory";
import MainDrawer from "@/components/drawer/MainDrawer";
import AccessoryDrawer from "@/components/drawer/AccessoryDrawer";
import CheckBox from "@/components/form/CheckBox";
import useAccessoryFilter from "@/hooks/useAccessoryFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SettingServices from "@/services/SettingServices";
import SearchFrom from "@/components/form/SearchForm";
import ProductServices from "@/services/ProductServices";
import AgencyServices from "@/services/AgencyServices";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import { useForm } from "react-hook-form";
import { notifyPromise } from "@/utils/toast";
import ToolbarForm from "@/components/form/ToolbarForm";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Accessory = () => {
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
  const { lang, currentPage, handleChangePage, limitData } =
    useContext(SidebarContext);

  const { data, loading } = useAsync(() =>
    notifyPromise(
      AccessoryServices.getAll({
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

  // console.log("selectFilter", selectFilter);
  // console.log('productss',products)
  const {
    serviceData,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useAccessoryFilter(data?.data);
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
        (<PageTitle>{t("Quản lý linh kiện")}</PageTitle>) :
        (<PageTitle>{t("Chi tiết nhập linh kiện")}</PageTitle>)
      }
      {isCheck?.length < 2 ? (
        <DeleteModal
          id={serviceId}
          setIsCheck={setIsCheck}
          title={title}
          service={AccessoryServices}
        />
      ) : (
        <DeleteModal
          ids={isCheck}
          setIsCheck={setIsCheck}
          title={title}
          service={AccessoryServices}
        />
      )}
      { importId == undefined ? (
      <>
        <div className="w-full md:w-32 lg:w-32 xl:w-32 pl-2">
          <Link to="/accessoryimport">
            <div className="lg:flex-1 md:flex-1 mr-3  sm:flex-none">
              <button className="border flex justify-center items-center h-10 w-20 hover:text-yellow-400  border-gray-300 dark:text-gray-300 cursor-pointer  py-2 hover:border-yellow-400 rounded-md focus:outline-none">
                <FiDownload className="mr-2" />
                <span className="text-xs">Nhập</span>
              </button>
            </div>
          </Link>
        </div>

        <BulkActionDrawer ids={allId} title="Accessorys" />
        {!serviceData?.length && (
          <MainDrawer>
            <AccessoryDrawer id={serviceId} />
          </MainDrawer>
        )}

        <ToolbarForm
          data={data}
          isCheck={isCheck}
          rangeprice = {true}
          rangedate = {true}
          setValue={setValue}
          handleSubmit={handleSubmit}
          handleModalOpen={handleModalOpen}
          handleDeleteMany={handleDeleteMany}
          register={register}
          control={control}
          selectFilter={[
            { name: "product", services: ProductServices, label: "Product" },
            { name: "agency", services: AgencyServices, label: "Agency" },
          ]}
          filterStatus={["OUTSTOCK", "INSTOCK", "OUTDATE"]}
        />
      </>
      ) : <></>}

      <div className="overflow-hidden tb">
        <div className="flex-1 overflow-hidden">
          {loading ? (
            <TableLoading row={12} col={7} width={160} height={20} />
          ) : serviceData?.length > 0 ? (
            <TableContainer className="mb-8 rounded-b-lg">
              <Table>
                <TableHeader>
                  <tr>
                    {importId == undefined ? (<TableCell>
                      <CheckBox
                        type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        isChecked={isCheckAll}
                        handleClick={handleSelectAll}
                      />
                    </TableCell>) : <></>}
                    <TableCell>{t("STT")}</TableCell>
                    <TableCell>{t("Name")}</TableCell>
                    <TableCell>{t("Code")}</TableCell>
                    <TableCell>{t("Description")}</TableCell>
                    <TableCell>{t("Price")}</TableCell>
                    <TableCell>{t("VAT")}</TableCell>
                    <TableCell>{t("Thông tin chung")}</TableCell>
                    <TableCell>{t("Category")}</TableCell>
                    {/* <TableCell className="text-center">
                      {t("PublishedTbl")}
                    </TableCell> */}
                    <TableCell>{t("Valid date")}</TableCell>
                    <TableCell className="text-center">{t("Status")}</TableCell>
                    {importId == undefined ? (<TableCell className="text-right">
                      {t("ActionsTbl")}
                    </TableCell>) : <></>}
                  </tr>
                </TableHeader>
                <AccessoryTable
                  lang={lang}
                  isCheck={isCheck}
                  data={data?.data}
                  setIsCheck={setIsCheck}
                  currency={currency}
                  currentPage={currentPage}
                  limitData={limitData}
                  isAction={importId ? false : true}
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
            <NotFound title="Linh kiện" />
          )}
        </div>
      </div>
    </>
  );
};

export default Accessory;
