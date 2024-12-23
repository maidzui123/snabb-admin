import React, { useState, useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

//internal import
import Main from "@/layout/Main";
import routes from "@/routes/index";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarContext } from "@/context/SidebarContext";
import ThemeSuspense from "@/components/theme/ThemeSuspense";
import { AdminContext } from "@/context/AdminContext";
import { useDispatch } from "react-redux";
import { setPermissions } from "@/store/actions";
import { notifyError, notifySuccess } from "@/utils/toast";
import RoleServices from "@/services/RoleServices";
const Page404 = lazy(() => import("@/pages/404"));
import GroupCategory from "@/pages/GroupCategory";
import { store } from "@/store/store";
import { hasPermission } from "@/helper/permission.helper";
const Layout = () => {
  const { isSidebarOpen, closeSidebar, closeDrawer, closeModal, navBar } =
    useContext(SidebarContext);
  const { state } = useContext(AdminContext);
  const dispatchRedux = useDispatch();
  let location = useLocation();
  const isOnline = navigator.onLine;
  //const [shouldRenderGroupCategory, setShouldRenderGroupCategory] = useState(false);
  const getPermissionsByRoles = async () => {
    try {
      const resp = await RoleServices.getPermissionsByRoles(
        state?.adminInfo?._id
      );
      if (resp) {
        dispatchRedux(setPermissions(resp.data));
      }
    } catch (err) {
      notifyError(err ? err.response.data.message : err.message);
    }
  };

  useEffect(() => {
    closeSidebar();
    closeDrawer();
    closeModal();
    state?.adminInfo && getPermissionsByRoles();
    // if (location.pathname === '/groupCategory') {
    //   setShouldRenderGroupCategory(true);
    // } else {
    //   setShouldRenderGroupCategory(false);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location?.pathname]);
  return (
    <>
      {!isOnline && (
        <div className="flex justify-center bg-red-600 text-white">
          You are in offline mode!{" "}
        </div>
      )}
      <div
        className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
          isSidebarOpen && "overflow-hidden"
        }`}
      >
        {navBar && <Sidebar />}

        <div className="flex flex-col flex-1 w-full">
          <Header />
          <Main>
            <Suspense fallback={<ThemeSuspense />}>
            {/* <ThemeSuspense /> */}
              <Switch>
                {routes.map((route, i) => {
                  const Component = route?.component;
                  return route.component ? (
                    // && hasPermission(route?.permission)
                    <Route
                      key={i}
                      exact={true}
                      path={`${route.path}`}
                      render={(props) => Component && <Component {...props} />}
                    />
                  ) : null;
                })}
                <Route component={Page404} />
                <Redirect exact from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </Main>
        </div>
      </div>
    </>
  );
};

export default Layout;
