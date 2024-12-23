import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import SettingServices from "@/services/SettingServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const useSettingSubmit = (id) => {
  const { setIsUpdate } = useContext(SidebarContext);
  const [isSave, setIsSave] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //return notifyError("CRUD operation is disabled for this option!");
    try {
      setIsSubmitting(true);

      // console.log('global setting', globalSettingData);
      // return;

      if (!isSave) {
        const res = await SettingServices.updateGlobalSetting(data);
        setIsUpdate(true);
        setIsSubmitting(false);
        //window.location.reload();
        notifySuccess(res.message);
      } else {
        const res = await SettingServices.addGlobalSetting(data);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err.message);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await SettingServices.getGlobalSetting();
        // console.log("res>>>", res);
        if (res) {
          setIsSave(false);
          for (const i of Object.keys(res)) {
            setValue(i, res[i]);
          }
        }
      } catch (err) {
        notifyError(err ? err?.response?.data?.message : err.message);
      }
    })();
  }, [setValue]);

  return {
    errors,
    register,
    handleSubmit,
    onSubmit,
    isSave,
    isSubmitting,
  };
};

export default useSettingSubmit;
