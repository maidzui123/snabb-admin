import React from "react";
import { Avatar, Badge, WindmillContext } from "@windmill/react-ui";
import {
  IoClose,
  IoGridOutline,
  IoLogOutOutline,
  IoMenu,
  IoMoonSharp,
  IoNotificationsSharp,
  IoSettingsOutline,
  IoSunny,
} from "react-icons/io5";
import { GoDotFill } from "react-icons/go";

import noImage from "../../../public/no_image.png";
import { formatDatetime } from "@/utils/date.helper";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useNotificationSubmit from "@/hooks/useNotificationSubmit";
function NotificationModal({ notiData, setNotificationOpen }) {
  console.log("🚀 ~ NotificationModal ~ notiData:", notiData);
  const { handleSubmit, onSubmit } = useNotificationSubmit();

  const handleNotiDes = (notiStatus, job_code, agency_name = "") => {
    switch (notiStatus) {
      case "TPA_CONFIRM_JOB":
        return (
          <span className=" text-xs">
            Bạn đã là người phê duyệt cho job card{" "}
            <span className="font-bold">{job_code}</span>
          </span>
        );
      case "AGENCY_CONFIRM_JOB":
        return (
          <span className=" text-xs">
            Bạn được chỉ định tiếp nhận xử lí và sửa chữa thiết bị của job card{" "}
            <span className="font-bold">{job_code}</span>
          </span>
        );
      case "AGENCY_CONFIRM_PRICE_QUOTE":
        return (
          <span className=" text-xs">
            <span className="font-bold">{agency_name}</span> đã tạo báo giá cho
            job card <span className="font-bold">{job_code}</span>
          </span>
        );
      default:
        return "Lỗi!";
    }
  };

  return (
    <>
      <ul className="block text-sm border-t border-gray-100 dark:border-gray-700 rounded-md">
        {notiData?.map((noti, index) => (
          <Link key={index} to={`/jobDetailed/${noti?.job_id}`}>
            <li
              onClick={() => {
                handleSubmit(onSubmit(noti?._id, noti?.is_read));
                setNotificationOpen(false);
              }}
              className={`flex ${
                !noti?.is_read ? " bg-gray-100" : " bg-white"
              }  justify-between items-center font-serif font-normal text-sm py-3 border-b border-gray-100 dark:border-gray-700 px-3 transition-colors duration-150 hover:bg-gray-200 hover:text-blue-500 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 cursor-pointer`}
            >
              <div className="flex items-center">
                <Avatar
                  className="p-1 mr-2 w-12 h-10 md:block bg-gray-50 border border-gray-200"
                  src={`${noImage}`}
                  alt="image"
                />
                <div className="w-full p-2">
                  <h6 className="font-medium text-gray-500 mb-1">
                    {handleNotiDes(
                      noti?.content,
                      noti?.job_code,
                      noti?.agency_name
                    )}
                  </h6>

                  <p className="flex items-center text-xs text-gray-400">
                    <span>{formatDatetime(noti?.createdAt)}</span>
                  </p>
                </div>
              </div>
              {!noti?.is_read && (
                <span className="px-2 text-lg">
                  <GoDotFill />
                </span>
              )}
            </li>
          </Link>
        ))}
        {/* <li className="flex justify-between items-center font-serif font-normal text-sm py-3 border-b border-gray-100 dark:border-gray-700 px-3 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 cursor-pointer">
          <div className="flex items-center">
            <Avatar
              className="p-1 mr-2 md:block bg-gray-50 border border-gray-200"
              src={`${noImage}`}
              alt="image"
            />
            <div className="notification-content">
              <h6 className="font-medium text-gray-500">
                Bạn đã là người phê duyệt cho job card!
              </h6>

              <p className="flex items-center text-xs text-gray-400">
                <span>Dec 12 2021 - 12:40PM</span>
              </p>
            </div>
          </div>

          <span className="px-2">
            <IoClose />
          </span>
        </li> */}

        {/* <li className="flex justify-between items-center font-serif font-normal text-sm py-3 border-b border-gray-100 dark:border-gray-700 px-3 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 cursor-pointer">
          <div className="flex items-center">
            <Avatar
              className="mr-2 md:block bg-gray-50 border border-gray-200"
              src="https://i.ibb.co/ZTWbx5z/team-1.jpg"
              alt="image"
            />

            <div className="notification-content">
              <h6 className="font-medium text-gray-500">
                Sam L. Placed <span className="font-bold">$300</span> USD order!
              </h6>

              <p className="flex items-center text-xs text-gray-400">
                <Badge type="success">New Order</Badge>

                <span className="ml-2">Nov 30 2021 - 2:40PM</span>
              </p>
            </div>
          </div>

          <span className="px-2">
            <IoClose />
          </span>
        </li> */}

        {/* <li className="flex justify-between items-center font-serif font-normal text-sm py-3 border-b border-gray-100 dark:border-gray-700 px-3 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 cursor-pointer">
          <div className="flex items-center">
            <Avatar
              className="p-1 mr-2 md:block bg-gray-50 border border-gray-200"
              src="https://i.postimg.cc/5y7rNDFv/Radicchio-12ct.jpg"
              alt="image"
            />

            <div className="notification-content">
              <h6 className="font-medium text-gray-500">
                Radicchio Stock out, please check!
              </h6>

              <p className="flex items-center text-xs text-gray-400">
                <Badge type="danger">Stock Out</Badge>

                <span className="ml-2">Dec 15 2021 - 12:40PM</span>
              </p>
            </div>
          </div>

          <span className="px-2">
            <IoClose />
          </span>
        </li>

        <li className="flex justify-between items-center font-serif font-normal text-sm py-3 border-b border-gray-100 dark:border-gray-700 px-3 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 cursor-pointer">
          <div className="flex items-center">
            <Avatar
              className="mr-2 md:block bg-gray-50 border border-gray-200"
              src="https://i.postimg.cc/SNmQX9Yx/Organic-Baby-Carrot-1oz.jpg"
              alt="image"
            />

            <div className="notification-content">
              <h6 className="font-medium text-gray-500">
                Organic Baby Carrot Stock out, please check!
              </h6>

              <p className="flex items-center text-xs text-gray-400">
                <Badge type="danger">Stock Out</Badge>

                <span className="ml-2">Dec 20 2021 - 12:40PM</span>
              </p>
            </div>
          </div>

          <span className="px-2">
            <IoClose />
          </span>
        </li>

        <li className="flex justify-between items-center font-serif font-normal text-sm py-3 border-b border-gray-100 dark:border-gray-700 px-3 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 cursor-pointer">
          <div className="flex items-center">
            <Avatar
              className="mr-2 md:block bg-gray-50 border border-gray-200"
              src="https://i.postimg.cc/nM8QfhcP/Orange-20ct.jpg"
              alt="image"
            />

            <div className="notification-content">
              <h6 className="font-medium text-gray-500">
                Orange Stock out, please check!
              </h6>

              <p className="flex items-center text-xs text-gray-400">
                <Badge type="danger">Stock Out</Badge>

                <span className="ml-2">Dec 25 2021 - 12:40PM</span>
              </p>
            </div>
          </div>

          <span className="px-2">
            <IoClose />
          </span>
        </li>

        <li className="flex justify-between items-center font-serif font-normal text-sm py-3 border-b border-gray-100 dark:border-gray-700 px-3 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100 cursor-pointer">
          <div className="flex items-center">
            <Avatar
              className="mr-2 md:block bg-gray-50 border border-gray-200"
              src="https://i.ibb.co/GWVWYNn/team-7.jpg"
              alt="Josh"
            />

            <div className="notification-content">
              <h6 className="font-medium text-gray-500">
                John Doe Placed <span className="font-bold">$513</span> USD
                order!
              </h6>

              <p className="flex items-center text-xs text-gray-400">
                <Badge type="success">New Order</Badge>

                <span className="ml-2">Dec 18 2021 - 12:40PM</span>
              </p>
            </div>
          </div>

          <span className="px-2">
            <IoClose />
          </span>
        </li> */}
      </ul>
    </>
  );
}

export default NotificationModal;
