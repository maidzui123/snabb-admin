import React from "react";
import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import
import MainDrawer from "@/components/drawer/MainDrawer";
import AccessoryDrawer from "@/components/drawer/AccessoryDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";
import AccessoryServices from "@/services/AccessoryServices";
import Status from "../table/Status";
import { formatDate } from "@/utils/date.helper.js";
import { hasPermission } from "@/helper/permission.helper";
//internal import

const service = AccessoryServices;

const AccessoryTable = ({ data, isCheck, setIsCheck, isAction = true, currentPage, limitData}) => {
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
          <AccessoryDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1} className="hover:bg-gray-300">
            {
              isAction ? 
              (<TableCell>
                <CheckBox
                  type="checkbox"
                  name={item?.title?.en}
                  id={item._id}
                  handleClick={handleClick}
                  isChecked={isCheck?.includes(item._id)}
                />
              </TableCell>) 
              : <></>
            }
            <TableCell>
              <span className="text-sm text-center">{i + 1 + ((currentPage - 1) * limitData)}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.code}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.desc}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.price.toLocaleString()} ₫</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.VAT}%</span>
            </TableCell>
            {/* <TableCell>
              <span className="text-sm">{item?.status}</span>
            </TableCell> */}
            {/* <TableCell className="text-center text-xs">
              <Status status={item?.status} />
            </TableCell> */}
            <TableCell>
              <span className="text-sm">
                <div>Sản phẩm BH: {item?.product_name}</div>
                <div>Trung tâm sửa chữa: {item?.agency_name}</div>
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.category_info?.map((e, index, array) => (
                  <>
                    <span key={index}>
                      {e}
                      {index < array?.length - 1 && " - "}
                    </span>
                  </>
                ))}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{formatDate(item?.valid_from)} - {formatDate(item?.valid_to)}</span>
            </TableCell>
            <TableCell className="text-center text-xs">
              <Status status={
                item?.status === "INSTOCK" ? "Còn hàng" : 
                item?.status === "OUTSTOCK" ? "Hết hàng" : 
                item?.status === "OUTDATE" ? "Hết hiệu lực" : ""} />
            </TableCell>
            {/* <TableCell className="text-center">
              <ShowHideButton id={item._id} status={item.status} service={service}/>
            </TableCell> */}
            {
              isAction ? 
              (<TableCell>
                <EditDeleteButton
                  id={item._id}
                  product={item}
                  isCheck={isCheck}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  title={item?.name}
                  checkPermission={hasPermission("accessory.delete")}
                />
              </TableCell>) 
              : <></>
            }
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default AccessoryTable;
