
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
import ProgramHistoryDrawer from "@/components/drawer/ProgramHistoryDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";
import ProgramHistoryServices from "@/services/ProgramHistoryServices";
//internal import

const service = ProgramHistoryServices

const ProgramHistoryTable = ({ data, isCheck, setIsCheck }) => {
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
      {/* {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} service={service} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <ProgramHistoryDrawer id={serviceId} />
        </MainDrawer>
      )} */}

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
              <span className="text-sm">
                {item?.created_by?.name.en}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.name}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.desc}
              </span>
            </TableCell>

           
            {/* <TableCell className="text-center">
              <ShowHideButton id={item._id} status={item.status} service={service}/>
            </TableCell>
            <TableCell>
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

export default ProgramHistoryTable;
