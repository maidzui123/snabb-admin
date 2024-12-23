
import React from "react";
import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import { t } from "i18next";
import { FiChevronRight, FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import
import MainDrawer from "@/components/drawer/MainDrawer";
import ImportHistoryDrawer from "@/components/drawer/ImportHistoryDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";
import ImportHistoryServices from "@/services/ImportHistoryServices";
import { formatDatetime } from "@/utils/date.helper";
import Status from "../table/Status";
//internal import



const ImportHistoryTable = ({ data, isCheck, setIsCheck, currentPage, limitData }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const service = ImportHistoryServices
  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} service={service} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <ImportHistoryDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1} className='hover:bg-gray-300'>
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
              <span className="text-sm text-center">{i + 1 + ((currentPage - 1) * limitData)}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.file_name}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {formatDatetime(item?.createdAt)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.upload_by?.vi}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <span>
                {item?.quantity_fields ? item?.quantity_fields : 0}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <Status status={item?.status} />
            </TableCell>
            {item?.status === "SUCCESS" ? (<TableCell>
              <div className="flex items-center justify-end">
                <Link
                  to={`/${item.type.toLowerCase()}/${item._id}`}
                  className="flex justify-center text-gray-400 hover:text-blue-600 m-2"
                >
                  <Tooltip
                    id="view"
                    Icon={FiChevronRight}
                    title={t("View")}
                    bgColor="#017e9"
                  />
                </Link>
              </div>
            </TableCell>) : (
              <div className="flex items-center justify-end"></div>
            )}
            
            {/* <TableCell className="text-center">
              <ShowHideButton id={item._id} status={item.status} service={service}/>
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
        ))}
      </TableBody>
    </>
  );
};

export default ImportHistoryTable;
