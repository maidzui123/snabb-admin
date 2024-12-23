import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import PermissionServices from "../services/PermissionServices";
import { useTranslation } from "react-i18next";
import useAsync from "./useAsync";

const usePermissionSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [values, setValues] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    value,
    clearErrors,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      setIsSubmitting(true);

      const permissionData = {
        name: data.name,
        module_id: data?.module_id,
        code: data?.code,
      };
      const permissionTransformData = permissionData?.code?.map((code) => ({
        name: permissionData?.name,
        module_id: permissionData?.module_id,
        code: code,
      }));
      if (id) {
        PermissionServices.updateOne(id, data)
          .then((res) => {
            setIsUpdate(true);
            notifySuccess(t("Cập nhật dữ liệu thành công!"));
            reset();
          })
          .catch((err) => {
            notifyError(err.message);
          });
        closeDrawer();
      } else {
      console.log(permissionTransformData);

        PermissionServices.addMany(permissionTransformData)
          .then((res) => {
            setIsUpdate(true);
            notifySuccess(res.message);
          })
          .catch((err) => {
            notifyError(err.message);
          });
        closeDrawer();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("code");
      setValue("name");
      setValue("module_id");
      clearErrors("name");
      clearErrors("module_id");
      clearErrors("code");
      return;
    }
    if (id) {
      PermissionServices.getById(id)
        .then((res) => {
          if (res) {
            setValue("name", res?.data?.name);
            setValue("module_id", res?.data?.module_id);
            setValue("code", res?.data?.code);
          }
        })
        .catch((err) => {
          console.error(err);
          notifyError(t("Lỗi từ máy chủ!"));
        });
    }
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  return {
    register,
    setValues,
    values,
    value,
    handleSubmit,
    isSubmitting,
    onSubmit,
    getValues,
    errors,
  };
};

export default usePermissionSubmit;
