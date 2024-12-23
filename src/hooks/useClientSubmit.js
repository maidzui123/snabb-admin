import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import ClientServices from "../services/ClientServices";
import { useTranslation } from "react-i18next";
const useClientSubmit = (id) => {
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
    getValues,
    clearErrors,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      setIsSubmitting(true);
      const clientData = {
        legal_id: data.legal_id,
        full_name: data.full_name,
        birthday: dayjs(data.birthday).format("YYYY-MM-DD"),
        phone: data.phone,
        email: data.email,
        city: data.city.split(",")[0],
        district: data.district.split(",")[0],
        ward: data.ward.split(",")[0],
        detail: data.detail,
        description: data.description,
        status: data.status,
        // category: getValues("category")?.map((e) => e.value),
      };

      if (id) {
        ClientServices.updateOne(id, clientData)
          .then((res) => {
            console.log(
              "🚀 ~ file: useClientSubmit.js:55 ~ onSubmit ~ clientData:",
              clientData
            );
            setIsUpdate(true);
            notifySuccess(t("Cập nhật dữ liệu thành công!"));
            reset();
          })
          .catch((err) => {
            notifyError(err.message);
          });
        closeDrawer();
      } else {
        ClientServices.addOne(clientData)
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
      setValue("full_name");
      setValue("legal_id");
      setValue("birthday");
      setValue("phone");
      setValue("email");
      setValue("status");
      setValue("description");
      setValue("city");
      setValue("district");
      setValue("ward");
      setValue("detail");
      clearErrors("full_name");
      clearErrors("legal_id");
      clearErrors("phone");
      clearErrors("email");
      clearErrors("address");
      clearErrors("description");
      clearErrors("city");
      clearErrors("district");
      clearErrors("ward");
      clearErrors("detail");
      clearErrors("birthday");
      clearErrors("status");
      return;
    }
    if (id) {
      ClientServices.getById(id)
        .then((res) => {
          if (res) {
            console.log(
              "🚀 ~ file: useClientSubmit.js:111 ~ .then ~ res:",
              res
            );
            setValue("full_name", res?.data?.full_name);
            setValue("legal_id", res?.data?.legal_id);
            setValue("phone", res?.data?.phone);
            setValue("email", res?.data?.email);
            // setValue("address", res?.data?.address);
            setValue("description", res?.data?.description);
            setValue("birthday", new Date(res?.data?.birthday).toISOString().split('T')[0]);
            setValue(
              "city",
              [res?.data?.city?._id, res?.data?.city?.code, res?.data?.city?.name].toString()
            );
            setValue(
              "district",
              [res?.data?.district?._id, res?.data?.district?.code, res?.data?.district?.name].toString()
            );
            setValue("ward", [res?.data?.ward?._id, res?.data?.ward?.code, res?.data?.ward?.name].toString());
            setValue("detail", res?.data?.detail);
            setValue("status", res?.data?.status);
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
    setValue,
    getValues,
    watch,
    onSubmit,
    errors,
  };
};

export default useClientSubmit;
