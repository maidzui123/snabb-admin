import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { useLocation } from 'react-router';
import { AdminContext } from '../context/AdminContext';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';
import ProgramServices from '../services/ProgramServices';
import { useTranslation } from "react-i18next";
import { set } from 'immutable';

const useProgramSubmit = (id) => {
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
    getValues,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      setIsSubmitting(true);
      const programData = {
        name: data.name,
        desc: data.desc,
        code: data.code,
        status: data.status,
        category: getValues("category").map((e) => e.value),
      };
      if (id) {
        ProgramServices.updateOne(id, programData)
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
      ProgramServices.addOne(programData)
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
     setValue('desc');
     setValue("category");
     setValue('status');
     clearErrors('name');
     clearErrors('code');
     clearErrors('desc');
     clearErrors("category");
     clearErrors("status");
      return;
    }
    if (id) {
      ProgramServices.getById(id)
        .then((res) => {
          if (res) {
            setValue('name', res?.data?.name);
            setValue('code', res?.data?.code);
            setValue('desc', res?.data?.desc);
            setValue('status', res?.data?.status);
            setValue("category", res?.data?.category?.map((e) => ({value: e["_id"], label: e["name"]})));
            setValue('status', res?.data?.status);            
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
    control,
    setValue
  };
};

export default useProgramSubmit;
