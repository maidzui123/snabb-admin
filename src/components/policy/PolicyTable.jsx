import React from "react";
import {
  Avatar,
  Badge,
  Button,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import
import MainDrawer from "@/components/drawer/MainDrawer";
import PolicyDrawer from "@/components/drawer/PolicyDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";
import PolicyServices from "@/services/PolicyServices";
import { formatDatetime } from "@/utils/date.helper";
import { hasPermission } from "@/helper/permission.helper";
//internal import

const service = PolicyServices;

const PolicyTable = ({
  data,
  isCheck,
  setIsCheck,
  isSearching = false,
  handleSelectContract,
  currentPage,
  limitData,
}) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <>
      {isCheck?.length < 1 && (
        <DeleteModal id={serviceId} title={title} service={service} />
      )}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <PolicyDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1} className="hover:bg-gray-300">
            {/* <TableCell>
              <CheckBox
                type="checkbox"
                name={item?.title?.en}
                id={item._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(item._id)}
              />
            </TableCell> */}
            {isSearching && (
              <TableCell>
                <div className="flex justify-end text-right">
                  <Button
                    onClick={() => handleSelectContract(item)}
                    className="flex items-center px-4 gap-2 bg-blue-500 hover:bg-blue-600"
                  >
                    Chọn
                  </Button>
                </div>
              </TableCell>
            )}

            {!isSearching && (
              <>
                <TableCell>
                  <span className="text-sm text-center">
                    {i + 1 + (currentPage - 1) * limitData}
                  </span>
                </TableCell>
                <TableCell className="text-sm">
                  <p>Tên: {item?.client_name || "---"}</p>
                  <p>Giấy tờ: {item?.client_legal_id || "---"}</p>
                  <p>Sđt: {item?.client_phone || "---"}</p>
                  <p>Email: {item?.client_email || "---"}</p>
                  <p>Địa chỉ: {item?.client_address || "---"}</p>
                </TableCell>
              </>
            )}
            <TableCell className="text-sm">
              <p>Tên thiết bị: {item?.device_name || "---"}</p>
              <p>Loại thiết bị: {item?.device_type || "---"}</p>
              <p>Imei: {item?.device_imei || "---"}</p>
              <p>Hãng: {item?.device_brand || "---"}</p>
              <p>Số sêri: {item?.device_serial_number || "---"}</p>
              <p>Dòng thiết bị: {item?.device_model || "---"}</p>
            </TableCell>
            <TableCell className="text-sm">
              <p>Nhà cung cấp BH: {item?.insurance_provider_code || "---"}</p>
              <p>Sản phẩm BH: {item?.insurance_product_code || "---"}</p>
              <p>Phí BH: {item?.insurance_premium || "---"}</p>
              <p>
                Thời gian bắt đầu: {formatDatetime(item?.start_time) || "---"}
              </p>
              <p>
                Thời gian kết thúc: {formatDatetime(item?.end_time) || "---"}
              </p>
            </TableCell>

            {/* <TableCell className="text-center">
              <ShowHideButton
                id={item._id}
                status={item.status}
                service={service}
              />
            </TableCell> */}
            {!isSearching && (
              <TableCell>
                <EditDeleteButton
                  id={item._id}
                  handleUpdate={handleUpdate}
                  product={item}
                  isCheck={isCheck}
                  handleModalOpen={handleModalOpen}
                  title={item?.name}
                  isView
                  checkPermission={hasPermission("policy.delete")}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default PolicyTable;
