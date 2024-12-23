import React from "react";
import { Label } from "@windmill/react-ui";

const LabelArea = ({ label, labelRequired }) => {
  return (
    <Label className="col-span-4 sm:col-span-2 font-medium text-sm">
      {label} {labelRequired == true && <span className="text-red-500">*</span>}
    </Label>
  );
};

export default LabelArea;
