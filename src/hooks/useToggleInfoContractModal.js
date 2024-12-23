import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";

const useToggleInfoContractModal = () => {
  const { isInfoContractModalOpen, toggleInfoContractModal, } = useContext(SidebarContext);

  const handeSearchInfo = () => {
    toggleInfoContractModal();
  };

  useEffect(() => {
    if (!isInfoContractModalOpen) {
    }
  }, [isInfoContractModalOpen]);

  return {
    handeSearchInfo,
  };
};

export default useToggleInfoContractModal;
