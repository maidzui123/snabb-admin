import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";

const useToggleJobStepModal = () => {
  const { toggleAddAccessoryModal, toggleAdminFixConfirmModal } = useContext(SidebarContext);
  const handleAdminFixConfirm = () => {
    toggleAdminFixConfirmModal();
  };
  const handleAddAccessory = () => {
    toggleAddAccessoryModal();
  };
//   useEffect(() => {
//     if (!isInfoCustomerModalOpen) {
//       setAvailable(true);
//       setMethodType("");
//     }
//   }, [isInfoCustomerModalOpen]);

  return {
    handleAdminFixConfirm,
    handleAddAccessory,
  };
};

export default useToggleJobStepModal;
