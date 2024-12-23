import { Button, Input } from "@windmill/react-ui";
import exportFromJSON from "export-from-json";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFileEarmarkCode, BsFileEarmarkMedical } from "react-icons/bs";
import {
  FiDownload,
  FiPlus,
  FiUpload,
  FiUploadCloud,
  FiXCircle,
} from "react-icons/fi";
// import { ImFileExcel } from "react-icons/im";
import { useLocation } from "react-router-dom";

//internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import { SidebarContext } from "@/context/SidebarContext";
import ProductServices from "@/services/ProductServices";

const UploadManyTwo = ({
  title,
  totalDoc,
  exportData,
  isDisabled,
  handleSelectFile,
  filename,
  handleRemoveSelectFile,
  handleUploadMultiple,
  handleViewData,
  check,
  filetemplate,
}) => {
  const location = useLocation();
  const dRef = useRef();
  const [dropDown, setDropDown] = useState(false);
  const { loading } = useContext(SidebarContext);
  const [loadingExport, setLoadingExport] = useState({
    name: "",
    status: false,
  });

  // console.log(exportData);

  // const handleExportCSV = () => {
  //   if (location.pathname === "/products") {
  //     setLoadingExport({ name: "csv", status: true });
  //     ProductServices.getAllProducts({
  //       page: 1,
  //       limit: totalDoc,
  //       category: null,
  //       title: null,
  //       price: 0,
  //     })
  //       .then((res) => {
  //         setDropDown(false);
  //         setLoadingExport({ name: "", status: false });
  //         exportFromJSON({
  //           data: res.products,
  //           fileName: "products",
  //           exportType: exportFromJSON.types.csv,
  //         });
  //       })
  //       .catch((err) => {
  //         setLoadingExport({ name: "", status: false });
  //         setDropDown(false);
  //         // console.log(err);
  //       });
  //   }
  //   if (location.pathname === "/categories") {
  //     exportFromJSON({
  //       data: exportData,
  //       fileName: "categories",
  //       exportType: exportFromJSON.types.csv,
  //     });
  //   }
  //   if (location.pathname === "/attributes") {
  //     exportFromJSON({
  //       data: exportData,
  //       fileName: "attributes",
  //       exportType: exportFromJSON.types.csv,
  //     });
  //   }

  //   if (location.pathname === "/coupons") {
  //     exportFromJSON({
  //       data: exportData,
  //       fileName: "coupons",
  //       exportType: exportFromJSON.types.csv,
  //     });
  //   }
  //   if (location.pathname === "/customers") {
  //     exportFromJSON({
  //       data: exportData,
  //       fileName: "customers",
  //       exportType: exportFromJSON.types.csv,
  //     });
  //   }
  // };

  // const handleExportJSON = () => {
  //   if (location.pathname === "/products") {
  //     setLoadingExport({ name: "json", status: true });
  //     ProductServices.getAllProducts({
  //       page: 1,
  //       limit: totalDoc,
  //       category: null,
  //       title: null,
  //       price: 0,
  //     })
  //       .then((res) => {
  //         setDropDown(false);
  //         setLoadingExport({ name: "json", status: true });
  //         exportFromJSON({
  //           data: res.products,
  //           fileName: "products",
  //           exportType: exportFromJSON.types.json,
  //         });
  //       })
  //       .catch((err) => {
  //         setDropDown(false);
  //         setLoadingExport({ name: "json", status: true });
  //         // console.log(err);
  //       });
  //   }
  //   if (location.pathname === "/categories") {
  //     exportFromJSON({
  //       data: exportData,
  //       fileName: "categories",
  //       exportType: exportFromJSON.types.json,
  //     });
  //   }
  //   if (location.pathname === "/attributes") {
  //     exportFromJSON({
  //       data: exportData,
  //       fileName: "attributes",
  //       exportType: exportFromJSON.types.json,
  //     });
  //   }

  //   if (location.pathname === "/coupons") {
  //     exportFromJSON({
  //       data: exportData,
  //       fileName: "coupons",
  //       exportType: exportFromJSON.types.json,
  //     });
  //   }
  //   if (location.pathname === "/customers") {
  //     exportFromJSON({
  //       data: exportData,
  //       fileName: "customers",
  //       exportType: exportFromJSON.types.json,
  //     });
  //   }
  // };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dRef?.current?.contains(e.target)) {
        setDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [dRef]);

  const [isImportBoxShown, setisImportBoxShown] = useState(false);
  // const handleClick = (event) => {
  //   setisImportBoxShown((current) => !current);
  // };

  const { t } = useTranslation();

  return (
    <div className=" lg:flex md:flex flex-grow-0">
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
                  onClick={handleUploadMultiple}
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
    </div>
  );
};
export default UploadManyTwo;
