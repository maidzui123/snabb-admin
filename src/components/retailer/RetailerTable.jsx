
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
import RetailerDrawer from "@/components/drawer/RetailerDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";
import RetailerServices from "@/services/RetailerServices";
import Status from "../table/Status";
import { hasPermission } from "@/helper/permission.helper";
//internal import
import { useTranslation } from "react-i18next";
const service = RetailerServices

const RetailerTable = ({ data, isCheck, setIsCheck, currentPage, limitData  }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  const { t } = useTranslation();
  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} service={service} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <RetailerDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1} className='hover:bg-gray-300'>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={item?.title?.en}
                id={item._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(item._id)}
              />
            </TableCell>
            <TableCell>
              <span className="text-sm text-center">{i + 1 + ((currentPage - 1) * limitData)}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.name}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.code}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                <div>Phone: {item?.phone}</div>
                <div>Email: {item?.email}</div>
                <div>Địa chỉ: {item?.address?.slice(0,20)}...</div>
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.representative}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.brand_name}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.category_info?.map((e, index, array) => (
                  <>
                    <div key={index}>
                      {e}
                    </div>
                  </>
                ))}
              </span>
            </TableCell>
            {/* <TableCell className="text-center">
              <ShowHideButton id={item._id} status={item.status} service={service}/>
            </TableCell> */}
            <TableCell className="text-center text-xs">
              <Status status={t(item?.status)} />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={item._id}
                product={item}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={item?.name}
                checkPermission={hasPermission("retailer.delete")}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default RetailerTable;
