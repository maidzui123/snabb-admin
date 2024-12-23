import React from "react";

import RingLoader from "react-spinners/RingLoader";

const ThemeSuspense = () => {
  return (
    <div className="w-full flex justify-center items-center  h-screen font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
       <RingLoader size={150}  color="#4083f8" />
    </div>
  );
};

export default ThemeSuspense;
