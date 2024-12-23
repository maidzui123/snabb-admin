import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import ProductServices from "../services/ProductServices";
import { useTranslation } from "react-i18next";
import adminData from "@/utils/staff";
import { set } from "immutable";

const useProductSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [selectedDate2, setSelectedDate2] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [selectedWarrantyPeriod, setSelectedWarrantyPeriod] = useState(
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
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      setIsSubmitting(true);
      const productData = {
        name: data.name,
        desc: data.desc,
        effective_date_start: dayjs(new Date(getValues("effective_date_start"))),
        effective_date_end: dayjs(new Date(getValues("effective_date_end"))),
        program_id: data.program_id,
        provider_id: data.provider_id,
        industry_id: data?.industry_id,
        category: getValues("category")?.map((e) => e.value),
        warranty_period:{ warranty_period_number: data?.warranty_period_number, warranty_period_select: data?.warranty_period_select},
        insured: data.insured,
        coverage: data.coverage,
        insurance_benefits: data.insurance_benefits,
        deductible: data.deductible,
        insurance_amount: data.insurance_amount,
        insurance_premium: data.insurance_premium,
        insurance_rules: data.insurance_rules,
        cancellation_period: data.cancellation_period,
        settlement_period: data.settlement_period,
        approval_limit: data.approval_limit,
        status: data.status,
        other: data.other,
      };
      if (id) {
        ProductServices.updateOne(id, productData)
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
        ProductServices.addOne(productData)
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
      //setSelectedDate(dayjs(new Date()).format("YYYY-MM-DD"));
      //setSelectedDate2(dayjs(new Date()).format("YYYY-MM-DD"));
      setValue("created_by")
      setValue("name");
      setValue("desc");
      setValue("effective_date_start");
      setValue("effective_date_end");
      setValue("program_id");
      setValue("provider_id");
      setValue("industry_id");
      setValue("category");
      setValue("insured");
      setValue("warranty_period");
      setValue("warranty_period_number");
      setValue("warranty_period_select");
      setValue("coverage");
      setValue("insurance_benefits");
      setValue("deductible");
      setValue("insurance_amount");
      setValue("insurance_premium");
      setValue("insurance_rules");
      setValue("cancellation_period");
      setValue("settlement_period");
      setValue("approval_limit");
      setValue("status");
      setValue("other");
      clearErrors("name");
      clearErrors("desc");
      clearErrors("effective_date_start");
      clearErrors("effective_date_end");
      clearErrors("program_id");
      clearErrors("provider_id");
      clearErrors("category");
      clearErrors("insured");
      clearErrors("coverage");
      clearErrors("insurance_benefits");
      clearErrors("deductible");
      clearErrors("insurance_amount");
      clearErrors("warranty_period");
      clearErrors("warranty_period_number");
      clearErrors("warranty_period_select");
      clearErrors("insurance_premium");
      clearErrors("insurance_rules");
      clearErrors("cancellation_period");
      clearErrors("settlement_period");
      clearErrors("approval_limit");
      clearErrors("status");
      clearErrors("other");
      return;
    }
    if (id) {
      ProductServices.getById(id)
        .then((res) => {
          console.log("🚀 ~ .then ~ res:", res)
          if (res) {
            setValue("name", res?.data?.name);
            setValue("desc", res?.data?.desc);
            setValue("created_by", res?.data?.created_by);

          //  set selected date including hours, minutes,
          // setSelectedDate(
          //   dayjs(new Date(res?.data?.effective_date_start)).format("YYYY-MM-DD")
          // );
          setValue("effective_date_end", dayjs(new Date(res?.data?.effective_date_end)).format("YYYY-MM-DD"));
          setValue("effective_date_start", dayjs(new Date(res?.data?.effective_date_start)).format("YYYY-MM-DD"));
          
          // setSelectedDate2(
          //   dayjs(new Date(res?.data?.effective_date_end)).format("YYYY-MM-DD")
          // );
            setValue("program_id", res?.data?.program_id);
            setValue("industry_id", res?.data?.industry_id);
            setValue("provider_id", res?.data?.provider_id);
            setValue(
              "category",
              res?.data?.category?.map((e) => ({
                value: e["_id"],
                label: e["name"],
              }))
            );
            setValue("warranty_period_number", res?.data?.warranty_period?.warranty_period_number);
            setValue("warranty_period_select", res?.data?.warranty_period?.warranty_period_select);
            setValue("insured", res?.data?.insured);
            setValue("coverage", res?.data?.coverage);
            setValue("insurance_benefits", res?.data?.insurance_benefits);
            setValue("deductible", res?.data?.deductible);
            setValue("insurance_amount", res?.data?.insurance_amount);
            setValue("insurance_premium", res?.data?.insurance_premium);
            setValue("insurance_rules", res?.data?.insurance_rules);
            setValue("cancellation_period", res?.data?.cancellation_period);
            setValue("settlement_period", res?.data?.settlement_period);
            setValue("approval_limit", res?.data?.approval_limit);
            setValue("other", res?.data?.other);
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
    onSubmit,
    selectedDate,
    setSelectedDate,
    selectedDate2,
    setSelectedDate2,
    selectedWarrantyPeriod,
    setSelectedWarrantyPeriod,
    control,
    errors,
    setValue,
    getValues
  };
};

export default useProductSubmit;
