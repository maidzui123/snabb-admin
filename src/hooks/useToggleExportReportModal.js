import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";

const useToggleExportReportModal = () => {
  const { toggleExportReportModal } = useContext(SidebarContext);
  const handleExportReport = () => {
    toggleExportReportModal();
  };
//   useEffect(() => {
//     if (!isInfoCustomerModalOpen) {
//       setAvailable(true);
//       setMethodType("");
//     }
//   }, [isInfoCustomerModalOpen]);

  return {
    handleExportReport,
  };
};

export default useToggleExportReportModal;

