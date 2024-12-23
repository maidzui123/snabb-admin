
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
import ProductDrawer from "@/components/drawer/ProductDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";
import ProductServices from "@/services/ProductServices";
import { formatDate } from "@/utils/date.helper.js";
import Status from "../table/Status";
import { has } from "immutable";
import { hasPermission } from "@/helper/permission.helper";
//internal import

const service = ProductServices

const ProductTable = ({ data, isCheck, setIsCheck,  currentPage, limitData }) => {
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
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} service={service} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <ProductDrawer id={serviceId} />
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
                {item?.provider_name}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.code}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                <b>{item?.name}</b>
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.industry_name}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.program_name}
              </span>
            </TableCell>
            {/* <TableCell>
              <span className="text-sm">
                {item?.desc}
              </span>
            </TableCell> */}
          
            
            {/* <TableCell>
              <span className="text-sm">
                {item?.program_id?.name}
              </span>
            </TableCell> */}
            
            {/* <TableCell>
              <span className="text-sm">
                {item?.category?.map(e => e.name + ' ')}
              </span>
            </TableCell> */}
            {/* <TableCell className="text-center">
              <ShowHideButton id={item._id} status={item.status} service={service}/>
            </TableCell> */}
            <TableCell>
              <span className="text-sm">
                <div>Người tạo: {item?.admin_name?.vi}</div>
                <div>Ngày hiệu lực: {formatDate(item?.effective_date_start) + ' - ' + formatDate(item?.effective_date_end) }</div>
              </span>
            </TableCell>
            <TableCell className="text-center text-xs">
              <Status status={item?.status == "ACTIVE" ? "HOẠT ĐỘNG" : 
              item?.status == "INACTIVE" ? "VÔ HIỆU" : item?.status} />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={item._id}
                product={item}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={item?.name}
                checkPermission={hasPermission("product.delete")}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ProductTable;
