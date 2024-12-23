import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Select,
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  Pagination,
  TableContainer,
} from "@windmill/react-ui";
import CheckBox from "@/components/form/CheckBox";
import { Scrollbars } from "react-custom-scrollbars-2";

import React, { useContext, useEffect, useRef } from "react";
import { FiCheck, FiPlus, FiSearch, FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

//internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";

import Tooltip from "@/components/tooltip/Tooltip";
import InputArea from "../form/InputArea";
import { useForm } from "react-hook-form";
import JobServices from "@/services/JobServices";
import { AdminContext } from "@/context/AdminContext";
import Error from "../form/Error";
import ClientServices from "@/services/ClientServices";
import useAsync from "@/hooks/useAsync";
import TableLoading from "../preloader/TableLoading";
import useClientFilter from "@/hooks/useClientFilter";
import NotFound from "@/components/table/NotFound";
import SettingServices from "@/services/SettingServices";
import ClientTable from "../client/ClientTable";
import { da } from "date-fns/locale";
const InfoCustomerModal = ({
  methodType,
  setMethodType,
  setDataClient,
  available,
  setAvailable,
  handleAddCustomer,
}) => {
  const {
    lang,
    limitData,
    searchText,
    isInfoCustomerModalOpen,
    closeInfoCustomerModal,
    setIsUpdate,
    currentPage,
    handleChangePage,
    handleSubmitForAll,
    handleSubmitFilter,
  } = useContext(SidebarContext);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [empty, setEmpty] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const handleSearchInfo = () => {
    setMethodType("search");
  };

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { search: "" } });

  const { data, loading } = useAsync(() =>
    ClientServices.getAll({
      ...getValues(),
      page: currentPage,
      limit: limitData,
      search: searchInput,
      // category: category,
      // title: searchText,
      // price: sortedField,
    })
  );

  const { serviceData } = useClientFilter(data?.data);

  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);
  const currency = globalSetting?.default_currency || "$";

  const onSubmit = (data) => {
    try {
      setIsSubmitting(true);
      ClientServices.addOne(data)
        .then((res) => {
          setMethodType("search");
          setDataClient(res.data);
          setIsUpdate(true);
          notifySuccess(t("Add Customer Successfully!"));
          reset();
          setIsSubmitting(false);
          closeInfoCustomerModal();
        })
        .catch((err) => {
          notifyError(err.message);
        });
    } catch (err) {
      console.err(err);
    }
  };

  const { t } = useTranslation();
  const handlSearchInput = () => {
    if (searchInput.trim().length > 0) {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  };
  // useEffect(() => {
  //   if (!isInfoCustomerModalOpen) {
  //     setValue('full_name');
  //     setValue('legal_id');
  //     setValue('phone');
  //     setValue('email');
  //     setValue('address');
  //     clearErrors('name');
  //     clearErrors('legal_id');
  //     clearErrors('phone');
  //     clearErrors('email');
  //     clearErrors('address');
  //     return;
  //   }
  // }, [setValue, isInfoCustomerModalOpen, adminInfo.email, clearErrors]);
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleSearch = (id) => {
    try {
      setIsSubmitting(true);
      if (id) {
        ClientServices.getByLegalId({ legal_id: id })
          .then((res) => {
            if (res.data) {
              setDataClient(res.data);
              setIsUpdate(true);
              // notifySuccess(t("Chọn khách hàng thành công!"));
              reset();
              setIsSubmitting(false);
              closeInfoCustomerModal();
            } else {
              setIsUpdate(true);
              notifyError(t("Chọn khách hàng thất bại!"));
              reset();
              setIsSubmitting(false);
            }
          })
          .catch((err) => {
            notifyError(err.message);
            setIsSubmitting(false);
          });
      } else {
        setAvailable(false);
        notifyError(t("Chọn khách hàng thất bại!"));
        setIsSubmitting(false);
      }
    } catch (err) {
      console.err(err);
    }
  };
  return (
    <Modal isOpen={isInfoCustomerModalOpen} onClose={closeInfoCustomerModal}>
      <form
        // className="overflow-scroll max-h-xl"
        onSubmit={handleSubmit && handleSubmit(handleSubmitFilter)}
      >
        <ModalBody
          style={{
            maxHeight: "80vh",
            marginBottom: "0px",
            paddingBottom: "0px",
          }}
          className="text-center px-4 pt-2 pb-6 overflow-scroll"
        >
          {/* <Scrollbars className="w-full h-330 md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200"> */}

          <div className="flex py-2 pb-4 items-center justify-between w-full text-center">
            {methodType !== "search" && (
              <button
                onClick={handleSearchInfo}
                className="p-2 cursor-pointer text-green-400 hover:text-green-600 focus:outline-none"
              >
                <Tooltip
                  id="search"
                  Icon={FiArrowLeft}
                  title={t("Search")}
                  bgColor="#10B981"
                />
              </button>
            )}
            <h2 className="text-2xl font-semibold mt-2 text-blue-600 uppercase w-full text-center">
              {methodType === "search"
                ? t("Tìm kiếm thông tin khách hàng")
                : t("Add New Customer")}
            </h2>
          </div>

          <h2 className="text-lg font-medium mb-2">
            {t("Infomation of customer")}
          </h2>

          <div className="text-justify my-2">
            {methodType === "search" && (
              <>
                <div className="flex gap-2 py-2 m-4">
                  {/* <Label className="">{t("Legal ID")} <span className="text-red-500">*</span></Label> */}
                  <InputArea
                    register={register}
                    name="search"
                    type="search"
                    placeholder={t("Input legal id ...")}
                    required
                    defaultValue=""
                    label={t("Legal ID")}
                    value={searchInput}
                    onChange={handleInputChange}
                  />

                  <Button
                    onClick={() => {
                      handlSearchInput();
                      setAvailable(false);
                    }}
                    type="submit"
                    className="flex items-center w-40 sm:w-40 px-4 gap-2"
                  >
                    <FiSearch className="text-lg" />
                    {t("Search")}
                  </Button>

                  {!available && (
                    <Button
                      className="flex items-center w-40 sm:w-40 px-4 gap-2"
                      onClick={handleAddCustomer}
                    >
                      <FiPlus className="text-lg" />
                      {t("Tạo mới")}
                    </Button>
                  )}
                  {/* <Error errorName={errors.legal_id} /> */}
                </div>
                <div className="overflow-hidden m-4">
                  <div className="flex-1 overflow-hidden">
                    {loading ? (
                      <TableLoading row={12} col={7} width={160} height={20} />
                    ) : serviceData?.length > 0 ? (
                      <TableContainer className="mb-8 rounded-b-lg">
                        <Table>
                          <TableHeader>
                            <tr>
                              <TableCell className="text-right">
                                {t("ActionsTbl")}
                              </TableCell>
                              <TableCell>{t("Mã định danh")}</TableCell>
                              <TableCell>{t("Tên")}</TableCell>
                              <TableCell>{t("Thông tin liên hệ")}</TableCell>
                            </tr>
                          </TableHeader>
                          <ClientTable
                            lang={lang}
                            data={data?.data}
                            currency={currency}
                            isSearching={true}
                            handleSearch={handleSearch}
                          />
                        </Table>
                        <TableFooter>
                          <Pagination
                            totalResults={data?.totalDoc}
                            resultsPerPage={data?.limit}
                            onChange={handleChangePage}
                            label="Client Page Navigation"
                          />
                        </TableFooter>
                      </TableContainer>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </>
            )}{" "}
            {methodType === "add" && (
              <>
                <div className="py-2 mt-4">
                  <Label className="">
                    {t("Full name")}{" "}
                    <span className="text-red-500">
                      <span className="text-red-500">*</span>
                    </span>
                  </Label>
                  <InputArea
                    name="full_name"
                    label={t("Full name")}
                    placeholder={t("Input full name ...")}
                    required
                    register={register}
                  />
                  <Error errorName={errors?.full_name} />
                </div>

                <div className="py-2 mt-4">
                  <Label className="">
                    {t("Phone")} <span className="text-red-500">*</span>
                  </Label>
                  <InputArea
                    register={register}
                    name="phone"
                    type="number"
                    placeholder={t("Input phone number ...")}
                    label={t("Phone")}
                    required
                  />
                  <Error errorName={errors.phone} />
                </div>

                <div className="py-2 mt-4">
                  <Label className="">
                    {t("Email")} <span className="text-red-500">*</span>
                  </Label>
                  <InputArea
                    register={register}
                    label={t("Email")}
                    name="email"
                    placeholder={t("Input email address ...")}
                    required
                  />
                  <Error errorName={errors.email} />
                </div>

                <div className="py-2 mt-4">
                  <Label className="">
                    {t("Address")} <span className="text-red-500">*</span>
                  </Label>
                  <InputArea
                    register={register}
                    name="address"
                    placeholder={t("Input address detail ...")}
                    required
                    label={t("Address")}
                  />
                  <Error errorName={errors.address} />
                </div>
              </>
            )}
            {/* {(
              <div className="overflow-hidden tb">
                <div className="flex-1 overflow-hidden">
                  {loading ? (
                    <TableLoading row={12} col={7} width={160} height={20} />
                  ) : serviceData?.length > 0 ? (
                    <TableContainer className="mb-8 rounded-b-lg">
                      <Table>
                        <TableHeader>
                          <tr>
                          <TableCell className="text-right">
                              {t("ActionsTbl")}
                            </TableCell>
                            <TableCell>{t("Mã định danh")}</TableCell>
                            <TableCell>{t("Tên")}</TableCell>
                            <TableCell>{t("Thông tin liên hệ")}</TableCell>
                          </tr>
                        </TableHeader>
                        <ClientTable
                          lang={lang}
                          data={data?.data}
                          currency={currency}
                          isSearching={true}
                          handleSearch={handleSearch}
                        />
                      </Table>
                      <TableFooter>
                        <Pagination
                          totalResults={data?.totalDoc}
                          resultsPerPage={data?.limit}
                          onChange={handleChangePage}
                          label="Client Page Navigation"
                        />
                      </TableFooter>
                    </TableContainer>
                  ) : (
                    <NotFound title="Client" />
                  )}
                </div>
              </div>
            )} */}
          </div>
          {/* </Scrollbars> */}
        </ModalBody>

        <ModalFooter className="justify-center items-center flex">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeInfoCustomerModal}
          >
            {t("Cancel")}
          </Button>
          <div className="">
            {methodType !== "search" && (
              <>
                <Button
                  className="flex items-center w-full sm:w-auto px-4 gap-2"
                  type="submit"
                >
                  <FiCheck className="text-lg" />
                  {t("Tạo mới")}
                </Button>
              </>
            )}
            {/* {isSubmitting ? (
              <Button disabled={true} type="button" className="w-full h-12 sm:w-auto">
                <img src={spinnerLoadingImage} alt="Loading" width={20} height={10} />
                {" "}
                <span className="font-serif ml-2 font-light">{t("Processing")}</span>
              </Button>
            ) : (
              methodType === "search" ?
                <Button onClick={() => handleSearch(legalId)} className="flex items-center w-full sm:w-auto px-4 gap-2">
                  <FiSearch className="text-lg" />{t("Search")}
                </Button> :
                <Button className="flex items-center w-full h-12 sm:w-auto px-4 gap-2" type="submit">
                  <FiCheck className="text-lg" />{t("Tạo mới")}
                </Button>
            )} */}
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default React.memo(InfoCustomerModal);
