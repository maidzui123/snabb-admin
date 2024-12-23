import { toast } from "react-toastify";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

const notifySuccess = (message) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    draggable: true,
    progress: undefined,
  });

const notifyError = (message) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    pauseOnFocusLoss: false,
    draggable: true,
    progress: undefined,
  });
const notifyPromise = (promise) =>promise
  // toast.promise(promise, {
  //   error: {
  //     render() {
  //       return "Có lỗi xảy ra!";
  //     },
  //     position: "top-center",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //     pauseOnFocusLoss: false,
  //   },
  //   pending: {
  //     render() {
  //       return "Đang tải...";
  //     },
  //     position: "top-center",
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //   },
  //   success: {
  //     render() {
  //       return "Tải dữ liệu thành công";
  //     },
  //     position: "top-center",
  //     autoClose: 3000,
  //     pauseOnFocusLoss: false,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: true,
  //     progress: undefined,
  //   },
  // });

export { notifySuccess, notifyError, notifyPromise };
