import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import JobServices from "../services/JobServices";
import { useTranslation } from "react-i18next";
import { data } from "autoprefixer";
import {
  formatStringToNumber,
  hasFormatNumber,
} from "@/helper/fomatNum.helper";
const useJobSubmit = (id, current) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [status, setStatus] = useState("DRAFT");
  const [dataClient, setDataClient] = useState({});
  const [dataContract, setDataContract] = useState({});
  const [files, setFiles] = useState([]);
  const {
    isDrawerOpen,
    closeDrawer,
    isUpdate,
    setIsUpdate,
    closeAdminFixConfirmModal,
    closeAddAccessoryModal,
  } = useContext(SidebarContext);
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [listAccessory, setListAccessory] = useState([]);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (id) {
      JobServices.getById(id)
        .then((res) => {
          if (res) {
            console.log("🚀 ~ .then ~ res:", res);
            setFiles(res?.data?.files);
            setDataClient(res?.data?.client[0]);
            setDataContract(res?.data?.policy[0]);
            setStatus(res?.data?.status || "DRAFT");

            Object.keys(res?.data ?? {}).forEach((e) => {
              if (res?.data?.client_id)
                setValue("client_id", res?.data?.client_id?._id);
              if (res?.data?.policy_id)
                setValue("policy_id", res?.data?.policy_id?._id);
              if (res?.data?.device_effective_start_date)
                setValue(
                  "device_effective_start_date",
                  dayjs(res?.data?.device_effective_start_date).format(
                    "YYYY-MM-DD"
                  )
                );
              if (res?.data?.device_effective_end_date)
                setValue(
                  "device_effective_end_date",
                  dayjs(res?.data?.device_effective_end_date).format(
                    "YYYY-MM-DD"
                  )
                );
              if (res?.data?.damaged_date)
                setValue(
                  "damaged_date",
                  dayjs(res?.data?.damaged_date).format("YYYY-MM-DD")
                );
              if (res?.data?.device_cost_vat)
                setValue("device_cost_vat", res?.data?.device_cost_vat);
              if (res?.data?.employee_cost_vat)
                setValue("employee_cost_vat", res?.data?.employee_cost_vat);
              if (res?.data?.transport_cost_vat)
                setValue("transport_cost_vat", res?.data?.transport_cost_vat);
              if (res?.data?.accessory_list || res?.data?.accessory_other)
                setListAccessory(
                  res?.data?.accessory_list.concat(res?.data?.accessory_other)
                );
              if (res?.data?.overall_cost)
                setValue(
                  "overall_cost",
                  hasFormatNumber(
                    formatStringToNumber(res?.data?.device_cost_vat) +
                      formatStringToNumber(res?.data?.employee_cost_vat) +
                      formatStringToNumber(res?.data?.transport_cost_vat)
                  )
                );
              setValue(e, res?.data[e]);
            });
          }
        })
        .catch((err) => {
          console.error(err);
          notifyError(t("Lỗi từ máy chủ!"));
        });
    }
  }, [id]);

  const handleUpdateJob = (func, listAccessory) => (data) => {
    console.log("🚀 ~ useJobSubmit ~ listAccessory:", listAccessory);
    if (listAccessory && listAccessory?.length === 0) {
      notifyError(t("Vui lòng thêm phụ kiện!"));
      return;
    }
    if (listAccessory && listAccessory.length > 0) {
      const accessory_list = listAccessory
        .filter((obj) => obj.type === "accessory")
        .map((e) => ({ _id: e._id, quantity: e.quantity, type: e.type }));
      const accessory_other = listAccessory.filter(
        (obj) => obj.type !== "accessory"
      );
      data = {
        ...data,
        accessory_list: accessory_list,
        accessory_other: accessory_other,
      };
    }

    // const formData = new FormData();
    // for (const file of files) formData.append("files[]", file);

    // formData.append("client_id", dataClient._id);
    // formData.append("policy_id", dataContract._id);
    // formData.append("status", "DRAFT");
    // Object.keys(data).forEach((e) => {
    //   console.log(e);
    //   if (
    //     e !== "client_id" &&
    //     e !== "contract_id" &&
    //     e !== "status" &&
    //     e !== "accessory_list" &&
    //     e !== "policy_id"
    //   )
    //     formData.append(e, data[e]);
    // });
    try {
      if (id) {
        JobServices.updateOne(id, data)
          .then((res) => {
            console.log(res);
            setIsUpdate(true);
            if (res.success) {
              notifySuccess(res.message);
            } else {
              notifyError(res.message);
            }
            reset();
            func();
          })
          .catch((err) => {
            notifyError(err.message);
          });
      }
    } catch (err) {
      console.err(err);
    }
  };

  const handlePublish = (func, status) => (data) => {
    const dataPublic = {
      ...data,
      status: status,
    };

    const formData = new FormData();
    // for (const file of files) formData.append("files[]", file);
    formData.append("status", status);
    formData.append("client_id", dataClient._id);
    formData.append("policy_id", dataContract._id);
    Object.keys(data).forEach((e) => {
      if (
        e !== "client_id" &&
        e !== "contract_id" &&
        e !== "policy_id" &&
        e !== "status"
      )
        formData.append(e, data[e]);
    });

    try {
      if (id) {
        JobServices.updateToPublic(id, dataPublic)
          .then((res) => {
            console.log(res);
            setIsUpdate(true);
            // notifySuccess(t("Cập nhật dữ liệu thành công!"));
            reset();
            func();
          })
          .catch((err) => {
            notifyError(err.message);
          });
      } else {
        JobServices.addOne(formData)
          .then((res) => {
            console.log("🚀 ~ .then ~ res:", res);
            setIsUpdate(true);
            notifySuccess(res.message);
            func();
          })
          .catch((err) => {
            notifyError(err.message);
          });
      }
    } catch (err) {
      console.err(err);
    }
  };
  const handleConfirm = (func, status) => (data) => {
    const dataPublic = {
      ...data,
      status: status,
    };
    console.log("🚀 ~ handleConfirm ~ dataPublic:", dataPublic);

    try {
      if (id) {
        JobServices.updateOne(id, dataPublic)
          .then((res) => {
            console.log(res);
            setIsUpdate(true);
            notifySuccess(t("Cập nhật dữ liệu thành công!"));
            reset();
            func();
          })
          .catch((err) => {
            notifyError(err.message);
          });
        closeAdminFixConfirmModal();
      }
    } catch (err) {
      console.err(err);
    }
  };

  return {
    watch,
    control,
    register,
    handleSubmit,
    isSubmitting,
    handlePublish,
    errors,
    dataClient,
    setDataClient,
    dataContract,
    setDataContract,
    status,
    setStatus,
    setValue,
    getValues,
    files,
    setFiles,
    totalPrice,
    setTotalPrice,
    handleUpdateJob,
    handleConfirm,
    listAccessory,
    setListAccessory,
  };
};

export default useJobSubmit;
