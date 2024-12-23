import { color } from "@cloudinary/url-gen/qualifiers/background";
import { Badge } from "@windmill/react-ui";
import React from "react";

const Status = ({ status = "", type = "primary", className }) => {
  switch (status.toLowerCase()) {
    case "pending":
    case "outdate":
    case "hết hiệu lực":
    case "vô hiệu":
    case "inactive":
    case "public":
    case "chờ duyệt":
      type = "warning";
      break;

    case "draft":
    case "nháp":
      type = "neutral";
      break;

    case "delivered":
    case "active":
    case "instock":
    case "còn hàng":
    case "hoạt động":
    case "show":
    case "processing":
    case "đang xử lý":
    case "đang sửa chữa":
      type = "primary";
      break;

    case "finish":
    case "hoàn thành":
      type = "success";
      break;

    case "cancel":
    case "outstock":
    case "hết hàng":
    case "không hợp lệ":
    case "trùng lặp":
    case "error":
    case "hide":
    case "đã hủy":
      type = "danger";
      break;

    default:
      break;
  }
  return (
    <>
      {status && (
        <span className="font-serif">
          <Badge type={type} className={className}>
            {status?.toString()?.toUpperCase()}
          </Badge>
        </span>
      )}
    </>
  );
};

export default Status;
