import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

//internal import
import { AdminContext } from "@/context/AdminContext";
import { SidebarContext } from "@/context/SidebarContext";
import AdminServices from "@/services/AdminServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { handlerTextTranslateHandler } from "@/utils/translate";
import { useDispatch } from "react-redux";
import RoleServices from "@/services/RoleServices";
import { setPermissions } from "@/store/actions";

const useStaffSubmit = (id) => {
  const [tapValue, setTapvalue] = useState("Staff");
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [language, setLanguage] = useState(lang);
  const [resData, setResData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const location = useLocation();
  const [selectall, setselectall] = useState("");
  const [adminhaspermit, setAdminhaspermit] = useState([]);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [sendMailChecked, setSendMailChecked] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const dispatchRedux = useDispatch();
  const getPermissionsByRoles = async (data) => {
    try {
      const resp = await RoleServices.getPermissionsByRoles(data);
      if (resp) {
        console.log(resp);
        dispatchRedux(setPermissions(resp.data));
      }
    } catch (err) {
      notifyError(err ? err.response.data.message : err.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const nameTranslates = await handlerTextTranslateHandler(
        data.name,
        language
      );

      const staffData = {
        admin_id: id || undefined,
        name: {
          [language]: data.name,
          ...nameTranslates,
        },
        email: data.email,
        password: data.password,
        send_mail: sendMailChecked,
        //confirm_password: data.confirm_password,
        phone: data.phone,
        role: data.role,
        role_id: getValues("role_id")?.map((e) => e.value),
        joiningData: selectedDate
          ? selectedDate
          : dayjs(new Date()).format("YYYY-MM-DD"),
        type: selectedType,
        agency_id: selectedType === "AGENCY" ? data.agency_id : undefined,
        provider_id: selectedType === "PROVIDER" ? data.provider_id : undefined,
        retailer_id: selectedType === "RETAILER" ? data.retailer_id : undefined,
        lang: language,
        adminHasPermit: adminhaspermit,
        callcenter_id: data.callcenter_id,
        status: data.status
      };

      if (id) {
        // console.log('id is ',id)
        //const res = await AdminServices.updateStaff(id, staffData);
        const res = await AdminServices.upsert({ staffData });
        setIsUpdate(true);
        setIsSubmitting(false);
        getPermissionsByRoles(staffData.role_id);
        notifySuccess(res.message);
        closeDrawer();
      } else {
        const res = await AdminServices.upsert({ staffData });
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setIsSubmitting(false);
      closeDrawer();
    }
  };

  const getStaffData = async () => {
    try {
      const res = await AdminServices.getStaffById(id, {
        email: adminInfo.email,
      });
      if (res) {
        setResData(res);
        setValue("name", res[0].name[language ? language : "en"]);
        setValue("email", res[0].email);
        setValue("password");
        setValue("phone", res[0].phone);
        setValue("role", res[0].role);
        setSelectedDate(dayjs(res[0].joiningData).format("YYYY-MM-DD"));
        setSelectedType(res[0].type);
        setValue("agency_id", res[0].agency_id ?? res.agency_id);
        setValue("provider_id", res[0].provider_id ?? res.provider_id);
        setValue("retailer_id", res[0].retailer_id ?? res.retailer_id);
        setValue(
          "role_id",
          res[0]?.roles?.map((e) => ({ value: e["_id"], label: e["name"] }))
        );
        setImageUrl(res[0].image);
        res[0]?.adminhaspermissions?.map((item) => {
          setValue(item?.code, item?.status);
          handleSelectPermit(item?.status, item?.permit_id, item?.code);

          //setValue(item?.code, item.status);
        });
        setValue("callcenter_id", res[0]?.callcenter_id);
        setValue("status", res[0]?.status);
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);

    if (Object.keys(resData).length > 0) {
      setValue("name", resData.name[lang ? lang : "en"]);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("name");
      setValue("email");
      setValue("password");
      setValue("phone");
      setValue("role");
      setValue("joiningDate");
      setSelectedDate(dayjs(new Date()).format("YYYY-MM-DD"));
      setValue("type");
      setImageUrl("");
      setAdminhaspermit([]);
      setValue("callcenter_id");
      setValue("confirm_password");
      setValue("status");
      //setGeneratedPassword("");
      setSendMailChecked(true)
      reset();
      clearErrors("name");
      clearErrors("email");
      clearErrors("confirm_password");
      clearErrors("password");
      clearErrors("phone");
      clearErrors("role");
      clearErrors("joiningDate");
      clearErrors("type");
      clearErrors("callcenter_id");
      clearErrors("status");
      setImageUrl("");
      setLanguage(lang);
      setValue("language", language);
      return;
    }
    if (id) {
      getStaffData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  const handleProductTap = (e, value) => {
    setTapvalue(e);
    return;
  };

  useEffect(() => {
    if (location.pathname === "/edit-profile" && Cookies.get("adminInfo")) {
      getStaffData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, setValue]);

  const handleSelectPermit = (status, permit_id, code) => {
    setAdminhaspermit((prevState) => [
      { status, permit_id, code },
      ...prevState.filter((e) => e?.permit_id != permit_id && e),
    ]);
  };
  const handleSelectAll = (status, data) => {
    setselectall(status);
    data?.data?.map((item) => {
      item?.permit_id?.map((value) => {
        setValue(value?.code, status);
        handleSelectPermit(status, value._id, value.code);
      });
    });
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    language,
    errors,
    setImageUrl,
    imageUrl,
    selectedDate,
    setSelectedDate,
    selectedType,
    setSelectedType,
    getValues,
    isSubmitting,
    control,
    setValue,
    tapValue,
    handleProductTap,
    handleSelectAll,
    setAdminhaspermit,
    adminhaspermit,
    handleSelectPermit,
    clearErrors,
    generatedPassword,
    setGeneratedPassword,
    sendMailChecked,
    setSendMailChecked,
  };
};

export default useStaffSubmit;
