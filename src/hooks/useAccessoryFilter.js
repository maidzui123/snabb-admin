/* eslint-disable react-hooks/exhaustive-deps */
import Ajv from "ajv";
import AjvFormats from "ajv-formats";
import csvToJson from "csvtojson";
import { useContext, useState } from "react";
import * as XLSX from "xlsx";
import { SidebarContext } from "@/context/SidebarContext";
import AccessoryServices from "@/services/AccessoryServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import AgencyServices from "@/services/AgencyServices";
import ProductServices from "@/services/ProductServices";
import AccessoryCategoryServices from "@/services/AccessoryCategoryServices";
import { trueColor } from "@cloudinary/url-gen/qualifiers/colorSpace";

// custom product upload validation schema
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    code: { type: "string" },
    desc: { type: "string" },
    price: { type: "number" },
    VAT: { type: "number" },
    unit: { type: "string" },
    valid_from: { type: "string", format: "date-time" },
    valid_to: { type: "string", format: "date-time" },
    status: { type: "string" },
    stt: { type: "integer" },
  },
  required: [ "price", "status", "stt", "unit", "VAT","valid_from", "valid_to", "name", "code"],
};

// const data = {
//   valid_from: "2023-12-31T23:59:30Z",
//   valid_to: "2024-10-04T23:59:30Z",
//   // ... (các trường khác)
// };


const useAccessoryFilter = (data) => {
  const ajv = new Ajv({ allErrors: true });
  const { setLoading, setIsUpdate } = useContext(SidebarContext);

  const [newAccessorys] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [selectedFileData, setSelectedFileData] = useState([]);
  const [filename, setFileName] = useState("");
  const [isDisabled, setIsDisable] = useState(false);
  const [check, setCheck] = useState(true);
  //service data filtering
  const serviceData = data;

  //  console.log('selectedFile',selectedFile)

  const handleOnDrop = (data) => {
    // console.log('data', data);
    for (let i = 0; i < data.length; i++) {
      newAccessorys.push(data[i].data);
    }
  };

  const handleSelectFile = async (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    const fileReader = new FileReader();
    const file = e.target?.files[0];
    setFileName(file?.name);
    setIsDisable(true);
    fileReader.onload = async (event) => {
      const data = event.target.result;
      const workbook = await XLSX.read(data, {
        type: "array",
        cellDates: true,
      });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });

      let filterJsonData = [];
      let rowIndex = 0;
      filterJsonData = jsonData
            ?.filter((value) => value.length > 5)
            ?.slice(1)
            ?.map((value, index, array) => {
              const isDuplicate = array.slice(0, index).some((row) => {
                const keyColumns = [2];
            return keyColumns.every(
                  (colIndex) => row[colIndex] == value[colIndex]
                );
              });
              rowIndex += 1;
              console.log(value[7])
              return {
                check: isDuplicate
                  ? "DUPLICATE"
                  : !value[1] ||
                    !value[2] ||
                    !value[4] || value[4] < 0 ||
                    !value[5] || value[5] < 0 || value[5] > 10 ||
                    !value[6] || (value[6] != "meters" && value[6] != "piece" && value[6] != "box" && 
                                  value[6] != "set" && value[6] != "kg" && value[6] != "ton" && value[6] != "other" ) ||
                    !value[7] ||
                    !value[8] ||
                    !value[9] || (value[9] != "INSTOCK" && value[9] != "OUTSTOCK" && value[9] != "OUTDATE") ||
                    value[7] > value[8]
                    // (value[8]?.trim() == "INACTIVE" ? false : !value[10]) ||
                    // (value[8]?.trim() == "ACTIVE" ? false : !value[11]) ||
                    // !value[12]
                  ? "INVALID"
                  : "PENDING",
                stt: value[0],
                name: value[1],
                code: value[2],
                desc: value[3] !== undefined ? value[3] : "",
                price: value[4],
                VAT: value[5],
                unit: value[6],
                valid_from: value[7] ? new Date(value[7]) : "",
                valid_to: value[8] ? new Date(value[8]) : "",
                status: value[9],
              };
             });
             setSelectedFile(filterJsonData);
        // setSelectedFile((prev) => ({
        //   ...prev,
        // }));
        handleViewData(filterJsonData);
      };
    fileReader.readAsArrayBuffer(file);
  };

  const handleUploadAccessorys = () => {
    if (newAccessorys.length < 1) {
      notifyError("Please upload/select csv file first!");
    } else {
      // notifySuccess('CRUD operation disable for demo!');
      AccessoryServices.addAllAccessorys(newAccessorys)
        .then((res) => {
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  };

  const handleViewData = (selectedFile) => {
    if (selectedFile.length > 0) {
      setLoading(true);
      let accessoryDataValidation
      try {
          accessoryDataValidation = selectedFile.map((value) => {
          const ajv = new Ajv();
          AjvFormats(ajv);
          value.valid_from = value.valid_from ? value.valid_from.toISOString() : "";
          value.valid_to = value.valid_to ? value.valid_to.toISOString() : "";
          console.log( ajv.validate(schema, value))
          return ajv.validate(schema, value)
        });
        }
      catch (e) {
        setLoading(false);
        setSelectedFileData([]);
        notifyError("Vui lòng nhập dữ liệu hợp lệ!");
      }
      const isBelowThreshold = (currentValue) => currentValue === true;
      const validationData = accessoryDataValidation.every(isBelowThreshold);
      let check = false;
      for (const file of selectedFile) {
        if (file.check == "DUPLICATE" || file.check == "INVALID") check = true;
      }
      if (validationData) {
        setSelectedFileData(selectedFile);
        setCheck(check);
        setLoading(false);
      } else {
        setLoading(false);
        setSelectedFileData([]);
        notifyError("Vui lòng nhập dữ liệu hợp lệ!");
      }
    } else {
      setLoading(false);
      setSelectedFileData([]);
      notifyError("Vui lòng chọn tệp json, csv & xls hợp lệ!");
    }
  };

  const handleUploadMultiple = (data) => {
    data.filename = filename;
    if (selectedFile.length > 0) {
        setLoading(false);
        AccessoryServices.addAll({data, selectedFile})
          .then((res) => {
            setIsUpdate(true);
            setLoading(false);
            notifySuccess(res.message);
            setSelectedFileData([])
          })
          .catch((err) => {
            setLoading(false);
            notifyError(err.response.data.message);
          });
      } else {
        setLoading(false);
        notifyError("Please enter valid data!");
      }
  };

  const handleRemoveSelectFile = (e) => {
    // console.log('remove');
    setFileName("");
    setLoading(false);
    setCheck(true);
    setSelectedFileData([]);
    setTimeout(() => setIsDisable(false), 1000);
  };

  return {
    data,
    selectedFileData,
    filename,
    isDisabled,
    handleSelectFile,
    check,
    serviceData,
    handleOnDrop,
    handleUploadAccessorys,
    handleRemoveSelectFile,
    handleUploadMultiple,
    handleViewData,
  };
};

export default useAccessoryFilter;
