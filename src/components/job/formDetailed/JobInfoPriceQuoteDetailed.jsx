import InputArea from "@/components/form/InputArea";
import LabelArea from "@/components/form/LabelArea";
import RenderForm from "@/components/form/RenderForm";
import TextAreaCom from "@/components/form/TextAreaCom";
import { SidebarContext } from "@/context/SidebarContext";
import { FcExpand, FcCollapse } from "react-icons/fc";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { formatDatetime } from "@/utils/date.helper";
import SelectSearchName from "@/components/form/SelectSearchName";
import "react-select-search/style.css";
import MultipleSelect from "@/components/form/MultipleSelect";
import AccessoryServices from "@/services/AccessoryServices";
import { useState } from "react";
import useJobSubmit from "@/hooks/useJobSubmit";
import { checkTypeCompany } from "@/helper/permission.helper";
import InputMoneyArea from "@/components/form/InputMoneyArea";
import {
  formatStringToNumber,
  hasFormatNumber,
} from "@/helper/fomatNum.helper";
import { InputNumber, Input } from "antd";
import { IoCloseOutline } from "react-icons/io5";

import {
  Table,
  TableHeader,
  TableFooter,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Card,
  CardBody,
  Label,
  Pagination,
} from "@windmill/react-ui";
import Tooltip from "@/components/tooltip/Tooltip";
const JobInfoPriceQuoteDetailed = ({
  job_id,
  getValues = () => {},
  register,
  isDisabled,
  handleAddAccessory,
  setValue,
  errors,
  limitData,
  dataClient,
  jobStatus,
  jobStepStatus,
  listAccessory,
  setListAccessory,
  dataJob,
  watch,
  replaceType,
  control = {},
}) => {
  const { t } = useTranslation();
  const { isInfoCustomerCollapsed, handleInfoCustomerToggle, currentPage } =
    useContext(SidebarContext);
  const onChangeTotalPrice = () => {
    setValue(
      "overall_cost",
      hasFormatNumber(
        +formatStringToNumber(watch("device_cost_vat")) +
          formatStringToNumber(watch("employee_cost_vat")) +
          formatStringToNumber(watch("transport_cost_vat"))
      )
    );
  };
  const overallCost = React.useMemo(
    () => [
      {
        label: t("Phí thiết bị (có bao gồm VAT)"),
        name: "device_cost_vat",
        placeholder: "Phí thiết bị (có VAT)",
        disabled: false,
        type: "text",
        defaultValue: "0",
        setValue: setValue,
        onChange: onChangeTotalPrice,
        component: InputMoneyArea,
        required: true,
      },

      {
        label: t("Phí nhân công (có bao gồm VAT)"),
        name: "employee_cost_vat",
        placeholder: "Phí nhân công (có VAT)",
        disabled: false,
        type: "text",
        defaultValue: "0",
        setValue: setValue,
        onChange: onChangeTotalPrice,
        component: InputMoneyArea,
        required: true,
      },

      {
        label: t("Phí vận chuyển (có bao gồm VAT)"),
        name: "transport_cost_vat",
        placeholder: "Phí vận chuyển (có VAT)",
        disabled: false,
        type: "text",
        defaultValue: "0",
        setValue: setValue,
        onChange: onChangeTotalPrice,
        component: InputMoneyArea,
        required: true,
      },
      {
        label: t("Tổng số tiền YCBT"),
        name: "overall_cost",
        placeholder: "Tổng số tiền YCBT",
        disabled: true,
        defaultValue: "0",
        type: "text",
        component: InputMoneyArea,
        required: false,
      },
    ],
    [dataClient, replaceType]
  );

  const normalizeNumber = (v, i) => {
    const inputValue = v;
    const numericValue = inputValue.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const pattern = /^[0-9\s]*$/;

    if (pattern.test(numericValue) || numericValue.trim() === "") {
      const formattedPrice = Number(numericValue).toLocaleString("en-US");
      const updatedItems = [...listAccessory];
      updatedItems[i].price = formattedPrice;
      setListAccessory(updatedItems);
    }
  };
  console.log(listAccessory)
  const handleDelete = (indexToDelete) => {
    setListAccessory((prevItems) =>
      prevItems.filter((item, index) => index !== indexToDelete)
    );
  };

  const totalPriceAccessory = listAccessory.reduce((total, item) => {
    return item?.type !== "accessory" ? total + (formatStringToNumber(item?.price) + (formatStringToNumber(item?.price) * item?.VAT / 100)) * item?.quantity : total + (item?.price + (item?.price * item?.VAT / 100)) * item?.quantity;
  }, 0);
  return (
    <Card
      className={`min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4 ${
        isInfoCustomerCollapsed ? "collapsed" : ""
      }`}
      style={{
        height: isInfoCustomerCollapsed ? "60px" : "auto",
        overflow: isInfoCustomerCollapsed ? "hidden" : "visible",
      }}
    >
      <CardBody>
        <div className="w-full flex items-center justify-between my-2">
          <h1 className="text-2xl font-bold text-center w-full py-2 mb-2 text-blue-600">
            {t("BÁO GIÁ")}
          </h1>
        </div>

        <div className="flex mb-2 justify-between items-center">
          <Label className=" text-blue-500 text-xl font-bold">
            BẢNG GIÁ LINH KIỆN
          </Label>
          <div className="flex gap-1">
            <Button onClick={handleAddAccessory}>Chọn linh kiện</Button>
            <Button
              onClick={() => {
                setListAccessory([
                  ...listAccessory,
                  {
                    name: "",
                    code: "",
                    price: "0",
                    VAT: 0,
                    quantity: 1,
                  },
                ]);
              }}
            >
              Khác
            </Button>
          </div>
        </div>
        <div className="mb-2 py-2 gap-2 w-full">
          <TableContainer className=" w-full mb-2 rounded-b-lg">
            <Table>
              <TableHeader>
                <tr>
                  <TableCell className=" text-center">{t("STT")}</TableCell>
                  <TableCell className=" text-center">{t("Name")}</TableCell>
                  <TableCell className=" text-center">{t("Code")}</TableCell>
                  <TableCell className=" text-center">Đơn giá</TableCell>
                  <TableCell className=" text-center">VAT</TableCell>
                  <TableCell className=" text-center">
                    {t("Quantity")}
                  </TableCell>
                  <TableCell className=" text-center"></TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {listAccessory?.map((item, i) => (
                  <TableRow className=" w-full text-center">
                    <TableCell>
                      <span className="text-sm">{i + 1}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {item?.type === "accessory" ? (
                          item?.name
                        ) : (
                          <Input
                            size="small"
                            placeholder="Nhập tên"
                            allowClear
                            value={item?.name}
                            onChange={(e) => {
                              const updatedItems = [...listAccessory];
                              updatedItems[i].name = e.target.value;
                              setListAccessory(updatedItems);
                            }}
                          />
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {item?.type === "accessory" ? (
                          item?.code
                        ) : (
                          <Input
                            size="small"
                            placeholder="Nhập mã"
                            allowClear
                            value={item?.code}
                            onChange={(e) => {
                              const updatedItems = [...listAccessory];
                              updatedItems[i].code = e.target.value;
                              setListAccessory(updatedItems);
                            }}
                          />
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {item?.type === "accessory" ? (
                          hasFormatNumber(item?.price)
                        ) : (
                          <Input
                            size="small"
                            placeholder="Nhập giá"
                            allowClear
                            suffix="VND"
                            value={item?.price}
                            onChange={(e) => normalizeNumber(e.target.value, i)}
                          />
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {item?.type === "accessory" ? (
                          item?.VAT
                        ) : (
                          <Input
                            size="small"
                            placeholder="Nhập VAT"
                            allowClear
                            suffix="%"
                            type="number"
                            value={item?.VAT}
                            onChange={(e) => {
                              const updatedItems = [...listAccessory];
                              updatedItems[i].VAT = e.target.value;
                              setListAccessory(updatedItems);
                            }}
                          />
                        )}
                      </span>
                    </TableCell>
                    <TableCell>
                      <InputNumber
                        size="small"
                        min={1}
                        max={100000}
                        defaultValue={item?.quantity || 1}
                        value={item?.quantity}
                        onChange={(value) => {
                          const updatedItems = [...listAccessory];
                          updatedItems[i].quantity = value;
                          setListAccessory(updatedItems);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => handleDelete(i)}
                        className="p-2 cursor-pointer text-red-500 hover:text-red-600 focus:outline-none"
                      >
                        <Tooltip
                          id="delete"
                          Icon={IoCloseOutline}
                          title={t("Xóa")}
                          bgColor="#017e9"
                        />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h1 className=" text-red-600 text-xl m-0">
            Tổng giá tiền: {hasFormatNumber(totalPriceAccessory)}
          </h1>
        </div>
        <Label className=" text-blue-500 text-xl font-bold mb-2">
          CHI PHÍ TỔNG QUAN
        </Label>

        <div className="mb-2 py-2 gap-2 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <RenderForm
            fieldArray={overallCost}
            register={register}
            errors={errors}
          />
        </div>
      </CardBody>
    </Card>
  );
};

export default JobInfoPriceQuoteDetailed;
