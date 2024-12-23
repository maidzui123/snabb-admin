import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";

//internal import
import { AdminContext } from "@/context/AdminContext";
import AdminServices from "@/services/AdminServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useDispatch } from "react-redux";
import { setAuth, setPermissions } from "@/store/actions";
import useOneSignal from "./useOneSignal";
const useLoginSubmit = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const onesignal = useOneSignal();

  const dispatchRedux = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, email, verifyEmail, password, role }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;
    if (location.pathname === "/login") {
      AdminServices.loginAdmin({
        email,
        password,
        one_signal_id: onesignal?.oneSignalId,
      })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess("Đăng nhập thành công!");
            const { permissions, ...rest } = res;
            dispatch({ type: "USER_LOGIN", payload: rest });
            dispatchRedux(setAuth(rest));
            dispatchRedux(setPermissions(permissions));
            Cookies.set("adminInfo", JSON.stringify(rest), {
              expires: cookieTimeOut,
              sameSite: "None",
              secure: true,
            });
            history.replace("/dashboard");
            // setLoading(true);
            // window.location.reload();
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }

    if (location.pathname === "/signup") {
      AdminServices.registerAdmin({ name, email, password, role })
        .then((res) => {
          if (res) {
            setLoading(false);
            notifySuccess("Register Success!");
            dispatch({ type: "USER_LOGIN", payload: res });
            Cookies.set("adminInfo", JSON.stringify(res), {
              expires: cookieTimeOut,
              sameSite: "None",
              secure: true,
            });
            history.push("/");
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }

    if (location.pathname === "/forgot-password") {
      AdminServices.forgetPassword({ verifyEmail })
        .then((res) => {
          setLoading(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
        });
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
    setValue,
  };
};

export default useLoginSubmit;
