import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";

//internal import
import useFilter from "@/hooks/useFilter";
import Status from "@/components/table/Status";
import { showDateFormat } from "@/utils/dateFormate";
import MainDrawer from "@/components/drawer/MainDrawer";
import { showingTranslateValue } from "@/utils/translate";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import StaffDrawer from "@/components/drawer/StaffDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import ActiveInActiveButton from "@/components/table/ActiveInActiveButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import { hasPermission } from "@/helper/permission.helper";
import noImage from "/no_image.png";

const StaffTable = ({ staffs, lang, currentPage, limitData}) => {

  const {
    title,
    serviceId,
    handleModalOpen,
    handleUpdate,
    isSubmitting,
    handleResetPassword,
  } = useToggleDrawer();

  const { globalSetting } = useFilter();

  return (
    <>
      <DeleteModal id={serviceId} title={title} />

      <MainDrawer>
        <StaffDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {staffs?.map((staff, i) => (
          <TableRow key={staff._id}>
            <TableCell>
              <span className="text-sm text-center">{i + 1 + ((currentPage - 1) * limitData)}</span>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50"
                  src={staff.image || noImage}
                  alt="staff"
                />
                <div>
                  <h2 className="text-sm font-medium">
                    {showingTranslateValue(staff?.name, lang)}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{staff.email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm ">{staff.phone}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {/* {dayjs(staff.joiningData).format("DD/MM/YYYY")} */}
                {showDateFormat(
                  staff.joiningData,
                  globalSetting.default_date_format
                )}
              </span>
            </TableCell>
            <TableCell>
              <TableCell>
                <span className="text-sm font-semibold">
                  {staff.type === "TPA"
                    ? "TPA"
                    : staff.type === "AGENCY"
                    ? staff?.agency_id?.name
                    : staff.type === "RETAILER"
                    ? staff?.retailer_id?.name
                    : staff?.provider_id?.name}
                </span>
              </TableCell>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">{staff?.role}</span>
            </TableCell>
            <TableCell className="text-center text-xs">
              <Status status={staff.status} />
            </TableCell>
            {/* <TableCell className="text-center">
              <ActiveInActiveButton
                id={staff?._id}
                staff={staff}
                option="staff"
                status={staff.status}
              />
            </TableCell> */}
            <TableCell>
              <EditDeleteButton
                id={staff._id}
                staff={staff}
                isSubmitting={isSubmitting}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                handleResetPassword={handleResetPassword}
                title={showingTranslateValue(staff?.name, lang)}
                checkPermission={hasPermission("ourstaff.delete")}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default StaffTable;
