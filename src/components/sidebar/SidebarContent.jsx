import React, { useContext, useEffect } from "react";
import { NavLink, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Button, WindmillContext } from "@windmill/react-ui";
import { IoLogOutOutline } from "react-icons/io5";

//internal import
import sidebar from "@/routes/sidebar";
// import SidebarSubMenu from "SidebarSubMenu";
// import logoDark from "@/assets/img/logo/logo-color.png";
// import logoLight from "@/assets/img/logo/logo-dark.svg";
import logo from "@/assets/img/logo/logo-snabb.png";
// import logo from "@/assets/img/logo/logo.jpg";
import { AdminContext } from "@/context/AdminContext";
import SidebarSubMenu from "@/components/sidebar/SidebarSubMenu";
import { userLogout } from "@/store/actions";
import { useDispatch } from "react-redux";
import { SidebarContext } from "@/context/SidebarContext";
import { hasPermission } from "@/helper/permission.helper";

const SidebarContent = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  const { dispatch } = useContext(AdminContext);
  const { handleChangePage } = useContext(SidebarContext);
  const dispatchRedux = useDispatch();

  const handleLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    dispatchRedux(userLogout());
    Cookies.remove("adminInfo");
  };

  useEffect(() => {
    handleChangePage(1);
  }, [window.location.href]);

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className="text-gray-900 dark:text-gray-200" href="/dashboard">
        {/* {mode === "dark" ? (
          <img src={logoLight} alt="kachabazar" width="135" className="pl-6" />
          ) : (
            <img src={logoDark} alt="kachabazar" width="135" className="pl-6" />
            )} */}
        <img src={logo} alt="snabb" width="200" className="pl-6" />
        {/* <div className="px-6 font-bold text-3xl text-blue-700">Snabb</div> */}
      </a>
      <ul className="mt-8 mb-20">
        {sidebar?.map((route) => {
          const Icon = route?.icon;
          return route?.routes ? (
            <SidebarSubMenu route={route} key={route?.name} />
          ) : (
            <li className="relative" key={route?.name}>
              {route?.outside ? (
                <a
                  href={route?.path}
                  target="_blank"
                  className="px-6 py-4 inline-flex items-center cursor-pointer w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-700 dark:hover:text-gray-200"
                  rel="noreferrer"
                >
                  <Route path={route?.path} exact={route?.exact}>
                    <span
                      className="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                      aria-hidden="true"
                    ></span>
                  </Route>
                  {route?.icon && (
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  )}
                  <span className="ml-4">{t(`${route?.name}`)}</span>
                  {/* <span className="ml-4">{route?.name}</span> */}
                </a>
              ) : (
                (route?.public ?? hasPermission(route?.permission)) && (
                  <NavLink
                    exact
                    to={route?.path}
                    target={`${route?.outside ? "_blank" : "_self"}`}
                    className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-700 dark:hover:text-gray-200"
                    activeClassName="text-blue-500 dark:text-gray-100"
                  >
                    <Route path={route?.path} exact={route?.exact}>
                      <span
                        className="absolute inset-y-0 left-0 w-1 bg-blue-500 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"
                      ></span>
                    </Route>
                    {route?.icon && (
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    )}
                    <span className="ml-4">{t(`${route?.name}`)}</span>
                  </NavLink>
                )
              )}
            </li>
          );
        })}
      </ul>
      <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block">
        <Button onClick={handleLogOut} size="large" className="w-full">
          <span className="flex items-center">
            <IoLogOutOutline className="mr-3 text-lg" />
            <span className="text-sm">{t("LogOut")}</span>
          </span>
        </Button>
      </span>
    </div>
  );
};

export default SidebarContent;
