import { Avatar, Badge, WindmillContext } from "@windmill/react-ui";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  IoClose,
  IoGridOutline,
  IoLogOutOutline,
  IoMenu,
  IoMoonSharp,
  IoNotificationsSharp,
  IoSettingsOutline,
  IoSunny,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

//internal import

// import de from "@/assets/img/de.svg";
import { AdminContext } from "@/context/AdminContext";
import { SidebarContext } from "@/context/SidebarContext";
import { userLogout } from "@/store/actions";
import NotificationModal from "../modal/NotificationModal";
// import { emptySetting } from "@/store/Actions/SettingActions";
// import { emptySideBarMenu } from "@/store/Actions/SideBarActions";
import useAsync from "@/hooks/useAsync";
import NotificationServices from "@/services/NotificationServices";
import { useForm } from "react-hook-form";

const Header = () => {
  // const reduxDisPatch = useDispatch();
  const {
    toggleSidebar,
    closeSidebar,
    handleLanguageChange,
    setNavBar,
    navBar,
    currentPage,
    limitData,
  } = useContext(SidebarContext);
  const {
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { search: "" } });
  const { state, dispatch } = useContext(AdminContext);
  const dispatchRedux = useDispatch();
  const { adminInfo } = state;
  const { mode, toggleMode } = useContext(WindmillContext);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const pRef = useRef();
  const nRef = useRef();
  const currentLanguageCode = cookies.get("i18next") || "vi";
  const { t } = useTranslation();

  const handleLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    dispatchRedux(userLogout());
    Cookies.remove("adminInfo");
    // reduxDisPatch(emptySideBarMenu());
    // reduxDisPatch(emptySetting());
    // window.location.replace(`${import.meta.env.VITE_APP_ADMIN_DOMAIN}/login`);
  };
  const { data, loading } = useAsync(() =>
    NotificationServices.getAll({
      ...getValues(),
      page: currentPage,
      limit: limitData,
      // category: category,
      // title: searchText,
      // price: sortedField,
    })
  );
  const notiData = data?.data;
  const noReadNoti = notiData?.filter((item) => item?.is_read === false);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!pRef?.current?.contains(e.target)) {
        setProfileOpen(false);
      }
      if (!nRef?.current?.contains(e.target)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [pRef, nRef]);

  const handleNotificationOpen = () => {
    setNotificationOpen(!notificationOpen);
    setProfileOpen(false);
  };
  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);
    setNotificationOpen(false);
  };

  // const onChange = (event) => {
  //     i18next.changeLanguage(event.target.value);

  // }

  return (
    <>
      <header className="z-30 py-3 pr-3 bg-gray-200">
        <div className="flex items-center justify-between h-full px-6 pr-1 mx-auto text-blue-500 dark:text-blue-500">
          <button
            type="button"
            onClick={() => {
              setNavBar(!navBar);
            }}
            className="hidden lg:block outline-0 focus:outline-none"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* <!-- Mobile hamburger --> */}
          <button
            className="p-1 mr-5 ml-1 rounded-md lg:hidden focus:outline-none"
            onClick={() => {
              toggleSidebar();
              setNavBar(true);
            }}
            aria-label="Menu"
          >
            <IoMenu className="w-6 h-6" aria-hidden="true" />
          </button>
          <span></span>

          <ul className="flex justify-end items-center flex-shrink-0 space-x-6">
            {/* <li className="changeLanguage">
              <div className="dropdown">
                <button className="dropbtn focus:outline-none">
                  {currentLanguageCode === "vi" ? (
                    <img src={vi} width={16} alt="lang" className="mx-2" />
                  ) : (
                    <img src={en} className="mx-2" alt="lang" width={16} />
                  )}
                  {currentLanguageCode === "vi" ? "Vietnamese" : "English"}
                </button>

                <div className="dropdown-content">
                  <div
                    onClick={() => handleLanguageChange("en")}
                    className="focus:outline-none cursor-pointer"
                  >
                    <img src={en} width={16} alt="lang" /> English{" "}
                  </div>
                  <div
                    onClick={() => handleLanguageChange("de")}
                    className="focus:outline-none cursor-pointer"
                  >
                    <img src={vi} width={16} alt="lang" /> Vietnamese
                  </div>
                </div>
              </div>
            </li> */}

            {/* <!-- Theme toggler --> */}

            {/* <li className="flex">
              <button
                className="rounded-md focus:outline-none"
                onClick={toggleMode}
                aria-label="Toggle color mode"
              >
                {mode === "dark" ? (
                  <IoSunny className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <IoMoonSharp className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </li> */}

            {/* <!-- Notifications menu --> */}
            <li className="relative inline-block text-left" ref={nRef}>
              <button
                className="relative align-middle rounded-md focus:outline-none"
                onClick={handleNotificationOpen}
              >
                <IoNotificationsSharp className="w-5 h-5" aria-hidden="true" />
                <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {noReadNoti?.length}
                </span>
              </button>

              {notificationOpen && (
                <div
                  style={{ borderRadius: "10px" }}
                  className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="notification-box">
                    <Scrollbars style={{ borderRadius: "10px" }}>
                      <NotificationModal
                        notiData={notiData}
                        setNotificationOpen={setNotificationOpen}
                      />
                    </Scrollbars>
                  </div>
                </div>
              )}
            </li>

            {/* <!-- Profile menu --> */}
            <li className="relative inline-block text-left" ref={pRef}>
              <button
                className="rounded-full dark:bg-gray-500 bg-blue-500 text-white h-8 w-8 font-medium mx-auto focus:outline-none"
                onClick={handleProfileOpen}
              >
                {adminInfo.image ? (
                  <Avatar
                    className="align-middle"
                    src={`${adminInfo.image}`}
                    aria-hidden="true"
                  />
                ) : (
                  <span>{adminInfo.email[0].toUpperCase()}</span>
                )}
              </button>

              {profileOpen && (
                <ul className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                    <Link to="/dashboard">
                      <span className="flex items-center text-sm">
                        <IoGridOutline
                          className="w-4 h-4 mr-3"
                          aria-hidden="true"
                        />
                        <span>{t("Dashboard")}</span>
                      </span>
                    </Link>
                  </li> */}

                  <li className="justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
                    <Link to="/edit-profile">
                      <span className="flex items-center text-sm">
                        <IoSettingsOutline
                          className="w-4 h-4 mr-3"
                          aria-hidden="true"
                        />
                        <span>{t("Chỉnh sửa tài khoản")}</span>
                      </span>
                    </Link>
                  </li>

                  <li
                    onClick={handleLogOut}
                    className="cursor-pointer justify-between font-serif font-medium py-2 pl-4 transition-colors duration-150 hover:bg-gray-100 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  >
                    <span className="flex items-center text-sm">
                      <IoLogOutOutline
                        className="w-4 h-4 mr-3"
                        aria-hidden="true"
                      />
                      <span>{t("LogOut")}</span>
                    </span>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
