import axios from "axios";
// import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import { useLocation } from "react-router-dom";
import PermissionServices from "@/services/PermissionServices";
var checkPermit = true
const useCheckPermit = (string) => {
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const res = await PermissionServices.getPermission({ code: string });
        console.log("🚀 ~ file: useCheckPermit.js:18 ~ res?.data:", res?.data)

        if (res?.data) {
            
          checkPermit = true;
        } else {
            checkPermit = false;
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [location]);
  return checkPermit;
};

export default useCheckPermit;
