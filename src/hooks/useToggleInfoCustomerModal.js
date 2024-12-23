import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";

const useToggleInfoCustomerModal = () => {
  const [methodType, setMethodType] = useState("");
  const [available, setAvailable] = useState(true);
  const { isInfoCustomerModalOpen, toggleInfoCustomerModal, } = useContext(SidebarContext);
  const handeSearchInfo = () => {
    setMethodType('search');
    toggleInfoCustomerModal();
  };

  const handleAddCustomer = () => {
    setMethodType('add');
  };

  useEffect(() => {
    if (!isInfoCustomerModalOpen) {
      setAvailable(true);
      setMethodType("");
    }
  }, [isInfoCustomerModalOpen]);

  return {
    methodType,
    setMethodType,
    available,
    setAvailable,
    handeSearchInfo,
    handleAddCustomer
  };
};

export default useToggleInfoCustomerModal;
