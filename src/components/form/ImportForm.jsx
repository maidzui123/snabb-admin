import { Button, Card, CardBody, Input } from "@windmill/react-ui";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import SelectImport from "./SelectImport";
import ProductServices from "@/services/ProductServices";
import { FiPlus, FiSearch, FiTrash2, FiUploadCloud, FiDownload, FiXCircle } from "react-icons/fi";
import { SidebarContext } from "@/context/SidebarContext";
import { useForm } from "react-hook-form";

import spinnerLoadingImage from "@/assets/img/spinner.gif";
import MultipleSelect from "./MultipleSelect";
import SelectStatus from "./SelectStatus";
import { Link } from "react-router-dom";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import dayjs from "dayjs";
import LabelArea from "@/components/form/LabelArea";
import InputArea from "@/components/form/InputArea";
import Error from "@/components/form/Error";
import { notifyError } from "@/utils/toast";
const ImportForm = ({
  title,
  totalDoc,
  isDisabled,
  handleSelectFile,
  filename,
  handleRemoveSelectFile,
  handleUploadMultiple,
  handleViewData,
  check,
  filetemplate,
  selectImport,
  register,
  setValue,
  handleSubmit,
  control,
  isCheck = [],
  data = {},
  handleDeleteMany = () => {},
  handleModalOpen = () => {},
}) => {
  const { t } = useTranslation();

  const {
    formState: { errors },
    getValues,
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

  const dRef = useRef();
  const [dropDown, setDropDown] = useState(false);
  const { loading } = useContext(SidebarContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dRef?.current?.contains(e.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [dRef]);

  return (
    <>
      <Card className="gap-4 md:justify-between bg-white border-gray-100 rounded-lg">
        <CardBody className="flex justify-between gap-1">
          <form
            onSubmit={
              handleSubmit
                ? handleSubmit(handleUploadMultiple)
                : handleSubmitForAll
            }
            className="flex flex-wrap gap-2"
          >
            {selectImport?.map((e, index) => {
              const Component = e?.component || SelectImport;
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
                    required={true}
                  />
                </div>
              );
            })}
            <div className="w-full my-2 lg:my-0 md:my-0 flex">
              <div className="h-10 border border-dashed border-blue-500 rounded-md mr-2">
                <label className="p-4 w-full rounded-lg h-10 flex justify-center items-center text-xs dark:text-gray-400 leading-none ">
                  <Input
                    disabled={isDisabled}
                    type="file"
                    accept=".xlsx,.csv,.xls,.json"
                    onChange={handleSelectFile}
                  />
                  {filename ? (
                    filename
                  ) : (
                    <>
                        <FiUploadCloud className="mr-2 text-blue-500 text-lg dark:text-gray-400" />{" "}
                        {t("Chọn File ")} {title} {t("")}
                    </>
                  )}
                  {filename && (
                    <span
                      onClick={handleRemoveSelectFile}
                      type="button"
                      className="text-red-500 focus:outline-none ml-4 text-lg"
                    >
                      <FiXCircle />
                    </span>
                  )}
                </label>
              </div>
              <div className="h-10 border border-dashed border-blue-500 rounded-md">
                <label className="p-4 w-full rounded-lg h-10 flex justify-center items-center text-xs dark:text-gray-400 leading-none ">
                  <a href={"/" + filetemplate}
                    download={filetemplate}
                    className="flex items-center"
                    >
                      <FiDownload className="mr-2 text-blue-500 text-lg dark:text-gray-400" />
                      Tải file mẫu
                  </a>
                </label>
              </div>
              <div className="flex">
                {loading ? (
                  <Button className="ml-2 h-10">
                    <img
                      src={spinnerLoadingImage}
                      alt="Loading"
                      width={20}
                      height={10}
                    />{" "}
                    <span className="font-serif ml-2 font-light">Đang xử lý</span>
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={check}
                    className="w-full rounded-md h-10 ml-2  text-xs px-2"
                  >
                    <span className="">
                      <FiPlus />
                    </span>
                    <span className=" text-sx w-20">{t("Nhập")}</span>
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  );
};

export default ImportForm;
