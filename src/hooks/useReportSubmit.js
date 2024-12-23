import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import ReportServices from "../services/ReportServices";
import { useTranslation } from "react-i18next";
import { set } from "date-fns";
import { da } from "date-fns/locale";

const useReportSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {

      setIsSubmitting(true);
     
      if (id) {
          ReportServices.updateOne(id, data)
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
          ReportServices.addOne(data)
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
      setValue("name");
      setValue("code");
      setValue("fields");
      setValue("query");
      clearErrors("name");
      clearErrors("code");
      clearErrors("fields");
      clearErrors("query");
      reset();
      return;
    }
    if (id) {
      ReportServices.getById(id)
        .then((res) => {
          if (res) {
            setValue("name", res?.data?.name);
            setValue("code", res?.data?.code);
            setValue("fields", res?.data?.fields);
            setValue("query", res?.data?.query);
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
    handleSubmit,
    isSubmitting,
    onSubmit,
    errors,
    control,
  };
};

export default useReportSubmit;
