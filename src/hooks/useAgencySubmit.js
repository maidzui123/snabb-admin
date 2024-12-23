import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import AgencyServices from "../services/AgencyServices";
import { useTranslation } from "react-i18next";

const useAgencySubmit = (id) => {
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
      const agencyData = {
        name: data.name,
        code: data.code,
        license_number: data.license_number,
        phone: data.phone,
        email: data.email,
        desc: data.desc,
        city: data.city.split(",")[0],
        district: data.district.split(",")[0],
        ward: data.ward.split(",")[0],
        detail: data.detail,
        category: getValues("category")?.map((e) => e.value),
        status: data.status,
        group_category: data.group_category,
      };
      if (id) {
        AgencyServices.updateOne(id, agencyData)
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
        AgencyServices.addOne(agencyData)
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
      setValue("phone");
      setValue("city");
      setValue("district");
      setValue("ward");
      setValue("address");
      setValue("category");
      setValue("group_category");
      setValue("address");
      setValue("email");
      setValue("license_number");
      setValue("status");
      reset();
      clearErrors("name");
      clearErrors("phone");
      clearErrors("city");
      clearErrors("district");
      clearErrors("ward");
      clearErrors("address");
      clearErrors("category");
      clearErrors("group_category");
      return;
    }
    if (id) {
      AgencyServices.getById(id)
        .then((res) => {
          setValue("name", res?.data?.name);
          setValue("license_number", res?.data?.license_number);
          setValue("phone", res?.data?.phone);
          setValue("email", res?.data?.email);
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
          setValue("address", res?.data?.address);
          setValue(
            "category",
            res?.data?.category?.map((e) => ({
              value: e["_id"],
              label: e["name"],
            }))
          );
          setValue("status", res?.data?.status);
          setValue("group_category", res?.data?.group_category);
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
    watch,
    errors,
    control,
    getValues,
    setValue,
  };
};

export default useAgencySubmit;
