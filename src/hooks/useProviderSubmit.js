import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import ProviderServices from "../services/ProviderServices";
import { useTranslation } from "react-i18next";

const useProviderSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      setIsSubmitting(true);
      const providerData = {
        name: data.name,
        code: data.code,
        phone: data.phone,
        email: data.email,
        city: data.city.split(",")[0],
        district: data.district.split(",")[0],
        ward: data.ward.split(",")[0],
        detail: data.detail,
        program_id: data.program_id,
        status: data.status || "hide",
        category: getValues("category")?.map((e) => e.value),
        group_category: data.group_category,
      };

      if (id) {
        ProviderServices.updateOne(id, providerData)
          .then((res) => {
            setIsUpdate(true);
            console.log(
              "🚀 ~ file: useProviderSubmit.js:53 ~ onSubmit ~ providerData:",
              providerData
            );
            notifySuccess(t("Cập nhật dữ liệu thành công!"));
            reset();
          })
          .catch((err) => {
            notifyError(err.message);
          });
        closeDrawer();
      } else {
        ProviderServices.addOne(providerData)
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
      setValue("phone");
      setValue("email");
      setValue("city");
      setValue("district");
      setValue("ward");
      setValue("detail");
      setValue("address");
      setValue("program_id");
      setValue("category");
      setValue("group_category");
      setValue("status");
      setValue(
        "setting",
        `{
        
}`
      );
      setValue("whitelist_ip");
      setValue("email_list");
      clearErrors("name");
      clearErrors("code");
      clearErrors("phone");
      clearErrors("email");
      clearErrors("city");
      clearErrors("district");
      clearErrors("ward");
      clearErrors("detail");
      clearErrors("program_id");
      clearErrors("category");
      clearErrors("group_category");
      return;
    }
    if (id) {
      ProviderServices.getById(id)
        .then((res) => {
          if (res) {
            console.log("🚀 ~ file: useProviderSubmit.js:122 ~ .then ~ res:", res)
            
            setValue("name", res?.data?.name);
            setValue("code", res?.data?.code);
            setValue("phone", res?.data?.phone);
            setValue("email", res?.data?.email);
            setValue(
              "city",
              [
                res?.data?.city?._id,
                res?.data?.city?.code,
                res?.data?.city?.name,
              ].toString()
            );
            setValue(
              "district",
              [
                res?.data?.district?._id,
                res?.data?.district?.code,
                res?.data?.district?.name,
              ].toString()
            );
            setValue(
              "ward",
              [
                res?.data?.ward?._id,
                res?.data?.ward?.code,
                res?.data?.ward?.name,
              ].toString()
            );
            setValue("detail", res?.data?.detail);
            setValue("address", res?.data?.address);
            setValue("status", res?.data?.status);
            setValue("program_id", res?.data?.program_id);
            setValue(
              "category",
              res?.data?.category?.map((e) => ({
                value: e["_id"],
                label: e["name"],
              }))
            );
            setValue("whitelist_ip", res?.data?.whitelist_ip);
            setValue("email_list", res?.data?.email_list);
            setValue(
              "setting",
              res?.data?.setting?.toString() ||
                `{
        
}`
            );
            setValue("group_category", res?.data?.group_category);
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
    getValues,
    watch,
    setValue,
  };
};

export default useProviderSubmit;
