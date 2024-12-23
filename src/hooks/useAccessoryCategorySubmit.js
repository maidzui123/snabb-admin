import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { useLocation } from 'react-router';
import { AdminContext } from '../context/AdminContext';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';
import AccessoryCategoryServices from '../services/AccessoryCategoryServices';
import { useTranslation } from "react-i18next";

const useAccessoryCategorySubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
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
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      setIsSubmitting(true);

      if (id) {
        AccessoryCategoryServices.updateOne(id, data)
          .then((res) => {
            setIsUpdate(true);
            notifySuccess(t('Cập nhật dữ liệu thành công!'));
            reset();
          })
          .catch((err) => {
            notifyError(err.message);
          });
      closeDrawer();
    } else {
      AccessoryCategoryServices.addOne(data)
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
     setValue('desc');
     clearErrors('name');
     clearErrors('desc');
      return;
    }
    if (id) {
      AccessoryCategoryServices.getById(id)
        .then((res) => {
          if (res) {
            setValue('name', res?.data?.name);
            setValue('desc', res?.data?.desc);
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
    errors,
  };
};

export default useAccessoryCategorySubmit;
