
// import { Button, Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
// import React, { useContext } from "react";
// import { FiTruck, FiX, FiCheck } from "react-icons/fi";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { useLocation } from "react-router-dom";

// //internal import
// import { SidebarContext } from "@/context/SidebarContext";
// import useToggleDrawer from "@/hooks/useToggleDrawer";

// const AgencySendConfirmModal = ({
//   register,
//   current,
//   handleSubmit,
//   handleAgencyRetailerSendConfirm,
// }) => {
//   const {
//     isAgencySendConfirmModalOpen,
//     closeAgencySendConfirmModal,
//   } = useContext(SidebarContext);
//   const { setServiceId } = useToggleDrawer();
//   const location = useLocation();
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { t } = useTranslation();
//   return (
//     <>
//       <Modal
//         isOpen={isAgencySendConfirmModalOpen}
//         onClose={closeAgencySendConfirmModal}
//       >
//         <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
//           <span className="flex justify-center text-5xl mb-6 text-blue-600">
//             <FiTruck />
//           </span>
//           {/* <h2 className="text-xl font-medium mb-1">{t('DeleteModalH2')}</h2> */}
//           <h1 className=" text-2xl font-medium mb-2">
//             Xác nhận đã gửi thiết bị tới khách hàng
//             {/* <span className="text-red-500">{title}</span>? */}
//           </h1>
//         </ModalBody>

//         <ModalFooter className="grid grid-cols-3 gap-4">
//           <Button
//             className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
//             layout="outline"
//             onClick={closeAgencySendConfirmModal}
//           >
//             {t("Cancel")}
//           </Button>
//           <Button
//             className="flex btn-red items-center w-full sm:w-auto px-4 gap-2"
//             type="submit"
//             onClick={handleSubmit(
//               handleAgencyRetailerSendConfirm(current, "error")
//             )}
//           >
//             <FiX className="text-lg" />
//             Từ Chối
//           </Button>
//           <Button
//             className="flex items-center w-full sm:w-auto px-4 gap-2"
//             type="submit"
//             onClick={handleSubmit(
//               handleAgencyRetailerSendConfirm(current, "process")
//             )}
//           >
//             <FiCheck className="text-lg" />
//             Đã Gửi
//           </Button>
//         </ModalFooter>
//       </Modal>
//     </>
//   );
// };

// export default React.memo(AgencySendConfirmModal);
