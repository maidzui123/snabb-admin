import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";

//internal import

import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import MainDrawer from "@/components/drawer/MainDrawer";
import StaffDrawer from "@/components/drawer/StaffDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import StaffTable from "@/components/staff/StaffTable";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { AdminContext } from "@/context/AdminContext";
import { SidebarContext } from "@/context/SidebarContext";
import AdminServices from "@/services/AdminServices";
import AddDeleteCard from "@/components/form/AddDeleteCard";
import SearchFrom from "@/components/form/SearchForm";
import { useForm } from "react-hook-form";
import { notifyPromise } from "@/utils/toast";
import ToolbarForm from "@/components/form/ToolbarForm";

const Staff = () => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { toggleDrawer, lang, limitData, currentPage, handleChangePage } =
    useContext(SidebarContext);

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

  
  const { data, loading, error } = useAsync(() =>
    notifyPromise(
      AdminServices.getAllStaff({
        ...getValues(),
        // email: adminInfo.email,
        page: currentPage,
        limit: limitData,
      })
    )
  );
  console.log("🚀 ~ Staff ~ data:", data)

  // const {
  //   userRef,
  //   setRole,
  //   // handleChangePage,
  //   totalResults,
  //   resultsPerPage,
  //   dataTable,
  //   serviceData,
  //   handleSubmitUser,
  // } = useFilter(data?.data);

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("StaffPageTitle")} </PageTitle>
      {data?.length < 1 && (
        <MainDrawer>
          <StaffDrawer />
        </MainDrawer>
      )}

      {/* <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitUser}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={userRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("StaffSearchBy")}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select
                onChange={(e) => setRole(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  {t("StaffRole")}
                </option>
                <option value="Admin">{t("StaffRoleAdmin")}</option>
                <option value="Cashier">{t("SelectCashiers")}</option>
                <option value="Super Admin">{t("SelectSuperAdmin")}</option>
              </Select>
            </div>

            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                {t("AddStaff")}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card> */}

      <ToolbarForm
        data={data}
        handleSubmit={handleSubmit}
        register={register}
        control={control}
      />

      {loading ? (
        // <Loading loading={loading} />
        <TableLoading row={12} col={7} width={163} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : data?.data?.length > 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("STT")}</TableCell>
                <TableCell>{t("StaffNameTbl")}</TableCell>
                <TableCell>{t("StaffEmailTbl")}</TableCell>
                <TableCell>{t("StaffContactTbl")}</TableCell>
                <TableCell>{t("StaffJoiningDateTbl")}</TableCell>
                <TableCell>{t("Type")}</TableCell>
                <TableCell>{t("StaffRoleTbl")}</TableCell>
                <TableCell className="text-center">
                  {t("OderStatusTbl")}
                </TableCell>
                {/* <TableCell className="text-center">
                  {t("PublishedTbl")}
                </TableCell> */}

                <TableCell className="text-right">
                  {t("StaffActionsTbl")}
                </TableCell>
              </tr>
            </TableHeader>

            <StaffTable 
            staffs={data?.data} 
            lang={lang} 
            currentPage={currentPage}
            limitData={limitData}/>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Xin lỗi, không tìm thấy nhân viên." />
      )}
    </>
  );
};

export default Staff;
