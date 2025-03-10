import React, { useEffect, useState } from "react";
import { NavLink, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoRemoveSharp,
} from "react-icons/io5";
import { hasPermission } from "@/helper/permission.helper";
import { useLocation } from "react-router-dom";
import useAsync from "@/hooks/useAsync";

const SidebarSubMenu = ({ route }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  // console.log('route',route)
  const handleSubMenu = () => setOpen(!open);
  const Icon = route?.icon;

  const location = useLocation();

  const { data, loading } = useAsync(
    () => route?.service && route?.service?.getAll()
  );

  useEffect(() => {
    setOpen(() => route?.routes?.some((e) => e?.path == location?.pathname));
  }, []);

  return (
    route?.routes?.some((e) => hasPermission(e?.permission)) && (
      <>
        <li className="relative px-6 py-3" key={route?.name}>
          <button
            className="inline-flex items-center justify-between focus:outline-none w-full text-sm font-semibold transition-colors duration-150 hover:text-blue-600 dark:hover:text-gray-200"
            onClick={handleSubMenu}
            aria-haspopup="true"
          >
            <span className="inline-flex items-center">
              {route?.icon && <Icon className="w-5 h-5" aria-hidden="true" />}
              <span className="ml-4 mt-1">{t(`${route?.name}`)}</span>
              <span className="pl-4 mt-1">
                {open ? <IoChevronDownOutline /> : <IoChevronForwardOutline />}
              </span>
            </span>
            {/* <DropdownIcon className="w-4 h-4" aria-hidden="true" /> */}
          </button>
          {open && (
            <ul
              className="p-2  overflow-hidden text-sm font-medium text-gray-500 rounded-md dark:text-gray-400 dark:bg-gray-900"
              aria-label="submenu"
            >
              {route?.routes.map(
                (child, i) =>
                  (child?.public ?? hasPermission(child?.permission)) && (
                    <li key={i + 1}>
                      <NavLink
                        to={child?.path}
                        // target={`${child?.name === 'Sell' ? '_blank' : '_self'}`}
                        className={`flex items-center font-serif py-1 text-sm text-gray-600 hover:text-blue-700 cursor-pointer ${
                          child?.path == location?.pathname
                            ? "text-blue-500"
                            : ""
                        }`}
                        activeClassName="text-blue-500 dark:text-gray-100"
                      >
                        <Route path={child?.path} exact={route?.exact}>
                          <span
                            className="absolute inset-y-0 left-0 w-1 bg-blue-700 rounded-tr-lg rounded-br-lg"
                            aria-hidden="true"
                          ></span>
                        </Route>
                        <span
                          className={`text-xs text-gray-500 pr-1 ${
                            child?.path == location?.pathname
                              ? "text-blue-500"
                              : ""
                          }`}
                        >
                          <IoRemoveSharp />
                        </span>
                        <span
                          className={`text-gray-500 hover:text-blue-700 dark:hover:text-gray-200 ${
                            child?.path == location?.pathname
                              ? "text-blue-500"
                              : ""
                          }`}
                        >
                          {t(`${child?.name}`)}
                        </span>
                      </NavLink>
                    </li>
                  )
              )}
              {route?.service &&
                data?.data?.map((e, i) => (
                  // (e?.public ?? hasPermission(e?.permission)) &&
                  <li key={i + 1}>
                    <NavLink
                      to={`${route?.path}/${e?._id}`}
                      // target={`${e?.name === 'Sell' ? '_blank' : '_self'}`}
                      className={`flex items-center font-serif py-1 text-sm text-gray-600 hover:text-blue-700 cursor-pointer ${
                        `${route?.path}/${e?._id}` == location?.pathname
                          ? "text-blue-500"
                          : ""
                      }`}
                      activeClassName="text-blue-500 dark:text-gray-100"
                    >
                      <Route path={`${route?.path}/${e?._id}`} exact>
                        <span
                          className="absolute inset-y-0 left-0 w-1 bg-blue-700 rounded-tr-lg rounded-br-lg"
                          aria-hidden="true"
                        ></span>
                      </Route>
                      <span
                        className={`text-xs text-gray-500 pr-1 ${
                          `${route?.path}/${e?._id}` == location?.pathname
                            ? "text-blue-500"
                            : ""
                        }`}
                      >
                        <IoRemoveSharp />
                      </span>
                      <span
                        className={`text-gray-500 hover:text-blue-700 dark:hover:text-gray-200 ${
                          `${route?.path}/${e?._id}` == location?.pathname
                            ? "text-blue-500"
                            : ""
                        }`}
                      >
                        {t(`${e?.name}`)}
                      </span>
                    </NavLink>
                  </li>
                ))}
            </ul>
          )}
        </li>
      </>
    )
  );
};

export default SidebarSubMenu;
