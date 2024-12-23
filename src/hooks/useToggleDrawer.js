import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";

const useToggleDrawer = () => {
  const [serviceId, setServiceId] = useState("");
  const [allId, setAllId] = useState([]);
  const [title, setTitle] = useState("");
  const {
    toggleDrawer,
    isDrawerOpen,
    toggleModal,
    toggleBulkDrawer,
    isModalOpen,
  } = useContext(SidebarContext);

  const handleUpdate = (id) => {
    setServiceId(id);
    toggleDrawer();
  };

  const handleUpdateMany = (id) => {
    setAllId(id);
    toggleBulkDrawer();
  };

  const handleModalOpen = (id, title) => {
    console.log("🚀 ~ handleModalOpen ~ id:", id);
    setServiceId(id);
    toggleModal();
    setTitle(title);
  };
  const handleDeleteMany = (id, title) => {
    setTitle(title);
    setAllId(id);
    toggleModal();
  };
  useEffect(() => {
    if (!isDrawerOpen && !isModalOpen) {
      setServiceId("");
    }
  }, [isDrawerOpen, isModalOpen]);

  return {
    title,
    setTitle,
    allId,
    serviceId,
    handleUpdate,
    setServiceId,
    handleModalOpen,
    handleDeleteMany,
    handleUpdateMany,
  };
};

export default useToggleDrawer;
