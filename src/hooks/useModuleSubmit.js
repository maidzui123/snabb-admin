import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { useLocation } from 'react-router';
import { AdminContext } from '../context/AdminContext';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';
import ModuleServices from '../services/ModuleServices';
import { useTranslation } from "react-i18next";

const useModuleSubmit = (id) => {
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
        ModuleServices.updateOne(id, data)
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
      ModuleServices.addOne(data)
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
     setValue('server_url');
     setValue('client_url');
     clearErrors('name');
     clearErrors('desc');
     clearErrors('server_url');
     clearErrors('client_url');
      return;
    }
    if (id) {
      ModuleServices.getById(id)
        .then((res) => {
          if (res) {
            setValue('name', res?.data?.name);
            setValue('desc', res?.data?.desc);
            setValue('server_url', res?.data?.server_url);
            setValue('client_url', res?.data?.client_url);
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

export default useModuleSubmit;
