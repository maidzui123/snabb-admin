/* eslint-disable react-hooks/exhaustive-deps */
import Ajv from "ajv";
import AjvFormats from "ajv-formats";
import csvToJson from "csvtojson";
import { useContext, useState } from "react";
import * as XLSX from "xlsx";
import { SidebarContext } from "@/context/SidebarContext";
import RetailerServices from "@/services/RetailerServices";
import { notifyError, notifySuccess } from "@/utils/toast";

// custom product upload validation schema
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    desc: { type: "string" },
    phone: { type: "string" },
    email: { type: "string" },
    address: { type: "string" },
    representative: { type: "string"},
    status: { type: "string" },
    stt: { type: "integer" },
    // check: { type: "string"}
  },
  required: [ "phone", "email", "stt", "address", "representative", "name" ],
};

const useRetailerFilter = (data) => {
  const ajv = new Ajv({ allErrors: true });
  const { setLoading, setIsUpdate } = useContext(SidebarContext);

  const [newRetailers] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [filename, setFileName] = useState("");
  const [isDisabled, setIsDisable] = useState(false);
  const [selectedFileData, setSelectedFileData] = useState([]);
  const [check, setCheck] = useState(true);

  //service data filtering
  const serviceData = data;

  //  console.log('selectedFile',selectedFile)

  const handleOnDrop = (data) => {
    // console.log('data', data);
    for (let i = 0; i < data.length; i++) {
      newRetailers.push(data[i].data);
    }
  };

  const handleUploadRetailers = () => {
    if (newRetailers.length < 1) {
      notifyError("Please upload/select csv file first!");
    } else {
      // notifySuccess('CRUD operation disable for demo!');
      RetailerServices.addAllRetailers(newRetailers)
        .then((res) => {
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
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
      const phoneNumberRegex = /^(\+84|0)\d{9,10}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      filterJsonData = jsonData
            ?.filter((value) => value.length > 5)
            ?.slice(1)
            ?.map((value, index, array) => {
              const isDuplicate = array.slice(0, index).some((row) => {
                const keyColumns = [2, 4, 5, 6];
            return keyColumns.every(
                  (colIndex) => row[colIndex] == value[colIndex]
                );
              });
              rowIndex += 1;
              return {
                check: isDuplicate
                  ? "DUPLICATE"
                  : !value[1] ||
                    !value[3] || !phoneNumberRegex.test(value[3]) ||
                    !value[4] || !emailRegex.test(value[4]) ||
                    !value[5] || 
                    !value[6] ||
                    !value[7] || (value[7] != "ACTIVE" && value[7] != "INACTIVE" ) 
                    // (value[8]?.trim() == "INACTIVE" ? false : !value[10]) ||
                    // (value[8]?.trim() == "ACTIVE" ? false : !value[11]) ||
                    // !value[12]
                  ? "INVALID"
                  : "PENDING",
                stt: value[0],
                name: value[1],
                desc: value[2] !== undefined ? value[2] : "",
                phone: value[3],
                email: value[4],
                address: value[5],
                representative: value[6],
                status: value[7],
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

  // const handleUploadMultiple = (e) => {
  //   if (selectedFile.length > 1) {
  //     setLoading(true);
  //     let productDataValidation = selectedFile.map((value) =>
  //       ajv.validate(schema, value)
  //     );

  //     const isBelowThreshold = (currentValue) => currentValue === true;
  //     const validationData = productDataValidation.every(isBelowThreshold);
  //     // console.log('validationdata',validationData)

  //     if (validationData) {
  //       RetailerServices.addAllRetailers(selectedFile)
  //         .then((res) => {
  //           setIsUpdate(true);
  //           setLoading(false);
  //           notifySuccess(res.message);
  //         })
  //         .catch((err) => {
  //           setLoading(false);
  //           notifyError(err.message);
  //         });
  //     } else {
  //       setLoading(false);
  //       notifyError("Please enter valid data!");
  //     }
  //   } else {
  //     setLoading(false);
  //     notifyError("Please select a valid json, csv & xls file first!");
  //   }
  // };

  const handleUploadMultiple = (data) => {
    data.filename = filename;
    if (selectedFile.length > 0) {
        setLoading(false);
        RetailerServices.addAll({data, selectedFile})
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

  const handleViewData = (selectedFile) => {
    if (selectedFile.length > 0) {
      setLoading(true);
      let dataValidation;
      try {
        dataValidation = selectedFile.map((value) => {
          const ajv = new Ajv();
          AjvFormats(ajv);
          return ajv.validate(schema, value)
        });
        }
      catch (e) {
        setLoading(false);
        setSelectedFileData([]);
        notifyError("Vui lòng nhập dữ liệu hợp lệ!");
      }
      const isBelowThreshold = (currentValue) => currentValue === true;
      const validationData = dataValidation.every(isBelowThreshold);
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
    filename,
    setFileName,
    setSelectedFile,
    isDisabled,
    handleSelectFile,
    serviceData,
    handleOnDrop,
    handleViewData,
    handleUploadRetailers,
    handleRemoveSelectFile,
    handleUploadMultiple,
    setSelectedFileData,
    selectedFileData,
    check,
    setCheck,
  };
};

export default useRetailerFilter;
