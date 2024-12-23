import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { useLocation } from 'react-router';
import { AdminContext } from '../context/AdminContext';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';
import RetailerServices from '../services/RetailerServices';
import { useTranslation } from "react-i18next";

const useRetailerSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
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
      const retailerData = {
        name: data.name,
        code: data.code,
        phone: data.phone,
        email: data.email,
        city: data.city.split(",")[0],
        district: data.district.split(",")[0],
        ward: data.ward.split(",")[0],
        detail: data.detail,
        status: data.status || "hide",
        representative: data.representative,
        brand_id: data.brand_id,
        category: getValues("category")?.map((e) => e.value),
        group_category: data.group_category,
      };
      if (id) {
        RetailerServices.updateOne(id, retailerData)
          .then((res) => {
            setIsUpdate(true);
            setValue('status', "hide");
            notifySuccess(t('Cập nhật dữ liệu thành công!'));
            reset();
          })
          .catch((err) => {
            notifyError(err.message);
          });
      closeDrawer();
    } else {
      RetailerServices.addOne(retailerData)
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
      console.log(err)
     } finally {
      setIsSubmitting(false);
     }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
     setValue('name');
     setValue('code');
     setValue('phone');
      setValue('email');
      setValue('city');
      setValue('district');
      setValue('ward');
      setValue('brand_id');
      setValue('status');
      setValue('detail');
      setValue('representative');
      setValue('address');
      setValue('group_category');
      clearErrors('address')
      clearErrors('name');
      clearErrors('code');
      clearErrors('phone');
      clearErrors('email');
      clearErrors('city');
      clearErrors('district');
      clearErrors('ward');
      clearErrors('detail');
      clearErrors('brand_id');
      clearErrors('representative');
      clearErrors('category');
      clearErrors('group_category');


      return;
    }
    if (id) {
      RetailerServices.getById(id)
        .then((res) => {
          if (res) {
            setValue('name', res?.data?.name);
            setValue('code', res?.data?.code);
            setValue('phone', res?.data?.phone);
            setValue('email', res?.data?.email);
            setValue('city', [res?.data?.city?._id, res?.data?.city?.code, res?.data?.city?.name].toString());
            setValue('district', [res?.data?.district?._id, res?.data?.district?.code, res?.data?.district?.name].toString());
            setValue('ward', [res?.data?.ward?._id, res?.data?.ward?.code, res?.data?.ward?.name].toString());
            setValue('detail', res?.data?.detail);
            setValue('address', res?.data?.address);
            setValue('status', res?.data?.status);
            setValue('representative', res?.data?.representative);
            setValue('brand_id', res?.data?.brand_id);
            setValue("category", res?.data?.category?.map((e) => ({value: e["_id"], label: e["name"]})));
            setValue('group_category', res?.data?.group_category);

          }
        })
        .catch((err) => {
          console.error(err)
          notifyError(t('Lỗi từ máy chủ!'));
        });
    }
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  return {
    register,
    handleSubmit,
    isSubmitting,
    onSubmit,
    selectedCategory,
    setSelectedCategory,
    errors,
    getValues,
    setValue,
    watch,
    control,
  };
};

export default useRetailerSubmit;
