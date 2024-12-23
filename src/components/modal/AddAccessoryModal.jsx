import React, { useContext } from "react";
import { FiTruck, FiX, FiCheck } from "react-icons/fi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAsync from "@/hooks/useAsync";
//internal import
import { SidebarContext } from "@/context/SidebarContext";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import AccessoryServices from "@/services/AccessoryServices";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Select,
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  Pagination,
  TableContainer,
} from "@windmill/react-ui";
import TableLoading from "../preloader/TableLoading";
import useAccessoryFilter from "@/hooks/useAccessoryFilter";

const AddAccessoryModal = ({
  register,
  job_id,
  handleSubmit,
  listAccessory,
  setListAccessory,
}) => {
  const {
    isAddAccessoryModalOpen,
    closeAddAccessoryModal,
    limitData,
    currentPage,
  } = useContext(SidebarContext);

  const {
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: { search: "" } });
  const { setServiceId } = useToggleDrawer();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, loading } = useAsync(() =>
    AccessoryServices.getAllByAgency({
      ...getValues(),
      page: currentPage,
      limit: 5,
      job_id: job_id,
    })
  );
  const { t } = useTranslation();
  return (
    <>
      <Modal isOpen={isAddAccessoryModalOpen} onClose={closeAddAccessoryModal}>
        <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
          {loading ? (
            <TableLoading row={12} col={7} width={160} height={20} />
          ) : data?.data?.length > 0 ? (
            <TableContainer className="mb-8 rounded-b-lg">
              <Table>
                <TableHeader>
                  <tr className="text-center">
                    <TableCell>{t("ActionsTbl")}</TableCell>
                    <TableCell>{t("Tên")}</TableCell>
                    <TableCell>{t("Mã định danh")}</TableCell>
                    <TableCell>{t("Đơn giá")}</TableCell>
                    <TableCell>{t("VAT")}</TableCell>
                  </tr>
                </TableHeader>
                <TableBody>
                  {data?.data?.map((item, i) => (
                    <TableRow key={i + 1} className="hover:bg-gray-300">
                      <Button
                        onClick={() =>
                          setListAccessory([...listAccessory, {
                            _id: item?._id,
                            name: item?.name,
                            code: item?.code,
                            price: item?.price,
                            VAT: item?.VAT,
                            quantity: 1,
                            type: "accessory",
                          }])
                        }
                        className="flex items-center px-4 mt-1 gap-2 bg-blue-500 hover:bg-blue-600"
                      >
                        Chọn
                      </Button>
                      <TableCell>
                        <span className="text-sm">{item?.name}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{item?.code}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {item?.price.toLocaleString()} ₫
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{item?.VAT}%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {/* <TableFooter>
                <Pagination
                  totalResults={data?.totalDoc}
                  resultsPerPage={data?.limit}
                  onChange={handleChangePage}
                  label="Client Page Navigation"
                />
              </TableFooter> */}
            </TableContainer>
          ) : (
            <></>
          )}
        </ModalBody>

        <ModalFooter className="grid grid-cols-1 gap-4">
          <Button
            className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
            layout="outline"
            onClick={closeAddAccessoryModal}
          >
            {t("Đóng")}
          </Button>
          {/* <Button
            className="flex btn-red items-center w-full sm:w-auto px-4 gap-2"
            type="submit"
          >
            <FiX className="text-lg" />
            Từ Chối
          </Button>
          <Button
            className="flex items-center w-full sm:w-auto px-4 gap-2"
            type="submit"
          >
            <FiCheck className="text-lg" />
            Đã Gửi
          </Button> */}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(AddAccessoryModal);
