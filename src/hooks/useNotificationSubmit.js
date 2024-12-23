import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import NotificationServices from "../services/NotificationServices";
import { useTranslation } from "react-i18next";

const useNotificationSubmit = () => {
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
    formState: { errors },
  } = useForm();

  const onSubmit = (id, checkRead) => {
    const newData = {
      _id: id,
    };

    try {
      setIsSubmitting(true);
      if (!checkRead) {
        NotificationServices.updateOne(id, newData)
          .then((res) => {
            console.log("🚀 ~ .then ~ res:", res)
            setIsUpdate(true);
            reset();
          })
          .catch((err) => {
            notifyError(err.message);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    register,
    handleSubmit,
    isSubmitting,
    onSubmit,
    errors,
  };
};

export default useNotificationSubmit;
