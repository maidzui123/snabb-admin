import { HelperText } from "@windmill/react-ui";
import React from "react";

const Error = ({ errorName }) => {
  return (
    <>
      {errorName && (
        <HelperText valid={false} className="text-sm font-semibold mt-2">{errorName.message}</HelperText>
      )}
    </>
  );
};

export default Error;
