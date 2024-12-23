import { Button, Card, CardBody } from "@windmill/react-ui";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { SidebarContext } from "@/context/SidebarContext";
import useToggleDrawer from "@/hooks/useToggleDrawer";
const AddDeleteCard = ({
  isCheck = [],
  data = {},
  isDelete = true,
  handleDeleteMany=()=>{},
  handleModalOpen=()=>{},
}) => {
  const { t } = useTranslation();

  const { toggleDrawer } = useContext(SidebarContext);
  const handleDelete = (data, isCheck) => {
    if (isCheck?.length > 1) {
      handleDeleteMany(isCheck, "những phần đã chọn");
    } else {
      const product = data?.data?.find((item) => item?._id === isCheck[0]);
      handleModalOpen(product?._id, product?.name);
    }
  };
  return (
    <>
      <Card className="gap-4 md:justify-between bg-white p-1 border border-gray-100 rounded-lg">
        <CardBody className="grid grid-cols-1 md:flex gap-4 justify-end">
          {isDelete && (
            <Button
              disabled={isCheck?.length < 1}
              onClick={() => handleDelete(data, isCheck)}
              className="rounded-md h-12 bg-red-300 disabled btn-red md:min-w-48 "
            >
              <span className="mr-2">
                <FiTrash2 />
              </span>

              {t("Delete")}
            </Button>
          )}
          <Button
            onClick={toggleDrawer}
            className="rounded-md h-12 md:min-w-48"
          >
            <span className="mr-2">
              <FiPlus />
            </span>
            {t("Add")}
          </Button>
        </CardBody>
      </Card>
    </>
  );
};

export default AddDeleteCard;
