import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import PolicyServices from "../services/PolicyServices";
import { useTranslation } from "react-i18next";
import { da } from "date-fns/locale";
import { set } from "immutable";

const usePolicySubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
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
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      setIsSubmitting(true);
      const policyData = {
        policy_code: data.policy_code,
        code: data.code,
        client_name: data.client_name,
        client_legal_id: data.client_legal_id,
        client_birthday: dayjs(data.client_birthday).format("YYYY-MM-DD"),
        client_phone: data.client_phone,
        client_email: data.client_email,
        client_address: data.client_address,
        insurance_provider_code: data.insurance_provider_code,
        insurance_product_code: data.insurance_product_code,
        insurance_premium: data.insurance_premium,
        start_time: dayjs(data.start_time).format("YYYY-MM-DD"),
        end_time: dayjs(data.end_time).format("YYYY-MM-DD"),
        device_name: data.device_name,
        device_type: data.device_type,
        device_imei: data.device_imei,
        device_brand: data.device_brand,
        device_serial_number: data.device_serial_number,
        device_model: data.device_model,
      };
      if (id) {
        PolicyServices.updateOne(id, policyData)
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
        PolicyServices.addOne(policyData)
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
      setValue("policy_code");
      setValue("code");
      setValue("client_name");
      setValue("client_legal_id");
      setValue("client_birthday");
      setValue("client_phone");
      setValue("client_email");
      setValue("client_address");
      setValue("insurance_provider_code");
      setValue("insurance_product_code");
      setValue("insurance_premium");
      setValue("start_time");
      setValue("end_time");
      setValue("device_name");
      setValue("device_type");
      setValue("device_imei");
      setValue("device_brand");
      setValue("device_serial_number");
      setValue("device_model");
      clearErrors("policy_code");
      clearErrors("code");
      clearErrors("client_name");
      clearErrors("client_legal_id");
      clearErrors("client_birthday");
      clearErrors("client_phone");
      clearErrors("client_email");
      clearErrors("client_address");
      clearErrors("insurance_provider_code");
      clearErrors("insurance_product_code");
      clearErrors("insurance_premium");
      clearErrors("start_time");
      clearErrors("end_time");
      clearErrors("device_name");
      clearErrors("device_type");
      clearErrors("device_imei");
      clearErrors("device_brand");
      clearErrors("device_serial_number");
      clearErrors("device_model");
      return;
    }
    if (id) {
      PolicyServices.getById(id)
        .then((res) => {
          if (res) {
            setValue("policy_code", res?.data?.policy_code);
            setValue("code", res?.data?.code);
            setValue("client_name", res?.data?.client_name);
            setValue("client_legal_id", res?.data?.client_legal_id);
            setValue("client_phone", res?.data?.client_phone);
            setValue("client_birthday", dayjs(res?.data?.client_birthday).format("YYYY-MM-DD"));
            setValue("client_email", res?.data?.client_email);
            setValue("client_address", res?.data?.client_address);
            setValue(
              "insurance_provider_code",
              res?.data?.insurance_provider_code
            );
            setValue(
              "insurance_product_code",
              res?.data?.insurance_product_code
            );
            setValue("insurance_premium", res?.data?.insurance_premium);
            setValue("start_time", dayjs(res?.data?.start_time).format("YYYY-MM-DD"));
            setValue("end_time", dayjs(res?.data?.end_time).format("YYYY-MM-DD"));
            setValue("device_name", res?.data?.device_name);
            setValue("device_type", res?.data?.device_type);
            setValue("device_imei", res?.data?.device_imei);
            setValue("device_brand", res?.data?.device_brand);
            setValue("device_serial_number", res?.data?.device_serial_number);
            setValue("device_model", res?.data?.device_model);
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
    getValues,
    errors,
  };
};

export default usePolicySubmit;
