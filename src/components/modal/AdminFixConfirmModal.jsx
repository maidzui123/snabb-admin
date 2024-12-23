import { Button, Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import React, { useContext } from "react";
import { FiTruck, FiX, FiCheck, FiChevronLeft } from "react-icons/fi";
import { ImCancelCircle } from "react-icons/im";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { useHistory } from "react-router-dom";
import { checkTypeCompany } from "@/helper/permission.helper";
import { is } from "immutable";
import InputArea from "@/components/form/InputArea";
import Error from "@/components/form/Error";
import { set } from "date-fns";
const AdminFixConfirmModal = ({
  register,
  errors,
  current,
  handleSubmit,
  handleConfirm,
}) => {
  const { isAdminFixConfirmModalOpen, closeAdminFixConfirmModal } =
    useContext(SidebarContext);
  const { setServiceId } = useToggleDrawer();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();
  const [isDelete, setIsDelete] = useState(false);
  const { t } = useTranslation();

  const handleDdelete = () => {
    setIsDelete(!isDelete);
  };
  return (
    <>
      <Modal
        isOpen={isAdminFixConfirmModalOpen}
        onClose={() => {
          closeAdminFixConfirmModal();
          setIsDelete(false);
        }}
      >
        {isDelete && (
          <div
            className=" mt-4 w-20 text-red-500 hover:text-red-600 cursor-pointer flex  items-center text-md"
            onClick={() => setIsDelete(!isDelete)}
          >
            <FiChevronLeft className="text-2xl" />
            <span>Trở lại</span>
          </div>
        )}
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          {!isDelete ? <span className="flex justify-center text-5xl mb-6 text-blue-600">
            <HiOutlineWrenchScrewdriver />
          </span> : <span className="flex justify-center text-5xl mb-6 text-red-500">
            <ImCancelCircle />
          </span>}
          {/* <h2 className="text-xl font-medium mb-1">{t('DeleteModalH2')}</h2> */}
          <h1 className=" text-2xl font-medium mb-2">
            {!isDelete
              ? "Xác nhận cho phép sửa chữa thiết bị"
              : "Nhập lý do từ chối"}
            {/* <span className="text-red-500">{title}</span>? */}
          </h1>
          {isDelete && (
            <div className=" mt-8">
            <InputArea
              register={register}
              required={true}
              name="reject_reason"
              placeholder="Nhập lý do từ chối"
              className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
            />
            <Error errorName={errors.reject_reason} />
          </div>
          )}
        </ModalBody>

        {checkTypeCompany("TPA") &&
          (!isDelete ? (
            <ModalFooter className="grid grid-cols-4 gap-4">
              <Button
                className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
                layout="outline"
                onClick={closeAdminFixConfirmModal}
              >
                Đóng
              </Button>
              <Button
                className="flex btn-red items-center w-full bg-red-600 hover:bg-red-500 sm:w-auto px-4 gap-2"
                type="submit"
                onClick={() => setIsDelete(!isDelete)}
                // onClick={handleSubmit(
                //   handleConfirm(() => history.push("/job"), "CANCEL")
                // )}
              >
                <FiX className="text-lg" />
                Từ Chối
              </Button>
              <Button
                className="flex items-center w-full sm:w-auto px-4 gap-2"
                type="submit"
                onClick={handleSubmit(
                  handleConfirm(() => history.push("/job"), "PASSING")
                )}
              >
                <FiCheck className="text-lg" />
                Yêu Cầu Vượt Cấp
              </Button>
              <Button
                className="flex items-center w-full sm:w-auto px-4 gap-2"
                type="submit"
                onClick={handleSubmit(
                  handleConfirm(() => history.push("/job"), "TPA CONFIRM PRICE")
                )}
              >
                <FiCheck className="text-lg" />
                Chấp Nhận
              </Button>
            </ModalFooter>
          ) : (
            <ModalFooter className="grid grid-cols-2 gap-4">
              <Button
                className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
                layout="outline"
                onClick={closeAdminFixConfirmModal}
              >
                Đóng
              </Button>
              <Button
                className="flex btn-red items-center w-full bg-red-600 hover:bg-red-500 sm:w-auto px-4 gap-2"
                type="submit"
                onClick={handleSubmit(
                  handleConfirm(() => history.push("/job"), "CANCEL")
                )}
              >
                <FiX className="text-lg" />
                Xác Nhận Từ Chối
              </Button>
            </ModalFooter>
          ))}
        {checkTypeCompany("PROVIDER") && (
          <ModalFooter className="grid grid-cols-3 gap-4">
            <Button
              className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
              layout="outline"
              onClick={closeAdminFixConfirmModal}
            >
              Đóng
            </Button>
            <Button
              className="flex btn-red items-center w-full bg-red-600 hover:bg-red-500 sm:w-auto px-4 gap-2"
              type="submit"
              onClick={handleSubmit(
                handleConfirm(() => history.push("/job"), "CANCEL")
              )}
            >
              <FiX className="text-lg" />
              Từ Chối
            </Button>
            <Button
              className="flex items-center w-full sm:w-auto px-4 gap-2"
              type="submit"
              onClick={handleSubmit(
                handleConfirm(
                  () => history.push("/job"),
                  "PROVIDER CONFIRM PRICE"
                )
              )}
            >
              <FiCheck className="text-lg" />
              Chấp Nhận
            </Button>
          </ModalFooter>
        )}
      </Modal>
    </>
  );
};

export default React.memo(AdminFixConfirmModal);
