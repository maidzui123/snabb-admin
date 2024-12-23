import React from "react";
import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import { t } from "i18next";
import { FiZoomIn, FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

//internal import
import MainDrawer from "@/components/drawer/MainDrawer";
import JobDrawer from "@/components/drawer/JobDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";
import JobServices from "@/services/JobServices";
import Status from "../table/Status";
import { hasPermission } from "@/helper/permission.helper";
//internal import

const service = JobServices;

const JobTable = ({ data, isCheck, setIsCheck, currentPage, limitData }) => {
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
      <MainDrawer fullWidth>
        <JobDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1} className="hover:bg-gray-300">
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
              <span className="text-sm">{i + 1 + ((currentPage - 1) * limitData)}</span>
            </TableCell>
            <TableCell className="">
              <div>{item?.job_id || item?._id}</div>
            </TableCell>
            <TableCell className="">
              <div>{item?._id?.slice(0, 10)}</div>
              <div>{dayjs(item?.createdAt).format("DD/MM/YYYY HH:mm")}</div>
            </TableCell>
            <TableCell className="">
              <div>Họ Tên: {item?.client_id?.full_name}</div>
              <div>Sđt: {item?.client_id?.phone}</div>
              <div>Email: {item?.client_id?.email}</div>
              <div>Giấy tờ: {item?.client_id?.legal_id}</div>
            </TableCell>

            <TableCell className="">
              <span className="text-sm ">
                <div>Số HD: {item?.policy_id?.policy_code}</div>
                <div>IMEI: {item?.policy_id?.device_imei}</div>
              </span>
            </TableCell>

            {/* <TableCell className="">
              <span className="text-sm uppercase">{item?.job_type}</span>
            </TableCell> */}

            <TableCell className="text-center">
              <Status status={
                item?.status == "DRAFT" ? "Nháp" : 
                item?.status == "PUBLIC" ? "Chờ duyệt" : 
                item?.status == "PROCESSING" ? "Đang xử lý" : 
                item?.status == "FINISH" ? "Hoàn thành" : 
                item?.status == "FIXING" ? "Đang sửa chữa" : 
                item?.status == "PUBLIC" ? "Chờ duyệt" : 
                item?.status == "CANCEL" ? "Đã hủy" : 
                item?.status} />
            </TableCell>

            <TableCell>
              <div className="flex items-center justify-end">
                {/* <Link
                  to={`/jobDetailed/${item._id}`}
                  className="flex justify-center text-gray-400 hover:text-blue-600 m-2"
                >
                  <Tooltip
                    id="view"
                    Icon={FiZoomIn}
                    title={t("View")}
                    bgColor="#017e9"
                  />
                </Link> */}
                <Link
                  to={`/jobDetailed/${item._id}`}
                  className="flex justify-center text-gray-400 hover:text-blue-600 m-2"
                >
                  <Tooltip
                    id="edit"
                    Icon={FiEdit}
                    title={t("Edit")}
                    bgColor="#017e9"
                  />
                </Link>
                <EditDeleteButton
                  id={item._id}
                  product={item}
                  isCheck={isCheck}
                  handleModalOpen={handleModalOpen}
                  title={item?.name}
                  checkPermission={hasPermission("job.delete")}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default JobTable;
