import React from "react";
import noResult from "@/assets/img/no-result.svg";

const NotFound = ({ title }) => {
  return (
    <div className="flex justify-center">
      <div className="mx-auto p-5 my-5 text-center">
        <div className="flex justify-center">
          <img
            className="my-4 center"
            src={noResult}
            alt="no-result"
            width="400"
          />
        </div>
        <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl mt-2 font-medium font-serif text-gray-600">
          Xin lỗi, không tìm thấy {title}
          <span role="img" aria-labelledby="img">
            😞
          </span>
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
