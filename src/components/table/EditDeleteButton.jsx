import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiZoomIn } from "react-icons/fi";

import Tooltip from "@/components/tooltip/Tooltip";

const EditDeleteButton = ({
  id,
  title,
  handleUpdate,
  handleModalOpen,
  isCheck,
  product,
  parent,
  children,
  isView,
  checkPermission = true,
  isDelete = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-end text-right">
      {isView ? (
        <button
          onClick={() => handleUpdate(id)}
          className="p-2 cursor-pointer text-gray-400 hover:text-blue-600 focus:outline-none"
        >
          <Tooltip
            id="view"
            Icon={FiZoomIn}
            title={t("View")}
            bgColor="#017e9"
          />
        </button>
      ) : (
        <>
          {handleUpdate && (
            <button
              disabled={isCheck?.length > 0}
              onClick={() => handleUpdate(id)}
              className="p-2 cursor-pointer text-gray-400 hover:text-blue-600 focus:outline-none"
            >
              <Tooltip
                id="edit"
                Icon={FiEdit}
                title={t("Edit")}
                bgColor="#017e9"
              />
            </button>
          )}

          {checkPermission && (
            <button
              disabled={isCheck?.length > 0}
              onClick={() => handleModalOpen(id, title, product)}
              className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
            >
              <Tooltip
                id="delete"
                Icon={FiTrash2}
                title={t("Delete")}
                bgColor="#EF4444"
              />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default EditDeleteButton;
