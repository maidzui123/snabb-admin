import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import AccessoryServices from "../services/AccessoryServices";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { hasFormatNumber } from "@/helper/fomatNum.helper";

const useAccessorySubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate1, setSelectedDate1] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [selectedDate2, setSelectedDate2] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
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
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      setIsSubmitting(true);
      const accessoryData = {
        name: data.name,
        code: data.code,
        desc: data.desc,
        price: data.price,
        VAT: data.VAT,
        unit: data.unit,
        valid_from: selectedDate1
          ? selectedDate1
          : dayjs(new Date()).format("YYYY-MM-DD"),
        valid_to: selectedDate2
          ? selectedDate2
          : dayjs(new Date()).format("YYYY-MM-DD"),
        product_id: data.product_id,
        agency_id: data.agency_id,
        status: data.status || "INSTOCK",
        category: getValues("category")?.map((e) => e.value),
      };
      if (id) {
        AccessoryServices.updateOne(id, accessoryData)
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
        AccessoryServices.addOne(accessoryData)
          .then((res) => {
            setIsUpdate(true);
            if (res.success) {
            notifySuccess(res.message);
            } else {
            notifyError(res.message);
            }
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
      setSelectedDate1(dayjs(new Date()).format("YYYY-MM-DD"));
      setSelectedDate2(dayjs(new Date()).format("YYYY-MM-DD"));
      setValue("name");
      setValue("desc");
      setValue("code");
      setValue("price");
      setValue("VAT");
      setValue("unit");
      setValue("valid_from");
      setValue("valid_to");
      setValue("status");
      setValue("product_id");
      setValue("agency_id");
      setValue("category");
      clearErrors("name");
      clearErrors("desc");
      clearErrors("code");
      clearErrors("price");
      clearErrors("VAT");
      clearErrors("valid_from");
      clearErrors("status");
      clearErrors("product_id");
      clearErrors("agency_id");
      clearErrors("category");
      return;
    }
    if (id) {
      AccessoryServices.getById(id)
        .then((res) => {
          if (res) {
            setValue("name", res?.data?.name);
            setValue("desc", res?.data?.desc);
            setValue("code", res?.data?.code);
            setValue("price", hasFormatNumber(res?.data?.price));
            setValue("VAT", res?.data?.VAT);
            setValue("unit", res?.data?.unit);
            //setValue('valid_from', res?.data?.valid_from);
            setSelectedDate1(dayjs(res?.data?.valid_from).format("YYYY-MM-DD"));
            setSelectedDate2(dayjs(res?.data?.valid_to).format("YYYY-MM-DD"));
            setValue("status", res?.data?.status);
            setValue("product_id", res?.data?.product_id);
            setValue("agency_id", res?.data?.agency_id);
            setValue(
              "category",
              res?.data?.category?.map((e) => ({
                value: e["_id"],
                label: e["name"],
              }))
            );
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
    selectedDate1,
    selectedDate2,
    setSelectedDate1,
    setSelectedDate2,
    onSubmit,
    getValues,
    setValue,
    control,
    errors,
  };
};

export default useAccessorySubmit;
