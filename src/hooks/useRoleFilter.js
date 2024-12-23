/* eslint-disable react-hooks/exhaustive-deps */
import Ajv from "ajv";
import csvToJson from "csvtojson";
import { useContext, useState } from "react";
import * as XLSX from "xlsx";
import { SidebarContext } from "@/context/SidebarContext";
import RoleServices from "@/services/RoleServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useForm } from "react-hook-form";
import Role from "../pages/Role";

// custom product upload validation schema
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
  },
  required: ["categories", "category", "prices", "title"],
};

const useRoleFilter = (data) => {
  const ajv = new Ajv({ allErrors: true });
  const { setLoading, setIsUpdate } = useContext(SidebarContext);

  const [selectedFile, setSelectedFile] = useState([]);
  const [filename, setFileName] = useState("");
  const [tapValue, setTapvalue] = useState("Role");
  const [isDisabled, setIsDisable] = useState(false);

  //service data filtering
  const serviceData = data;

  //  console.log('selectedFile',selectedFile)

  // const handleOnDrop = (data) => {
  //   // console.log('data', data);
  //   for (let i = 0; i < data.length; i++) {
  //     newRoless.push(data[i].data);
  //   }
  // };

  // const handleUploadRoless = () => {
  //   if (newRoless.length < 1) {
  //     notifyError("Please upload/select csv file first!");
  //   } else {
  //     // notifySuccess('CRUD operation disable for demo!');
  //     RolesServices.addAllRoless(newRoless)
  //       .then((res) => {
  //         notifySuccess(res.message);
  //       })
  //       .catch((err) => notifyError(err.message));
  //   }
  // };

  const handleSelectFile = async (e) => {
    e.preventDefault();

    const fileReader = new FileReader();
    const file = e.target?.files[0];

    if (file && file.type === "application/json") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        const text = JSON.parse(e.target.result);

        const productData = text.map((value) => {
          return {
            name: value.name,
            description: value.description,
          };
        });

        setSelectedFile(productData);
      };
    } else if (file && file.type === "text/csv") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.onload = async (event) => {
        const text = event.target.result;
        const json = await csvToJson().fromString(text);
        // console.log('json',json)
        const productData = json.map((value) => {
          return {
            name: JSON.parse(value.name),
            description: JSON.parse(value.description),
          };
        });

        setSelectedFile(productData);
      };

      fileReader.readAsText(file);
    } else {
      setFileName(file?.name);
      setIsDisable(true);

      const rABS = !!fileReader.readAsBinaryString;

      fileReader.onload = function (event) {
        /* Parse data */
        const bstr = event.target.result;
        const wb = XLSX.read(bstr, {
          type: rABS ? "binary" : "array",
          bookVBA: true,
        });
        /* Get first worksheet */
        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        /* Convert array of arrays */
        const json = XLSX.utils.sheet_to_json(ws);

        const productData = json.map((value) => {
          return {
            name: JSON.parse(value.name),
            description: JSON.parse(value.description),
          };
        });
        setSelectedFile(productData);
      };

      if (rABS) {
        fileReader.readAsBinaryString(file);
      } else {
        fileReader.readAsArrayBuffer(file);
      }
    }
  };

  const handleUploadMultiple = (e) => {
    if (selectedFile.length > 1) {
      setLoading(true);
      let productDataValidation = selectedFile.map((value) =>
        ajv.validate(schema, value)
      );

      const isBelowThreshold = (currentValue) => currentValue === true;
      const validationData = productDataValidation.every(isBelowThreshold);
      // console.log('validationdata',validationData)

      if (validationData) {
        RoleServices.addAll(selectedFile)
          .then((res) => {
            setIsUpdate(true);
            setLoading(false);
            notifySuccess(res.message);
          })
          .catch((err) => {
            setLoading(false);
            notifyError(err.message);
          });
      } else {
        setLoading(false);
        notifyError("Please enter valid data!");
      }
    } else {
      setLoading(false);
      notifyError("Please select a valid json, csv & xls file first!");
    }
  };

  const handleRemoveSelectFile = (e) => {
    // console.log('remove');
    setFileName("");
    setSelectedFile([]);
    setTimeout(() => setIsDisable(false), 1000);
  };

  const handleAddRole = async () => {
    const role = await RoleServices.addOne({ name: "vai trò mới" });
    notifySuccess(role.message);
    setIsUpdate(true);
  };

  return {
    data,
    handleAddRole,
    filename,
    isDisabled,
    tapValue,
    handleSelectFile,
    serviceData,
    // handleOnDrop,
    // handleUploadRoless,
    handleRemoveSelectFile,
    handleUploadMultiple,
  };
};

export default useRoleFilter;
