
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
import AgencyDrawer from "@/components/drawer/AgencyDrawer";
import CheckBox from "@/components/form/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { showingTranslateValue } from "@/utils/translate";
import AgencyServices from "@/services/AgencyServices";
//internal import

const service = AgencyServices

const HistoryTable = ({ data, isCheck, setIsCheck }) => {
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
       <TableBody>
            {data?.map((item, i) => (
                <TableRow key={i + 1} className='hover:bg-gray-300'>
                    <TableCell>
                    <span className="text-sm">
                        {item?.created_by?.name.en}
                        </span>
                    </TableCell>
                    <TableCell>
                        <span className="text-sm">
                            {item?.desc}
                        </span>
                    </TableCell>
                </TableRow>
            ))}
       </TableBody> 
    </>
  );
};

export default HistoryTable;