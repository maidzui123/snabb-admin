import React, { useState, useContext } from "react";
import Switch from "react-switch";
import { useLocation } from "react-router-dom";
import {
    TableCell,
  } from "@windmill/react-ui";
//internal import
import { SidebarContext } from "@/context/SidebarContext";
import AttributeServices from "@/services/AttributeServices";
import CategoryServices from "@/services/CategoryServices";
import CouponServices from "@/services/CouponServices";
import CurrencyServices from "@/services/CurrencyServices";
import LanguageServices from "@/services/LanguageServices";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import BrandServices from "@/services/BrandServices";

const PermissionForm = ({
  id,
  status,
  category,
  currencyStatusName,
  service,
}) => {
  
  const [permission, setPermission] = useState(status);

  const handlePermissionChange = (event) => {
    setPermission(event.target.value);
  };

  return (
    <>
    <TableCell className="text-center">
      <label>
        <input
          type="radio"
          value="hide"
          checked={permission === 'hide'}
          onChange={handlePermissionChange}
        />
      </label>
    </TableCell>  
    <TableCell className="text-center">
      <label>
        <input
          type="radio"
          value="show"
          checked={permission === 'show'}
          onChange={handlePermissionChange}
        />
      </label>
    </TableCell>
  </>
  );
};

export default PermissionForm;
