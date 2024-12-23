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
import { FiZoomIn, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

//internal import
import MainDrawer from "@/components/drawer/MainDrawer";
import ClientDrawer from "@/components/drawer/ClientDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";
import ClientServices from "@/services/ClientServices";
import Status from "../table/Status";
import { hasPermission } from "@/helper/permission.helper";
//internal import

const service = ClientServices;

const ClientTable = ({
  data,
  isCheck,
  setIsCheck,
  isSearching,
  handleSearch,
  currentPage, 
  limitData 
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
          <ClientDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1} className="hover:bg-gray-300">
            {isSearching && (
              <TableCell>
                <div className="flex justify-end text-right">
                  <Button
                    onClick={() => handleSearch(item?.legal_id)}
                    className="flex items-center px-4 gap-2 bg-blue-500 hover:bg-blue-600"
                  >
                    Chọn
                  </Button>
                </div>
              </TableCell>
            )}
            {!isSearching && <TableCell>
              <span className="text-sm text-center">{i + 1 + ((currentPage - 1) * limitData)}</span>
            </TableCell>}
            <TableCell>
              <span className="text-sm">{item?.legal_id}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{item?.full_name}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                <div>Phone: {item?.phone}</div>
                <div>Email: {item?.email}</div>
                <div>Địa chỉ: {item?.address}</div>
              </span>
            </TableCell>
            {!isSearching && (
              <>
                <TableCell>
                  <span className="text-sm">{item?.description}</span>
                </TableCell>
                <TableCell className="text-center text-xs">
                  <Status status={item?.status} />
                </TableCell>
              </>
            )}

            {/* <TableCell className="text-center">
              <ShowHideButton id={item._id} status={item.status} service={service}/>
            </TableCell> */}
            {!isSearching && (
              <TableCell>
                <EditDeleteButton
                  id={item._id}
                  handleModalOpen={handleModalOpen}
                  handleUpdate={handleUpdate}
                  checkPermission={false}
                  isView={import.meta.env.VITE_APP_NODE_ENV != "dev"}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ClientTable;
