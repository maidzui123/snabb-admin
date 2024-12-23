import axios from "axios";
// import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";

const useAsync = (asyncFunction, dependencies=[]) => {
  const [data, setData] = useState([] || {});
  const [permissions, setPermission] = useState([] || {});

  const [error, setError] = useState("");
  // const [errCode, setErrCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [permissionLoading, setPermissionLoading] = useState(true);

  const {
    isUpdate,
    setIsUpdate,
    currentPage,
    currentHistoryPage,
    category,
    searchText,
    invoice,
    status,
    zone,
    time,
    sortedField,
    source,
    limitData,
    startDate,
    endDate,
    isRerender,
  } = useContext(SidebarContext);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();
    (async () => {
      try {
        const res = await asyncFunction({ cancelToken: source.token });
        if (!unmounted) {
          setData(res);
          setPermission(res);
          setError("");
          setLoading(false);
          setPermissionLoading(false);
        }
      } catch (err) {
        if (!unmounted) {
          setError(err.message);
          if (axios.isCancel(err)) {
            setError(err.message);
            setLoading(false);
            setPermissionLoading(false);
            setData([]);
            setPermission([]);
          } else {
            setError(err.message);
            setLoading(false);
            setPermissionLoading(false);
            setData([]);
            setPermission([]);
          }
        }
      }
    })();

    setIsUpdate(false);

    return () => {
      unmounted = true;
      source.cancel("Cancelled in cleanup");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isUpdate,
    currentPage,
    currentHistoryPage,
    category,
    searchText,
    invoice,
    status,
    zone,
    time,
    sortedField,
    source,
    limitData,
    startDate,
    endDate,
    isRerender,
    ...dependencies,
  ]);

  return {
    data,
    error,
    loading,
    permissions,
    permissionLoading,
  };
};

export default useAsync;
