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
//internal import

const service = AccessoryServices;

const AccessoryImportTable = ({ data, isCheck, setIsCheck }) => {
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
        {data?.map((item, i) =>
        (
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
            <TableCell>
              <span className="text-sm">{item.stt}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item.name}</span>
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
            {/* <TableCell>
              <span className="text-sm">
                <div>Sản phẩm BH: {item?.product_id}</div>
                <div>Trung tâm sửa chữa: {item?.agency_id}</div>
              </span>
            </TableCell> */}
            {/* <TableCell>
              <span className="text-sm">
                {item?.category?.map((e, index, array) => (
                  <>
                    <span key={index}>
                      {e?.name}
                      {index < array?.length - 1 && " - "}
                    </span>
                  </>
                ))}
              </span>
            </TableCell> */}

            <TableCell>
              <span className="text-sm">{formatDate(item?.valid_from)} - {formatDate(item?.valid_to)}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.status}</span>
            </TableCell>
            <TableCell className=" text-xs">
              <Status status={item.check === "PENDING" ? "Hợp lệ" : (item.check === "DUPLICATE" ? "Trùng lặp" : "Không hợp lệ" )} />
            </TableCell>
            {/* <TableCell className="text-center">
              <ShowHideButton id={item._id} status={item.status} service={service}/>
            </TableCell> */}
            {/* <TableCell>
                {item.category?.slice(0, -1).trim()}
            </TableCell> */}
            {/* <TableCell>
            {item.check === "PENDING" ? (
                <span className="text-sm">Hợp lệ</span>
              ) : item.check === "DUPLICATE" ? (
                <span className="text-sm">Trùng lặp</span>
              ) : (<span className="text-sm">Không hợp lệ</span>)}
            </TableCell> */}
            {/* <TableCell>
              <EditDeleteButton
                id={item._id}
                product={item}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={item?.name}
              />
            </TableCell> */}
          </TableRow>
        ))
        }
      </TableBody>
    </>
  );
};

export default AccessoryImportTable;
