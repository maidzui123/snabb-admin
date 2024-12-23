import { set } from "immutable";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// create context
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const resultsPerPage = 20;
  const searchRef = useRef("");
  const invoiceRef = useRef("");

  const [limitData, setLimitData] = useState(20);
  const [limitHistoryData, setLimitHistoryData] = useState(5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBulkDrawerOpen, setIsBulkDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isRerender, setIsRerender] = useState(false);
  const [lang, setLang] = useState("en");
  const [time, setTime] = useState("");
  const [sortedField, setSortedField] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [zone, setZone] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [windowDimension, setWindowDimension] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);
  const [navBar, setNavBar] = useState(true);
  const { i18n } = useTranslation();
  const [tabIndex, setTabIndex] = useState(0);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const closeDrawer = () => setIsDrawerOpen(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const closeBulkDrawer = () => setIsBulkDrawerOpen(false);
  const toggleBulkDrawer = () => setIsBulkDrawerOpen(!isBulkDrawerOpen);

  const closeModal = () => setIsModalOpen(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleLanguageChange = (lang) => {
    Cookies.set("i18next", lang, {
      sameSite: "None",
      secure: true,
    });
    i18n.changeLanguage(lang);
    setLang(lang);
  };

  const handleChangePage = (p) => {
    setCurrentPage(p);
  };

  const handleChangeHistoryPage = (p) => {
    setCurrentHistoryPage(p);
  };

  const handleSubmitForAll = (e) => {
    e.preventDefault();

    if (!searchRef?.current?.value) return setSearchText("");
    setSearchText(searchRef?.current?.value);
    console.log(e);
  };

  const handleSubmitFilter = () => {
    setIsRerender(!isRerender);
  };

  const triggerRecallAPI = () => {
    setIsRerender(!isRerender);
  };
  const [isInfoCustomerCollapsed, setIsInfoCustomerCollapsed] = useState(false);
  const handleInfoCustomerToggle = () =>
    setIsInfoCustomerCollapsed(!isInfoCustomerCollapsed);

  const [isInfoContractCollapsed, setIsInfoContractCollapsed] = useState(false);
  const handleInfoContractToggle = () =>
    setIsInfoContractCollapsed(!isInfoContractCollapsed);

  const [isInfoCustomerModalOpen, setIsInfoCustomerModalOpen] = useState(false);
  const closeInfoCustomerModal = () => setIsInfoCustomerModalOpen(false);
  const toggleInfoCustomerModal = () =>
    setIsInfoCustomerModalOpen(!isInfoCustomerModalOpen);

  const [isInfoContractModalOpen, setIsInfoContractModalOpen] = useState(false);
  const closeInfoContractModal = () => {
    triggerRecallAPI();
    setIsInfoContractModalOpen(false);
  };
  const toggleInfoContractModal = () =>{
    // setIsUpdate(true);
    triggerRecallAPI();
    setIsInfoContractModalOpen(!isInfoContractModalOpen);}

  const [isExportReportModalOpen, setIsExportReportModalOpen] =
    useState(false);
  const toggleExportReportModal = () =>
    setIsExportReportModalOpen(!isExportReportModalOpen);
  const closeExportReportModal = () => setIsExportReportModalOpen(false);
  const handleAgencyConfirmToggle = () =>
    setIsExportReportModalOpen(!isExportReportModalOpen);

  const [isRetailerTransportModalOpen, setIsRetailerTransportModalOpen] =
    useState(false);
  const toggleRetailerTransportModal = () =>
    setIsRetailerTransportModalOpen(!isRetailerTransportModalOpen);
  const closeRetailerTransportModal = () =>
    setIsRetailerTransportModalOpen(false);
  const handleRetailerTransportToggle = () =>
    setIsRetailerTransportModalOpen(!isRetailerTransportModalOpen);

  const [isAddAccessoryModalOpen, setIsAddAccessoryModalOpen] =
    useState(false);
  const toggleAddAccessoryModal = () =>
    setIsAddAccessoryModalOpen(!isAddAccessoryModalOpen);
  const closeAddAccessoryModal = () => setIsAddAccessoryModalOpen(false);
  const handleAgencyTransportToggle = () =>
    setIsAddAccessoryModalOpen(!isAddAccessoryModalOpen);

  const [
    isAgencyConfirmAccessoryModalOpen,
    setIsAgencyConfirmAccessoryModalOpen,
  ] = useState(false);
  const toggleAgencyConfirmAccessoryModal = () =>
    setIsAgencyConfirmAccessoryModalOpen(!isAgencyConfirmAccessoryModalOpen);
  const closeAgencyConfirmAccessoryModal = () =>
    setIsAgencyConfirmAccessoryModalOpen(false);
  const handleAgencyConfirmAccessoryToggle = () =>
    setIsAgencyConfirmAccessoryModalOpen(!isAgencyConfirmAccessoryModalOpen);

    const [
      isAdminFixConfirmModalOpen,
      setIsAdminFixConfirmModalOpen,
    ] = useState(false);
    const toggleAdminFixConfirmModal = () =>
      setIsAdminFixConfirmModalOpen(!isAdminFixConfirmModalOpen);
    const closeAdminFixConfirmModal = () =>
      setIsAdminFixConfirmModalOpen(false);
    const handleAdminFixConfirmToggle = () =>
      setIsAdminFixConfirmModalOpen(!isAdminFixConfirmModalOpen);

      const [
        isAgencyFixConfirmModalOpen,
        setIsAgencyFixConfirmModalOpen,
      ] = useState(false);
      const toggleAgencyFixConfirmModal = () =>
        setIsAgencyFixConfirmModalOpen(!isAgencyFixConfirmModalOpen);
      const closeAgencyFixConfirmModal = () =>
        setIsAgencyFixConfirmModalOpen(false);
      const handleAgencyFixConfirmToggle = () =>
        setIsAgencyFixConfirmModalOpen(!isAgencyFixConfirmModalOpen);

        const [
          isAgencySendConfirmModalOpen,
          setIsAgencySendConfirmModalOpen,
        ] = useState(false);
        const toggleAgencySendConfirmModal = () =>
          setIsAgencySendConfirmModalOpen(!isAgencySendConfirmModalOpen);
        const closeAgencySendConfirmModal = () =>
          setIsAgencySendConfirmModalOpen(false);
        const handleAgencySendConfirmToggle = () =>
          setIsAgencySendConfirmModalOpen(!isAgencySendConfirmModalOpen);
  useEffect(() => {
    const lang = Cookies.get("i18next");
    const removeRegion = (langCode) => {
      const updatedLang = langCode?.split("-")[0];
      return updatedLang;
    };

    const updatedLang = removeRegion(lang);
    setLang(updatedLang);
    Cookies.set("i18next", updatedLang, {
      sameSite: "None",
      secure: true,
    });
  }, [lang]);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        isAgencyFixConfirmModalOpen,
        toggleAgencyFixConfirmModal,
        closeAgencyFixConfirmModal,
        handleAgencyFixConfirmToggle,
        isAgencySendConfirmModalOpen,
        toggleAgencySendConfirmModal,
        closeAgencySendConfirmModal,
        handleAgencySendConfirmToggle,
        isAdminFixConfirmModalOpen,
        toggleAdminFixConfirmModal,
        closeAdminFixConfirmModal,
        handleAdminFixConfirmToggle,
        isAgencyConfirmAccessoryModalOpen,
        toggleAgencyConfirmAccessoryModal,
        closeAgencyConfirmAccessoryModal,
        handleAgencyConfirmAccessoryToggle,
        isAddAccessoryModalOpen,
        toggleAddAccessoryModal,
        closeAddAccessoryModal,
        handleAgencyTransportToggle,
        isRetailerTransportModalOpen,
        toggleRetailerTransportModal,
        closeRetailerTransportModal,
        handleRetailerTransportToggle,
        isExportReportModalOpen,
        toggleExportReportModal,
        closeExportReportModal,
        handleAgencyConfirmToggle,
        isInfoContractModalOpen,
        closeInfoContractModal,
        toggleInfoContractModal,
        isInfoContractCollapsed,
        handleInfoContractToggle,
        triggerRecallAPI,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        isDrawerOpen,
        toggleDrawer,
        closeDrawer,
        setIsDrawerOpen,
        closeBulkDrawer,
        isBulkDrawerOpen,
        toggleBulkDrawer,
        isModalOpen,
        toggleModal,
        closeModal,
        isUpdate,
        setIsUpdate,
        lang,
        setLang,
        handleLanguageChange,
        currentPage,
        setCurrentPage,
        handleChangePage,
        searchText,
        setSearchText,
        category,
        setCategory,
        searchRef,
        handleSubmitForAll,
        status,
        setStatus,
        zone,
        setZone,
        time,
        setTime,
        sortedField,
        setSortedField,
        resultsPerPage,
        limitData,
        setLimitData,
        limitHistoryData,
        setLimitHistoryData,
        currentHistoryPage,
        setCurrentHistoryPage,
        handleChangeHistoryPage,
        windowDimension,
        modalOpen,
        setModalOpen,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        loading,
        setLoading,
        invoice,
        setInvoice,
        invoiceRef,
        setNavBar,
        navBar,
        tabIndex,
        setTabIndex,
        isInfoCustomerCollapsed,
        handleInfoCustomerToggle,
        isInfoCustomerModalOpen,
        closeInfoCustomerModal,
        toggleInfoCustomerModal,
        handleSubmitFilter,
        isRerender,
        setIsRerender,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
