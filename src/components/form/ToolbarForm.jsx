import { Button, Card, CardBody, Input, Select } from "@windmill/react-ui";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import SelectFilter from "./SelectFilter";
import ProductServices from "@/services/ProductServices";
import { FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { SidebarContext } from "@/context/SidebarContext";
import { useForm } from "react-hook-form";
import MultipleSelect from "./MultipleSelect";
import SelectStatus from "./SelectStatus";
import { Link } from "react-router-dom";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import dayjs from "dayjs";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import Error from "@/components/form/Error";
const ToolbarForm = ({
  selectFilter,
  register,
  setValue,
  handleSubmit,
  filterStatus = [],
  filterType = [],
  control,
  rangeprice,
  rangedate,
  isCheck = [],
  data = {},
  isDelete = true,
  isAdd = true,
  isJob = false,
  onClickAdd,
  onClickDelete,
  handleDeleteMany = () => {},
  handleModalOpen = () => {},
}) => {
  const { t } = useTranslation();

  const {
    formState: { errors },
  } = useForm();

  const { handleSubmitForAll, handleSubmitFilter, toggleDrawer } =
    useContext(SidebarContext);
  const handleDelete = (data, isCheck) => {
    if (isCheck?.length > 1) {
      handleDeleteMany(isCheck, "những phần đã chọn");
    } else {
      const product = data?.data?.find((item) => item?._id === isCheck[0]);
      handleModalOpen(product?._id, product?.name);
    }
  };

  const [range, setRange] = useState([0, 10000000]); 
  const [selectedDate1, setSelectedDate1] = useState("");
  const [selectedDate2, setSelectedDate2] = useState("");

  const handleRangeChange = (newRange) => {
    setRange(newRange);
    setValue('priceFrom', newRange[0])
    setValue('priceTo', newRange[1])
  };

  return (
    <>
      <Card className="gap-4 md:justify-between bg-white p-1 border border-gray-100 rounded-lg">
        <CardBody className="flex justify-between gap-1">
          <form
            onSubmit={
              handleSubmit
                ? handleSubmit(handleSubmitFilter)
                : handleSubmitForAll
            }
            className="flex flex-wrap gap-2"
          >
            {selectFilter?.map((e, index) => {
              const Component = e?.component || SelectFilter;
              return (
                <div key={index} className="">
                  <Component
                    register={register && register}
                    services={e?.services}
                    name={e?.name}
                    label={e?.label}
                    control={control && control}
                    type={e?.type}
                    options={e?.options}
                    optionLabel={e?.optionLabel}
                    optionValue={e?.optionValue}
                  />
                </div>
              );
            })}
            {filterStatus?.length ? (
              <div>
                <SelectStatus
                  register={register && register}
                  status={filterStatus}
                  name="status"
                />
              </div>
            ) : (
              <></>
            )}
            {filterType?.length ? (
              <div>
                <Select
                  onChange={(e) => setValue("type", e?.target?.value)}
                  className="border h-12 text- focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                  name={"type"}
                  >
                  <option value="" defaultValue hidden>
                    {t("Chọn loại")}
                  </option>

                  {filterType?.map((e) => {
                    return (
                      <option value={e} key={e}>
                        {e}
                      </option>
                    );
                  })}
                </Select>
              </div>
            ) : (
              <></>
            )}
            { rangeprice ? (
              <div style={{ width: '220px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' } }>
                <Slider
                  range
                  min={0}
                  max={10000000}
                  value={range}
                  step={10000}
                  onChange={handleRangeChange}
                  style={{ height: '80%' }}
                />
                { range[0] === 0 && range[1] === 0 ?
                  (<p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: '#333', marginTop:'-6px' }}>
                    Tất cả
                  </p>) : range[0] === 10000000 && range[1] === 10000000 ?
                  (<p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: '#333', marginTop:'-6px' }}>
                    10.000.000 VND trở lên
                  </p>) : 
                  (<p style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: '#333', marginTop:'-6px' }}>
                  {range[0].toLocaleString()} VND - {range[1].toLocaleString()} VND
                  </p>)
                }
              </div>
            ) : (
              <></>
            )}
            { rangedate ? (
              <div>
                <div className="flex flex-row space-x-1">
                  <div className="flex-1">
                    <InputArea
                      onChange={(e) => setSelectedDate1(e.target.value)}
                      register={register}
                      label={t("Valid date")}
                      name="valid_from"
                      value={selectedDate1}
                      type="date"
                      placeholder={t("Validate ")}
                    />
                    <Error errorName={errors.valid_from} />
                  </div>

                  <div className="flex-1">
                    <InputArea
                      onChange={(e) => setSelectedDate2(e.target.value)}
                      register={register}
                      label={t("Valid date")}
                      name="valid_to"
                      value={selectedDate2}
                      type="date"
                      placeholder={t("Validate ")}
                    />
                    <Error errorName={errors.valid_to} />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="grid grid-cols-2 gap-1">
              <Input
                {...(register && register("search"))}
                className="border h-12 text-sm focus:outline-none block bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("Nhập thông tin tìm kiếm...")}
              />
              <Button type="submit" className=" rounded-md h-12">
                <FiSearch /> {t("Search")}
              </Button>
            </div>
          </form>
          <div className="flex gap-1 min-w-max-content">
            {isDelete && (
              <Button
                disabled={isCheck?.length < 1}
                onClick={onClickDelete ?? (() => handleDelete(data, isCheck))}
                className="rounded-md h-12 bg-red-300 disabled btn-red truncate "
              >
                <span className="mr-2">
                  <FiTrash2 />
                </span>

                {t("Delete")}
              </Button>
            )}
            {isAdd &&
              (isJob ? (
                <Link to="/jobDetailed/">
                  <Button className="rounded-md h-12 truncate">
                    <span className="mr-2">
                      <FiPlus />
                    </span>
                    {t("Add")}
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={onClickAdd ?? toggleDrawer}
                  className="rounded-md h-12 truncate"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("Add")}
                </Button>
              ))}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default ToolbarForm;
