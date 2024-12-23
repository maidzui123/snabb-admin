import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import { useDispatch } from "react-redux";
import { setPermissions } from "@/store/actions";
import RoleServices from "../services/RoleServices";
import { useTranslation } from "react-i18next";
import useAsync from "./useAsync";
import PermissionServices from "../services/PermissionServices";
import { store } from "@/store/store";

const useRoleSubmit = (id) => {
  const [tapValue, setTapvalue] = useState("role");
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectall, setselectall] = useState("");
  const [selectType, setselectType] = useState("");
  const [rolehaspermit, setRolehaspermit] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const dispatchRedux = useDispatch();
  const getPermissionsByRoles = async () => {
    try {
      const resp = await RoleServices.getPermissionsByRoles(
        state?.adminInfo?._id
      );
      if (resp) {
        dispatchRedux(setPermissions(resp.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = (data) => {
    const role_permit = {
      name: data?.name,
      type: selectType,
      role_id: id || undefined,
      description: data?.description,
      roleHasPermit: rolehaspermit,
    };
    try {
      setIsSubmitting(true);
      if (id) {
        RoleServices.upsert(role_permit)
          .then((res) => {
            setIsUpdate(true);
            getPermissionsByRoles();
            notifySuccess(t("Cập nhật dữ liệu thành công!"));
            reset();
          })
          .catch((err) => {
            notifyError(err.message);
          });
        closeDrawer();
      } else {
        RoleServices.upsert(role_permit)
          .then((res) => {
            setIsUpdate(true);
            getPermissionsByRoles();
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
      setValue("name");
      setValue("description");
      setselectType("");
      setRolehaspermit([]);
      reset();
      clearErrors("name");
      clearErrors("description");
      clearErrors("type");
      return;
    }
    if (id) {
      RoleServices.getById(id)
        .then((res) => {
          if (res) {
            setValue("name", res?.name?.name);
            setValue("description", res?.name?.description);
            setselectType(res?.name?.type);
            res?.data?.map((item) => {
              item.rolehaspermissions?.map((rolehaspermission) => {
                setValue(rolehaspermission?.code, rolehaspermission?.status);
                handleSelectPermit(
                  rolehaspermission?.status,
                  rolehaspermission?.permit_id,
                  rolehaspermission?.code
                );
              });
              //setValue(item?.code, item.status);
            });
          }
        })
        .catch((err) => {
          console.error(err);
          notifyError(t("Lỗi từ máy chủ!"));
        });
    }
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);
  const handleProductTap = (e, value) => {
    setTapvalue(e);
    return;
  };

  const handleSelectPermit = (status, permit_id, code) => {
    setRolehaspermit((prevState) => [
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
    setValue,
    selectall,
    handleSelectAll,
    setRolehaspermit,
    rolehaspermit,
    setIsSubmitting,
    handleSelectPermit,
    register,
    handleProductTap,
    tapValue,
    handleSubmit,
    isSubmitting,
    onSubmit,
    errors,
    selectType,
    setselectType,
    getValues,
    watch,
  };
};

export default useRoleSubmit;
